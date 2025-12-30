package dataaccess

import (
	"backend/backend/internal/database"
	"backend/backend/internal/models"
	utils "backend/backend/internal/utils"

	"context"
)

func CreateComment(comment string, postID int, username string) error {
	db := database.Connect()
	defer database.Close(db)

	ctx := context.Background()

	userID, err := utils.GetUserID(ctx, db, username)
	if err != nil {
		return err
	}

	const query = `
		INSERT INTO comments (post_id, comment, created_by)
		VALUES ($1, $2, $3);
	`

	_, err = db.ExecContext(ctx, query, postID, comment, userID)
	return err
}

func FetchComment(username string, postID int) ([]models.CommentReturn, error) {
	db := database.Connect()
	defer database.Close(db)

	ctx := context.Background()

	userID, err := utils.GetUserID(ctx, db, username)
	if err != nil {
		return nil, err
	}

	const query = `
		SELECT 
			c.id,
			c.comment, 
			u.username,
			c.created_at,
			c.edited,
			c.edited_at,

			(
				SELECT COUNT(*)
				FROM comment_likes cl
				WHERE cl.comment_id = c.id
			) AS like_count,

			CASE
				WHEN EXISTS (
					SELECT 1
					FROM comment_likes cl2
					WHERE cl2.user_id = $2
					AND cl2.comment_id = c.id
				) THEN TRUE
				ELSE FALSE
			END AS liked,

			(
				SELECT COUNT(*)
				FROM comments c2
				WHERE c2.parent_comment = c.id
			) AS reply_count,

			c.parent_comment
			
		FROM comments c
		JOIN users u ON c.created_by = u.id
		WHERE c.post_id = $1;
	`
	rows, err := db.QueryContext(ctx, query, postID, userID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var comments []models.CommentReturn

	for rows.Next() {
		var comment models.CommentReturn
		if err := rows.Scan(
			&comment.ID,
			&comment.Comment,
			&comment.CreatedBy,
			&comment.CreatedAt,
			&comment.Edited,
			&comment.EditedAt,
			&comment.NoLikes,
			&comment.Liked,
			&comment.NoComments,
			&comment.ParentComment,
		); err != nil {
			return nil, err
		}

		comments = append(comments, comment)
	}

	return comments, nil
}

func UpdateComment(commentID int, newComment string) error {
	db := database.Connect()
	defer database.Close(db)

	ctx := context.Background()

	query := `
		UPDATE comments
		SET comment = $1, edited = TRUE, edited_at = NOW()
		WHERE id = $2
	`
	// queryUpdateNoReplies := `
	// 	WHILE i.parent_comment NOT NULL
	// 		i.no_replies += 1
	// 		i = i.parent_comment
	// 	FROM comments
	// `

	_, err := db.ExecContext(ctx, query, newComment, commentID)
	return err
}

func DeleteComment(commentID int) error {
	db := database.Connect()
	defer database.Close(db)

	ctx := context.Background()

	query := `
		DELETE FROM comments WHERE id = $1;
	`
	_, err := db.ExecContext(ctx, query, commentID)
	return err
}

func LikeComment(commentID int, username string) (int, error) {
	db := database.Connect()
	defer database.Close(db)

	ctx := context.Background()

	userID, err := utils.GetUserID(ctx, db, username)
	if err != nil {
		return -1, err
	}

	var already bool
	const queryCheckAlreadyLiked = `
		SELECT EXISTS (
			SELECT 1
			FROM comment_likes
			WHERE user_id = $1 AND comment_id = $2
		);
	`
	err = db.QueryRowContext(ctx, queryCheckAlreadyLiked, userID, commentID).Scan(&already)

	const queryUnLike = `
		DELETE FROM comment_likes
		WHERE user_id = $1 AND comment_id = $2;
	`

	const queryLike = `
		INSERT INTO comment_likes (user_id, comment_id)
		VALUES ($1, $2);
	`
	if already {
		_, err = db.ExecContext(ctx, queryUnLike, userID, commentID)
	} else {
		_, err = db.ExecContext(ctx, queryLike, userID, commentID)
	}

	if err != nil {
		return -1, err
	}

	var noComments int
	const queryNoComment = `
		SELECT COUNT(cl.comment_id) 
		FROM comment_likes cl
		WHERE cl.comment_id = $1
	`
	err = db.QueryRowContext(ctx, queryNoComment, commentID).Scan(&noComments)
	return noComments, err
}

func ReplyComment(username string, commentID int, reply string, postID int) error {
	db := database.Connect()
	defer database.Close(db)

	ctx := context.Background()

	userID, err := utils.GetUserID(ctx, db, username)
	if err != nil {
		return err
	}

	const query = `
		INSERT INTO comments (post_id, comment, created_by, parent_comment)
		VALUES ($1, $2, $3, $4);
	`

	_, err = db.ExecContext(ctx, query, postID, reply, userID, commentID)
	return err
}

func FetchReply(username string, commentID int) ([]models.CommentReturn, error) {
	db := database.Connect()
	defer database.Close(db)

	ctx := context.Background()

	userID, err := utils.GetUserID(ctx, db, username)
	if err != nil {
		return nil, err
	}

	const query = `
		SELECT 
			c.id,
			c.comment, 
			u.username,
			c.created_at,
			c.edited,
			c.edited_at,

			(
				SELECT COUNT(*)
				FROM comment_likes cl
				WHERE cl.comment_id = c.id
			) AS like_count,

			CASE
				WHEN EXISTS (
					SELECT 1
					FROM comment_likes cl2
					WHERE cl2.user_id = $2
					AND cl2.comment_id = c.id
				) THEN TRUE
				ELSE FALSE
			END AS liked,

			(
				SELECT COUNT(*)
				FROM comments c2
				WHERE c2.parent_comment = c.id
			) AS comment_count
			
		FROM comments c
		JOIN users u ON c.created_by = u.id
		WHERE c.parent_comment = $1;
	`
	rows, err := db.QueryContext(ctx, query, commentID, userID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var comments []models.CommentReturn

	for rows.Next() {
		var comment models.CommentReturn
		if err := rows.Scan(
			&comment.ID,
			&comment.Comment,
			&comment.CreatedBy,
			&comment.CreatedAt,
			&comment.Edited,
			&comment.EditedAt,
			&comment.NoLikes,
			&comment.Liked,
			&comment.NoComments,
		); err != nil {
			return nil, err
		}

		comments = append(comments, comment)
	}

	return comments, nil
}
