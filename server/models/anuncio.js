const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnuncioSchema = new Schema({
    titulo:{type:String, require: true},
    descripcion:{type:String, require:true},
    habilitado:{type:Boolean}
})

module.exports = mongoose.model('Anuncio',AnuncioSchema);