async function eliminarUbicacion(id) {
    const confirmar = confirm("¿Seguro que quieres eliminar esta ubicación?");
    if (!confirmar) return;

    const res = await fetch(`/api/eliminar`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id })  // Enviamos el id como JSON
    });

    if (res.status === 200) {
        alert("✅ Ubicación eliminada exitosamente");
        cargarUbicaciones();
    } else {
        alert("❌ Error al eliminar ubicación");
    }
}
