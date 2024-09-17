const Vehiculo = require('../models/vehiculo'); 
// Crear un nuevo vehículo
exports.crearVehiculo = async (req, res) => {
  try {
    const vehiculo = new Vehiculo(req.body);
    await vehiculo.save();
    res.status(201).json(vehiculo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los vehículos
exports.obtenerVehiculos = async (req, res) => {
  try {
    const vehiculos = await Vehiculo.find();
    res.status(200).json(vehiculos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un vehículo por ID
exports.obtenerVehiculoPorId = async (req, res) => {
  try {
    const vehiculo = await Vehiculo.findById(req.params.id);
    if (!vehiculo) {
      return res.status(404).json({ error: 'Vehículo no encontrado' });
    }
    res.status(200).json(vehiculo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
