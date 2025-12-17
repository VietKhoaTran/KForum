package config

import (
	"os"

	"github.com/joho/godotenv"
)

var (
	JWTSecret    []byte
	CookieDomain string
)

func init() {
	godotenv.Load()
	JWTSecret = []byte(os.Getenv("JWT_SECRET"))
	CookieDomain = os.Getenv("COOKIE_DOMAIN")
}
