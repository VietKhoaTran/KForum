package routes

import (
	"backend/backend/internal/controllers/auth"
	"backend/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func authGroup(r *gin.RouterGroup) {
	ctrl := auth.NewController()

	r.GET("/me", middleware.AuthMiddleWare(), ctrl.GetMe)
	r.POST("/signup", ctrl.SignUp)
	r.POST("/login", ctrl.LogIn)
}
