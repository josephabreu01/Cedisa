const mongosee = require('mongoose');
const Schema = mongosee.Schema;

const ExtensionesSchema = new Schema({
    extension:{type: String},
    personal:{type: String}
});

module.exports = mongosee.model('Extensiones',ExtensionesSchema);