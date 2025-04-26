// static/js/categoria.js

document.getElementById('addCategoriaForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const nombre = document.getElementById('nuevaCategoria').value.trim();
    if (!nombre) {
        Swal.fire('Error', 'El nombre de la categoría no puede estar vacío.', 'error');
        return;
    }

    const ok = await agregarCategoria(nombre);
    if (ok) {
        Swal.fire('¡Éxito!', 'Categoría agregada correctamente.', 'success');
        document.getElementById('nuevaCategoria').value = '';
        document.getElementById('categoriaFiltro').innerHTML = '<option value="">Todas las Categorías</option>';
        document.getElementById('categoria').innerHTML = '<option value="">Selecciona Categoría</option>';
        cargarCategorias(); // 🔥 Volvemos a cargar categorías
    } else {
        Swal.fire('Error', 'No se pudo agregar la categoría.', 'error');
    }
});
