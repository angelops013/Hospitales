var { Client, Server } = require('./request_reply');

//Se crea instancia del servidor
let server = new Server('amqp://10.100.75.131', 'testQueue');
/**
 * El servidor es un listener, por tal motivo se inicia para que escuche por peticiones
 * el metodo start recibe un handler que tienen el metodo processRequestMessage, dicho metodo debe retornar
 * una instancia de promise, dicha instancia debe invocar la funcion resolve pasando como parametro la cadena de
 * texto que sera enviada como respuesta
 */
server.start({
    processRequestMessage: function(message){
        return new Promise(function(resolve) {
            console.log(`Peticion recibida con exito ${message}`);
            resolve('Respuesta');
        });
    }
});
//Se crea la instancia de cliente que sera usada para realizar la peticion
let client = new Client('amqp://localhost', 'testQueue');
/**
 * Se envia la peticion, el primer parametro es el mensaje que sera enviado como peticion,
 * el segundo parametro es el callback que sera invocado cuando sea recibida la respuesta
 */
client.sendRequest('Peticion', function(reply){
    console.log(`Respuesta recibida con exito ${reply}`);
});