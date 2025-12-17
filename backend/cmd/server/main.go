package main

import (
	"backend/backend/internal/router"
	"log"
)

func main() {

	const PORT = ":5000"
	r := router.Setup()

	if err := r.Run(PORT); err != nil {
		log.Fatalf("Not running")
	}

	log.Println("Server running on ", PORT)
}
