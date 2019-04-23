import * as mapper from './station_mapper';
import * as station from '../../common/src/station'
import * as db from './db'

export async function get_person(PersonId: number): Promise<station.Person> {
    let result = await db.execute_query(`SELECT * FROM Person WHERE PersonId=:PersonId;`, [PersonId]);
    let person = mapper.map_Person(result.rows[0]);

    person.employee = await get_employee(PersonId);
    person.emails = await get_emails(PersonId);
    person.addresses = await get_addresses(PersonId);
    person.phones = await get_phones(PersonId);
    
    return person;    
}

export async function get_phones(PersonId: number): Promise<station.PhoneNumber[]> {
    let result = await db.execute_query(`SELECT * FROM Phone WHERE PersonId=:PersonId;`, [PersonId]);

    return (result.rows as Array<any>).map(mapper.map_PhoneNumber);
}

export async function get_emails(PersonId: number): Promise<station.Email[]> {
    let result = await db.execute_query(`SELECT * FROM Email WHERE PersonId=:PersonId;`, [PersonId]);

    return (result.rows as Array<any>).map(mapper.map_Email);
}

export async function get_addresses(PersonId: number): Promise<station.Address[]> {
    let result = await db.execute_query(`SELECT * FROM Address WHERE PersonId=:PersonId;`, [PersonId]);

    return (result.rows as Array<any>).map(mapper.map_Address);
}

export async function get_employee_by_username(userName: string): Promise<station.Person> {
    let result = await db.execute_query(`SELECT * FROM Employee WHERE Username = :username;`, [userName]);

    let employee = mapper.map_Employee(result.rows[0]);

    let person = get_person(employee.PersonId);

    return person;
}

export async function get_employee(PersonId: number): Promise<station.Employee> {
    let result = await db.execute_query(`SELECT * FROM Employee WHERE PersonId = :PersonId;`, [PersonId]);

    let employee = mapper.map_Employee(result.rows[0]);

    employee.officer = await get_officer(employee.EmployeeId);
    employee.forensic_expert = await get_forensic_expert(employee.EmployeeId);

    return employee;
}

export async function get_officer(EmployeeId: number): Promise<station.Officer> {
    let result = await db.execute_query(`SELECT * FROM Officer WHERE EmployeeId=:EmployeeId`, [EmployeeId]);
    let officer = mapper.map_Officer(result.rows[0]);
    return officer;
}

export async function get_forensic_expert(EmployeeId: number): Promise<station.ForensicExpert> {
    let result = await db.execute_query(`SELECT * FROM ForensicExpert WHERE EmployeeId=:EmployeeId`, [EmployeeId]);
    let officer = mapper.map_ForensicExpert(result.rows[0]);
    return officer;
}

// export class Visit {
//     VisitId: number;
//     PersonId: number;
//     DateofVisit: Date; 
//     Reason: string;

//     arrest: Arrest;
// }

// export class Arrest {
//     ArrestNumber: number;
//     PersonId: number;
//     BadgeId: number;
//     DateofArrest: Date; 
//     ArrestReason: string;
// }

// export class Case {
//     CaseId: number; 
//     DateEntered: Date; 
//     Status: string;
//     Title: string;
//     visits: CaseVisit[];
//     arrests: CaseArrest[];
//     notes: CaseNote[];
//     assignments: CaseAssignment[];
//     evidence: Evidence[];
//     tests: ForensicTest[];
// }

// export class CaseVisit {
//     CaseId: number;
//     VisitId: number;

// }

// export class CaseArrest {
//     CaseID: number;
//     ArrestNumber: number;
// }

// export class CaseAssignment {
//     CaseId: number;
//     EmployeeId: number;

// }

// export class CaseNote {
//     NoteId: number;
//     Note: string;
//     EmployeeId: number;
//     DateEntered: Date;
//     CaseId: number;
// }

// export class Evidence {
//     EvidenceId: number;
//     CaseId: number;
//     Date: Date; 
//     Address: string; 
//     Description: string; 
//     Location: string;
// }

// export class ForensicTest {
//     TestId: number; 
//     EvidenceId: number;
//     ResultDescription: string; 
//     Date: Date;
//     TestName: string;
//     forensic_experts: ForensicTestForensicExpert[];
// }

// export class ForensicTestForensicExpert {
//     TestId: number;
//     ForensicExpertId: number;
// }