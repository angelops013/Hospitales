var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const CodeSchema = new Schema({
    value: {
        type: String,
        required: true
    },
    redirectUri: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    }
});

const CodeModel = mongoose.model('Code', CodeSchema);
exports.CodeModel = CodeModel;