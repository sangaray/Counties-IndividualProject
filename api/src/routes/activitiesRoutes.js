const { Router } = require("express");
const {
  newActivity,
  getAllActivities,
} = require("../Controllers/activitiesControllers");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.post("/", newActivity);
router.get("/", getAllActivities);

module.exports = router;
