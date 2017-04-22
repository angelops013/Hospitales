var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const HistoriaPacienteSchema = new Schema({
    Identificacion: {
        type: String,
        required: true
    },
    Nombre: {
        type: String,
        required: true
    },
    PrimerApellido: {
        type: String,
        required: true
    },
    SegundoApellido: String,
    Genero: {
        type: String,
        required: true
    },
    FechaIngreso: {
        type: Date,
        required: true
    },
    MotivoIngreso: {
        type: String,
        required: true
    },
    CodigoHospital: {
        type: Number,
        required: true
    }
});

HistoriaPacienteSchema.statics = {
    List({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .exec();
    }
};
const HistoriaPacienteModel = mongoose.model('historiapaciente', HistoriaPacienteSchema);
exports.HistoriaPacienteModel = HistoriaPacienteModel;