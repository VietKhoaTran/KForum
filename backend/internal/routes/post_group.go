package routes

import (
	PostCtrl "backend/backend/internal/controllers/post"
	"backend/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func postGroup(r *gin.RouterGroup) {
	ctrl := PostCtrl.NewController()

	r.Use(middleware.AuthMiddleWare())
	{
		r.POST("/create", ctrl.Create)
		r.GET("/fetch/:topicTitle", ctrl.Fetch)
		r.GET("/fetch1/:postID", ctrl.Fetch1)
		r.POST("/like", ctrl.Like)
		r.PUT("/update/:id", ctrl.Update)
		r.DELETE("/delete/:id", ctrl.Delete)
	}
}
