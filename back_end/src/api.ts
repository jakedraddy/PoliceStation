import * as e from 'express';
import * as mapper from './station_create_mapper';
import * as getter from './station_get_mapper';
import * as codes from 'http-status-codes';

import { AuthResult } from '../../common/src/api_model';

// Creates the passed person encoded as the body of the request in json.
export async function create_person(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let person = req.body;
    await mapper.create_person(person);
    res.statusCode = codes.OK;
    res.end();
}

// Creates the passed case object, expects the json as the body of the request.
export async function create_case(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let case_info = req.body;
    await mapper.create_case(case_info);
    res.statusCode = codes.OK;
    res.end();
}

export async function get_person(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let person = await getter.get_person(req.query.PersonId);
    
    res.json(person);
    res.statusCode = codes.OK;
    res.end();  
}

export async function get_people(req: e.Request, res: e.Response, next?: e.NextFunction) {
    res.status(codes.OK).json(await getter.get_people());
    res.end();
}

export async function get_employees(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let empls = await getter.get_employees();
    res.json(empls);
    res.statusCode = codes.OK;
    res.end();  
}


async function authenticate(userName: string, hash: string): Promise<AuthResult> {
    if (!module.parent) console.log('authenticating %s:%s', name, hash);

    let user = await getter.get_employee_by_username(userName);
    let result = new AuthResult(false);

    if (user && user.employee) {
        result.result = hash == user.employee.HashedPassword;
        if (result.result) {
            result.user = user;
        }
    }

    return result;
}

export async function auth(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let auth = await authenticate(req.query.username, req.query.password);
    res.status(codes.OK).json(auth);
    res.end();
}

export async function get_all_cases(req: e.Request, res: e.Response, next?: e.NextFunction) {
    res.status(codes.OK).json(await getter.get_case_stubs());
    res.end();
}

export async function get_case(req: e.Request, res: e.Response, next?: e.NextFunction) {
    res.status(codes.OK).json(await getter.get_case(req.query.case_id));
    res.end();
}

export async function get_all_ftests(req: e.Request, res: e.Response, next?: e.NextFunction) {
    res.status(codes.OK).json(await getter.get_test_stubs());
    res.end();
}