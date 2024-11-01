package database

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/mattn/go-sqlite3"
	"github.com/rs/zerolog"
	sqldblogger "github.com/simukti/sqldb-logger"
	"github.com/simukti/sqldb-logger/logadapter/zerologadapter"
)

const (
	dbFileName = "assets.db"
	dbDSN      = "file:" + dbFileName + "?_journal_mode=OFF&cache=shared&_sync=0&_cslike=false"
)

type Database struct {
	Pool *sql.DB
}

func NewInstance() (database *Database) {
	fmt.Println("initialiasing database")
	pool, err := sql.Open("sqlite3", dbDSN)
	if err != nil {
		log.Fatal(err)
		panic(err)
	}

	database = &Database{
		Pool: pool,
	}

	return database
}

func NewInstanceWithLogger() (database *Database) {
	fmt.Println("initialiasing database with logger")
	loggerAdapter := zerologadapter.New(zerolog.New(os.Stdout))
	pool := sqldblogger.OpenDriver(dbDSN, &sqlite3.SQLiteDriver{}, loggerAdapter,
		sqldblogger.WithSQLQueryAsMessage(true), sqldblogger.WithMinimumLevel(sqldblogger.LevelTrace),
	)
	err := pool.Ping()

	if err != nil {
		fmt.Printf("error initialising db: %v\n", err)
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
