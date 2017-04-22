var { Router, Route } = require('../router');
var { HistoriaPacienteController } = require('./controller');
var { HistoriaPacienteModel } = require('./model');

class HistoriaPacienteRouter extends Router {

    get routes() {
        return {
            '/paciente': [
                new Route("post", "createHistoriaPaciente")
            ],
            '/paciente/:identificacion/:codigohospital': [
                new Route("get", "getHistoriaPaciente"),
                new Route("put", "updateHistoriaPaciente"),
                new Route("delete", "deleteHistoriaPaciente")
            ],
            '/pacientes': [
                new Route("get", "getHistoriasPacientes")
            ]
        };
    }

    createHistoriaPaciente(req, res, next) {
        HistoriaPacienteController.createHistoriaPaciente(req.body, res, next);
    }

    getHistoriaPaciente(req, res, next) {
        HistoriaPacienteController.getHistoriaPaciente(req.query, res, next);
    }

    updateHistoriaPaciente(req, res, next) {
        HistoriaPacienteController.updateHistoriaPaciente(req.historia, req.body, res, next);
    }

    deleteHistoriaPaciente(req, res, next) {
        HistoriaPacienteController.deleteHistoriaPaciente(req.historia, res, next);
    }

    getHistoriasPacientes(req, res, next) {
        HistoriaPacienteController.listHistoriaPaciente(req, res, next);
    }
}
exports.HistoriaPacienteRouter = HistoriaPacienteRouter;