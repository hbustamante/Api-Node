const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerEventos,
  crearEvento,
  obtenerEventoPorParticipante,
  obtenerEvento,
  actualizarEvento,
  borrarEvento
} = require("../controllers/eventos");
const { validarJWT, validarCampos, esAdminRole } = require("../middlewares");
const { esParticipanteValido, existeEventoPorId } = require('../helpers/db-validators');
const router = Router();

router.get("/", obtenerEventos);

router.get('/participante/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( esParticipanteValido ),
    validarCampos,
], obtenerEventoPorParticipante );

router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEventoPorId ),
    validarCampos,
], obtenerEvento );

router.put('/:id',[
    validarJWT,
    check('id').custom( existeEventoPorId ),
    validarCampos
], actualizarEvento );

router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existeEventoPorId ),
    validarCampos,
], borrarEvento);

router.post(
  "/",
  [
    check("titulo", "El nombre es obligatorio").not().isEmpty(),
    check('participante').custom( esParticipanteValido ), 
    validarCampos,
  ],
  crearEvento
);

module.exports = router;
