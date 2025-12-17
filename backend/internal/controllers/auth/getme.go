package auth

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (c *Controller) GetMe(ctx *gin.Context) {
	username, _ := ctx.Get("username")
	ctx.JSON(http.StatusOK, gin.H{
		"username": username,
	})
}
