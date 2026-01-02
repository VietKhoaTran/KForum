package health

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func (c *Controller) Check(ctx *gin.Context) {
	ctx.JSON(http.StatusOK, gin.H{
		"health": "reunning",
	})
}
