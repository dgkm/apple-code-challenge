package cache

import (
	"time"

	"github.com/gin-contrib/cache"
	"github.com/gin-contrib/cache/persistence"
	"github.com/gin-gonic/gin"
)

type Cache struct {
	store *persistence.InMemoryStore
}

const cacheExpiry = time.Minute * 10

func New() *Cache {
	store := persistence.NewInMemoryStore(time.Second)
	c := &Cache{
		store: store,
	}

	return c
}

func (c *Cache) CachePage(handle gin.HandlerFunc) gin.HandlerFunc {
	return cache.CachePage(c.store, cacheExpiry, handle)
}
