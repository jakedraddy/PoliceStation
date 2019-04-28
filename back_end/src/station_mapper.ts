import * as station from "../../common/src/station";

/// This module maps from a database row to an object representing the table.

export function map_Person(row): station.Person {
    if (row) {

        let out = new station.Person();

        out.PersonId = row[0];
        out.LastName = row[1];
        out.FirstName = row[2];
        out.DoB = row[3];
        out.SSN = row[4];

        return out;

    }
}

export function map_PhoneNumber(row): station.PhoneNumber {
    if (row) {

        let out = new station.PhoneNumber();

        out.PId = row[0];
        out.PersonId = row[1];
        out.CountryCode = row[2];
        out.AreaCode = row[3];
        out.ExchangeCode = row[4];
        out.LineNumber = row[5];
        out.Extension = row[6];

        return out;

    }
}

export function map_Address(row): station.Address {
    if (row) {

        let out = new station.Address();

        out.AId = row[0];
        out.PersonId = row[1];
        out.StreetName = row[2];
        out.BuildingNumber = row[3];
        out.ZipCode = row[4];
        out.ZipExtension = row[5];

        return out;

    }
}

export function map_Email(row): station.Email {
    if (row) {

        let out = new station.Email();

        out.EId = row[0];
        out.PersonId = row[1];
        out.EmailAddress = row[2];

        return out;

    }
}

export function map_Employee(row): station.Employee {
    if (row) {

        let out = new station.Employee();

        out.EmployeeId = row[0];
        out.PersonId = row[1];
        out.Username = row[2];
        out.HashedPassword = row[3];
        out.JobTitle = row[4];
        out.HireDate = row[5];
        out.FloorNumber = row[6];
        out.RoomNumber = row[7];

        return out;

    }
}

export function map_Officer(row): station.Officer {
    if (row) {

        let out = new station.Officer();

        out.EmployeeId = row[0];
        out.BadgeId = row[1];

        return out;

    }
}

export function map_ForensicExpert(row): station.ForensicExpert {
    if (row) {

        let out = new station.ForensicExpert();

        out.EmployeeId = row[0];
        out.ForensicExpertId = row[1];

        return out;

    }
}

export function map_Visit(row): station.Visit {
    if (row) {

        let out = new station.Visit();

        out.VisitId = row[0];
        out.PersonId = row[1];
        out.DateofVisit = row[2];
        out.Reason = row[3];

        return out;

    }
}

export function map_Arrest(row): station.Arrest {
    if (row) {

        let out = new station.Arrest();

        out.ArrestNumber = row[0];
        out.PersonId = row[1];
        out.BadgeId = row[2];
        out.DateofArrest = row[3];
        out.ArrestReason = row[4];

        return out;

    }
}

export function map_Case(row): station.Case {
    if (row) {

        let out = new station.Case();
        out.CaseId = row[0];
        out.Title = row[1];
        out.DateEntered = row[2];
        out.Status = row[3];

        return out;


    }
}

export function map_CaseVisit(row): station.CaseVisit {
    if (row) {

        let out = new station.CaseVisit();

        out.CaseId = row[0];
        out.VisitId = row[1];

        return out;

    }
}

export function map_CaseArrest(row): station.CaseArrest {
    if (row) {
        let out = new station.CaseArrest();

        out.CaseID = row[0];
        out.ArrestNumber = row[1];

        return out;

    }
}

export function map_CaseAssignment(row): station.CaseAssignment {
    if (row) {

        let out = new station.CaseAssignment();

        out.CaseId = row[0];
        out.EmployeeId = row[1];

        return out;

    }
}

export function map_CaseNote(row): station.CaseNote {
    if (row) {

        let out = new station.CaseNote();

        out.NoteId = row[0];
        out.Note = row[1];
        out.EmployeeId = row[2];
        out.DateEntered = row[3];
        out.CaseId = row[4];

        return out;

    }
}

export function map_Evidence(row): station.Evidence {
    if (row) {

        let out = new station.Evidence();

        out.EvidenceId = row[0];
        out.CaseId = row[1];
        out.Date = row[2];
        out.Address = row[3];
        out.Description = row[4];
        out.Location = row[5];

        return out;

    }
}

export function map_ForensicTest(row): station.ForensicTest {
    if (row) {

        let out = new station.ForensicTest();

        out.TestId = row[0];
        out.EvidenceId = row[1];
        out.ResultDescription = row[2];
        out.Date = row[3];
        out.TestName = row[4];

        return out;

    }
}

export function map_ForensicTestForensicExpert(row): station.ForensicTestForensicExpert {
    if (row) {

        let out = new station.ForensicTestForensicExpert();

        out.TestId = row[0];
        out.ForensicExpertId = row[1];

        return out;

    }
}