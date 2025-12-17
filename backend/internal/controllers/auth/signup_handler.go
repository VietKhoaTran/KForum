package auth

import (
	"backend/backend/internal/config"
	models "backend/backend/internal/models/auth"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (c *Controller) SignUp(ctx *gin.Context) {

	fmt.Print(config.CookieDomain)

	var req models.SignInRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid request"})
		return
	}

	signedToken, _ := models.CreateJWT(req.Name)

	ctx.SetCookie(
		"auth_token",
		signedToken,
		10*365*24*60*60,
		"/",
		config.CookieDomain,
		false,
		true,
	)

	ctx.JSON(http.StatusOK, gin.H{"message": "JWT in Cookie successfully"})
}
