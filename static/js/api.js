// api.js
async function obtenerUbicaciones() {
    const res = await fetch('/api/ubicaciones');
    return await res.json();
}

async function obtenerCategorias() {
    const res = await fetch('/api/categorias');
    return await res.json();
}

async function agregarUbicacion(data) {
    const res = await fetch('/api/agregar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    return res.status === 201;
}
