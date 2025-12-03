package main

import (
	"log"
	"server/api"
)

func main() {
	app := api.Application{
		Config: api.Config{
			Addr:   ":8080",
			Client: "../dist",
		},
	}

	err := app.Run()
	if err != nil {
		log.Fatalf("Failed to start server on port %s: %s", app.Config.Addr, err)
	}
}
