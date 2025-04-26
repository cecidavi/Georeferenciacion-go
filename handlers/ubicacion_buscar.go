package handlers

import (
	"encoding/json"
	"geomap/models"
	"net/http"
	"strconv"
)

type ResultadoBusqueda struct {
	ID          int     `json:"id"`
	Nombre      string  `json:"nombre"`
	Descripcion string  `json:"descripcion"`
	Latitud     float64 `json:"latitud"`
	Longitud    float64 `json:"longitud"`
	Categoria   string  `json:"categoria"`
	Distancia   float64 `json:"distancia"`
}

// Buscar ubicaciones cercanas
func BuscarUbicacionesCercanas(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	latStr := r.URL.Query().Get("latitud")
	lngStr := r.URL.Query().Get("longitud")
	radioStr := r.URL.Query().Get("radio")

	if latStr == "" || lngStr == "" || radioStr == "" {
		http.Error(w, "Faltan parámetros", http.StatusBadRequest)
		return
	}

	lat, _ := strconv.ParseFloat(latStr, 64)
	lng, _ := strconv.ParseFloat(lngStr, 64)
	radio, _ := strconv.ParseFloat(radioStr, 64)

	query := `
		SELECT u.id, u.nombre, u.descripcion, u.latitud, u.longitud, c.nombre,
		(6371 * ACOS(
			COS(RADIANS(?)) * COS(RADIANS(u.latitud)) * COS(RADIANS(u.longitud) - RADIANS(?))
			+ SIN(RADIANS(?)) * SIN(RADIANS(u.latitud))
		)) AS distancia
		FROM ubicaciones u
		JOIN categorias c ON u.categoria_id = c.id_categoria
		HAVING distancia <= ?
		ORDER BY distancia ASC
	`

	rows, err := models.DB.Query(query, lat, lng, lat, radio)
	if err != nil {
		http.Error(w, "Error al buscar ubicaciones", 500)
		return
	}
	defer rows.Close()

	var resultados []ResultadoBusqueda
	for rows.Next() {
		var r ResultadoBusqueda
		err := rows.Scan(&r.ID, &r.Nombre, &r.Descripcion, &r.Latitud, &r.Longitud, &r.Categoria, &r.Distancia)
		if err != nil {
			http.Error(w, "Error al leer resultados", 500)
			return
		}
		resultados = append(resultados, r)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(resultados)
}
