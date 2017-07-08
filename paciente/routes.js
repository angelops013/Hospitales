var {
    Router,
    Route
} = require('../router');
var {
    HistoriaPacienteController
} = require('./controller');
var {
    PermisoController
} = require('../oauth2/permiso/controller');
var authController = require('../oauth2/auth');

class HistoriaPacienteRouter extends Router {

    get routes() {
        return {
            '/paciente': [
                new Route("post", [authController.isAuthenticated, "createHistoriaPaciente"])
            ],
            '/paciente/:identificacion/:codigohospital': [
                new Route("get", [authController.isAuthenticated, "getHistoriaPaciente"]),
                new Route("put", [authController.isAuthenticated, "updateHistoriaPaciente"]),
                new Route("delete", [authController.isAuthenticated, "deleteHistoriaPaciente"])
            ],
            '/pacientes': [
                new Route("get", [authController.isAuthenticated, "getHistoriasPacientes"])
            ]
        };
    }

    createHistoriaPaciente(req, res, next) {
        if (PermisoController.ValidarPermiso("crearPaciente", req.user)) {
            HistoriaPacienteController.createHistoriaPaciente(req.body, res, next);
        }
    }

    getHistoriaPaciente(req, res, next) {
        if (PermisoController.ValidarPermiso("consultarPaciente", req.user)) {
            HistoriaPacienteController.getHistoriaPaciente(req.query, res, next);
        }
    }

    updateHistoriaPaciente(req, res, next) {
        if (PermisoController.ValidarPermiso("editarPaciente", req.user)) {
            HistoriaPacienteController.updateHistoriaPaciente(req.historia, req.body, res, next);
        }
    }

    deleteHistoriaPaciente(req, res, next) {
        if (PermisoController.ValidarPermiso("eliminarPaciente", req.user)) {
            HistoriaPacienteController.deleteHistoriaPaciente(req.historia, res, next);
        }
    }

    getHistoriasPacientes(req, res, next) {
        if (PermisoController.ValidarPermiso("consultarPaciente", req.user)) {
            HistoriaPacienteController.listHistoriaPaciente(req, res, next);
        }
    }
}
exports.HistoriaPacienteRouter = HistoriaPacienteRouter;