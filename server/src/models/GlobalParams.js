const { Schema, model } = require('mongoose');

const globalParamsSchema = new Schema(
    {
        maxTurno: { type: Number, required: true, default: 10 },
        dateMax: { type: Number, required: true, default: 30}
    },
    {
        timestamps: true
    }
);

//Usa o crea una colección Cita
module.exports = model('Params', globalParamsSchema);