const Ruta = require('../models/ruta');

// Obtener coordenadas de todas las rutas por ID de vehículo
exports.obtenerCoordenadasPorVehiculo = async (req, res) => {
  try {
    const { vehiculoId } = req.params;

    // Buscar todas las rutas que coincidan con el ID del vehículo
    const rutas = await Ruta.find({ vehicle_id: vehiculoId });

    // Verificar si se encontraron rutas
    if (!rutas || rutas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron rutas para este vehículo' });
    }

    // Extraer las coordenadas de cada feature en las rutas
    const coordenadas = rutas.flatMap(ruta => 
      ruta.features.map(feature => feature.geometry.coordinates)
    );

    // Enviar las coordenadas encontradas
    res.status(200).json(coordenadas);
  } catch (error) {
    // Manejar errores
    res.status(500).json({ error: error.message });
  }
};
