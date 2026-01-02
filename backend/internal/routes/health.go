package routes

import (
	"backend/internal/controllers/health"

	"github.com/gin-gonic/gin"
)

func healthGroup(r *gin.RouterGroup) {
	ctrl := health.NewController()

	r.GET("/check", ctrl.Check)
}
