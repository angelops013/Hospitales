var { ClientModel } = require('./model');

class ClientController {
    createClient(req, res, next){
        let client = new ClientModel(req.body);
        client.save()
            .then(savedClient => res.json(savedClient))
            .catch(e => next(e));
    }

    getClientById(req, res, next){
        ClientModel.getClientById(req.params.clientId)
            .then(clients => res.json(clients))
            .catch(e => next(e));
    }
}

exports.clientController = new ClientController();