// form.js
// Capturar formulario y validar

document.getElementById('addForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const nueva = {
        nombre: document.getElementById('nombre').value.trim(),
        descripcion: document.getElementById('descripcion').value.trim(),
        latitud: parseFloat(document.getElementById('latitud').value),
        longitud: parseFloat(document.getElementById('longitud').value),
        categoria: document.getElementById('categoria').value.trim()
    };

    // Validar datos básicos
    if (!nueva.nombre || !nueva.descripcion || isNaN(nueva.latitud) || isNaN(nueva.longitud) || !nueva.categoria) {
        alert("Por favor llena todos los campos correctamente.");
        return;
    }

    const resultado = await agregarUbicacion(nueva);

    if (resultado) {
        alert("✅ ¡Ubicación agregada!");
        location.reload();
    } else {
        alert("❌ Error al agregar ubicación");
    }
});
