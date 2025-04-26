// handlers/ubicacion_editar.go
package handlers

import (
	"encoding/json"
	"geomap/models"
	"net/http"
)

// EditarUbicacion actualiza los datos de una ubicación
func EditarUbicacion(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	var datos struct {
		ID          int    `json:"id"`
		Nombre      string `json:"nombre"`
		Descripcion string `json:"descripcion"`
		CategoriaID int    `json:"categoria_id"`
	}

	err := json.NewDecoder(r.Body).Decode(&datos)
	if err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	_, err = models.DB.Exec(`UPDATE ubicaciones SET nombre = ?, descripcion = ?, categoria_id = ? WHERE id = ?`,
		datos.Nombre, datos.Descripcion, datos.CategoriaID, datos.ID)

	if err != nil {
		http.Error(w, "Error al actualizar ubicación", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
