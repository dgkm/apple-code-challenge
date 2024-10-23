package main

import (
	"interview/internal/database"
	"interview/internal/router"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	d := database.NewInstance()
	defer d.Pool.Close()

	r := router.New(d)
	r.Initialize()
	r.Run()
}
