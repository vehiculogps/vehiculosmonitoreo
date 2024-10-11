const express = require('express');
const router = express.Router();
const rutaController = require('../controllers/rutaController');

// Ruta para obtener las rutas en formato GeoJSON
router.get('/vehiculo/:vehiculoId/dia/:dia', rutaController.obtenerRutaGeoJSON);

module.exports = router;
