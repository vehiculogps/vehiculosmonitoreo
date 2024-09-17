const Ruta = require('../models/ruta'); 

// Crear una nueva ruta
exports.crearRuta = async (req, res) => {
  try {
    const ruta = new Ruta(req.body);
    await ruta.save();
    res.status(201).json(ruta);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todas las rutas
exports.obtenerRutas = async (req, res) => {
  try {
    const rutas = await Ruta.find().populate('vehiculoId');
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener rutas por ID de vehículo
exports.obtenerRutasPorVehiculoId = async (req, res) => {
  try {
    const rutas = await Ruta.find({ vehiculoId: req.params.vehiculoId }).populate('vehiculoId');
    if (!rutas || rutas.length === 0) {
      return res.status(404).json({ error: 'Rutas no encontradas para este vehículo' });
    }
    res.status(200).json(rutas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
