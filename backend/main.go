package main

import (
	"backend/backend/controllers"
	"backend/backend/middleware"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	const PORT = ":5000"

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST", "GET", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	ctrl := controllers.NewController()

	authGroup := router.Group("/auth")
	{
		authGroup.POST("/signin", ctrl.SignIn)
		authGroup.GET("/me", middleware.AuthMiddleWare(), ctrl.GetMe)
	}

	log.Println("Server running on ", PORT)
	log.Fatal(router.Run(PORT))
}
