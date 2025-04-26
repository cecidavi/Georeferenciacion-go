async function eliminarUbicacion(id) {
    const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
        const res = await fetch('/api/eliminar', {
            method: "POST",  // 👈 CAMBIAR a POST
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })  // 👈 Manda el id como JSON
        });

        if (res.status === 200) {
            await Swal.fire('¡Eliminado!', 'La ubicación ha sido eliminada.', 'success');
            cargarUbicaciones();
        } else {
            Swal.fire('Error', 'No se pudo eliminar la ubicación.', 'error');
        }
    }
}
