var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

UserSchema.pre('save', function (callback) {
    var user = this;

    if (!user.isModified('password')) return callback();

    bcrypt.genSalt(5).then((salt) => {
        bcrypt.hash(user.password, salt).then((hash) => {
            user.password = hash;
            callback();
        }).catch(e => callback(e));
    }).catch(e => callback(e));
});

UserSchema.methods.verifyPassword = function (password, callback) {
    bcrypt.compare(password, this.password).then((isMatch) => {
        callback(null, isMatch);
    }).catch(e => callback(e));
};

const UserModel = mongoose.model('User', UserSchema);
exports.UserModel = UserModel;