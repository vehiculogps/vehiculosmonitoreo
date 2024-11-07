const RoutePlan = require('../models/ruta'); // Importar el modelo de rutas definidas

// Controlador para obtener una ruta definida en formato GeoJSON por vehicle_id y día
exports.obtenerRutaDefinidaPorDiaYPlaca = async (req, res) => {
  const { vehicleId, dia } = req.params; // Obtener vehicle_id y día de la solicitud

  console.log(vehicleId, dia)

  if (!vehicleId || !dia) {
    return res.status(400).json({ error: 'Faltan parámetros vehicleId o dia en la solicitud' });
  }

  try {
    // Buscar la ruta definida por vehicle_id y día
    const rutaDefinida = await RoutePlan.findOne({
      vehicle_id: vehicleId,
      day: dia.toLowerCase() // Normalizamos el día a minúsculas para evitar inconsistencias
    });

    // Si no se encuentra la ruta, devolver un error
    if (!rutaDefinida) {
      return res.status(404).json({ error: 'Ruta definida no encontrada para este vehículo y día especificado' });
    }

    // Devolver la ruta en formato GeoJSON
    return res.status(200).json(rutaDefinida);

  } catch (error) {
    console.error('Error al obtener la ruta definida:', error); // Log para depuración
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
