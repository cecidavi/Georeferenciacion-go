async function buscarCercanos() {
    const latitud = parseFloat(document.getElementById('buscarLatitud').value);
    const longitud = parseFloat(document.getElementById('buscarLongitud').value);
    const radio = parseFloat(document.getElementById('buscarRadio').value);

    if (isNaN(latitud) || isNaN(longitud) || isNaN(radio)) {
        alert("❌ Datos inválidos para búsqueda");
        return;
    }

    const res = await fetch(`/api/buscar-cercanos?latitud=${latitud}&longitud=${longitud}&radio=${radio}`);
    const resultados = await res.json();

    markersLayer.clearLayers(); // Limpiar el mapa

    resultados.forEach(u => {
        L.marker([u.latitud, u.longitud])
            .addTo(markersLayer)
            .bindPopup(`<b>${u.nombre}</b><br>${u.descripcion}<br><i>${u.categoria}</i><br>Distancia: ${u.distancia.toFixed(2)} km`);
    });

    alert(`✅ Se encontraron ${resultados.length} ubicaciones cerca`);
}
