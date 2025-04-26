package handlers

import (
	"encoding/json"
	"geomap/models"
	"net/http"
)

// Estructura para agregar categoría
type CategoriaRequest struct {
	Nombre string `json:"nombre"`
}

// Manejador general de categorías (GET y POST)
func CategoriasHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodGet {
		getCategorias(w, r)
	} else if r.Method == http.MethodPost {
		agregarCategoria(w, r)
	} else {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
	}
}

// OBTENER categorías
func getCategorias(w http.ResponseWriter, r *http.Request) {
	rows, err := models.DB.Query("SELECT id_categoria, nombre FROM categorias")
	if err != nil {
		http.Error(w, "Error al obtener categorías", 500)
		return
	}
	defer rows.Close()

	var categorias []models.Categoria
	for rows.Next() {
		var c models.Categoria
		if err := rows.Scan(&c.ID, &c.Nombre); err != nil {
			http.Error(w, "Error al leer categorías", 500)
			return
		}
		categorias = append(categorias, c)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categorias)
}

// AGREGAR nueva categoría
func agregarCategoria(w http.ResponseWriter, r *http.Request) {
	var cat CategoriaRequest
	err := json.NewDecoder(r.Body).Decode(&cat)
	if err != nil || cat.Nombre == "" {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	_, err = models.DB.Exec("INSERT INTO categorias (nombre) VALUES (?)", cat.Nombre)
	if err != nil {
		http.Error(w, "Error al insertar categoría", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
