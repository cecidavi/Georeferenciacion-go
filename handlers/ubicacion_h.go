package handlers

import (
	"encoding/json"
	"geomap/models"
	"net/http"
)

type Ubicacion struct {
	ID          int     `json:"id"`
	Nombre      string  `json:"nombre"`
	Descripcion string  `json:"descripcion"`
	Latitud     float64 `json:"latitud"`
	Longitud    float64 `json:"longitud"`
	CategoriaID int     `json:"categoria_id"`
	Categoria   string  `json:"categoria"` // <<--- Agregado
}

// Obtener ubicaciones
func GetUbicaciones(w http.ResponseWriter, r *http.Request) {
	rows, err := models.DB.Query(`
		SELECT u.id, u.nombre, u.descripcion, u.latitud, u.longitud, c.id_categoria, c.nombre 
		FROM ubicaciones u
		JOIN categorias c ON u.categoria_id = c.id_categoria
	`)
	if err != nil {
		http.Error(w, "Error al obtener ubicaciones", 500)
		return
	}
	defer rows.Close()

	var ubicaciones []Ubicacion
	for rows.Next() {
		var u Ubicacion
		err := rows.Scan(&u.ID, &u.Nombre, &u.Descripcion, &u.Latitud, &u.Longitud, &u.CategoriaID, &u.Categoria)
		if err != nil {
			http.Error(w, "Error al leer resultados", 500)
			return
		}
		ubicaciones = append(ubicaciones, u)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(ubicaciones)
}

// Agregar nueva ubicación
func AgregarUbicacion(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	var u Ubicacion
	err := json.NewDecoder(r.Body).Decode(&u)
	if err != nil {
		http.Error(w, "Datos inválidos", 400)
		return
	}

	_, err = models.DB.Exec(`INSERT INTO ubicaciones (nombre, descripcion, latitud, longitud, categoria_id) 
		VALUES (?, ?, ?, ?, ?)`, u.Nombre, u.Descripcion, u.Latitud, u.Longitud, u.CategoriaID)
	if err != nil {
		http.Error(w, "Error al insertar", 500)
		return
	}

	w.WriteHeader(http.StatusCreated)
}
