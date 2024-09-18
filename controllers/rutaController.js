const Ruta = require('../models/ruta');

// Obtener rutas por día y ID de vehículo
exports.obtenerRutasPorDiaYVehiculo = async (req, res) => {
  try {
    const { vehiculoId, dia } = req.params;
    const startDate = new Date(dia);
    const endDate = new Date(dia);
    endDate.setDate(endDate.getDate() + 1); // Obtener las rutas del día completo

    const rutas = await Ruta.find({
      vehicle_id: vehiculoId,
      day: { $gte: startDate, $lt: endDate }
    });

    if (!rutas || rutas.length === 0) {
      return res.status(404).json({ error: 'Rutas no encontradas para este vehículo en el día especificado' });
    }
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
