const express = require('express');
const router = express.Router();
const rutasController = require('../controllers/rutaController');

// Definir la ruta para obtener las coordenadas por vehicle_id y fecha
router.get('/vehiculo/:vehiculoId/dia/:dia/coordenadas', rutasController.obtenerCoordenadasPorVehiculoYFecha);

module.exports = router;
