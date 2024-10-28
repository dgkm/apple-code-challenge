package main

import (
	"interview/internal/database"
	"interview/internal/env"
	"interview/internal/router"

	_ "github.com/mattn/go-sqlite3"
)

var (
	dbWithLogger = env.GetBool("DB_WITH_LOGGER")
)

func main() {
	var d database.Database

	if dbWithLogger {
		d = *database.NewInstanceWithLogger()
	} else {
		d = *database.NewInstance()
	}
	defer d.Pool.Close()

	r := router.New(&d)
	r.Initialize()
	r.Run()
}
