var {
    Router,
    Route
} = require('../router');
var {
    hospitalController
} = require('./controller');
var {
    HospitalModel
} = require('./model');
var authController = require('../oauth2/auth');
var {
    PermisoController
} = require('../oauth2/permiso/controller');

class HospitalRouter extends Router {

    constructor(app) {
        super(app);
        app.param('hospitalId', hospitalController.loadHospitalById);
    }

    get routes() {
        return {
            '/hospitals': [
                new Route("get", [authController.isAuthenticated, "getHospitalList"]),
                new Route("post", [authController.isAuthenticated, "createHospital"])
            ],
            '/hospitals/:hospitalId': [
                new Route("get", [authController.isAuthenticated, "getHospital"]),
                new Route("put", [authController.isAuthenticated, "updateHospital"]),
                new Route("delete", [authController.isAuthenticated, "deleteHospital"])
            ],
            '/hospital/:location': [
                new Route("get", [authController.isAuthenticated, "getHospitalByLocation"])
            ]
        };
    }

    createHospital(req, res, next) {
        if (PermisoController.ValidarPermiso("crearHospital", req.user)) {
            hospitalController.createHospital(req, res, next);
        }
    }

    getHospitalList(req, res, next) {
        if (PermisoController.ValidarPermiso("consultarHospital", req.user)) {
            hospitalController.listHospital(req.query, res, next);
        }
    }

    getHospital(req, res, next) {
        if (PermisoController.ValidarPermiso("consultarHospital", req.user)) {
            return res.json(req.hospital);
        }
    }

    updateHospital(req, res, next) {
        if (PermisoController.ValidarPermiso("editarHospital", req.user)) {
            hospitalController.updateHospital(req.hospital, req.body, res, next);
        }
    }

    deleteHospital(req, res, next) {
        if (PermisoController.ValidarPermiso("eliminarHospital", req.user)) {
            hospitalController.deleteHospital(req.hospital, res, next);
        }
    }

    getHospitalByLocation(req, res, next) {
        if (PermisoController.ValidarPermiso("consultarHospital", req.user)) {
            hospitalController.getHospitalByLocation(req.query, res, next);
        }
    }
}
exports.HospitalRouter = HospitalRouter;