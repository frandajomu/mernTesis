const { Schema, model } = require('mongoose');

const citaSchema = new Schema(
    {
        citadate: { type: Date, required: true, default: Date.now },
        turno: { type: String, required: true },
        idUser: { type: String, required: true}
    },
    {
        timestamps: true
    }
);

//Usa o crea una colección Cita
module.exports = model('Cita', citaSchema);