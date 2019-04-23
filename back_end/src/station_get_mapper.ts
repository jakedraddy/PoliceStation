import * as mapper from './station_mapper';
import * as station from '../../common/src/station'
import * as db from './db'

async function map_many(table: string, filter_field: string, filter_value: any, hydrator: (any) => any): Promise<any[]> {
    let result = await db.execute_query(`SELECT * FROM ${table} WHERE ${filter_field}=:{filter_field};`, [filter_value]);
    return (result.rows as Array<any>).map(hydrator);
}

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
    return await map_many("Phone", "PersonId", PersonId, mapper.map_PhoneNumber);
}

export async function get_emails(PersonId: number): Promise<station.Email[]> {
    return await map_many("Email", "PersonId", PersonId, mapper.map_Email);
}

export async function get_addresses(PersonId: number): Promise<station.Address[]> {
    return await map_many("Address", "PersonId", PersonId, mapper.map_Address);
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


// Just a fast return of a list of all the cases with no sub-details.
export async function get_case_stubs(): Promise<station.Case[]> {
    let result = await db.execute_query(`SELECT * FROM Cases;`);
    return (result.rows as Array<any>).map(mapper.map_Case);
}

// Full grab of a case.
export async function get_case(CaseId: number): Promise<station.Case> {
    let result = await db.execute_query(`SELECT * FROM Cases WHERE CaseId=:CaseId;`, [CaseId]);

    let case_info = mapper.map_Case(result.rows[0]);

    case_info.arrests = await get_case_arrests(CaseId);
    case_info.assignments = await get_case_assignments(CaseId);
    case_info.evidence = await get_case_evidence(CaseId);
    case_info.notes = await get_case_notes(CaseId);
    case_info.tests = await get_case_tests(CaseId);
    case_info.visits = await get_case_visits(CaseId);

    return case_info;
}

export async function get_case_visits(CaseId: number): Promise<station.CaseVisit[]> {
    return await map_many("CaseVisit", "CaseId", CaseId, mapper.map_CaseVisit);
}

export async function get_case_arrests(CaseId: number): Promise<station.CaseArrest[]> {
    return await map_many("CaseArrest", "CaseId", CaseId, mapper.map_CaseArrest);
}

export async function get_case_assignments(CaseId: number): Promise<station.CaseAssignment[]> {
    return await map_many("CaseAssignment", "CaseId", CaseId, mapper.map_CaseAssignment);
}

export async function get_case_notes(CaseId: number): Promise<station.CaseNote[]> {
    return await map_many("CaseNote", "CaseId", CaseId, mapper.map_CaseNote);
}

export async function get_case_evidence(CaseId: number): Promise<station.Evidence[]> {
    return await map_many("Evidence", "CaseId", CaseId, mapper.map_Evidence);
}

export async function get_case_tests(CaseId: number): Promise<station.ForensicTest[]> {
    var tests = await map_many("ForensicTest", "CaseId", CaseId, mapper.map_ForensicTest);

    // Populate the experts associated with it.
    tests.forEach(async (t: station.ForensicTest) => {
        t.forensic_experts = await get_test_experts(t.TestId);
    });

    return tests;
}

export async function get_test_experts(TestId: number): Promise<station.ForensicTestForensicExpert[]> {
    return await map_many("Evidence", "TestId", TestId, mapper.map_ForensicTestForensicExpert);
}