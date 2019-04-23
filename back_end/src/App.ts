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

        router.get('/api/get_person', api.get_person);
        router.post('/api/person/create', api.create_person);

        router.get('/api/auth', api.auth);
        router.get('/api/cases/', api.auth);
        router.post('/api/case/create', api.create_case);
        router.get('/api/cases/all', api.get_all_cases);

        this.express.use('/', router)
    }
}
  
export default new App().express;
