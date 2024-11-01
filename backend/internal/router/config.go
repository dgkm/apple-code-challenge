package router

import (
	"fmt"
	"interview/internal/env"
	"interview/internal/router/middleware"
	"net/http"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/gzip"
	"github.com/gin-gonic/gin"
	throttle "github.com/s12i/gin-throttle"

	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	csrf "github.com/utrack/gin-csrf"
)

var (
	maxEventsPerSec = env.GetInt("THROTTLE_MAX_REQUESTS_PER_SECOND")
	maxBurstSize    = env.GetInt("THROTTLE_MAX_BURST_SIZE")
	sessionName     = env.Get("SESSION_NAME")
	storeSecret     = env.Get("SESSION_STORE_SECRET")
	csrfSecret      = env.Get("CSRF_SECRET")
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

func (r *Router) ConfigThrottle() {
	r.engine.Use(throttle.Throttle(maxEventsPerSec, maxBurstSize))
}

func (r *Router) ConfigSessionStore() {
	store := cookie.NewStore([]byte(storeSecret))
	store.Options(sessions.Options{
		MaxAge: 60,
	})
	r.engine.Use(sessions.Sessions(sessionName, store))
}

func (r *Router) ConfigCsrf() {
	r.engine.Use(csrf.Middleware(csrf.Options{
		Secret: csrfSecret,
		ErrorFunc: func(c *gin.Context) {
			c.JSON(http.StatusBadRequest, gin.H{"error": "CSRF token mismatch"})
			c.Abort()
		},
	}))

	r.engine.Use(middleware.SsrfMiddleware())
}
