package router

import (
	"interview/internal/types"
	"net/http"

	"github.com/gin-gonic/gin"
)

func (r *Router) AddRoutes() {
	r.engine.GET("/assets", r.getAssets)
	r.engine.GET("/assets/:id", r.getAssetById)
}

func (r *Router) getAssets(c *gin.Context) {

	queryOptions := getQueryOptions(c)

	var err error
	var assets []types.Asset

	count, err := r.db.GetAssetsCount()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	assets, err = r.db.GetAllAssets(queryOptions)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &types.ResponseType{
		Data: assets,
		Metadata: types.MetadataType{
			QueryOptions: queryOptions,
			Total:        count,
		},
	})
}

func (r *Router) getAssetById(c *gin.Context) {
	assetID := c.Param("id")
	var err error
	var assets []types.Asset

	if assetID == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "id is missing"})
		return
	}

	assets, err = r.db.GetAllAssetsById(assetID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &types.ResponseType{
		Data: assets,
	})
}
