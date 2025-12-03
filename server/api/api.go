package api

import (
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

type Config struct {
	Addr   string
	Client string
}

type Application struct {
	Config Config
}

var router = http.NewServeMux()

func (app *Application) Run() error {
	fs := http.FileServer(http.Dir(app.Config.Client))
	router.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fullPath := filepath.Join(app.Config.Client, r.URL.Path)

		info, err := os.Stat(fullPath)
		if err == nil && !info.IsDir() {
			fs.ServeHTTP(w, r)
			return
		}

		http.ServeFile(w, r, filepath.Join(app.Config.Client, "index.html"))
	})

	server := http.Server{
		Addr:         app.Config.Addr,
		Handler:      router,
		WriteTimeout: 30 * time.Second,
		ReadTimeout:  10 * time.Second,
		IdleTimeout:  time.Minute,
	}

	log.Printf("Server is starting on http://localhost%s", app.Config.Addr)
	return server.ListenAndServe()
}
