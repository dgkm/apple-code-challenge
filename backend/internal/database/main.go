package database

import (
	"database/sql"
	"log"
	"os"
)

const dbFileName = "assets.db"

type Database struct {
	Pool *sql.DB
}

func NewInstance() (database *Database) {
	pool, err := sql.Open("sqlite3", dbFileName)
	if err != nil {
		log.Fatal(err)
		panic(err)
	}

	database = &Database{
		Pool: pool,
	}

	return database
}

func NewDatabase() (database *Database) {
	if _, err := os.Stat(dbFileName); err == nil {
		os.Remove(dbFileName)
	}
	return NewInstance()
}
