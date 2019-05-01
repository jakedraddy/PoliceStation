
import * as station from '../../common/src/station'
import * as db from './db'

export async function create_person(person: station.Person) {
    await db.execute_query(`BEGIN
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
                :SSN);
    END IF;
    END;
    `,
        {
            PersonId: person.PersonId,
            LastName: person.LastName,
            FirstName: person.FirstName,
            DoB: new Date(person.DoB), // Date is passed to us as a string because of json conversion...convert back here.
            SSN: person.SSN
        }
    );
    for (const address of person.addresses) {
        await create_address(address);
    }

    for (const email of person.emails) {
        await create_email(email);
    }
}

export async function create_address(address: station.Address) {
    await db.execute_query(`BEGIN
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
            :ZipExtension);
    END IF;
    END;
    `, {
            AId: address.AId,
            PersonId: address.PersonId,
            StreetName: address.StreetName,
            BuildingNumber: address.BuildingNumber,
            ZipCode: address.ZipCode,
            ZipExtension: address.ZipExtension
        });
}

export async function create_email(email: station.Email) {
    await db.execute_query(`BEGIN
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
            :EmailAddress);
    END IF;
    END;
    `, {
            EId: email.EId,
            PersonId: email.PersonId,
            EmailAddress: email.EmailAddress
        });
}

export async function create_employee(employee: station.Employee) {
    await db.execute_query(`BEGIN
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
            :RoomNumber);
    END IF;
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
            RoomNumber: employee.RoomNumber
        });

    if (employee.officer) { create_officer(employee.officer); };
    if (employee.forensic_expert) { create_forensic_expert(employee.forensic_expert); };
}

export async function create_officer(officer: station.Officer) {
    await db.execute_query(`BEGIN
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
        );
    END IF;
    END;
        `, { EmployeeId: officer.EmployeeId, BadgeId: officer.BadgeId });
}

export async function create_forensic_expert(expert: station.ForensicExpert) {
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
        );
    END IF;
    END;
    `, {
            EmployeeId: expert.EmployeeId,
            ForensicExpertId: expert.ForensicExpertId
        });
}

export async function create_visit(visit: station.Visit) {
    await db.execute_query(`BEGIN
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
        );
    END IF;
    END;
    `, {
            VisitId: visit.VisitId,
            PersonId: visit.PersonId,
            DateofVisit: new Date(visit.DateofVisit),
            Reason: visit.Reason
        });

    if (visit.arrest) {
        create_arrest(visit.arrest);
    }
}


export async function create_arrest(arrest: station.Arrest) {
    await db.execute_query(`BEGIN
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
        );
    END IF;
    END;
    `, {
            ArrestNumber: arrest.ArrestNumber,
            PersonId: arrest.PersonId,
            BadgeId: arrest.BadgeId,
            DateofArrest: new Date(arrest.DateofArrest),
            ArrestReason: arrest.ArrestReason
        });
}

export async function create_case(case_info: station.Case) {
    await db.execute_query(`BEGIN
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
            );
        END IF;
    END;
    `, {
            CaseId: case_info.CaseId,
            Title: case_info.Title,
            DateEntered: new Date(case_info.DateEntered),
            Status: case_info.Status
        });

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
    END;
    `, {
            CaseId: assignment.CaseId,
            EmployeeId: assignment.EmployeeId
        });
}

export async function create_case_note(note: station.CaseNote) {
    await db.execute_query(`BEGIN
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
        );
    END IF;
    END;
    `, {
            NoteId: note.NoteId,
            Note: note.Note,
            EmployeeId: note.EmployeeId,
            DateEntered: new Date(note.DateEntered),
            CaseId: note.CaseId
        });
}

export async function create_evidence(evidence: station.Evidence) {
    await db.execute_query(`BEGIN
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
        );
    END IF;
    END;
    `, {
            EvidenceId: evidence.EvidenceId,
            CaseId: evidence.CaseId,
            Date: evidence.Date,
            Address: evidence.Address,
            Description: evidence.Description,
            Location: evidence.Location
        });
}

export async function create_test(test: station.ForensicTest) {
    await db.execute_query(`BEGIN

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
        );
    END IF;
    END;
    `, {
            TestId: test.TestId,
            EvidenceId: test.EvidenceId,
            ResultDescription: test.ResultDescription,
            Date: new Date(test.Date),
            TestName: test.TestName
        });

    for (const expert of test.forensic_experts) {
        await create_test_expert(expert);
    }
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
    END;
    `, {
            TestId: expert.TestId,
            ForensicExpertId: expert.ForensicExpertId
        });
}

