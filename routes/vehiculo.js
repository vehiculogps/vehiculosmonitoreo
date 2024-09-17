const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculoController');

// Crear un nuevo vehículo
router.post('/vehiculos', vehiculoController.crearVehiculo);

// Obtener todos los vehículos
router.get('/vehiculos', vehiculoController.obtenerVehiculos);

// Obtener un vehículo por ID
router.get('/vehiculos/:id', vehiculoController.obtenerVehiculoPorId);

module.exports = router;
