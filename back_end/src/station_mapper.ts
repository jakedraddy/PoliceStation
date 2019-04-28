import * as station from "../../common/src/station";

/// This module maps from a database row to an object representing the table.

export function map_Person(row: any): station.Person {
    if (row) {

        let out = new station.Person();

        out.PersonId = row[0];
        out.LastName = row[1];
        out.FirstName = row[2];
        out.DoB = row[3];
        out.SSN = row[4];

        return out;

    }
    else {
        return new station.Person();
    }
}

export function map_PhoneNumber(row: any): station.PhoneNumber {
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
    else {
        return new station.PhoneNumber();
    }
}

export function map_Address(row: any): station.Address {
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
    else {
        return new station.Address();
    }
}

export function map_Email(row: any): station.Email {
    if (row) {

        let out = new station.Email();

        out.EId = row[0];
        out.PersonId = row[1];
        out.EmailAddress = row[2];

        return out;

    }
    else {
        return new station.Email();
    }
}

export function map_Employee(row: any): station.Employee {
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
    else {
        return new station.Employee();
    }
}

export function map_Officer(row: any): station.Officer {
    if (row) {

        let out = new station.Officer();

        out.EmployeeId = row[0];
        out.BadgeId = row[1];

        return out;

    }
    else {
        return new station.Officer();
    }
}

export function map_ForensicExpert(row: any): station.ForensicExpert {
    if (row) {

        let out = new station.ForensicExpert();

        out.EmployeeId = row[0];
        out.ForensicExpertId = row[1];

        return out;

    }
    else {
        return new station.ForensicExpert();
    }
}

export function map_Visit(row: any): station.Visit {
    if (row) {

        let out = new station.Visit();

        out.VisitId = row[0];
        out.PersonId = row[1];
        out.DateofVisit = row[2];
        out.Reason = row[3];

        return out;

    }
    else {
        return new station.Visit();
    }
}

export function map_Arrest(row: any): station.Arrest {
    if (row) {

        let out = new station.Arrest();

        out.ArrestNumber = row[0];
        out.PersonId = row[1];
        out.BadgeId = row[2];
        out.DateofArrest = row[3];
        out.ArrestReason = row[4];

        return out;

    }
    else {
        return new station.Arrest();
    }
}

export function map_Case(row: any): station.Case {
    if (row) {

        let out = new station.Case();
        out.CaseId = row[0];
        out.Title = row[1];
        out.DateEntered = row[2];
        out.Status = row[3];

        return out;


    }
    else {
        return new station.Case();
    }
}

export function map_CaseVisit(row: any): station.CaseVisit {
    if (row) {

        let out = new station.CaseVisit();

        out.CaseId = row[0];
        out.VisitId = row[1];

        return out;

    }
    else {
        return new station.CaseVisit();
    }
}

export function map_CaseArrest(row: any): station.CaseArrest {
    if (row) {
        let out = new station.CaseArrest();

        out.CaseID = row[0];
        out.ArrestNumber = row[1];

        return out;

    }
    else {
        return new station.CaseArrest();
    }
}

export function map_CaseAssignment(row: any): station.CaseAssignment {
    if (row) {

        let out = new station.CaseAssignment();

        out.CaseId = row[0];
        out.EmployeeId = row[1];

        return out;

    }
    else {
        return new station.CaseAssignment();
    }
}

export function map_CaseNote(row: any): station.CaseNote {
    if (row) {

        let out = new station.CaseNote();

        out.NoteId = row[0];
        out.Note = row[1];
        out.EmployeeId = row[2];
        out.DateEntered = row[3];
        out.CaseId = row[4];

        return out;

    }
    else {
        return new station.CaseNote();
    }
}

export function map_Evidence(row: any): station.Evidence {
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
    else {
        return new station.Evidence();
    }
}

export function map_ForensicTest(row: any): station.ForensicTest {
    if (row) {

        let out = new station.ForensicTest();

        out.TestId = row[0];
        out.EvidenceId = row[1];
        out.ResultDescription = row[2];
        out.Date = row[3];
        out.TestName = row[4];

        return out;

    }
    else {
        return new station.ForensicTest();
    }
}

export function map_ForensicTestForensicExpert(row: any): station.ForensicTestForensicExpert {
    if (row) {

        let out = new station.ForensicTestForensicExpert();

        out.TestId = row[0];
        out.ForensicExpertId = row[1];

        return out;

    }
    else {
        return new station.ForensicTestForensicExpert();
    }
}