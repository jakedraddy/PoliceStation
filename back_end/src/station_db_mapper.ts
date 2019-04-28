
import * as station from '../../common/src/station'

import * as db from './db'

export async function create_person(person: station.Person) {
    await db.execute_query(`INSERT INTO Person 
    PersonId,
    LastName,
    FirstName,
    DoB,
    SSN
    VALUES(:PersonId,
        :LastName,
        :FirstName,
        :DoB,
        :SSN)`, 
        [person.PersonId,
            person.LastName,
            person.FirstName,
            person.DoB,
            person.SSN]
    );
    for (const address of person.addresses) {
        await create_address(address);
    }

    for (const email of person.emails) {
        await create_email(email);
    }
}

export async function create_address(address: station.Address) {
    await db.execute_query(`INSERT INTO Address 
    AId,
    PersonId,
    StreetName,
    BuildingNumber,
    ZipCode,
    ZipExtension
    VALUES(
    :AId,
    :PersonId,
    :StreetName,
    :BuildingNumber,
    :ZipCode,
    :ZipExtension)
    `, [address.AId,
        address.PersonId,
        address.StreetName,
        address.BuildingNumber,
        address.ZipCode,
        address.ZipExtension]);
}

export async function create_email(email: station.Email) {
    await db.execute_query(`INSERT INTO Email 
        EId,
        PersonId,
        EmailAddress
    VALUES (
        :EId,
        :PersonId,
        :EmailAddress
    )`, [   email.EId,
            email.PersonId,
            email.EmailAddress]);
}

export async function create_employee(employee: station.Employee) {
    await db.execute_query(`INSERT INTO Employee
    EmployeeId, 
    PersonId,
    Username, 
    HashedPassword, 
    JobTitle, 
    HireDate, 
    FloorNumber,
    RoomNumber 
    VALUES (
        :EmployeeId, 
        :PersonId,
        :Username, 
        :HashedPassword, 
        :JobTitle, 
        :HireDate, 
        :FloorNumber,
        :RoomNumber
    )
    `, 
    [employee.EmployeeId,
    employee.PersonId,
    employee.Username,
    employee.HashedPassword,
    employee.JobTitle,
    employee.HireDate,
    employee.FloorNumber,
    employee.RoomNumber]);

    if (employee.officer) {create_officer(employee.officer);};
    if (employee.forensic_expert) {create_forensic_expert(employee.forensic_expert);};
}

export async function create_officer(officer: station.Officer) {
    await db.execute_query(`INSERT INTO Officer EmployeeId, BadgeId VALUES (
        :EmployeeId,
        :BadgeId)
        `[officer.EmployeeId, officer.BadgeId]);
}

export async function create_forensic_expert(expert: station.ForensicExpert) {
    await db.execute_query(`INSERT INTO ForensicExpert (EmployeeId,
    ForensicExpertId) VALUES (
    :EmployeeId,
    :ForensicExpertId)
    `,[expert.EmployeeId,
        expert.ForensicExpertId]);
}

export async function create_visit(visit: station.Visit) {
    await db.execute_query(`INSERT INTO Visit 
    (VisitId,
    PersonId,
    DateofVisit, 
    Reason) VALUES (
    :VisitId,
    :PersonId,
    :DateofVisit, 
    :Reason
    )
    `,[
        visit.VisitId,
        visit.PersonId,
        visit.DateofVisit, 
        visit.Reason]);

    if (visit.arrest) {
        create_arrest(visit.arrest);
    }
}


export async function create_arrest(arrest: station.Arrest) {
    await db.execute_query(`INSERT INTO Arrest
    (ArrestNumber,
    PersonId,
    BadgeId,
    DateofArrest, 
    ArrestReason)
    VALUES (
        :ArrestNumber,
        :PersonId,
        :BadgeId,
        :DateofArrest, 
        :ArrestReason
    )
    `,[
        arrest.ArrestNumber,
        arrest.PersonId,
        arrest.BadgeId,
        arrest.DateofArrest, 
        arrest.ArrestReason
    ]);
}

export async function create_case(case_info: station.Case) {
    await db.execute_query(`
    INSERT INTO "Case"
    (CaseId, 
    Title,
    DateEntered, 
    Status)
    VALUES (
        :CaseId, 
        :Title,
        :DateEntered, 
        :Status
    )
    `, [case_info.CaseId,
        case_info.Title,
        case_info.DateEntered, 
        case_info.Status]);

    for (const visit of case_info.visits) {
        await create_case_visit(visit);
    }

    for (const arrest of case_info.arrests) {
        await create_case_arrest(arrest);
    }

    for (const assignment of case_info.assignments) {
        await create_case_assignment(assignment);
    }

    for (const note of case_info.notes) {
        await create_case_note(note);
    }

    for (const evidence of case_info.evidence) {
        await create_evidence(evidence);
    }

    for (const test of case_info.tests) {
        await create_test(test);
    }
}

export async function create_case_visit(case_visit: station.CaseVisit) {
    await db.execute_query(`
    INSERT INTO CaseVisit
    (CaseId,
    VisitId)
    VALUES (
        :CaseId,
        :VisitId
    )
    `,[case_visit.CaseId,
        case_visit.VisitId]);
}

export async function create_case_arrest(case_arrest: station.CaseArrest) {
    await db.execute_query(`
    INSERT INTO CaseArrest
    (CaseID,
    ArrestNumber)
    VALUES (
        :CaseID,
        :ArrestNumber
    )
    `[
        case_arrest.CaseID,
        case_arrest.ArrestNumber
    ]);
}

export async function create_case_assignment(assignment: station.CaseAssignment) {
    await db.execute_query(`
    INSERT INTO CaseAssignment
    (CaseId,
    EmployeeId)
    VALUES (
        :CaseId,
        :EmployeeId
    )
    `,[
        assignment.CaseId,
        assignment.EmployeeId
    ]);
}

export async function create_case_note(note: station.CaseNote) {
    await db.execute_query(`
    INSERT INTO CaseNote
    (NoteId,
    Note,
    EmployeeId,
    DateEntered,
    CaseId)
    VALUES (
        :NoteId,
        :Note,
        :EmployeeId,
        :DateEntered,
        :CaseId
    )
    `, [
        note.NoteId,
        note.Note,
        note.EmployeeId,
        note.DateEntered,
        note.CaseId
    ]);
}

export async function create_evidence(evidence: station.Evidence) {
    await db.execute_query(`
    INSERT INTO Evidence
    (EvidenceId,
    CaseId,
    Date, 
    Address, 
    Description, 
    Location)
    VALUES (
        :EvidenceId,
        :CaseId,
        :Date, 
        :Address, 
        :Description, 
        :Location
    )`,[
        evidence.EvidenceId,
        evidence.CaseId,
        evidence.Date, 
        evidence.Address, 
        evidence.Description, 
        evidence.Location
    ]);
}

export async function create_test(test: station.ForensicTest) {
    await db.execute_query(`
    INSERT INTO ForensicTest 
    (TestId, 
    EvidenceId,
    ResultDescription, 
    Date,
    TestName)
    VALUES (
        :TestId, 
        :EvidenceId,
        :ResultDescription, 
        :Date,
        :TestName
    )
    `,[
        test.TestId, 
        test.EvidenceId,
        test.ResultDescription, 
        test.Date,
        test.TestName
    ]);

    for (const expert of test.forensic_experts) {
        await create_test_expert(expert);
    }
}


export async function create_test_expert(expert: station.ForensicTestForensicExpert) {
    await db.execute_query(`
    INSERT INTO ForensicTestForensicExpert
    (TestId,
    ForensicExpertId)
    VALUES (
        :TestId,
        :ForensicExpertId
    )
    `[
        expert.TestId,
        expert.ForensicExpertId
    ]);
}

