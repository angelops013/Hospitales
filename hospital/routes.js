var { Router, Route } = require('../router');
var { hospitalController } = require('./controller');
var { HospitalModel } = require('./model');

class HospitalRouter extends Router {

    constructor(app) {
        super(app);
        app.param('hospitalId', hospitalController.loadHospitalById);
    }

    get routes() {
        return {
            '/hospitals': [
                new Route("get", "getHospitalList"),
                new Route("post", "createHospital")
            ],
            '/hospitals/:hospitalId': [
                new Route("get", "getHospital"),
                new Route("put", "updateHospital"),
                new Route("delete", "deleteHospital")
            ]
        };
    }

    createHospital(req, res, next) {
        hospitalController.createHospital(req, res, next);
    }

    getHospitalList(req, res, next) {
        hospitalController.listHospital(req.query, res, next);
    }

    getHospital(req, res, next) {
        return res.json(req.hospital);
    }

    updateHospital(req, res, next) {
        hospitalController.updateHospital(req.hospital, req.body, res, next);
    }

    deleteHospital(req, res, next) {
        hospitalController.deleteHospital(req.hospital, res, next);
    }
}
exports.HospitalRouter = HospitalRouter;