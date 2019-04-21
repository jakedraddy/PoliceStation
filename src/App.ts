import * as express from 'express';

import * as session from 'express-session';
import * as db from './db';
import * as station from './station';
import { debug } from 'util';

const bcrypt = require('bcrypt');
const saltRounds = 10;

async function authenticate(userName, pass): Promise<Boolean> {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    let user = await db.get_user(userName);

    return bcrypt.compare(pass, user.HashedPassword);
}

class App {
    public express
  
    constructor () {
        this.express = express()
        this.mountRoutes()
    }
  
    private mountRoutes (): void {
        db.create_tables();

        const router = express.Router()

        router.get('/', express.static('dist/index.html'));

        router.get('/logon', express.static('dist/logon.html'));

        // router.get('/', async (req, rsp) => {
        //     if (req.session.user) {
        //         await authenticate(req.session.userName)
        //     }
        // });

        router.use("/static", express.static('static'));

        router.use(session({
            resave: false, // don't save session if unmodified
            saveUninitialized: false, // don't create session until something stored
            secret: 'shhhh, very secret'
        }));

        this.express.use('/', router)
    }
}
  
export default new App().express;
