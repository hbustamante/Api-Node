const { Router } = require("express");
const { check } = require("express-validator");
const {
  obtenerParticipantes,
  crearParticipante,
} = require("../controllers/participantes");
const { validarCampos } = require("../middlewares");
const router = Router();

router.get("/", obtenerParticipantes);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("apodo", "El apodo es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearParticipante
);

module.exports = router;
