const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
require('dotenv').config();

// Registro de usuario
exports.registrarUsuario = async (req, res) => {
  const { nombre, email, contraseña } = req.body;

  try {
    // Verificar si el usuario ya existe
    let usuario = await Usuario.findOne({ email });
    if (usuario) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    usuario = new Usuario({ nombre, email, contraseña });

    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    usuario.contraseña = await bcrypt.hash(contraseña, salt);

    // Guardar el usuario en la base de datos
    await usuario.save();

    res.status(201).json({ msg: 'Usuario registrado correctamente' });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};


exports.loginUsuario = async (req, res) => {
  const { email, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({ message: "Email y contraseña no coinciden." });
    }

    const isPasswordValid = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email y contraseña no coinciden." });
    }

    // Generación del token JWT
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Configuración de la cookie
    res.cookie('token', token, {
      httpOnly: true, // Hace que no sea accesible desde JavaScript
      secure: true, // Establece 'true' en producción para usar https
      sameSite: 'None', // Permite que se use en sitios cruzados (si es necesario)
      maxAge: 3600000, // Duración de la cookie (1 hora en milisegundos)
    });

    // Responde con un mensaje de éxito
    res.status(200).json({
      message: "Inicio de sesión exitoso.",
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

exports.logoutUsuario = async (req, res) => {
  await res.clearCookie('token');
  res.redirect('/login');
};

