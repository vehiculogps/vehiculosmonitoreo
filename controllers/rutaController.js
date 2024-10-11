const Ruta = require('../models/ruta');

// Obtener todas las rutas por ID de vehículo
exports.obtenerRutasPorVehiculo = async (req, res) => {
  try {
    const { vehiculoId } = req.params;
    console.log(vehiculoId)

    // Buscar todas las rutas que coincidan con el ID del vehículo
    const rutas = await Ruta.find({ vehicle_id: vehiculoId });

    // Verificar si se encontraron rutas
    if (!rutas || rutas.length === 0) {
      return res.status(404).json({ error: 'No se encontraron rutas para este vehículo' });
    }

    // Enviar las rutas encontradas
    res.status(200).json(rutas);
  } catch (error) {
    // Manejar errores
    res.status(500).json({ error: error.message });
  }
};
