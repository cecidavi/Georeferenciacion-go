package handlers

import (
	"encoding/json"
	"geomap/models"
	"net/http"
)

func GetCategorias(w http.ResponseWriter, r *http.Request) {
	db := models.GetDB() // 👈 PEDIMOS la conexión a DB de models
	rows, err := db.Query("SELECT id_categoria, nombre FROM categorias")
	if err != nil {
		http.Error(w, "Error al obtener categorías", 500)
		return
	}
	defer rows.Close()

	var categorias []models.Categoria
	for rows.Next() {
		var c models.Categoria
		err := rows.Scan(&c.ID, &c.Nombre)
		if err != nil {
			http.Error(w, "Error al leer categorías", 500)
			return
		}
		categorias = append(categorias, c)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(categorias)
}
