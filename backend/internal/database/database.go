package database

import (
	"database/sql"
	"log"

	_ "github.com/lib/pq"
)

func Connect() *sql.DB {
	connStr := "host=localhost port=5432 user=forum_user password=aohk.kvt.2081 dbname=forum_db sslmode=disable"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	if err := db.Ping(); err != nil {
		log.Fatal(err)
	}

	log.Println("Connected to database!")
	return db
}

func Close(db *sql.DB) {
	if err := db.Close(); err != nil {
		log.Println("Error closing database:", err)
	} else {
		log.Println("Database connection closed.")
	}
}
