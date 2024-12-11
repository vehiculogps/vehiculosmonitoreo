document.addEventListener('DOMContentLoaded', (event) => {

    var map = L.map('map').setView([7.3782, -72.6480], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    let currentRouteLayer = null;

    let routePoints = []; // Array para acumular los puntos de la ruta
    let polyline = L.polyline([], { color: 'blue', weight: 5 }).addTo(map);

    const socket = new WebSocket('ws://localhost:8000');

    socket.onopen = () => {
        console.log('Conexión al WebSocket establecida');
        socket.send(JSON.stringify({ source: 'web', message: 'Cliente conectado' }));
    };

    socket.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            console.log('Punto recibido:', data);

            // Verificar si el mensaje tiene datos válidos
            if (data.latitude && data.longitude) {
                // Convertir a formato compatible con Leaflet
                const newPoint = [data.latitude, data.longitude];
                routePoints.push(newPoint);

                // Actualizar la línea en el mapa
                polyline.setLatLngs(routePoints);

                // Ajustar el mapa para mostrar todos los puntos
                // map.fitBounds(polyline.getBounds());
            } else {
                console.warn('Datos inválidos recibidos:', data);
            }
        } catch (error) {
            console.error('Error al procesar el mensaje:', error);
        }
    };

    socket.onclose = () => {
        console.log('Conexión al WebSocket cerrada');
    };

    socket.onerror = (error) => {
        console.error('Error en el WebSocket:', error);
    };

    document.getElementById('carSelector').addEventListener('change', function () {
        var vehicleId = this.value;
        var fecha = new Date();

        // Array con los nombres de los días en español
        var diasSemana = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];

        // Obtener el nombre del día actual
        var nombreDia = "viernes"; // Puedes utilizar diasSemana[fecha.getDay()]; si quieres que sea dinámico

        if (!vehicleId) {
            alert("Por favor, seleccione un vehículo.");
            return;
        }

        fetch(`http://localhost:10000/rutas/vehiculo/${vehicleId}/dia/${nombreDia}/coordenadas`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de la ruta');
                }
                return response.json();
            })
            .then(data => {
                // Verificar si existen rutas y si la capa está definida
                if (currentRouteLayer) {
                    map.removeLayer(currentRouteLayer); // Eliminar la capa anterior
                }
                console.log(data)
                // Limpiar coordenadas vacías o inválidas
                data.features = data.features.filter(feature => {
                    if (feature.geometry.type === "LineString") {
                        // Filtrar las coordenadas vacías o inválidas
                        feature.geometry.coordinates = feature.geometry.coordinates.filter(coord => coord.length === 2 && coord[0] && coord[1]);
                    }
                    return feature;
                });

                // Verificar si hay datos válidos
                if (data.features.length === 0) {
                    alert("No se encontraron rutas para este vehículo.");
                    return;
                }

                // Añadir la ruta GeoJSON al mapa
                currentRouteLayer = L.geoJSON(data, {
                    style: function (feature) {
                        return {
                            color: feature.properties.stroke || 'blue',
                            weight: feature.properties['stroke-width'] || 5,
                            opacity: feature.properties['stroke-opacity'] || 0.7
                        };
                    }
                }).addTo(map);

                // Dibujar los puntos de inicio y fin
                data.features.forEach(feature => {
                    if (feature.geometry.type === 'Point') {
                        const coords = [feature.geometry.coordinates[1], feature.geometry.coordinates[0]]; // Convertir a [lat, lon]
                        const title = feature.properties.name || 'Sin título';
                        const iconUrl = feature.properties.icon || ''; // Usar íconos si están disponibles
                        L.marker(coords, { title: title })
                            .bindPopup(title)
                            .setIcon(L.icon({ iconUrl: iconUrl, iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -20] }))
                            .addTo(map);
                    }
                });

                // Ajustar el mapa a los límites de la ruta
                map.fitBounds(currentRouteLayer.getBounds());
            })
            .catch(error => {
                console.error('Error al cargar la ruta:', error);
            });
    });
});



function openModal() {
    document.getElementById("newRouteModal").style.display = "block"; // Muestra el modal
}

function closeModal() {
    document.getElementById("newRouteModal").style.display = "none"; // Oculta el modal
}

// Manejar el envío del formulario
function submitForm() {
    const form = document.getElementById('newRouteForm');
    const formData = new FormData(form);
    
    // Aquí puedes hacer algo con el formData
    console.log('Día:', formData.get('routeDay'));
    console.log('Archivo:', formData.get('geoJsonFile'));

    // Enviar el formulario o procesar los datos según sea necesario
    closeModal(); // Cerrar el modal después de procesar
}

// Cerrar el modal cuando se hace clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById("newRouteModal");
    if (event.target === modal) {
        closeModal();
    }
}

function logout() {
    // Make a request to the backend to clear the session or token
    fetch('/usuarios/logout', {
        method: 'POST',
        credentials: 'include' // Ensure cookies are sent with the request
    })
    .then(response => {
        if (response.ok) {
            // Redirect the user to the login page
            window.location.href = '/login';
        } else {
            console.log('Error during logout');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
