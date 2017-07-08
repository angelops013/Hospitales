class Router {

    get routes() {
        return {};
    }

    constructor(app) {
        this.app = app;
        if (!this.app)
            throw new Error('Se esperaba el parámetro app');
        this.configure();
    }

  configure() {
        var routes = this.routes;
        Object.keys(routes).forEach((path) => {
            var pathConfig = routes[path];
            for (let action of pathConfig) {
                if(typeof action.method === 'string' || action.method instanceof String){
                    this.app[action.verb](path, this[action.method].bind(this));
                } else if(Array.isArray(action.method)){
                    let callbacks = [];
                    for(let method of action.method){
                        if(typeof method === 'string' || method instanceof String){
                            callbacks.push(this[method].bind(this));
                        } else {
                            callbacks.push(method);
                        }
                    }
                    this.app[action.verb](path, callbacks);
                }
            }
        });
    }
}
exports.Router = Router;

class Route {
    constructor(verb, method) {
        this._verb = verb;
        this._method = method;
    }

    get verb() {
        return this._verb;
    }

    get method() {
        return this._method;
    }
}
exports.Route = Route;