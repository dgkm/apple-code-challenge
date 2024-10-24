package cache

import (
	"time"

	cache "github.com/chenyahui/gin-cache"
	"github.com/chenyahui/gin-cache/persist"
	"github.com/gin-gonic/gin"
)

type Cache struct {
	store *persist.MemoryStore
}

const (
	cacheExpiry  = time.Minute * 10
	cacheEnabled = false
)

func New() *Cache {
	store := persist.NewMemoryStore(cacheExpiry)
	c := &Cache{
		store: store,
	}

	return c
}

func (c *Cache) CacheUri() gin.HandlerFunc {
	if cacheEnabled == true {
		return cache.CacheByRequestURI(c.store, cacheExpiry)
	}
	return func(ctx *gin.Context) {
		ctx.Next()
	}
}
