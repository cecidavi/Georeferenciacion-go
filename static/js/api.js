// static/js/api.js

async function obtenerUbicaciones() {
    const res = await fetch('/api/ubicaciones');
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

// 🚀 NUEVO: agregar categoría
async function agregarCategoria(nombre) {
    const res = await fetch('/api/categorias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: nombre })
    });
    return res.status === 201;
}
