import * as express from 'express';

import * as session from 'express-session';
import * as db from './db';
import * as codes from 'http-status-codes';

import * as st from './station_db_mapper';

import * as api from './api';
import * as getter from './station_get_mapper'

import * as bcrypt from 'bcrypt';
import { STATUS_CODES } from 'http';
const saltRounds = 10;

async function authenticate(userName: string, pass: string): Promise<Boolean> {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    let user = await getter.get_employee_by_username(userName);
    
    return bcrypt.compare(pass, user.employee.HashedPassword);
}

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

        router.get('/api/create_person', (req, res) => api.create_person(req, res));
        router.get('/api/create_case', (req, res) => api.create_case(req, res));
        router.get('/api/get_person', (req, res) => (api.get_person(req, res)));
        
        router.post('/auth', function(req, res) {
            if (authenticate(req.params.username, req.params.password)) {
                res.write("true");
            } else {
                res.write("false");
            }

            res.statusCode = codes.OK;
            res.end();
        });


        // router.get('/', async (req, rsp) => {
        //     if (req.session.user) {
        //         await authenticate(req.session.userName)
        //     }
        // });


        this.express.use('/', router)
    }
}
  
export default new App().express;
