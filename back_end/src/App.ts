import * as express from 'express';
import * as session from 'express-session';
import * as api from './api';

class App {
    public express: express.Express
  
    constructor () {
        this.express = express()
        this.mountRoutes()
    }
  
    private mountRoutes (): void {
        // db.create_tables();

        const router = express.Router()

        router.use(session({
            resave: false, // don't save session if unmodified
            saveUninitialized: false, // don't create session until something stored
            secret: 'shhhh, very secret'
        }));

        router.use("/", express.static('static'));

        router.post('/api/create_person', api.create_person);
        router.post('/api/create_case', api.create_case);
        router.get('/api/get_person', api.get_person);
        router.get('/api/auth', api.auth);

        this.express.use('/', router)
    }
}
  
export default new App().express;
