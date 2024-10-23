package router

import (
	"interview/internal/cache"
	"interview/internal/database"

	"github.com/gin-gonic/gin"
)

type Router struct {
	engine *gin.Engine
	db     *database.Database
	cache  *cache.Cache
}

func New(database *database.Database) *Router {
	engine := gin.New()

	cache := cache.New()

	router := &Router{
		engine: engine,
		db:     database,
		cache:  cache,
	}

	return router
}

func (r *Router) Initialize() {
	//configure engine
	r.ConfigLogger()
	r.ConfigCors()
	r.ConfigGzip()

	//add routes
	r.AddRoutes()
}

func (r *Router) Run() {
	r.engine.Run(":8080")
}
