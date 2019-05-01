import * as station from "../../common/src/station";

/// This module maps from a database row to an object representing the table.

export function map_Person(row: any): station.Person {
    if (row) {

        let out = new station.Person();

        out.PersonId = row.PERSONID;
        out.LastName = row.LASTNAME;
        out.FirstName = row.FIRSTNAME;
        out.DoB = row.DOB;
        out.SSN = row.SSN;

        return out;

    }
    else {
        return new station.Person();
    }
}

export function map_PhoneNumber(row: any): station.PhoneNumber {
    if (row) {

        let out = new station.PhoneNumber();

        out.PId = row.PID;
        out.PersonId = row.PERSONID;
        out.CountryCode = row.COUNTRYCODE;
        out.AreaCode = row.AREACODE;
        out.ExchangeCode = row.EXCHANGECODE;
        out.LineNumber = row.LINENUMBER;
        out.Extension = row.EXTENSION;

        return out;

    }
    else {
        return new station.PhoneNumber();
    }
}

export function map_Address(row: any): station.Address {
    if (row) {

        let out = new station.Address();

        out.AId = row.AID;
        out.PersonId = row.PERSONID;
        out.StreetName = row.STREETNAME;
        out.BuildingNumber = row.BUILDINGNUMBER;
        out.ZipCode = row.ZIPCODE;
        out.ZipExtension = row.ZIPEXTENSION;

        return out;

    }
    else {
        return new station.Address();
    }
}

export function map_Email(row: any): station.Email {
    if (row) {

        let out = new station.Email();

        out.EId = row.EID;
        out.PersonId = row.PERSONID;
        out.EmailAddress = row.EMAILADDRESS;

        return out;

    }
    else {
        return new station.Email();
    }
}

export function map_Employee(row: any): station.Employee {
    if (row) {

        let out = new station.Employee();

        out.EmployeeId = row.EMPLOYEEID;
        out.PersonId = row.PERSONID;
        out.Username = row.USERNAME;
        out.HashedPassword = row.HASHEDPASSWORD;
        out.JobTitle = row.JOBTITLE;
        out.HireDate = row.HIREDATE;
        out.FloorNumber = row.FLOORNUMBER;
        out.RoomNumber = row.ROOMNUMBER;

        return out;

    }
    else {
        return new station.Employee();
    }
}

export function map_Officer(row: any): station.Officer {
    if (row) {

        let out = new station.Officer();

        out.EmployeeId = row.EMPLOYEEID;
        out.BadgeId = row.BADGEID;

        return out;

    }
    else {
        return new station.Officer();
    }
}

export function map_ForensicExpert(row: any): station.ForensicExpert {
    if (row) {

        let out = new station.ForensicExpert();

        out.EmployeeId = row.EMPLOYEEID;
        out.ForensicExpertId = row.FORENSICEXPERTID;

        return out;

    }
    else {
        return new station.ForensicExpert();
    }
}

export function map_Visit(row: any): station.Visit {
    if (row) {

        let out = new station.Visit();

        out.VisitId = row.VISITID;
        out.PersonId = row.PERSONID;
        out.DateofVisit = row.DATEOFVISIT;
        out.Reason = row.REASON;

        return out;

    }
    else {
        return new station.Visit();
    }
}

export function map_Arrest(row: any): station.Arrest {
    if (row) {

        let out = new station.Arrest();

        out.ArrestNumber = row.ARRESTNUMBER;
        out.PersonId = row.PERSONID;
        out.BadgeId = row.BADGEID;
        out.DateofArrest = row.DATEOFARREST;
        out.ArrestReason = row.ARRESTREASON;

        return out;

    }
    else {
        return new station.Arrest();
    }
}

export function map_Case(row: any): station.Case {
    if (row) {

        let out = new station.Case();
        out.CaseId = row.CASEID;
        out.Title = row.TITLE;
        out.DateEntered = row.DATEENTERED;
        out.Status = row.STATUS;

        return out;


    }
    else {
        return new station.Case();
    }
}

export function map_CaseVisit(row: any): station.CaseVisit {
    if (row) {

        let out = new station.CaseVisit();

        out.CaseId = row.CASEID;
        out.VisitId = row.VISITID;

        return out;

    }
    else {
        return new station.CaseVisit();
    }
}

export function map_CaseArrest(row: any): station.CaseArrest {
    if (row) {
        let out = new station.CaseArrest();

        out.CaseID = row.CASEID;
        out.ArrestNumber = row.ARRESTNUMBER;

        return out;

    }
    else {
        return new station.CaseArrest();
    }
}

export function map_CaseAssignment(row: any): station.CaseAssignment {
    if (row) {

        let out = new station.CaseAssignment();

        out.CaseId = row.CASEID;
        out.EmployeeId = row.EMPLOYEEID;

        return out;

    }
    else {
        return new station.CaseAssignment();
    }
}

export function map_CaseNote(row: any): station.CaseNote {
    if (row) {

        let out = new station.CaseNote();

        out.NoteId = row.NOTEID;
        out.Note = row.NOTE;
        out.EmployeeId = row.EMPLOYEEID;
        out.DateEntered = row.DATEENTERED;
        out.CaseId = row.CASEID;

        return out;

    }
    else {
        return new station.CaseNote();
    }
}

export function map_Evidence(row: any): station.Evidence {
    if (row) {

        let out = new station.Evidence();

        out.EvidenceId = row.EVIDENCEID;
        out.CaseId = row.CASEID;
        out.Date = row.DATE;
        out.Address = row.ADDRESS;
        out.Description = row.DESCRIPTION;
        out.Location = row.LOCATION;

        return out;

    }
    else {
        return new station.Evidence();
    }
}

export function map_ForensicTest(row: any): station.ForensicTest {
    if (row) {

        let out = new station.ForensicTest();

        out.TestId = row.TESTID;
        out.EvidenceId = row.EVIDENCEID;
        out.ResultDescription = row.RESULTDESCRIPTION;
        out.Date = row.DATE;
        out.TestName = row.TESTNAME;

        return out;

    }
    else {
        return new station.ForensicTest();
    }
}

export function map_ForensicTestForensicExpert(row: any): station.ForensicTestForensicExpert {
    if (row) {

        let out = new station.ForensicTestForensicExpert();

        out.TestId = row.TESTID;
        out.ForensicExpertId = row.FORENSICEXPERTID;

        return out;

    }
    else {
        return new station.ForensicTestForensicExpert();
    }
}