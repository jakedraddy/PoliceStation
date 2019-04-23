
import * as mapper from './station_mapper';


import * as station from '../../common/src/station'

import * as db from './db'

export function create_person(person: station.Person) {
    db.execute_query(`INSERT INTO Person 
    PersonId,
    LastName,
    FirstName,
    DoB,
    SSN
    VALUES(:PersonId,
        :LastName,
        :FirstName,
        :DoB,
        :SSN);`, 
        [person.PersonId,
            person.LastName,
            person.FirstName,
            person.DoB,
            person.SSN]
    );
    
    person.addresses.forEach(address => {
        create_address(address);
    });

    person.emails.forEach(email => {
        create_email(email);
    })
}

export function create_address(address: station.Address) {
    db.execute_query(`INSERT INTO Address 
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
    :ZipExtension);
    `, [address.AId,
        address.PersonId,
        address.StreetName,
        address.BuildingNumber,
        address.ZipCode,
        address.ZipExtension]);
}

export function create_email(email: station.Email) {
    db.execute_query(`INSERT INTO Email 
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

export function create_employee(employee: station.Employee) {
    db.execute_query(`INSERT INTO Employee
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
    );
    `, 
    [employee.EmployeeId,
    employee.PersonId,
    employee.Username,
    employee.HashedPassword,
    employee.JobTitle,
    employee.HireDate,
    employee.FloorNumber,
    employee.RoomNumber]);

    create_officer(employee.officer);
    create_forensic_expert(employee.forensic_expert);
}

export function create_officer(officer: station.Officer) {
    db.execute_query(`INSERT INTO Officer EmployeeId, BadgeId VALUE (
        :EmployeeId,
        :BadgeId
        `[officer.EmployeeId, officer.BadgeId]);
}

export function create_forensic_expert(expert: station.ForensicExpert) {
    db.execute_query(`INSERT INTO ForensicExpert 
    :EmployeeId,
    :ForensicExpertId);
    `,[expert.EmployeeId,
        expert.ForensicExpertId]);
}



export function create_visit(visit: station.Visit) {
    db.execute_query(`INSERT INTO Visit 
    VisitId,
    PersonId,
    DateofVisit, 
    Reason VALUES (
    :VisitId,
    :PersonId,
    :DateofVisit, 
    :Reason
    )
    `[
        visit.VisitId,
        visit.PersonId,
        visit.DateofVisit, 
        visit.Reason]);

    if (visit.arrest) {
        create_arrest(visit.arrest);
    }
}


export function create_arrest(arrest: station.Arrest) {
    db.execute_query(`INSERT INTO Arrest
    ArrestNumber,
    PersonId,
    BadgeId,
    DateofArrest, 
    ArrestReason
    VALUES (
        :ArrestNumber,
        :PersonId,
        :BadgeId,
        :DateofArrest, 
        :ArrestReason
    );
    `,[
        arrest.ArrestNumber,
        arrest.PersonId,
        arrest.BadgeId,
        arrest.DateofArrest, 
        arrest.ArrestReason
    ]);
}

export function create_case(case_info: station.Case) {
    db.execute_query(`
    INSERT INTO "Case"
    CaseId, 
    Title,
    DateEntered, 
    Status
    VALUES (
        :CaseId, 
        :Title,
        :DateEntered, 
        :Status
    );
    `, [case_info.CaseId,
        case_info.Title,
        case_info.DateEntered, 
        case_info.Status]);

    case_info.visits.forEach(function(visit) {
        create_case_visit(visit);
    });


    case_info.arrests.forEach(function(arrest) {
        create_case_arrest(arrest);
    });

    case_info.assignments.forEach(function (assignment) {
        create_case_assignment(assignment);
    });

    case_info.notes.forEach((note) => {
        create_case_note(note);
    });

    case_info.evidence.forEach((evidence) => {
        create_evidence(evidence);
    });

    case_info.tests.forEach((test) => {
        create_test(test);
    });
}


export function create_case_visit(case_visit: station.CaseVisit) {
    db.execute_query(`
    INSERT INTO CaseVisit
    CaseId,
    VisitId
    VALUES (
        :CaseId,
        :VisitId
    );
    `,[case_visit.CaseId,
        case_visit.VisitId]);
}

export function create_case_arrest(case_arrest: station.CaseArrest) {
    db.execute_query(`
    INSERT INTO CaseArrest
    CaseID,
    ArrestNumber
    VALUES (
        :CaseID,
        :ArrestNumber
    );
    `[
        case_arrest.CaseID,
        case_arrest.ArrestNumber
    ]);
}

export function create_case_assignment(assignment: station.CaseAssignment) {
    db.execute_query(`
    INSERT INTO CaseAssignment
    CaseId,
    EmployeeId
    VALUES (
        :CaseId,
        :EmployeeId
    );
    `,[
        assignment.CaseId,
        assignment.EmployeeId
    ]);
}

export function create_case_note(note: station.CaseNote) {
    db.execute_query(`
    INSERT INTO CaseNote
    NoteId,
    Note,
    EmployeeId,
    DateEntered,
    CaseId
    VALUES (
        :NoteId,
        :Note,
        :EmployeeId,
        :DateEntered,
        :CaseId
    );
    `, [
        note.NoteId,
        note.Note,
        note.EmployeeId,
        note.DateEntered,
        note.CaseId
    ]);
}

export function create_evidence(evidence: station.Evidence) {
    db.execute_query(`
    INSERT INTO Evidence
    EvidenceId,
    CaseId,
    Date, 
    Address, 
    Description, 
    Location
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

export function create_test(test: station.ForensicTest) {
    db.execute_query(`
    INSERT INTO ForensicTest 
    TestId, 
    EvidenceId,
    ResultDescription, 
    Date,
    TestName
    VALUES (
        :TestId, 
        :EvidenceId,
        :ResultDescription, 
        :Date,
        :TestName
    );
    `,[
        test.TestId, 
        test.EvidenceId,
        test.ResultDescription, 
        test.Date,
        test.TestName
    ]);

    test.forensic_experts.forEach((expert) => {
        create_test_expert(expert);
    });
}


export function create_test_expert(expert: station.ForensicTestForensicExpert) {
    db.execute_query(`
    INSERT INTO ForensicTestForensicExpert
    TestId,
    ForensicExpertId
    VALUES (
        :TestId,
        :ForensicExpertId
    );
    `[
        expert.TestId,
        expert.ForensicExpertId
    ]);
}

