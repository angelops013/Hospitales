var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

const ClientSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    id: {
        type: String,
        required: true
    },
    secret: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
});

ClientSchema.pre('save', function (callback) {
    var client = this;

    if (!client.isModified('secret')) return callback();

    bcrypt.genSalt(5).then((salt) => {
        bcrypt.hash(client.secret, salt).then((hash) => {
            client.secret = hash;
            callback();
        }).catch(e => callback(e));
    }).catch(e => callback(e));
});

ClientSchema.methods.verifySecret = function (secret, callback) {
    bcrypt.compare(secret, this.secret).then((isMatch) => {
        callback(null, isMatch);
    }).catch(e => callback(e));
};

ClientSchema.statics = {
    getClientById(id) {
        return this.find({ userId: id })
            .exec()
            .then((client) => {
                if (client) {
                    return client;
                }
                const err = new Error(`No existe cliente con id ${id}`);
                return Promise.reject(err);
            });
    }
};

const ClientModel = mongoose.model('Client', ClientSchema);
exports.ClientModel = ClientModel;