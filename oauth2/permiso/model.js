var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PermisosSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    consultarHospital: {
        type: Boolean,
        required: true
    },
    crearHospital: {
        type: Boolean,
        required: true
    },
    editarHospital: {
        type: Boolean,
        required: true
    },
    eliminarHospital: {
        type: Boolean,
        required: true
    },
    consultarPaciente: {
        type: Boolean,
        required: true
    },
    crearPaciente: {
        type: Boolean,
        required: true
    },
    editarPaciente: {
        type: Boolean,
        required: true
    },
    eliminarPaciente: {
        type: Boolean,
        required: true
    }
});

const PermisosModel = mongoose.model('Permisos', PermisosSchema);
exports.PermisosModel = PermisosModel;