package database

import (
	"database/sql"
	"log"
	"os"
	"time"

	_ "github.com/lib/pq"
)

func Connect() *sql.DB {
	connStr := os.Getenv("DATABASE_URL")
	log.Println("Connecting to database with:", connStr)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}

	for i := 1; i <= 10; i++ {
		err = db.Ping()
		if err == nil {
			log.Println("Connected to database!")
			return db
		}

		log.Printf("Waiting for database... (%d/10)", i)
		time.Sleep(2 * time.Second)
	}

	log.Fatal("Could not connect to database:", err)
	return nil
}

func Close(db *sql.DB) {
	if err := db.Close(); err != nil {
		log.Println("Error closing database:", err)
	} else {
		log.Println("Database connection closed.")
	}
}
