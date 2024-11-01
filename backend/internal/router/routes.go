package router

import (
	"fmt"
	"net/http"
	"time"

	"interview/internal/types"

	"github.com/gin-gonic/gin"
)

func (r *Router) AddRoutes() {

	api := r.engine.Group("/api")

	v1 := api.Group("/v1")

	{
		v1.GET("/assets", r.cache.CacheUri(), r.getAssets)
		v1.GET("/assets/original", r.cache.CacheUri(), r.getAssets)
		v1.GET("/assets/:id", r.cache.CacheUri(), r.getAssetById)
	}
}

func (r *Router) getAssets(c *gin.Context) {

	start := time.Now()

	queryOptions := getQueryOptions(c)

	searchTerm := c.Query("search")

	count, err := r.db.GetAssetsCount(&searchTerm)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	assets, err := r.db.GetAllAssets(&queryOptions, &searchTerm)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	duration := fmt.Sprintf("%.6fms", float64(time.Since(start).Nanoseconds())/1000/1000)

	c.JSON(http.StatusOK, &types.ResponseType{
		Data: assets,
		Metadata: types.MetadataType{
			QueryOptions: queryOptions,
			Total:        *count,
			Duration:     duration,
		},
	})
}

func (r *Router) getAssetById(c *gin.Context) {
	assetID := c.Param("id")

	if assetID == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "id is missing"})
		return
	}

	assets, err := r.db.GetAllAssetsById(&assetID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, &types.ResponseType{
		Data: assets,
	})
}
