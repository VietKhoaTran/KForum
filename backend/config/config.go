package config

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	JWTSecret []byte
)

func init() {
	godotenv.Load()
	JWTSecret = []byte(os.Getenv("JWT_SECRET"))
}
