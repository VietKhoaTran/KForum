package post

import (
	dataaccess "backend/internal/dataaccess"
	"backend/internal/models"
	"backend/internal/utils"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (c *Controller) Create(ctx *gin.Context) {
	var req models.PostCreate
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	username, ok := utils.GetUsername(ctx)
	if !ok {
		return
	}

	if err := dataaccess.CreatePost(req.Title, req.Details, req.Topic, username); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"post": req})
}

func (c *Controller) Fetch(ctx *gin.Context) {
	username, ok := utils.GetUsername(ctx)
	if !ok {
		return
	}

	topicTitle := ctx.Param("topicTitle")
	posts, err := dataaccess.FetchPost(username, topicTitle)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch posts"})
		return
	}

	ctx.JSON(http.StatusOK, posts)
}

func (c *Controller) Fetch1(ctx *gin.Context) {
	username, ok := utils.GetUsername(ctx)
	if !ok {
		return
	}

	postIDString := ctx.Param("postID")
	postID, err := strconv.Atoi(postIDString)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
		return
	}

	post, err := dataaccess.Fetch1Post(username, postID)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch 1 post"})
		return
	}

	ctx.JSON(http.StatusOK, post)
}

func (c *Controller) Like(ctx *gin.Context) {
	var req models.PostLike

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}
	username, ok := utils.GetUsername(ctx)
	if !ok {
		return
	}
	number, err := dataaccess.LikePost(req.Title, username)

	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"NoLikes": []int{number}})
}

func (c *Controller) Update(ctx *gin.Context) {
	id, ok := utils.GetIDParam(ctx)
	if !ok {
		return
	}

	var req models.PostUpdate

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid reqeuest"})
		return
	}

	err := dataaccess.UpdatePost(id, req.Title, req.Details)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"updated post": []string{req.Title, req.Details}})
}

func (c *Controller) Delete(ctx *gin.Context) {
	id, ok := utils.GetIDParam(ctx)
	if !ok {
		return
	}

	err := dataaccess.DeletePost(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
}
