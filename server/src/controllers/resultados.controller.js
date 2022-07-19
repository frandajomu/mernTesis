const resultadosCtrl = {};
const ResultadosModel = require('./../models/Resultado');
const UserModel = require('../models/User');
const CitasModel = require('./../models/Cita');

//Petición que devulve la lista de resultados
resultadosCtrl.getResultados = async (req, res) => {
    const resultados = await ResultadosModel.find().clone();
    return res.json(resultados);
}

//Petición para ver resultadp de un solo usuario
resultadosCtrl.getOneResultado = async (req, res) => {
    try {
        const resultado = await ResultadosModel.findOne({ idCita: req.params.id });
        return res.json(resultado);
    } catch (e) {
        return res.json({ error: '¡Ocurrio un error al buscar el resultado!' });
    }
}

//Petición cargar un nuevo resultado
resultadosCtrl.uploadResultado = async (req, res) => {
    const { Analisis, SexoFetal, T13, T18, T21, recoAnalisis, recoSexoFetal, recoT13, recoT18, recoT21, valorAnalisis, valorSexoFetal, porcentajeADN, idCita } = req.body;
    try {
        const newResult = new ResultadosModel({ Analisis, SexoFetal, T13, T18, T21, recoAnalisis, recoSexoFetal, recoT13, recoT18, recoT21, valorAnalisis, valorSexoFetal, porcentajeADN, idCita })
        await newResult.save();
        return res.json({ message: '¡Resultados cargados exitosamente!' });
    } catch (e) {
        return res.json({ error: 'Hubo un error, resultados no cargados' });
    }
}

//Petición editar resultado existente
resultadosCtrl.updateResultado = async (req, res) => {
    const { Analisis, SexoFetal, T13, T18, T21, recoAnalisis, recoSexoFetal, recoT13, recoT18, recoT21, valorAnalisis, valorSexoFetal, porcentajeADN } = req.body;
    try {
        await ResultadosModel.findOneAndUpdate({ idCita: req.params.id }, { Analisis: Analisis, SexoFetal: SexoFetal, T13: T13, T18: T18, T21: T21, recoAnalisis: recoAnalisis, recoSexoFetal: recoSexoFetal, recoT13: recoT13, recoT18: recoT18, recoT21: recoT21, valorAnalisis: valorAnalisis, valorSexoFetal: valorSexoFetal, porcentajeADN: porcentajeADN }).clone();
        return res.json({ message: 'Resultados actualizados' });
    } catch (e) {
        return res.json({ error: 'Hubo un error, resultados no actualizados' });
    }
}


//########### Peticiones estadisticas ###########//

//Grafica de Barras
resultadosCtrl.getEstadisticaPrimera = async (req, res) => {
    const { SexoFetal, Trisomia } = req.body

    try {
        if (Trisomia === "T21") {
            const resultado = await ResultadosModel.find({ SexoFetal: SexoFetal, T21: { $gte: 3, $lte: 6 } });
            return res.json(resultado.length);
        } else if (Trisomia === "T18") {
            const resultado = await ResultadosModel.find({ SexoFetal: SexoFetal, T18: { $gte: 3, $lte: 6 } });
            return res.json(resultado.length);
        } else {
            const resultado = await ResultadosModel.find({ SexoFetal: SexoFetal, T13: { $gte: 3, $lte: 6 } });
            return res.json(resultado.length);
        }
    } catch (e) {
        return res.json({ error: '¡Ocurrio un error al buscar el resultado!' });
    }
}

//Grafica de Lineas
//Numero casos confirmados por edad
//Total casos por edad
const EdadActual = (dataBirth) =>{
    var hoy = new Date();
    var cumpleanos = new Date(dataBirth.datebirth);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }
    return edad;
}

const VectorAgesMum = (birth) =>{
    var menos35 = 0;
    var de35a39 = 0;
    var de40a44 = 0;
    var mas45 = 0;
    for (let i = 0; i < birth.length; i++) {
        if (birth[i] < 35) {
            menos35 += 1;
        } else if ((birth[i] >= 36) && (birth[i] <= 39)) {
            de35a39 += 1;
        } else if ((birth[i] >= 40) && (birth[i] <= 44)) {
            de40a44 += 1;
        } else {
            mas45 += 1;
        }
    }
    var resultAges = [menos35, de35a39, de40a44, mas45];
    return resultAges;
}

resultadosCtrl.getEstadisticaSegunda = async (req, res) => {
    const { Trisomia } = req.body
    const paciente = await UserModel.find({ role: 'Paciente', estado: 'Realizado' }).clone();
    const edadPacientes = paciente.map(dataBirth => {  return EdadActual(dataBirth) });
    const agesPacientes = VectorAgesMum(edadPacientes);
    try {
        if (Trisomia === "T21") {
            const resT21 = await ResultadosModel.find({ T21: { $gte: 3, $lte: 6 } }).clone();
            const ids2 = resT21.map(dataUser => { return dataUser.idCita });
            const citasData = await CitasModel.find({ '_id': { $in: ids2 } }).clone();
            const ids = citasData.map(dataUser => { return dataUser.idUser });
            const userData = await UserModel.find({ '_id': { $in: ids } }).clone();
            const birth = userData.map(dataBirth => {
                return EdadActual(dataBirth)
            });
            const agesMum = VectorAgesMum(birth);
            var resultRiesgo = agesMum.map(function(n, i) { return n / (agesPacientes[i] === 0 ? 1 : agesPacientes[i] ); });
            return res.json(resultRiesgo);

        } else if (Trisomia === "T18") {
            const resT18 = await ResultadosModel.find({ T18: { $gte: 3, $lte: 6 } }).clone();
            const ids2 = resT18.map(dataUser => { return dataUser.idCita });
            const citasData = await CitasModel.find({ '_id': { $in: ids2 } }).clone();
            const ids = citasData.map(dataUser => { return dataUser.idUser });
            const userData = await UserModel.find({ '_id': { $in: ids } }).clone();
            const birth = userData.map(dataBirth => {
                return EdadActual(dataBirth)
            });
            const agesMum = VectorAgesMum(birth);
            var resultRiesgo = agesMum.map(function(n, i) { return n / (agesPacientes[i] === 0 ? 1 : agesPacientes[i] ); });
            return res.json(resultRiesgo);
        } else {
            const resT13 = await ResultadosModel.find({ T13: { $gte: 3, $lte: 6 } }).clone();
            const ids2 = resT13.map(dataUser => { return dataUser.idCita });
            const citasData = await CitasModel.find({ '_id': { $in: ids2 } }).clone();
            const ids = citasData.map(dataUser => { return dataUser.idUser });
            const userData = await UserModel.find({ '_id': { $in: ids } }).clone();
            const birth = userData.map(dataBirth => {
                return EdadActual(dataBirth)
            });
            const agesMum = VectorAgesMum(birth);
            var resultRiesgo = agesMum.map(function(n, i) { return n / (agesPacientes[i] === 0 ? 1 : agesPacientes[i] ); });
            return res.json(resultRiesgo);
        }
    } catch (e) {
        return res.json({ error: '¡Ocurrio un error al buscar el resultado!' });
    }
}

module.exports = resultadosCtrl;