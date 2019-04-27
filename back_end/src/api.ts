import * as e from 'express';
import * as mapper from './station_db_mapper';
import * as getter from './station_get_mapper';
import * as codes from 'http-status-codes';

import * as bcrypt from 'bcrypt';

// Creates the passed person encoded as the body of the request in json.
export async function create_person(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let person = JSON.parse(req.body);
    mapper.create_person(person);
    res.statusCode = codes.OK;
    res.end();
}

// Creates the passed case object, expects the json as the body of the request.
export function create_case(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let case_info = JSON.parse(req.body);
    mapper.create_case(case_info);
    res.statusCode = codes.OK;
    res.end();
}

export async function get_person(req: e.Request, res: e.Response, next?: e.NextFunction) {
    res.json(getter.get_person(req.params.PersonId));
    res.statusCode = codes.OK;
    res.end();  
}

export async function get_employees(req: e.Request, res: e.Response, next?: e.NextFunction) {
    res.json(getter.get_employees());
    res.statusCode = codes.OK;
    res.end();  
}

async function authenticate(userName: string, pass: string): Promise<Boolean> {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);

    let user = await getter.get_employee_by_username(userName);
    
    if (user.employee) {
        return bcrypt.compare(pass, user.employee.HashedPassword);
    } else {
        return false;
    }
}

export async function auth(req: e.Request, res: e.Response, next?: e.NextFunction) {
    if (await authenticate(req.params.username, req.params.password)) {
        res.write("true");
    } else {
        res.write("false");
    }

    res.statusCode = codes.OK;
    res.end();
}

export async function get_all_cases(req: e.Request, res: e.Response, next?: e.NextFunction) {
    res.json(await getter.get_case_stubs());
    res.statusCode = codes.OK;
    res.end();
}