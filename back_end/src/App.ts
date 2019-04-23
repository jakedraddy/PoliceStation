import * as express from 'express';

import * as session from 'express-session';
import * as db from './db';

import * as st from './station_db_mapper';

import * as api from './api';

import * as bcrypt from 'bcrypt';
const saltRounds = 10;

async function authenticate(userName: string, pass: string): Promise<Boolean> {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    let user = await st.get_user(userName);

    return bcrypt.compare(pass, user.HashedPassword);
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

        router.use("/", express.static('static'));

        router.get('/api/create_person', (req, res) => api.create_person(req, res));
        

        // router.get('/', async (req, rsp) => {
        //     if (req.session.user) {
        //         await authenticate(req.session.userName)
        //     }
        // });

        router.use(session({
            resave: false, // don't save session if unmodified
            saveUninitialized: false, // don't create session until something stored
            secret: 'shhhh, very secret'
        }));

        this.express.use('/', router)
    }
}
  
export default new App().express;
