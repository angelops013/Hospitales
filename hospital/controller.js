var { HospitalModel } = require('./model');

class HospitalController {
    loadHospitalById(req, res, next, id) {
        ContactModel.GetHospitalById(id)
            .then(hospital => {
                req.hospital = hospital;
                return next();
            })
            .catch(e => next(e));
    }

    createHospital(req, res, next) {
        let hospital = new HospitalModel(req.body);
        hospital.save()
            .then(savedHospital => res.json(savedHospital))
            .catch(e => next(e));
    }

    listHospital(query, res, next) {
        const { limit = 50, skip = 0 } = query;
        HospitalModel.list({ limit, skip })
            .then(hospitalsList => res.json(hospitalsList))
            .catch(e => next(e));
    }

    updateHospital(persitedHospital, updatedHospitalState, res, next) {
        Object.keys(updatedHospitalState).filter(propertyName => persitedHospital[propertyName] && propertyName !== '_id' && propertyName !== '__v').forEach(propertyName => {
            persitedHospital[propertyName] = updatedHospitalState[propertyName];
        });
        persitedHospital.save()
            .then(savedHospital => res.json(savedHospital))
            .catch(e => next(e));
    }

    deleteHospital(persitedHospital, res, next) {
        persitedHospital.remove()
            .then(deletedHospital => res.json(deletedHospital))
            .catch(e => next(e));
    }
}

exports.hospitalController = new HospitalController();