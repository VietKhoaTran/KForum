package dataaccess

import (
	"backend/backend/internal/database"
	"backend/backend/internal/models"
	"context"
)

func CreateTopic(title string, description string, username string) error {
	db := database.Connect()

	queryFindID := `
		SELECT id FROM users WHERE username = $1;
	`
	var id int
	err := db.QueryRowContext(
		context.Background(),
		queryFindID,
		username,
	).Scan(&id)

	if err != nil {
		return err
	}

	queryCreate := `
		INSERT INTO topics (title, description, created_by)
		VALUES ($1, $2, $3)
		RETURNING id, created_at;
	`

	_, err = db.ExecContext(
		context.Background(),
		queryCreate,
		title,
		description,
		id,
	)

	database.Close(db)
	return err
}

func FetchTopic(username string) ([]models.Topic, error) {
	db := database.Connect()

	query := `
		SELECT t.id, t.title, t.description, u.username, t.created_at
		FROM topics t
		JOIN users u ON t.created_by = u.id
	`

	rows, err := db.QueryContext(context.Background(), query)

	if err != nil {
		return nil, err
	}

	var topics []models.Topic

	for rows.Next() {
		var topic models.Topic
		if err := rows.Scan(
			&topic.ID,
			&topic.Title,
			&topic.Description,
			&topic.CreatedBy,
			&topic.CreatedAt,
		); err != nil {
			return nil, err
		}

		topics = append(topics, topic)
	}

	database.Close(db)
	return topics, nil
}
