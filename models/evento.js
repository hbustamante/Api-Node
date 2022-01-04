const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    titulo: {
        type: String,
        required: [true, 'El título es obligatorio'],
        unique: true
    },
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    participante: {
        type: Schema.Types.ObjectId,
        ref: 'Participante',
        required: true
    }
});


EventoSchema.methods.toJSON = function() {
    const { __v, estado, ...data  } = this.toObject();
    return data;
}


module.exports = model( 'Evento', EventoSchema );
