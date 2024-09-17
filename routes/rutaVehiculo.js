const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');

// Crear una nueva ruta
router.post('/rutas', rutaController.crearRuta);

// Obtener todas las rutas
router.get('/rutas', rutaController.obtenerRutas);

// Obtener rutas por ID de vehículo
router.get('/rutas/vehiculo/:vehiculoId', rutaController.obtenerRutasPorVehiculoId);

module.exports = router;
