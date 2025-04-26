// static/js/editar.js

async function editarUbicacion(id, nombreActual, descripcionActual, categoriaActual) {
    const nuevoNombre = prompt("Nuevo nombre:", nombreActual);
    if (nuevoNombre === null) return;

    const nuevaDescripcion = prompt("Nueva descripción:", descripcionActual);
    if (nuevaDescripcion === null) return;

    const nuevaCategoria = prompt("Nuevo ID de categoría:", categoriaActual);
    if (nuevaCategoria === null) return;

    const res = await fetch(`/api/editar`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            nombre: nuevoNombre,
            descripcion: nuevaDescripcion,
            categoria_id: parseInt(nuevaCategoria)
        })
    });

    if (res.status === 200) {
        alert("✅ ¡Ubicación actualizada!");
        location.reload();
    } else {
        alert("❌ Error al actualizar ubicación");
    }
}
