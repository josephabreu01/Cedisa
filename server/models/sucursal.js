const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SucursalSchema = new Schema ({
    nombre : {type : String},
    descripcion:{type : String}
})


module.exports = mongoose.model('Sucursal' , SucursalSchema);