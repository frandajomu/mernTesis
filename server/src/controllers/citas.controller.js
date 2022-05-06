const citasCtrl = {};
const CitasModel = require('./../models/Cita');

//Petición para ver lista de citas
citasCtrl.getCita = async (req, res) => {
    const citas = await CitasModel.find();
    return res.json(citas);
}

citasCtrl.getOneCita = async (req, res) => {
    try {
        const cita = await CitasModel.findOne({ idUser: req.params.id }).clone();
        return res.json(cita);
    } catch (e) {
        return res.json({ error: '¡Ocurrio un error al buscar la cita!' });
    }
}

//Petición que devulve el turno actual de la fecha
citasCtrl.getTurno = async (req, res) => {
    const { citadate } = req.body;
    try {
        const turnos = await CitasModel.find({ citadate: citadate }).clone();
        return res.json(turnos);
    } catch (e) {
        return res.json({ error: '¡Ocurrio un error al buscar el turno del dia!' });
    }
}

//Petición que devulve lista para desabilitar dias de Calendario
citasCtrl.desableDate = async (req, res) => {
    const today = new Date();
    try {
        const turnos = await CitasModel.find({
            citadate: { $gte: today.setDate(today.getDate()-0.5), $lt: today.setDate(today.getDate() + 19) },
            turno: "3"
        }).clone();
        return res.json(turnos);
    } catch (e) {
        return res.json({ error: '¡Ocurrio un error al buscar las fechas desabilitadas!' });
    }
}

//Petición de una cita nueva
citasCtrl.createCita = async (req, res) => {
    const { citadate, turno, idUser } = req.body;
    try {
        const newCita = new CitasModel({ citadate, turno, idUser })
        await newCita.save();
        return res.json({ message: '¡Cita agendada exitosamente!' });
    } catch (e) {
        return res.json({ error: 'Hubo un error, cita no agendada' });
    }
}

//Petición borrar usuario
citasCtrl.deleteCita = async (req, res) => {
    try {
        await CitasModel.findOneAndDelete({ idUser: req.params.id })
        return res.json({ message: 'Cita eliminada' });
    } catch (e) {
        return res.json({ error: 'Hubo un error, cita no eliminada' });
    }
}


module.exports = citasCtrl;