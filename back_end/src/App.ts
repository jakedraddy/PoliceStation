import * as express from 'express';
import * as session from 'express-session';
import * as api from './api';
import * as body_parser from 'body-parser'

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

        router.use(body_parser.json());

        router.use("*", async (req: express.Request, res: express.Response, next?: express.NextFunction) => {
            console.log(`Incoming request: ${req.method} ${req.originalUrl}`);
            if (next) {next()};
        });

        router.get('/api/person/get', api.get_person);
        router.post('/api/person/create', api.create_person);
        router.get('/api/employee/all', api.get_employees);
        router.get('/api/person/all', api.get_people)

        router.get('/api/auth', api.auth);
        router.post('/api/case/create', api.create_case);
        router.get('/api/cases/all', api.get_all_cases);
        router.post("/api/evidence/create", api.create_evidence);
        router.get('/api/ftest/all', api.get_all_ftests)
        router.use("/", express.static('static'));
        this.express.use('/', router)
    }
}
  
export default new App().express;
