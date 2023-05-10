const citasCtrl = {};
const CitasModel = require('./../models/Cita');
const ParamsModel = require('./../models/GlobalParams');
const ResultadosModel = require('./../models/Resultado');
const passport = require('passport');

//Passport JWT atenticación para comprobar usuario
citasCtrl.JWTpassportAuth = passport.authenticate('jwt', { session: false });

//Petición para ver lista de citas
citasCtrl.getCita = async (req, res) => {
    const citas = await CitasModel.find();
    return res.json(citas);
}

//Petición para ver cita de un solo usuario
citasCtrl.getOneCita = async (req, res) => {
    try {
        const cita = await CitasModel.findById(req.params.id).populate('idUser');
        return res.json(cita);
    } catch (e) {
        return res.json({ error: '¡Ocurrio un error al buscar la cita!' });
    }
}

//Petición que devulve el turno actual de la fecha
citasCtrl.getTurno = async (req, res) => {
    const { citadate } = req.body;
    try {
        const turnos = await CitasModel.find({ citadate: citadate }).clone().sort({ turno: -1 }).limit(1);
        return res.json(turnos);
    } catch (e) {
        return res.json({ error: '¡Ocurrio un error al buscar el turno del dia!' });
    }
}

//Petición que devulve lista para desabilitar dias de Calendario
citasCtrl.desableDate = async (req, res) => {
    const parametros = await ParamsModel.find();
    if (parametros.length !== 0) {
        var fechaMaxima = parametros[0].dateMax;
        var turnoMaximo = parametros[0].maxTurno;
    } else {
        var fechaMaxima = 30;
        var turnoMaximo = 10;
    }
    const today = new Date();
    try {
        const turnos = await CitasModel.find({
            citadate: { $gte: today.setDate(today.getDate() - 0.5), $lt: today.setDate(today.getDate() + fechaMaxima) },
            turno: turnoMaximo
        }).clone();
        return res.json(turnos);
    } catch (e) {
        return res.json({ error: '¡Ocurrio un error al buscar las fechas desabilitadas!' });
    }
}

//Petición de una cita nueva
citasCtrl.createCita = async (req, res) => {
    const parametros = await ParamsModel.find();
    if (parametros.length !== 0) {
        var turnoMaximo = parametros[0].maxTurno;
    } else {
        var turnoMaximo = 10;
    }
    const { citadate, turno, idUser, OrdenadoPor } = req.body;
    try {
        const turnoHabil = await CitasModel.findOne({ citadate: citadate, turno: turnoMaximo }).clone();
        if (turnoHabil) {
            return res.json({ error: 'El dia fijado para la cita no tiene turnos disponibles, seleccione otro dia' });
        } else {
            const newCita = new CitasModel({ citadate, turno, idUser, OrdenadoPor })
            await newCita.save();
            return res.json({ message: '¡Cita agendada exitosamente!' });
        }
    } catch (e) {
        return res.json({ error: 'Hubo un error, cita no agendada' });
    }
}

//Petición editar - crear cita
citasCtrl.updateCita = async (req, res) => {
    const parametros = await ParamsModel.find();
    if (parametros.length !== 0) {
        var turnoMaximo = parametros[0].maxTurno;
    } else {
        var turnoMaximo = 10;
    }
    const { citadate, turno, estado } = req.body;
    try {
        const turnoHabil = await CitasModel.findOne({ citadate: citadate, turno: turnoMaximo }).clone();
        if (turnoHabil) {
            return res.json({ error: 'El dia fijado para la cita no tiene turnos disponibles, seleccione otro dia' });
        } else {
            await CitasModel.findOneAndUpdate({ _id: req.params.id }, { citadate: citadate, turno, estado: estado});
            return res.json({ message: '¡Cita agendada exitosamente!' });
        }
    } catch (e) {
        return res.json({ error: 'Hubo un error, cita no agendada' });
    }
}

//Petición borrar usuario
citasCtrl.deleteCita = async (req, res) => {
    try {
        await CitasModel.findOneAndDelete({ _id: req.params.id })
        await ResultadosModel.findOneAndDelete({ idCita: req.params.id })
        return res.json({ message: 'Registro eliminado' });
    } catch (e) {
        return res.json({ error: 'Hubo un error, registro no eliminada' });
    }
}

//Update estado de cita en cancelado
citasCtrl.updateEstado = async (req, res) => {
    const { id, estado } = req.body
    try {
        await CitasModel.findOneAndUpdate({ _id: id }, { estado: estado });
        return res.json({ message: 'Estado actualizado' });
    } catch (e) {
        return res.json({ error: 'Error al actualizar el estado de la cita' })
    }
}


//########### Peticiones parametros globales ###########//

//Petición para ver valores globales
citasCtrl.valueParams = async (req, res) => {
    const parametros = await ParamsModel.find();
    return res.json(parametros);
}

//Creación variables globales
citasCtrl.createParams = async (req, res) => {
    const { maxTurno, dateMax } = req.body;
    try {
        const newParametro = new ParamsModel({ maxTurno, dateMax })
        await newParametro.save();
        return res.json({ message: '¡Variables creadas correctamente!' });
    } catch (e) {
        return res.json({ error: 'Hubo un error, variables globales no creadas' });
    }
}

//Edición variables globales
citasCtrl.updateParams = async (req, res) => {
    const parametros = await ParamsModel.find();
    const { maxTurno, dateMax } = req.body;
    try {
        await ParamsModel.findOneAndUpdate({ _id: parametros[0]._id }, { maxTurno: maxTurno, dateMax: dateMax });
        return res.json({ message: '¡Variables actualizadas correctamente!' });
    } catch (e) {
        return res.json({ error: 'Hubo un error, variables no actualizadas' });
    }
}

module.exports = citasCtrl;