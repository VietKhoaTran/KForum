package routes

import (
	"backend/backend/internal/controllers/topic"
	"backend/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func topicGroup(r *gin.RouterGroup) {
	ctrl := topic.NewController()

	r.Use(middleware.AuthMiddleWare())
	{
		r.POST("/create", ctrl.Create)
		r.GET("/fetch", ctrl.Fetch)
		r.PUT("/update/:id", ctrl.Update)
		r.DELETE("/delete/:id", ctrl.Delete)
	}
	r.POST("/pin", ctrl.Pin)
}
