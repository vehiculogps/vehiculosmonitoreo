const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
  // Obtener el token de la cookie
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, msg: 'Acceso denegado, se requiere un token' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded; // Adjuntar datos decodificados al objeto de la solicitud
    next(); // Continuar con la siguiente función de middleware o controlador
  } catch (err) {
    res.status(401).json({ success: false, msg: 'Token inválido o expirado' });
  }
};

module.exports = verificarToken;
