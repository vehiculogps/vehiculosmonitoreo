const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');

// Obtener rutas por ID de vehículo y por día
router.get('/vehiculo/:vehiculoId/dia/:dia', rutaController.obtenerRutasPorDiaYVehiculo);

module.exports = router;
