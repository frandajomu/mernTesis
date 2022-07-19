const { Schema, model } = require('mongoose');

const resultSchema = new Schema(
    {
        Analisis:{ type: String, required: true },
        SexoFetal:{ type: String, required: true },
        T13: { type: String, required: true },
        T18: { type: String, required: true },
        T21: { type: String, required: true },
        recoAnalisis: { type: String, required: true },
        recoSexoFetal: { type: String, required: true },
        recoT13: { type: String, required: true },
        recoT18: { type: String, required: true },
        recoT21: { type: String, required: true },
        valorAnalisis: { type: String, required: true },
        valorSexoFetal: { type: String, required: true },
        porcentajeADN: { type: String, required: true }, 
        idCita: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

//Usa o crea una colección User
module.exports = model('Result', resultSchema);



