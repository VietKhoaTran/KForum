package controllers

import (
	"backend/backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Controller struct {
}

func NewController() *Controller {
	return &Controller{}
}

func (c *Controller) SignIn(ctx *gin.Context) {
	var req models.SignInRequest

	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request body or missing name"})
		return
	}

	signedToken, _ := models.CreateJWT(req.Name)

	ctx.SetCookie(
		"auth_token",
		signedToken,
		10*365*24*60*60,
		"/",
		"localhost",
		false,
		true,
	)
	ctx.JSON(http.StatusOK, gin.H{"message": "JWT in cookie successfully"})
}

func (c *Controller) GetMe(ctx *gin.Context) {
	username, _ := ctx.Get("username")
	ctx.JSON(http.StatusOK, gin.H{
		"username": username,
	})
}
