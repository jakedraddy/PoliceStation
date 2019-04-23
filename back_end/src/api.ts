

import * as e from 'express';
import * as mapper from './station_db_mapper';
import * as getter from './station_get_mapper';
import * as codes from 'http-status-codes';

export function create_person(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let person = JSON.parse(req.body);
    mapper.create_person(person);
    res.statusCode = codes.OK;
    res.end();
}

export function create_case(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let case_info = JSON.parse(req.body);
    mapper.create_case(case_info);
    res.statusCode = codes.OK;
    res.end();
}

export function get_person(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let data = JSON.parse(req.body);
    
    res.send(JSON.stringify(getter.get_person(data.PersonId)));
    res.statusCode = codes.OK;
    res.end();  
}

export function get_person_by_username(req: e.Request, res: e.Response, next?: e.NextFunction) {
    let data = JSON.parse(req.body);
    
    res.send(JSON.stringify(getter.get_employee_by_username(data.username)));
    res.statusCode = codes.OK;
    res.end();
}