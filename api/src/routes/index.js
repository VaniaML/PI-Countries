const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countries = require('./countries.js'); // archivos requeridos con rutas
const activity = require('./activity.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countries); // se usan las rutas requeridas
router.use('/activity', activity);
// index requerido por app.js

module.exports = router;