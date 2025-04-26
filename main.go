package main

import (
	"geomap/handlers"
	"geomap/models"
	"net/http"
)

func main() {
	models.ConnectDB()

	http.HandleFunc("/api/ubicaciones", handlers.GetUbicaciones)
	http.HandleFunc("/api/agregar", handlers.AgregarUbicacion)
	http.HandleFunc("/api/categorias", handlers.CategoriasHandler) // <-- Cambiar aquí
	http.HandleFunc("/api/eliminar", handlers.EliminarUbicacion)
	http.HandleFunc("/api/editar", handlers.EditarUbicacion)
	http.HandleFunc("/api/buscar-cercanos", handlers.BuscarUbicacionesCercanas)
	// http.HandleFunc("/api/agregar-categoria", handlers.AgregarCategoria)  <-- Elimina esta línea

	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./templates/index.html")
	})

	println("Servidor corriendo en http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
