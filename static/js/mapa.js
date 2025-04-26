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
                .addTo(markersLayer)
                .bindPopup(`
                    <b>${u.nombre}</b><br>${u.descripcion}<br><i>${u.categoria}</i><br>
                    <button onclick="editarUbicacion(${u.id}, '${u.nombre}', '${u.descripcion}', ${u.categoria_id})" class="btn btn-primary btn-sm mt-2">Editar</button>
                    <button onclick="eliminarUbicacion(${u.id})" class="btn btn-danger btn-sm mt-2">Eliminar</button>
                `);
        }
    });
}

// Cargar categorías en select
async function cargarCategorias() {
    const res = await fetch('/api/categorias');
    const categorias = await res.json();

    const filtro = document.getElementById('categoriaFiltro');
    const selector = document.getElementById('categoria');

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
    const lat = e.latlng.lat.toFixed(6);
    const lng = e.latlng.lng.toFixed(6);

    // Para agregar nueva ubicación
    document.getElementById('latitud').value = lat;
    document.getElementById('longitud').value = lng;

    // Para búsqueda de lugares cercanos
    const buscarLat = document.getElementById('buscarLatitud');
    const buscarLng = document.getElementById('buscarLongitud');
    if (buscarLat && buscarLng) {
        buscarLat.value = lat;
        buscarLng.value = lng;
    }
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
        alert("✅ ¡Ubicación agregada!");
        cargarUbicaciones();
        document.getElementById('addForm').reset();
    } else {
        alert("❌ Error al agregar ubicación");
    }
});

// Inicialización
cargarCategorias().then(cargarUbicaciones);
