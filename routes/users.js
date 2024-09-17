const router = require("express").Router();
const controladorUsuario = require("../controllers/user");



router.post("/login",controladorUsuario.loginUsuario);
router.post("/register", controladorUsuario.registrarUsuario);
// router.get("/logout");


module.exports = router;
