package comment

import (
	dataComment "backend/backend/internal/dataaccess"
	"backend/backend/internal/models"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (c *Controller) Create(ctx *gin.Context) {
	var req models.CommentCreate

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	usernameIface, _ := ctx.Get("username")

	username, ok := usernameIface.(string)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid username after decoding JWT"})
		return
	}

	err := dataComment.CreateComment(req.Comment, req.PostID, username)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"comment": []string{req.Comment}})
}

func (c *Controller) Fetch(ctx *gin.Context) {
	usernameIface, _ := ctx.Get("username")

	username, ok := usernameIface.(string)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid username after decoding JWT"})
		return
	}

	postIDString := ctx.Param("postID")
	postID, err := strconv.Atoi(postIDString)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	comments, err := dataComment.FetchComment(username, postID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch posts"})
		return
	}

	ctx.JSON(http.StatusOK, comments)
}

func (c *Controller) Update(ctx *gin.Context) {

	commentIDString := ctx.Param("commentID")
	commentID, err := strconv.Atoi(commentIDString)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	var req models.CommentUpdate

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid reqeuest"})
		return
	}

	err = dataComment.UpdateComment(commentID, req.Comment)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"updated comment": []string{req.Comment}})

}

func (c *Controller) Delete(ctx *gin.Context) {
	commentIDString := ctx.Param("commentID")
	commentID, err := strconv.Atoi(commentIDString)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	err = dataComment.DeleteComment(commentID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}

func (c *Controller) Like(ctx *gin.Context) {

	commentIDString := ctx.Param("commentID")
	commentID, err := strconv.Atoi(commentIDString)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	usernameIface, _ := ctx.Get("username")

	username, ok := usernameIface.(string)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid username after decoding JWT"})
		return
	}

	number, err := dataComment.LikeComment(commentID, username)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"NoLikes": []int{number}})
}

func (c *Controller) Reply(ctx *gin.Context) {
	var req models.CommentReply

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	usernameIface, _ := ctx.Get("username")

	username, ok := usernameIface.(string)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid username after decoding JWT"})
		return
	}

	replyID, err := dataComment.ReplyComment(username, req.CommentID, req.Reply, req.PostID)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"reply": gin.H{
			"id":         replyID,
			"comment":    req.Reply,
			"created_by": username,
		},
	})

}

func (c *Controller) ReplyFetch(ctx *gin.Context) {
	usernameIface, _ := ctx.Get("username")

	username, ok := usernameIface.(string)
	if !ok {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid username after decoding JWT"})
		return
	}

	commentIDString := ctx.Param("commentID")
	commentID, err := strconv.Atoi(commentIDString)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	replies, err := dataComment.FetchReply(username, commentID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch posts"})
		return
	}

	ctx.JSON(http.StatusOK, replies)
}
