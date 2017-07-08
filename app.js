var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var ejs = require('ejs');
var session = require('express-session');
var passport = require('passport');
var {
    HospitalRouter
} = require('./hospital/routes');
var {
    HistoriaPacienteRouter
} = require('./paciente/routes');
var {
    ClientRouter
} = require('./oauth2/client/routes');
var {
    UserRouter
} = require('./oauth2/user/routes');
var {
    OAuth2Router
} = require('./oauth2/routes');
var {
    Receiver
} = require('./amqp/receiver');
var {
    Sender
} = require('./amqp/sender');

mongoose.connect('mongodb://localhost:27017/hospital');
let app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
app.use(session({
    secret: 'euSc5kjNOOqSF8LLNl5U',
    saveUninitialized: true,
    resave: true
}));
app.use(passport.initialize());
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
let hospitalRouter = new HospitalRouter(app);
let historiaPacienteRouter = new HistoriaPacienteRouter(app);
let clientRouter = new ClientRouter(app);
let userRouter = new UserRouter(app);
let oauth2Router = new OAuth2Router(app);

var {
    Client,
    Server
} = require('./amqp/request_reply');

//Se crea instancia del servidor
let server2 = new Server('amqp://hospital:hospital1@localhost', 'manuelao');

server2.start({
    processRequestMessage: function (message) {
        return new Promise(function (resolve) {
            console.log(`Peticion recibida con exito ${message}`);
            resolve(message);
        });
    }
});

var server = app.listen(4800, function () {
    console.log(`Server listening on port ${server.address().port}`);
});