const Ruta = require('../models/ruta'); // Importar el modelo Ruta

// Controlador para obtener las rutas y las coordenadas por vehicle_id y fecha
exports.obtenerCoordenadasPorVehiculoYFecha = async (req, res) => {
  const { vehiculoId, dia } = req.params;

  try {
    // Convertir la fecha recibida en un rango de inicio y fin para el día
    const startDate = new Date(dia);
    const endDate = new Date(dia);
    endDate.setDate(endDate.getDate() + 1); // Aumentar un día para obtener todas las rutas del día

    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ error: 'Fecha no válida' });
    }

    // Buscar las rutas por vehicle_id y el rango de fecha
    const rutas = await Ruta.find({
      vehicle_id: vehiculoId,
      day: { $gte: startDate, $lt: endDate }
    });

    // Si no se encuentran rutas, devolver un error
    if (rutas.length === 0) {
      return res.status(404).json({ error: 'Rutas no encontradas para este vehículo en el día especificado' });
    }
    
    // Extraer las coordenadas de las features de cada ruta
    const coordenadas = rutas.map(ruta => {
      return ruta.features.map(feature => ({
        coordenadas: feature.geometry.coordinates
      }));
    });

    // Devolver las coordenadas
    return res.status(200).json({ vehicle_id: vehiculoId, dia, rutas: coordenadas });

  } catch (error) {
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
