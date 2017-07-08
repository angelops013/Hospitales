var {
    PermisosModel
} = require('./model');
var {
    TokenModel
} = require('../token/model');

class PermisoController {

    ValidarPermiso(permiso, user) {
        PermisosModel.findOne({
                userId: user._id
            })
            .exec()
            .then((permisos) => {
                if (!permisos[permiso]) {
                    return false;
                }

                return true;
            }).catch(e => callback(e));
    }
}

exports.PermisoController = new PermisoController();