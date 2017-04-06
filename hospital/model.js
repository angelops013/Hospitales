var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const PacienteSchema = new Schema({
    Identificacion: String,
    TipoIdentificacion: String,
    Nombre: String,
    PrimerApellido: String,
    SegundoApellido: String,
    Genero: String,
    FechaNacimiento: Date,
    Edad: Number,
    FechaIngreso: Date,
    MotivoIngreso: String,
    FactorRH: String,
});

const HospitalSchema = new Schema({
    CodigoHospital: Number,
    NombreHospital: String,
    Direccion: String,
    Telefono: String,
    NivelHospital: Number,
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