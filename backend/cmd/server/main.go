package main

import (
	"backend/internal/router"
	"log"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	_ = godotenv.Load()

	PORT := os.Getenv("PORT")
	r := router.Setup()

	if err := r.Run(PORT); err != nil {
		log.Fatalf("Not running")
	}

	log.Println("Server running on ", PORT)
}
