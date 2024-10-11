const Ruta = require('../models/ruta');

// Obtener las rutas en formato GeoJSON
exports.obtenerRutaGeoJSON = async (req, res) => {
  const { vehiculoId, dia } = req.params;

  try {
    const startDate = new Date(dia);
    const endDate = new Date(dia);
    endDate.setDate(endDate.getDate() + 1);

    if (isNaN(startDate.getTime())) {
      return res.status(400).json({ error: 'Fecha no válida' });
    }

    const rutas = await Ruta.find({
      vehicle_id: vehiculoId,
      day: { $gte: startDate, $lt: endDate }
    });

    if (!rutas || rutas.length === 0) {
      return res.status(404).json({ error: 'Rutas no encontradas para este vehículo en el día especificado' });
    }

    // Combinar todas las features en una sola FeatureCollection
    const geoJsonResponse = {
      type: 'FeatureCollection',
      features: []
    };

    rutas.forEach(ruta => {
      geoJsonResponse.features = geoJsonResponse.features.concat(ruta.features);
    });

    res.status(200).json(geoJsonResponse);
  } catch (error) {
    console.error('Error al obtener las rutas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
