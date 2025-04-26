// static/js/mapa.js

const map = L.map('map').setView([25.4381, -100.9737], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

let markersLayer = L.layerGroup().addTo(map);

async function cargarUbicaciones() {
    markersLayer.clearLayers();

    const res = await fetch('/api/ubicaciones');
    const data = await res.json();

    const categoriaSeleccionada = document.getElementById('categoriaFiltro').value;

    data.forEach(u => {
        if (!categoriaSeleccionada || categoriaSeleccionada == u.categoria_id) {
            const marker = L.marker([u.latitud, u.longitud])
                .addTo(markersLayer);

            // Crear el contenido dinámico del popup
            const popupContent = document.createElement('div');
            popupContent.innerHTML = `
                <b>${u.nombre}</b><br>${u.descripcion}<br><i>${u.categoria}</i><br>
            `;

            // Botón Editar
            const btnEditar = document.createElement('button');
            btnEditar.className = 'btn btn-primary btn-sm mt-2 me-2';  // btn-sm = pequeño, me-2 = margin-end
            btnEditar.textContent = 'Editar';
            btnEditar.addEventListener('click', () => {
                editarUbicacion(u);
            });

            // Botón Eliminar
            const btnEliminar = document.createElement('button');
            btnEliminar.className = 'btn btn-danger btn-sm mt-2';
            btnEliminar.textContent = 'Eliminar';
            btnEliminar.addEventListener('click', () => {
                eliminarUbicacion(u.id);
            });

            // Agregamos los botones al popup
            popupContent.appendChild(btnEditar);
            popupContent.appendChild(btnEliminar);

            marker.bindPopup(popupContent);
        }
    });
}

// Cargar categorías en select
async function cargarCategorias() {
    const res = await fetch('/api/categorias');
    const categorias = await res.json();

    const filtro = document.getElementById('categoriaFiltro');
    const selector = document.getElementById('categoria');

    filtro.innerHTML = `<option value="">Todas las Categorías</option>`;
    selector.innerHTML = `<option value="">Selecciona Categoría</option>`;

    categorias.forEach(cat => {
        const optionFiltro = document.createElement('option');
        optionFiltro.value = cat.id;
        optionFiltro.textContent = cat.nombre;
        filtro.appendChild(optionFiltro);

        const optionForm = document.createElement('option');
        optionForm.value = cat.id;
        optionForm.textContent = cat.nombre;
        selector.appendChild(optionForm);
    });
}

// Evento cambio de filtro
document.getElementById('categoriaFiltro').addEventListener('change', cargarUbicaciones);

// Capturar clic en el mapa para poner latitud/longitud
map.on('click', function(e) {
    document.getElementById('latitud').value = e.latlng.lat.toFixed(6);
    document.getElementById('longitud').value = e.latlng.lng.toFixed(6);
    document.getElementById('buscarLatitud').value = e.latlng.lat.toFixed(6);
    document.getElementById('buscarLongitud').value = e.latlng.lng.toFixed(6);
});

// Evento submit para agregar nueva ubicación
document.getElementById('addForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const data = {
        nombre: document.getElementById('nombre').value,
        descripcion: document.getElementById('descripcion').value,
        latitud: parseFloat(document.getElementById('latitud').value),
        longitud: parseFloat(document.getElementById('longitud').value),
        categoria_id: parseInt(document.getElementById('categoria').value)
    };

    const res = await fetch('/api/agregar', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    });

    if (res.status === 201) {
        Swal.fire('¡Agregado!', 'La ubicación fue agregada correctamente.', 'success');
        cargarUbicaciones();
        document.getElementById('addForm').reset();
    } else {
        Swal.fire('Error', 'No se pudo agregar la ubicación.', 'error');
    }
});




// Inicialización
cargarCategorias().then(cargarUbicaciones);
