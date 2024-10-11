const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');

// Obtener todas las rutas por ID de vehículo
router.get('/vehiculo/:vehiculoId', rutaController.obtenerRutasPorVehiculo);

module.exports = router;
