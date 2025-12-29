package routes

import (
	commentControl "backend/backend/internal/controllers/comment"
	"backend/backend/internal/middleware"

	"github.com/gin-gonic/gin"
)

func commentGroup(r *gin.RouterGroup) {
	ctrl := commentControl.NewController()

	r.POST("/create", middleware.AuthMiddleWare(), ctrl.Create)
	r.GET("/fetch/:postID", middleware.AuthMiddleWare(), ctrl.Fetch)
	r.PUT("/update/:commentID", middleware.AuthMiddleWare(), ctrl.Update)
	r.DELETE("/delete/:commentID", middleware.AuthMiddleWare(), ctrl.Delete)
	r.POST("/like/:commentID", middleware.AuthMiddleWare(), ctrl.Like)
	r.POST("/reply/", middleware.AuthMiddleWare(), ctrl.Reply)
	r.GET("/reply/fetch/:commentID", middleware.AuthMiddleWare(), ctrl.ReplyFetch)
}
