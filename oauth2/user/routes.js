var { Router, Route } = require('../../router');
var { userController } = require('./controller');
var authController = require('../auth');

class UserRouter extends Router {
    constructor(app) {
        super(app);
    }

    get routes() {
        return {
            '/user': [
                new Route("post", "createUser")
            ],
            '/users': [
                new Route("get", [authController.isAuthenticated, "getUsers"])
            ]
        };
    }

    createUser(req, res, next) {
        userController.createUser(req, res, next);
    }

    getUsers(req, res, next) {
        userController.getUsers(req, res, next);
    }
}

exports.UserRouter = UserRouter;