package main

import (
	"backend/backend/internal/router"
	"log"
	"os"
)

func main() {

	PORT := os.Getenv("PORT")
	r := router.Setup()

	if err := r.Run(PORT); err != nil {
		log.Fatalf("Not running")
	}

	log.Println("Server running on ", PORT)
}
