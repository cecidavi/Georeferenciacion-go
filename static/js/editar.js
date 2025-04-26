// static/js/editar.js

async function editarUbicacion(ubicacion) {
    const { value: formValues } = await Swal.fire({
        title: 'Editar Ubicación',
        html:
            `<input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${ubicacion.nombre}">` +
            `<input id="swal-descripcion" class="swal2-input" placeholder="Descripción" value="${ubicacion.descripcion}">` +
            `<input id="swal-latitud" class="swal2-input" placeholder="Latitud" value="${ubicacion.latitud}">` +
            `<input id="swal-longitud" class="swal2-input" placeholder="Longitud" value="${ubicacion.longitud}">`,
        focusConfirm: false,
        preConfirm: () => {
            return {
                nombre: document.getElementById('swal-nombre').value,
                descripcion: document.getElementById('swal-descripcion').value,
                latitud: parseFloat(document.getElementById('swal-latitud').value),
                longitud: parseFloat(document.getElementById('swal-longitud').value),
                id: ubicacion.id
            };
        },
        showCancelButton: true,
        confirmButtonText: 'Actualizar',
        cancelButtonText: 'Cancelar'
    });

    if (formValues) {
        const res = await fetch(`/api/editar?id=${formValues.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formValues)
        });

        if (res.status === 200) {
            Swal.fire('¡Actualizado!', 'La ubicación fue editada exitosamente.', 'success');
            cargarUbicaciones();
        } else {
            Swal.fire('Error', 'No se pudo actualizar.', 'error');
        }
    }
}
