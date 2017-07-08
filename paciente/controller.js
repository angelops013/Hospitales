var {
    HistoriaPacienteModel
} = require('./model');

class HistoriaPacienteController {
    createHistoriaPaciente(req, res, next) {
        let historiaPaciente = new HistoriaPacienteModel(req.body);
        historiaPaciente.save()
            .then(historia => res.json(historia))
            .catch(e => next(e));
    }

    listHistoriaPaciente(query, res, next) {
        const {
            limit = 50, skip = 0
        } = query;
        HistoriaPacienteModel.list({
                limit,
                skip
            })
            .then(HistoriaPacienteList => res.json(HistoriaPacienteList))
            .catch(e => next(e));
    }

    updateHistoriaPaciente(persitedHistoriaPaciente, updatedHistoriaPaciente, res, next) {
        Object.keys(updatedHistoriaPaciente).filter(propertyName => persitedHistoriaPaciente[propertyName] && propertyName !== '_id' && propertyName !== '__v').forEach(propertyName => {
            persitedHistoriaPaciente[propertyName] = updatedHistoriaPaciente[propertyName];
        });
        persitedHistoriaPaciente.save()
            .then(savedHistoriaPaciente => res.json(savedHistoriaPaciente))
            .catch(e => next(e));
    }

    deleteHistoriaPaciente(persitedHistoriaPaciente, res, next) {
        persitedHistoriaPaciente.remove()
            .then(deletedHistoriaPaciente => res.json(deletedHistoriaPaciente))
            .catch(e => next(e));
    }

    getHistoriaPaciente(query, res, next) {
        HistoriaPacienteModel.findOne({
                query
            })
            .exec()
            .then((historia) => {
                if (!historia) {
                    return callback(null, false);
                }
                res.json(historia)
            }).catch(e => callback(e));
    }
}

exports.HistoriaPacienteController = new HistoriaPacienteController();