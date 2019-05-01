
import * as station from '../../common/src/station'
import * as db from './db'
import * as oracle from 'oracledb';

export async function create_person(person: station.Person): Promise<station.Person> {
    let result = await db.execute_query(`BEGIN
    UPDATE Person SET 
        LastName = :LastName,
        FirstName = :FirstName,
        DoB = :DoB,
        SSN = :SSN
    WHERE PersonId = :PersonId;

    IF ( sql%notfound ) THEN
        INSERT INTO Person (
            LastName,
            FirstName,
            DoB,
            SSN)
            VALUES (
                :LastName,
                :FirstName,
                :DoB,
                :SSN)
        
    returning PersonId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `,
        {
            PersonId: person.PersonId,
            LastName: person.LastName,
            FirstName: person.FirstName,
            DoB: new Date(person.DoB), // Date is passed to us as a string because of json conversion...convert back here.
            SSN: person.SSN,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        }
    );
    let new_PersonId = person.PersonId;

    if (result && result.outBinds) {
        new_PersonId = person.PersonId || (result.outBinds as any).new_id[0];
    }

    person.PersonId = new_PersonId;

    for (const address of person.addresses) {
        address.PersonId = new_PersonId;
        await create_address(address);
    }

    for (const email of person.emails) {
        email.PersonId = new_PersonId;
        await create_email(email);
    }

    for (const phone of person.phones) {
        phone.PersonId = new_PersonId;
        await create_phone(phone);
    }

    return person;
}

export async function create_phone(phone: station.PhoneNumber): Promise<station.PhoneNumber> {
    let result = await db.execute_query(`BEGIN
    UPDATE PhoneNumber SET 
        PersonId = :PersonId,
        CountryCode = :CountryCode,
        AreaCode = :AreaCode,
        ExchangeCode = :ExchangeCode,
        LineNumber = :LineNumber,
        Extension = :Extension
    WHERE PId = :PId;

    IF ( sql%notfound ) THEN
        INSERT INTO PhoneNumber (
            PersonId
            CountryCode
            AreaCode
            ExchangeCode
            LineNumber
            Extension)
        VALUES (
            :PersonId
            :CountryCode
            :AreaCode
            :ExchangeCode
            :LineNumber
            :Extension)
    returning PId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `, {
            PId: phone.PId,
            PersonId: phone.PersonId,
            CountryCode: phone.CountryCode,
            AreaCode: phone.AreaCode,
            ExchangeCode: phone.ExchangeCode,
            LineNumber: phone.LineNumber,
            Extension: phone.Extension,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });

    if (result && result.outBinds) {
        phone.PId = phone.PId || (result.outBinds as any).new_id;
    }
    return phone;
}

export async function create_address(address: station.Address): Promise<station.Address> {
    let result = await db.execute_query(`BEGIN
    UPDATE Address SET 
        PersonId = :PersonId,
        StreetName = :StreetName,
        BuildingNumber = :BuildingNumber,
        ZipCode = :ZipCode,
        ZipExtension = :ZipExtension
    WHERE AId = :AId;

    IF ( sql%notfound ) THEN
        INSERT INTO Address (
            PersonId,
            StreetName,
            BuildingNumber,
            ZipCode,
            ZipExtension)
        VALUES (
            :PersonId,
            :StreetName,
            :BuildingNumber,
            :ZipCode,
            :ZipExtension)
    returning AId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `, {
            AId: address.AId,
            PersonId: address.PersonId,
            StreetName: address.StreetName,
            BuildingNumber: address.BuildingNumber,
            ZipCode: address.ZipCode,
            ZipExtension: address.ZipExtension,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });

    if (result && result.outBinds) {
        address.AId = (result.outBinds as any).new_id;
    }
    return address;
}

export async function create_email(email: station.Email): Promise<station.Email> {
    let result = await db.execute_query(`BEGIN
    UPDATE Email SET 
        PersonId = :PersonId,
        EmailAddress = :EmailAddress
    WHERE EId = :EId;

    IF ( sql%notfound ) THEN
        INSERT INTO Email (
            PersonId,
            EmailAddress)
        VALUES (
            :PersonId,
            :EmailAddress)
    returning EId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `, {
            EId: email.EId,
            PersonId: email.PersonId,
            EmailAddress: email.EmailAddress,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });

    if (result && result.outBinds) {
        email.EId = email.EId || (result.outBinds as any).new_id;
    }
    return email;
}

export async function create_employee(employee: station.Employee): Promise<station.Employee> {
    let result = await db.execute_query(`BEGIN
    UPDATE Employee SET 
        PersonId = :PersonId,
        Username = :Username, 
        HashedPassword = :HashedPassword, 
        JobTitle = :JobTitle, 
        HireDate = :HireDate, 
        FloorNumber = :FloorNumber,
        RoomNumber = :RoomNumber
    WHERE EmployeeId = :EmployeeId;

    IF ( sql%notfound ) THEN
        INSERT INTO Employee (
            PersonId,
            Username, 
            HashedPassword, 
            JobTitle, 
            HireDate, 
            FloorNumber,
            RoomNumber)
        VALUES (
            :PersonId,
            :Username, 
            :HashedPassword, 
            :JobTitle, 
            :HireDate, 
            :FloorNumber,
            :RoomNumber)
    returning EmployeeId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `,
        {
            EmployeeId: employee.EmployeeId,
            PersonId: employee.PersonId,
            Username: employee.Username,
            HashedPassword: employee.HashedPassword,
            JobTitle: employee.JobTitle,
            HireDate: employee.HireDate,
            FloorNumber: employee.FloorNumber,
            RoomNumber: employee.RoomNumber,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });

    if (result && result.outBinds) {
        employee.EmployeeId = employee.EmployeeId || (result.outBinds as any).new_id[0];
    }
    
    if (employee.officer) { 
            employee.officer.EmployeeId = employee.EmployeeId;
            create_officer(employee.officer); 
    };
    if (employee.forensic_expert) { 
        employee.forensic_expert.EmployeeId = employee.EmployeeId;
        create_forensic_expert(employee.forensic_expert); 
    };

    return employee;
}

export async function create_officer(officer: station.Officer): Promise<station.Officer> {
    let result = await db.execute_query(`BEGIN
    UPDATE Officer SET 
        EmployeeId = :EmployeeId, 
        BadgeId = :BadgeId 
    WHERE BadgeId = :BadgeId;

    IF ( sql%notfound ) THEN
        INSERT INTO Officer (
            EmployeeId, 
            BadgeId  
        )
        VALUES (
            :EmployeeId, 
            :BadgeId 
        )
    returning BadgeId INTO :new_id;
    END IF;
    COMMIT;
    END;
        `, { EmployeeId: officer.EmployeeId, BadgeId: officer.BadgeId,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER} });

    return officer;
}

export async function create_forensic_expert(expert: station.ForensicExpert): Promise<station.ForensicExpert> {
    await db.execute_query(`BEGIN
    UPDATE ForensicExpert SET 
        (EmployeeId = :EmployeeId,
        ForensicExpertId = :ForensicExpertId)
    WHERE EmployeeId = :EmployeeId;

    IF ( sql%notfound ) THEN
        INSERT INTO ForensicExpert (
            EmployeeId,
            ForensicExpertId  
        )
        VALUES (
            :EmployeeId,
            :ForensicExpertId
        )
    returning EmployeeId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `, {
            EmployeeId: expert.EmployeeId,
            ForensicExpertId: expert.ForensicExpertId,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });
    return expert;
}

export async function create_visit(visit: station.Visit): Promise<station.Visit> {
    let result = await db.execute_query(`BEGIN
    UPDATE Visit SET 
        PersonId = :PersonId,
        DateofVisit = :DateofVisit, 
        Reason = :Reason
    WHERE VisitId = :VisitId;

    IF ( sql%notfound ) THEN
        INSERT INTO Visit (
            VisitId,
            PersonId,
            DateofVisit, 
            Reason  
        )
        VALUES (
            :PersonId,
            :DateofVisit, 
            :Reason
        )
    returning VisitId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `, {
            VisitId: visit.VisitId,
            PersonId: visit.PersonId,
            DateofVisit: new Date(visit.DateofVisit),
            Reason: visit.Reason,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });

    if (result && result.outBinds) {
        visit.VisitId = visit.VisitId || (result.outBinds as any).new_id[0];
    }

    return visit;
}


export async function create_arrest(arrest: station.Arrest) {
    let result = await db.execute_query(`BEGIN
    UPDATE Arrest SET 
        PersonId = :PersonId,
        BadgeId = :BadgeId,
        DateofArrest = :DateofArrest, 
        ArrestReason = :ArrestReason
    WHERE ArrestNumber = :ArrestNumber;

    IF ( sql%notfound ) THEN
        INSERT INTO Arrest (
            PersonId,
            BadgeId,
            DateofArrest, 
            ArrestReason  
        )
        VALUES (
            :PersonId,
            :BadgeId,
            :DateofArrest, 
            :ArrestReason
        )
    returning ArrestNumber INTO :new_id;
    END IF;
    COMMIT;
    END;
    `, {
            ArrestNumber: arrest.ArrestNumber,
            PersonId: arrest.PersonId,
            BadgeId: arrest.BadgeId,
            DateofArrest: new Date(arrest.DateofArrest),
            ArrestReason: arrest.ArrestReason,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });

    if (result && result.outBinds) {
        arrest.ArrestReason = arrest.ArrestReason || (result.outBinds as any).new_id[0];
    }

    return arrest;
}

export async function create_case(case_info: station.Case) {
    let result = await db.execute_query(`BEGIN
    UPDATE "Case" SET 
        Title = :Title,
        DateEntered = :DateEntered, 
        Status = :Status
    WHERE CaseId = :CaseId;

    IF ( sql%notfound ) THEN
        INSERT INTO "Case" (
            Title,
            DateEntered, 
            Status
        )
        VALUES (
            :Title,
            :DateEntered, 
            :Status
        )
    returning CaseId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `, {
            CaseId: case_info.CaseId,
            Title: case_info.Title,
            DateEntered: new Date(case_info.DateEntered),
            Status: case_info.Status,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });

    if (result && result.outBinds) {
        case_info.CaseId = case_info.CaseId || (result.outBinds as any).new_id[0];
    }

    for (const visit of case_info.visits) {
        visit.CaseId = case_info.CaseId;
        await create_case_visit(visit);
    }

    for (const arrest of case_info.arrests) {
        arrest.CaseID = case_info.CaseId;
        await create_case_arrest(arrest);
    }

    for (const assignment of case_info.assignments) {
        assignment.CaseId = case_info.CaseId;
        await create_case_assignment(assignment);
    }

    for (const note of case_info.notes) {
        note.CaseId = case_info.CaseId;
        await create_case_note(note);
    }

    for (const evidence of case_info.evidence) {
        evidence.CaseId = case_info.CaseId;
        await create_evidence(evidence);
    }
}

export async function create_case_visit(case_visit: station.CaseVisit) {
    await db.execute_query(`BEGIN
    UPDATE CaseVisit SET 
        CaseId = :CaseId,
        VisitId = :VisitId
    WHERE       CaseId = :CaseId
            AND VisitId = :VisitId;

    IF ( sql%notfound ) THEN
        INSERT INTO CaseVisit (
            CaseId,
            VisitId
        )
        VALUES (
            :CaseId,
            :VisitId
        );
    END IF;
    COMMIT;
    END;
    `, {
            CaseId: case_visit.CaseId,
            VisitId: case_visit.VisitId
        });
}

export async function create_case_arrest(case_arrest: station.CaseArrest) {
    await db.execute_query(`BEGIN

    UPDATE CaseArrest SET 
        CaseID = :CaseID,
        ArrestNumber = :ArrestNumber
    WHERE   CaseId = :CaseId
        AND ArrestNumber = :ArrestNumber;

    IF ( sql%notfound ) THEN
        INSERT INTO CaseArrest (
            CaseID,
            ArrestNumber
        )
        VALUES (
            :CaseID,
            :ArrestNumber
        );
    END IF;
    COMMIT;
    END;
    `, {
            CaseID: case_arrest.CaseID,
            ArrestNumber: case_arrest.ArrestNumber
        });
}

export async function create_case_assignment(assignment: station.CaseAssignment) {
    await db.execute_query(`BEGIN

    UPDATE CaseAssignment SET 
        CaseID = :CaseID,
        EmployeeId = :EmployeeId
    WHERE   CaseId = :CaseId
        AND EmployeeId = :EmployeeId;

    IF ( sql%notfound ) THEN
        INSERT INTO CaseAssignment (
            CaseID,
            EmployeeId
        )
        VALUES (
            :CaseID,
            :EmployeeId
        );
    END IF;
    COMMIT;
    END;
    `, {
            CaseId: assignment.CaseId,
            EmployeeId: assignment.EmployeeId
        });
}

export async function create_case_note(note: station.CaseNote): Promise<station.CaseNote> {
    let result = await db.execute_query(`BEGIN
    UPDATE CaseNote SET 
            Note = :Note,
            EmployeeId = :EmployeeId,
            DateEntered = :DateEntered,
            CaseId = :CaseId
    WHERE NoteId = :NoteId;

    IF ( sql%notfound ) THEN
        INSERT INTO CaseNote (
            Note,
            EmployeeId,
            DateEntered,
            CaseId
        )
        VALUES (
            :Note,
            :EmployeeId,
            :DateEntered,
            :CaseId
        )
    returning NoteId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `, {
            NoteId: note.NoteId,
            Note: note.Note,
            EmployeeId: note.EmployeeId,
            DateEntered: new Date(note.DateEntered),
            CaseId: note.CaseId,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });



    if (result && result.outBinds) {
        note.NoteId = note.NoteId || (result.outBinds as any).new_id[0];
    }

    return note;
}

export async function create_evidence(evidence: station.Evidence): Promise<station.Evidence> {
    let result = await db.execute_query(`BEGIN
    UPDATE Evidence SET 
        CaseId = :CaseId,
        Date = :Date, 
        Address = :Address, 
        Description = :Description, 
        Location = :Location
    WHERE EvidenceId = :EvidenceId;

    IF ( sql%notfound ) THEN
        INSERT INTO Evidence (
            CaseId,
            Date, 
            Address, 
            Description, 
            Location
        )
        VALUES (
            :CaseId,
            :Date, 
            :Address, 
            :Description, 
            :Location
        )
    returning EvidenceId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `, {
            EvidenceId: evidence.EvidenceId,
            CaseId: evidence.CaseId,
            Date: evidence.Date,
            Address: evidence.Address,
            Description: evidence.Description,
            Location: evidence.Location,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });


    if (result && result.outBinds) {
        evidence.EvidenceId = evidence.EvidenceId || (result.outBinds as any).new_id[0];
    }

    if (result && result.rows && result.rows.length) {
        for (const test of evidence.tests) {
            test.EvidenceId = evidence.EvidenceId;
            await create_test(test);
        }
    }

    return evidence;
}

export async function create_test(test: station.ForensicTest): Promise<station.ForensicTest> {
    let result = await db.execute_query(`BEGIN

    UPDATE ForensicTest SET 
        EvidenceId = :EvidenceId,
        ResultDescription = :ResultDescription, 
        Date = :Date,
        TestName = :TestName
    WHERE TestId = :TestId;

    IF ( sql%notfound ) THEN
        INSERT INTO ForensicTest (
            EvidenceId,
            ResultDescription, 
            Date,
            TestName
        )
        VALUES (
            :EvidenceId,
            :ResultDescription, 
            :Date,
            :TestName
        )
    returning TestId INTO :new_id;
    END IF;
    COMMIT;
    END;
    `, {
            TestId: test.TestId,
            EvidenceId: test.EvidenceId,
            ResultDescription: test.ResultDescription,
            Date: new Date(test.Date),
            TestName: test.TestName,
            new_id: {dir: oracle.BIND_OUT, type: oracle.NUMBER}
        });

    if (result && result.outBinds) {
        test.TestId = test.TestId || (result.outBinds as any).new_id[0];
    }

    for (const expert of test.forensic_experts) {
        expert.TestId = test.TestId;
        await create_test_expert(expert);
    }

    return test;
}

export async function create_test_expert(expert: station.ForensicTestForensicExpert) {
    await db.execute_query(`BEGIN
    UPDATE ForensicTestForensicExpert SET 
        TestId,
        ForensicExpertId
    WHERE TestId = :TestId
        AND ForensicExpertId = :ForensicExpertId;

    IF ( sql%notfound ) THEN
        INSERT INTO ForensicTestForensicExpert (
            TestId,
            ForensicExpertId
        )
        VALUES (
            :TestId,
            :ForensicExpertId
        );
    END IF;
    COMMIT;
    END;
    `, {
            TestId: expert.TestId,
            ForensicExpertId: expert.ForensicExpertId
        });
}

