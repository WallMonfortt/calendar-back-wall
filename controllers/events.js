const {response} = require('express')
const Event = require('../models/Events')


const getEvents = async (req, res = response) => {

  const events = await Event.find().populate('user', 'name')

  res.json({
    ok: true,
    events: events
  })
}

const registerEvent = async (req, res = response) => {

  const event = new Event(req.body)

  try {
    event.user = req.uid
    await event.save()

    res.json({
      ok: true,
      event 
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'error desconocido al crear evento',
    })
  }
}

const updateEvent = async (req, res = response) => {

  const eventId = req.params.id
  const uid = req.uid

  try {
    
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe'
      })
    }

    if( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tienes permisos para actualizar este evento'
      })
    }

    //desestructurar el objeto event y actualizarlo con los datos que llegan por el body
    const newEvent = { 
      ...req.body,
      user: uid
    }

    const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, {new: true});

    res.json({
      ok: true,
      event: updateEvent
    });


  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'error desconocido al actualizar evento',
    })
  }
}

const deleteEvent = async (req, res = response) => {

  const eventId = req.params.id
  const uid = req.uid

  try {
    
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        ok: false,
        msg: 'El evento no existe'
      })
    }

    if( event.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: 'No tienes permisos para eliminar este evento'
      })
    }

    await Event.findByIdAndDelete(eventId)

    res.json({
      ok: true,
      msg: 'Evento eliminado'
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'error desconocido al borrar evento',
    })
  }
}


module.exports = {
  getEvents,
  registerEvent,
  updateEvent,
  deleteEvent
}