const mongosse = require('mongoose');
const Schema = mongosse.Schema

const preguntasSchema = new Schema({
    pregunta: { type: String } ,
    respuesta: { type: String },
    si: { type: Boolean },
    no:{typr: Boolean},
    // nombrePaciente: { type: String },
    // cedula: { type: String },
    // estudio: { type: String },
    // fechaCita: { type: Date },
    grupo:{type:String},
    orden:{type:Number}
    
})

module.exports = mongosse.model('Preguntas', preguntasSchema);