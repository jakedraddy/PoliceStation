

import * as e from 'express';
import * as mapper from './station_db_mapper';
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