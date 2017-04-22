var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PacienteSchema = new Schema({
    Identificacion: {
        type: String,
        required: true
    },
    TipoIdentificacion: {
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
    FechaNacimiento: {
        type: Date,
        required: true
    },
    FactorRH: {
        type: String,
        required: true
    }
});

const HospitalSchema = new Schema({
    CodigoHospital: {
        type: Number,
        required: true
    },
    NombreHospital: {
        type: String,
        required: true
    },
    Direccion: {
        type: String,
        required: true
    },
    Telefono: {
        type: String,
        required: true
    },
    NivelHospital: {
        type: Number,
        required: true
    },
    PacienteList: [PacienteSchema],
    location: {
        type: {
            type: String,
            default: 'Point'
        },
        coordinates: [Number]
    }
});

HospitalSchema.index({ location: '2dsphere' });

HospitalSchema.statics = {
    List({ skip = 0, limit = 50 } = {}) {
        return this.find()
            .skip(parseInt(skip))
            .limit(parseInt(limit))
            .exec();
    },
    GetHospitalById(id) {
        return this.findById(id)
            .exec()
            .then((hospital) => {
                if (hospital) {
                    return hospital;
                }
                const err = new Error(`No existe el hospital con id ${id}`);
                return Promise.reject(err);
            });
    }
};
const HospitalModel = mongoose.model('Hospital', HospitalSchema);
exports.HospitalModel = HospitalModel;