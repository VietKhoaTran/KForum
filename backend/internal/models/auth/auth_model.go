package auth

import (
	"backend/backend/internal/config"

	"github.com/golang-jwt/jwt/v5"
)

type SignInRequest struct {
	Name string `json:"name" binding:"required`
}

type JWTResponse struct {
	JWT string `json:"JWT"`
}

func CreateJWT(name string) (string, error) {
	claims := jwt.MapClaims{
		"sub": name,
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(config.JWTSecret)
}
