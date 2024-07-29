const { Router } = require("express");
const { getCountries } = require("../Controllers/countriesControllers");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/", getCountries);
router.get("/:id", getCountries);

module.exports = router;
