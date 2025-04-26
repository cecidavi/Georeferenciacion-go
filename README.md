🌎 GeoMap - Sistema de Mapa Georreferenciado

GeoMap es una aplicación web desarrollada en Golang + MariaDB + Leaflet que permite administrar ubicaciones georreferenciadas en un mapa.
Cuenta con funciones CRUD para ubicaciones y categorías, búsqueda de lugares cercanos, íconos personalizados y alertas modernas usando SweetAlert2.
🛠️ Tecnologías utilizadas

    Golang (backend net/http)

    MariaDB (base de datos)

    Leaflet.js (mapas interactivos)

    Bootstrap 5 (diseño responsivo)

    SweetAlert2 (alertas modernas)

    HTML5, CSS3 y JavaScript modularizado

🚀 Cómo ejecutar el proyecto

    Clona el repositorio:

git clone https://github.com/tu-usuario/geomap.git
cd geomap

    Configura la base de datos:

    Crea una base de datos llamada geomap en MariaDB.

    Importa el script geomap.sql proporcionado (que crea las tablas y algunos datos de prueba).

mysql -u usuario -p geomap < geomap.sql

    Nota: Cambia usuario por tu nombre de usuario de MySQL/MariaDB.

    Configura la conexión en models/database.go:

dsn := "usuario:contraseña@tcp(127.0.0.1:3306)/geomap"

    Instala las dependencias necesarias:

go mod tidy

    Levanta el servidor:

go run *.go

El servidor estará corriendo en:

http://localhost:8080

📂 Estructura de carpetas

geomap/
│
├── handlers/        # Manejadores de rutas API (ubicaciones, categorías, etc.)
├── models/          # Conexión a la base de datos y modelos
├── static/          # Archivos estáticos (CSS, JS, imágenes)
│   ├── css/
│   ├── js/
├── templates/       # Plantillas HTML
│   └── index.html
├── go.mod
├── go.sum
└── main.go          # Inicio del servidor

🎯 Funcionalidades

    Agregar nueva ubicación con nombre, descripción, latitud, longitud y categoría.

    Editar ubicaciones existentes de forma visual y rápida.

    Eliminar ubicaciones con confirmación SweetAlert2.

    Categorías dinámicas (agregar nuevas sin recargar el mapa).

    Filtrado de ubicaciones por categoría.

    Buscar lugares cercanos basado en distancia (fórmula de Haversine).

    Íconos personalizados dependiendo de la categoría.

    Mapa interactivo para seleccionar latitud y longitud fácilmente.

    👨‍💻 Autor

    Nombre: Cecilio

    GitHub: github.com/tu-usuario

    Proyecto creado como práctica para aprender y dominar el desarrollo web en Go.