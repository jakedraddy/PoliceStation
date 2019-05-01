import * as mapper from './station_mapper';
import * as station from '../../common/src/station'
import * as db from './db'

async function map_many<T>(table: string, filter_field: string, filter_value: any, hydrator: (row: T) => T): Promise<T[]> {
    let result = await db.execute_query(`SELECT * FROM ${table} WHERE ${filter_field}=:filter_value`, [filter_value]);

    if (result && result.rows && result.rows.length) {
        return (result.rows as Array<any>).map(hydrator) as T[];
    }

    return [];
}

export async function get_person(PersonId: number): Promise<station.Person | undefined> {
    let result = await db.execute_query(`SELECT * FROM Person WHERE PersonId=:PersonId`, [PersonId]);

    if (result && result.rows && result.rows.length) {
        let person = mapper.map_Person(result.rows[0]);

        person.employee = await get_employee(PersonId);
        person.emails = await get_emails(PersonId);
        person.addresses = await get_addresses(PersonId);
        person.phones = await get_phones(PersonId);
        
        return person; 
    }
}

export async function get_people(): Promise<station.Person[]> {
    let result = await db.execute_query(`SELECT * FROM Person`);
    if (result && result.rows && result.rows.length) {

        let out: station.Person[] = [];

        for (const el of result.rows) {
            let person = mapper.map_Person(el);
            let match = await get_person(person.PersonId);
            if (match) {out.push(match);}
        }

        return out;
    }

    return [];
}

export async function get_phones(PersonId: number): Promise<station.PhoneNumber[]> {
    return await map_many("PhoneNumber", "PersonId", PersonId, mapper.map_PhoneNumber);
}

export async function get_emails(PersonId: number): Promise<station.Email[]> {
    return await map_many("Email", "PersonId", PersonId, mapper.map_Email);
}

export async function get_addresses(PersonId: number): Promise<station.Address[]> {
    return await map_many("Address", "PersonId", PersonId, mapper.map_Address);
}

export async function get_employee_by_username(userName: string): Promise<station.Person | undefined> {
    
    let result = await db.execute_query(`SELECT * FROM Employee WHERE Username=:userName`, [userName]);

    if (result && result.rows && result.rows.length) {
        let employee = mapper.map_Employee(result.rows[0]);

        let person = await get_person(employee.PersonId);
    
        return person;
    }

    return undefined;
}

export async function get_employee(PersonId: number): Promise<station.Employee | undefined> {
    let result = await db.execute_query(`SELECT * FROM Employee WHERE PersonId = :PersonId`, [PersonId]);
    if (result && result.rows && result.rows.length) {

        let employee = mapper.map_Employee(result.rows[0]);

        employee.officer = await get_officer(employee.EmployeeId);
        employee.forensic_expert = await get_forensic_expert(employee.EmployeeId);
    
        return employee;
    }

    return undefined;
}

async function get_person_from_employee(empl: station.Employee): Promise<station.Person | undefined> {
    return await get_person(empl.PersonId);
}

export async function get_employees(): Promise<station.Person[]> {
    let result = await db.execute_query(`SELECT * FROM Employee`);
    if (result && result.rows && result.rows.length) {

        let out: station.Person[] = [];

        for (const el of result.rows) {
            let employee = mapper.map_Employee(el);
            let match = await get_person_from_employee(employee);
            if (match) {out.push(match);}
        }

        return out;
    }

    return [];
}

export async function get_officer(EmployeeId: number): Promise<station.Officer | undefined> {
    let result = await db.execute_query(`SELECT * FROM Officer WHERE EmployeeId=:EmployeeId`, [EmployeeId]);

    if (result && result.rows && result.rows.length) {
        let officer = mapper.map_Officer(result.rows[0]);
        return officer;
    }

    return undefined;
}

export async function get_forensic_expert(EmployeeId: number): Promise<station.ForensicExpert | undefined> {
    let result = await db.execute_query(`SELECT * FROM ForensicExpert WHERE EmployeeId=:EmployeeId`, [EmployeeId]);

    if (result && result.rows && result.rows.length) {
        let officer = mapper.map_ForensicExpert(result.rows[0]);
        return officer;
    }

    return undefined;
}

export async function get_visit(VisitId: number): Promise<station.Visit | undefined> {
    let result = await db.execute_query(`SELECT * FROM Visit WHERE VisitId=:VisitId`, [VisitId]);

    if (result && result.rows && result.rows.length) {
        let visit = mapper.map_Visit(result.rows[0]);
        return visit;
    }

    return undefined;
}

export async function get_arrest(ArrestNumber: number): Promise<station.Arrest | undefined> {
    let result = await db.execute_query(`SELECT * FROM Arrest WHERE ArrestNumber=:ArrestNumber`, [ArrestNumber]);

    if (result && result.rows && result.rows.length) {
        let arrest = mapper.map_Arrest(result.rows[0]);
        return arrest;
    }

    return undefined;
}

// Just a fast return of a list of all the cases with no sub-details.
export async function get_case_stubs(): Promise<station.Case[]> {
    let result = await db.execute_query(`SELECT * FROM "Case"`);

    if (result && result.rows && result.rows.length) {
        let cases = (result.rows as Array<any>).map(mapper.map_Case);
        let full_cases = [] as station.Case[];
        for (const Case of cases) {
            let full_case = await get_case(Case.CaseId);
            if (full_case) {
                full_cases.push();
            }
        }

        return full_cases;
    }

    return [];
}

// Full grab of a case.
export async function get_case(CaseId: number): Promise<station.Case | undefined> {
    let result = await db.execute_query(`SELECT * FROM "Case" WHERE CaseId=:CaseId`, [CaseId]);
    if (result && result.rows && result.rows.length) {

        let case_info = mapper.map_Case(result.rows[0]);

        case_info.arrests = await get_case_arrests(CaseId);
        case_info.assignments = await get_case_assignments(CaseId);
        case_info.evidence = await get_case_evidence(CaseId);
        case_info.notes = await get_case_notes(CaseId);
        case_info.visits = await get_case_visits(CaseId);

        return case_info;
    }

    return undefined;
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
    for (const t of tests) {
        t.forensic_experts = await get_test_experts(t.TestId);
    }

    return tests;
}

export async function get_test_experts(TestId: number): Promise<station.ForensicTestForensicExpert[]> {
    return await map_many("Evidence", "TestId", TestId, mapper.map_ForensicTestForensicExpert);
}

export async function get_test_stubs(): Promise<station.ForensicTest[]> {
    let result = await db.execute_query(`SELECT * FROM ForensicTest`);

    if (result && result.rows && result.rows.length) {
        return (result.rows as Array<any>).map(mapper.map_ForensicTest);
    }

    return [];
}