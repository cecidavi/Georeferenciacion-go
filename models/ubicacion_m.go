package models

type Ubicacion struct {
	ID          int     `json:"id"`
	Nombre      string  `json:"nombre"`
	Descripcion string  `json:"descripcion"`
	Latitud     float64 `json:"latitud"`
	Longitud    float64 `json:"longitud"`
	Categoria   string  `json:"categoria"`
	CategoriaID int     `json:"categoria_id,omitempty"`
}
