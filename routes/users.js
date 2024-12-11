const router = require("express").Router();
const controladorUsuario = require("../controllers/user");
const verificarToken = require('../middlewares/auht');


router.post("/login",controladorUsuario.loginUsuario);
router.post("/register", controladorUsuario.registrarUsuario);
router.get("/logout", controladorUsuario.logoutUsuario);
// router.get("/logout");


module.exports = router;
