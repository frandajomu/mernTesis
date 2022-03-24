const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
    {
        name: { type: String, required: true, trim: true },
        lastnameA: { type: String, required: true, trim: true },
        lastnameB: { type: String, required: true, trim: true },
        personalIDtype: { type: String, required: true },
        personalID: { type: String, required: true, unique: true },
        datebirth: { type: Date, required: true, default: Date.now },
        genero: { type: String, required: true },
        bloodType: { type: String, required: true },
        blood: { type: String, required: true, trim: true },
        EPS: { type: String, required: true, trim: true },
        celular: { type: String, required: true },
        celular2: { type: String },
        direccion: { type: String },
        ciudad: { type: String, required: true },
        departamento: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

//Usa o crea una colección User
module.exports = model('User', userSchema);