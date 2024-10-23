package router

import (
	"interview/internal/types"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (r *Router) AddRoutes() {

	r.engine.GET("/assets", func(c *gin.Context) {
		assetID := c.Query("id")
		var err error
		var assets []types.Asset

		if assetID != "" {
			assets, err = r.db.GetAllAssetsById(assetID)
		} else {
			assets, err = r.db.GetAllAssets()
		}

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, assets)
	})
}
