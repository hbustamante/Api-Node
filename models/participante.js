const { Schema, model } = require('mongoose');

const ParticipanteSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    apodo: {
        type: String,
        required: [true, 'El apodo es obligatorio']
    },
    altura: {
        type: String
    },
    peso: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    }
});


ParticipanteSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Participante', ParticipanteSchema );