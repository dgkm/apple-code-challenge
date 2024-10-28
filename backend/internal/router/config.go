package router

import (
	"fmt"
	"interview/internal/env"
	"interview/internal/router/middleware"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	throttle "github.com/s12i/gin-throttle"
)

var (
	maxEventsPerSec = env.GetInt("THROTTLE_MAX_REQUESTS_PER_SECOND")
	maxBurstSize    = env.GetInt("THROTTLE_MAX_BURST_SIZE")
)

func (r *Router) ConfigLogger() {
	r.engine.Use(gin.LoggerWithFormatter(func(param gin.LogFormatterParams) string {
		return fmt.Sprintf("%s - [%s] \"%s %s %s %d %s %dbytes %s\"\n",
			param.ClientIP,
			param.TimeStamp.Format(time.RFC1123),
			param.Method,
			param.Path,
			param.Request.Proto,
			param.StatusCode,
			param.Latency,
			param.BodySize,
			param.ErrorMessage,
		)
	}))
}

func (r *Router) ConfigCors() {
	r.engine.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET"}, // "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
}

func (r *Router) ConfigTimeout() {
	r.engine.Use(middleware.TimeoutMiddleware())
}

func (r *Router) ConfigGzip() {
	r.engine.Use(gzip.Gzip(gzip.DefaultCompression))
}

func (r *Router) ConfigContentType() {
	r.engine.Use(middleware.ContentMiddleware())
}

func (r *Router) ConfigureThrottle() {
	r.engine.Use(throttle.Throttle(maxEventsPerSec, maxBurstSize))
}
