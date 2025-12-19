package models

import "time"

type CreateRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description" binding:"required"`
	// Username    string `json:"username" binding:"required"`
}

type Topic struct {
	ID          int
	Title       string
	Description string
	CreatedBy   string
	CreatedAt   time.Time
}
