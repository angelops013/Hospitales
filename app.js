var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var { HospitalRouter } = require('./hospital/routes');
var { HistoriaPacienteRouter } = require('./paciente/routes');
//var { ClientRouter } = require('./oauth2/client/routes');
//var { UserRouter } = require('./oauth2/user/routes');

mongoose.connect('mongodb://localhost:27017/hospital');
let app = express();
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
let hospitalRouter = new HospitalRouter(app);
let historiaPacienteRouter = new HistoriaPacienteRouter(app);
//let clientRouter = new ClientRouter(app); 
//let userRouter = new UserRouter(app); 

var server = app.listen(3000, function () {
    console.log(`Server listening on port ${server.address().port}`);
});