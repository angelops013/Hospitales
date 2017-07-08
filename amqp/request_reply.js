var amqp = require('amqplib');
var {
    HospitalModel
} = require('../hospital/model');

class Client {

    constructor(host, requestQueue) {
        this.host = host;
        this.requestQueue = requestQueue;
    }

    uuid(len) {
        var buf = [],
            chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
            charlen = chars.length;

        for (var i = 0; i < len; ++i) {
            buf.push(chars[this.getRandomInt(0, charlen - 1)]);
        }

        return buf.join('');
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    sendRequest(message, replyHandler) {
        let _self = this;
        amqp.connect(this.host).then((conn) => {
            return conn.createChannel().then((ch) => {
                    return new Promise((resolve) => {
                        var correlationId = _self.uuid(16);

                        function checkForAnswer(msg) {
                            if (msg.properties.correlationId === correlationId) {
                                resolve(msg.content.toString());
                            }
                        }

                        //Se crea una cola dejando que el servidor elija el nombre, esta sera usada como cola de respuesta
                        var ok = ch.assertQueue('', {
                                exclusive: true
                            })
                            .then((qok) => {
                                return qok.queue;
                            });

                        ok = ok.then((queue) => {
                            return ch.consume(queue, checkForAnswer, {
                                    noAck: true
                                })
                                .then(() => {
                                    return queue;
                                });
                        });

                        ok = ok.then((queue) => {
                            console.log(`Peticion enviada con exito ${message}`);
                            ch.sendToQueue(_self.requestQueue, Buffer.from(message), {
                                correlationId: correlationId,
                                replyTo: queue
                            });
                        });
                    });
                })
                .then(replyHandler)
                .finally(() => {
                    conn.close();
                });
        }).catch(console.warn);
    }
}

class Server {
    constructor(host, requestQueue) {
        this.host = host;
        this.requestQueue = requestQueue;
    }

    start(requestHandler) {
        let _self = this;
        amqp.connect(this.host).then(function (conn) {
            process.once('SIGINT', function () {
                conn.close();
            });
            return conn.createChannel().then(function (ch) {
                var ok = ch.assertQueue(_self.requestQueue, {
                    durable: false
                });
                var ok = ok.then(function () {
                    ch.prefetch(1);
                    return ch.consume(_self.requestQueue, reply);
                });
                return ok.then(function () {
                    console.log('Servidor iniciado');
                });

                function reply(msg) {
                    requestHandler.processRequestMessage(msg.content.toString())
                        .then((reply) => {
                            let Json = JSON.parse(reply);
                            let respuesta;

                            console.log(Json.location.coordinates);

                            HospitalModel.find({
                                    location: {
                                        '$near': {
                                            '$maxDistance': 100000000000,
                                            '$geometry': {
                                                type: 'Point',
                                                coordinates: Json.location.coordinates
                                            }
                                        }
                                    }
                                })
                                .exec()
                                .then(hospitales => respuesta = hospitales)
                                .catch(e => next(e));
                            if (respuesta == undefined || respuesta == null) {
                                respuesta = {
                                    "hospitales": [{
                                        "nombre": "El Rosario",
                                        "direccion": "Calle 10 #60 - 90"
                                    }]
                                };
                            }
                            ch.sendToQueue(msg.properties.replyTo,
                                Buffer.from(JSON.stringify(respuesta)), {
                                    correlationId: msg.properties.correlationId
                                });
                            ch.ack(msg);
                        }).catch(console.warn);
                }
            });
        }).catch(console.warn);
    }
}

exports.Client = Client;
exports.Server = Server;