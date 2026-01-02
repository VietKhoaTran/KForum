package dataaccess

import (
	"backend/internal/database"
	utilsAuth "backend/internal/utils/auth"
	"context"
	"errors"
)

func AddUser(username string, password string) error {
	db := database.Connect()

	query := `
		INSERT INTO users (username, hash_password)
		VALUES ($1, $2);
	`
	_, err := db.ExecContext(
		context.Background(),
		query,
		username,
		password,
	)
	database.Close(db)
	return err
}

func CheckExisting(username string) (bool, error) {
	db := database.Connect()

	query := `
		SELECT EXISTS(SELECT 1 FROM users WHERE username = $1);
	`

	var exists bool
	err := db.QueryRowContext(
		context.Background(),
		query,
		username,
	).Scan(&exists)

	if err != nil {
		return false, err
	}
	database.Close(db)
	return exists, nil
}

func VerifyUser(username string, password string) error {
	db := database.Connect()

	existing, err := CheckExisting(username)
	if err != nil {
		return err
	}
	if !existing {
		return errors.New("invalid username or password")
	}

	query := `
		SELECT hash_password FROM users WHERE username = $1;
	`
	var storedPassword string
	err = db.QueryRowContext(
		context.Background(),
		query,
		username,
	).Scan(&storedPassword)

	if err != nil {
		return err
	}

	err = utilsAuth.ComparePassword(storedPassword, password)
	if err != nil {
		return errors.New("Invalid username or password")
	}

	database.Close(db)
	return nil
}
