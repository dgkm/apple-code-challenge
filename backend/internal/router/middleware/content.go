package middleware

import "github.com/gin-gonic/gin"

var (
	contentType = "application/json; charset=utf8"
)

func ContentMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Content-Type", contentType)
		c.Next()
	}
}
