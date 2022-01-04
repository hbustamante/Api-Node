const { response } = require('express');
const { Evento, Participante } = require('../models');

const obtenerEventos = async(req, res = response ) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, eventos ] = await Promise.all([
        Evento.countDocuments(query),
        Evento.find(query)
            .skip( Number( desde ) )
            .limit(Number( limite ))
    ]);

    res.json({
        total,
        eventos
    });
}

const obtenerEvento = async(req, res = response ) => {

    const { id } = req.params;
    const evento = await Evento.findById( id )
                            .populate('participante', 'nombre');

    res.json( evento );

}

const actualizarEvento = async( req, res = response ) => {
    const { id } = req.params;
    const { estado, participante, ...data } = req.body;
    const evento = await Evento.findByIdAndUpdate(id, data, { new: true });

    res.json( evento );

}

const borrarEvento = async(req, res =response ) => {

    const { id } = req.params;
    const eventoBorrado = await Evento.findByIdAndUpdate( id, { estado: false }, {new: true });

    res.json( eventoBorrado );
}

const obtenerEventoPorParticipante =  async(req, res = response ) => {
    const { id } = req.params;
    const eventos = await Evento.find({ participante: id })
                            .populate('participante', 'apodo');

    res.json( eventos );
}

const crearEvento = async(req, res = response ) => {
    const { estado, ...body } = req.body;
    const eventoDB = await Evento.findOne({ titulo: body.titulo });

    if ( eventoDB ) {
        return res.status(400).json({
            msg: `El evento ${ eventoDB.nombre }, ya existe`
        });
    }

    // Generar la data a guardar
    const data = {
        ...body
    }

    const evento = new Evento( data );
    await evento.save();
    res.status(201).json(evento);

}

module.exports = {
    obtenerEventos,
    crearEvento,
    obtenerEventoPorParticipante,
    obtenerEvento,
    actualizarEvento,
    borrarEvento
}