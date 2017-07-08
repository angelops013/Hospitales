var { Router, Route } = require('../router');
var authController = require('./auth');
var oauth2Controller = require('./controller');

class OAuth2Router extends Router {
    constructor(app) {
        super(app);
    }

    get routes() {
        return {
            '/oauth2/authorize': [
                new Route("get", [authController.isAuthenticated, oauth2Controller.authorization]),
                new Route("post", [authController.isAuthenticated, oauth2Controller.decision])
            ],
            '/oauth2/token': [
                new Route("post", [authController.isClientAuthenticated, oauth2Controller.token])
            ]
        };
    }
}

exports.OAuth2Router = OAuth2Router;