import * as express from 'express';

const db = require("./db");

import * as session from 'express-session';

const bcrypt = require('bcrypt');
const saltRounds = 10;


function authenticate(userName, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var user: User = db.get_user(userName);

    // query the db for the given username
    if (!user) return fn(new Error('cannot find user'));
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user

    bcrypt.compare(pass, user.hash, function(err, res) {
        // res == true
    });

    bcrypt.hash(pass, saltRounds, function(err, hash) {

    });
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
