const { Router } = require('express');
const { obtenerCategorias } = require('../controllers/categorias');
const router = Router();

router.get('/', obtenerCategorias );

module.exports = router;