var { UserModel } = require('./model');

class UserController {
    createUser(req, res, next) {
        let user = new UserModel(req.body);
        user.save()
            .then(savedUser => res.json(savedUser))
            .catch(e => next(e));
    }

    getUsers(req, res, next) {
        UserModel.find()
            .then(users => res.json(users))
            .catch(e => next(e));
    }
}

exports.userController = new UserController();