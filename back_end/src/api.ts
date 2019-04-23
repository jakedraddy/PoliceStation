

import * as e from 'express';
import * as mapper from './station_db_mapper';


export function create_person(req: e.Request, res: e.Response, next: e.NextFunction) {
    let person = JSON.parse(req.body);

    mapper.create_person(person);
    next();
}