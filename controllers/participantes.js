const { response } = require('express');
const { Participante } = require('../models');

const obtenerParticipantes = async(req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, participantes ] = await Promise.all([
        Participante.countDocuments(query),
        Participante.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        participantes
    });
}

const crearParticipante = async(req, res = response ) => {
    const { estado, ...body } = req.body;
    const participanteDB = await Participante.findOne({ nombre: body.nombre.toUpperCase(), apellido: body.apellido });

    if ( participanteDB ) {
        return res.status(400).json({
            msg: `El participante ${ participanteDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase()
    }

    const participante = new Participante( data );
    await participante.save();
    res.status(201).json(participante);

}

module.exports = {
    obtenerParticipantes,
    crearParticipante
}