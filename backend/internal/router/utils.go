package router

import (
	"interview/internal/types"

	"github.com/gin-gonic/gin"
)

func getQueryOptions(c *gin.Context) types.QueryOptions {
	page := c.Query("page")
	if page == "" {
		page = "1"
	}

	size := c.Query("size")
	if size == "" {
		size = "10"
	}

	options := types.QueryOptions{
		Pagination: types.Pagination{
			Page: page,
			Size: size,
		},
	}

	return options

}
