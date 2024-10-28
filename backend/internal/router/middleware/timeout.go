package middleware

import (
	"fmt"
	"interview/internal/env"
	"net/http"
	"time"

	"github.com/gin-contrib/timeout"
	"github.com/gin-gonic/gin"
)

var (
	requestTimeout = env.GetInt("REQUEST_TIMEOUT")
)

func timeoutResponse(c *gin.Context) {
	c.JSON(http.StatusRequestTimeout, gin.H{"error": "timeout!"})
}

func TimeoutMiddleware() gin.HandlerFunc {
	fmt.Println(time.Duration(requestTimeout * 1e9))
	return timeout.New(
		timeout.WithTimeout(time.Duration(requestTimeout*1e9)),
		timeout.WithHandler(func(c *gin.Context) {
			c.Next()
		}),
		timeout.WithResponse(timeoutResponse),
	)
}
