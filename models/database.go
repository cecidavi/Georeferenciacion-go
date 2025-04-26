package models

import (
	"database/sql"
	"log"

	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB

func ConnectDB() {
	var err error
	dsn := "cecilio:ceci1282@tcp(127.0.0.1:3306)/geomap"
	DB, err = sql.Open("mysql", dsn)
	if err != nil {
		log.Fatal("Error de conexión:", err)
	}
	err = DB.Ping()
	if err != nil {
		log.Fatal("No se puede conectar a la base de datos:", err)
	}
	log.Println("✅ Conexión exitosa a la base de datos")
}

// 👇 FUNCION NUEVA
func GetDB() *sql.DB {
	return DB
}
