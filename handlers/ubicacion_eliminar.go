package handlers

import (
	"encoding/json"
	"geomap/models"
	"net/http"
)

type DeleteRequest struct {
	ID int `json:"id"`
}

func EliminarUbicacion(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost { // << CAMBIA DELETE a POST
		http.Error(w, "Método no permitido", http.StatusMethodNotAllowed)
		return
	}

	var req DeleteRequest
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		http.Error(w, "Datos inválidos", http.StatusBadRequest)
		return
	}

	_, err = models.DB.Exec("DELETE FROM ubicaciones WHERE id = ?", req.ID)
	if err != nil {
		http.Error(w, "Error al eliminar ubicación", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
