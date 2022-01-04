const Role = require("../models/role");
const { Usuario, Categoria, Participante, Evento } = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la BD`);
  }
};

const esParticipanteValido = async (participante = "") => {
  const existeParticipante = await Participante.findById(participante);
  if (!existeParticipante) {
    throw new Error(
      `El participante ${participante} no está registrado en la BD`
    );
  }
};

const emailExiste = async (correo = "") => {
  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo: ${correo}, ya está registrado`);
  }
};

const existeUsuarioPorId = async (id) => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

const existeCategoriaPorId = async (id) => {
  const existeCategoria = await Categoria.findById(id);
  if (!existeCategoria) {
    throw new Error(`El id no existe ${id}`);
  }
};

const existeEventoPorId = async (id) => {
  const existeEvento = await Evento.findById(id);
  if (!existeEvento) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
  existeCategoriaPorId,
  esParticipanteValido,
  existeEventoPorId,
};
