import * as station from "./station";

/// This module maps from a database row to an object representing the table.

export function map_Person(row: any[]): station.Person { 
    let out = new station.Person();
    
    out.PersonId = row['PersonId'];
    out.LastName = row['LastName'];
    out.FirstName = row['FirstName'];
    out.DoB = row['DoB'];
    out.SSN = row['SSN'];

    return out;
}

export function map_PhoneNumber(row: any[]): station.PhoneNumber { 
    let out = new station.PhoneNumber();

    out.PId = row['PId'];
    out.PersonId = row['PersonId'];
    out.CountryCode = row['CountryCode']; 
    out.AreaCode = row['AreaCode']; 
    out.ExchangeCode = row['ExchangeCode']; 
    out.LineNumber = row['LineNumber']; 
    out.Extension = row['Extension'];

    return out;
}

export function map_Address(row: any[]): station.Address { 
    let out = new station.Address();

    out.AId = row['AId']; 
    out.PersonId = row['PersonId'];
    out.StreetName = row['StreetName']; 
    out.BuildingNumber = row['BuildingNumber']; 
    out.ZipCode = row['ZipCode']; 
    out.ZipExtension = row['ZipExtension'];

    return out;
}

export function map_Email(row: any[]): station.Email { 
    let out = new station.Email();

    out.EId = row['EId'];
    out.PersonId = row['PersonId'];
    out.EmailAddress = row['EmailAddress'];

    return out;
}

export function map_Employee(row: any[]): station.Employee { 
    let out = new station.Employee();

    out.EmployeeId = row['EmployeeId']; 
    out.PersonId = row['PersonId'];
    out.Username = row['Username']; 
    out.HashedPassword = row['HashedPassword']; 
    out.JobTitle = row['JobTitle']; 
    out.HireDate = row['HireDate']; 
    out.FloorNumber = row['FloorNumber'];
    out.RoomNumber = row['RoomNumber'];

    return out;
}

export function map_Officer(row: any[]): station.Officer { 
    let out = new station.Officer();

    out.EmployeeId = row['EmployeeId'];
    out.BadgeId = row['BadgeId'];

    return out;
}

export function map_ForensicExpert(row: any[]): station.ForensicExpert { 
    let out = new station.ForensicExpert();

    out.EmployeeId = row['EmployeeId'];
    out.ForensicExpertId = row['ForensicExpertId'];

    return out;
}

export function map_Visit(row: any[]): station.Visit { 
    let out = new station.Visit();

    out.VisitId = row['VisitId'];
    out.PersonId = row['PersonId'];
    out.DateofVisit = row['DateofVisit']; 
    out.Reason = row['Reason'];

    return out;
}

export function map_Arrest(row: any[]): station.Arrest { 
    let out = new station.Arrest();

    out.ArrestNumber = row['ArrestNumber'];
    out.PersonId = row['PersonId'];
    out.BadgeId = row['BadgeId'];
    out.DateofArrest = row['DateofArrest']; 
    out.ArrestReason = row['ArrestReason'];

    return out;
}

export function map_Case(row: any[]): station.Case { 
    let out = new station.Case();
    out.CaseId = row['CaseId']; 
    out.DateEntered = row['DateEntered']; 
    out.Status = row['Status'];

    return out;

}

export function map_CaseVisit(row: any[]): station.CaseVisit { 
    let out = new station.CaseVisit();

    out.CaseId = row['CaseId'];
    out.VisitId = row['VisitId'];

    return out;
}

export function map_CaseArrest(row: any[]): station.CaseArrest { 
    let out = new station.CaseArrest();

    out.CaseID = row['CaseID'];
    out.ArrestNumber = row['ArrestNumber'];

    return out;
}

export function map_CaseAssignments(row: any[]): station.CaseAssignments { 
    let out = new station.CaseAssignments();

    out.CaseId = row['CaseId'];
    out.EmployeeId = row['EmployeeId'];

    return out;
}

export function map_CaseNote(row: any[]): station.CaseNote { 
    let out = new station.CaseNote();

    out.NoteId = row['NoteId'];
    out.Note = row['Note'];
    out.EmployeeId = row['EmployeeId'];
    out.DateEntered = row['DateEntered'];
    out.CaseId = row['CaseId'];

    return out;
}

export function map_Evidence(row: any[]): station.Evidence { 
    let out = new station.Evidence();

    out.EvidenceId = row['EvidenceId'];
    out.CaseId = row['CaseId'];
    out.Date = row['Date']; 
    out.Address = row['Address']; 
    out.Description = row['Description']; 
    out.Location = row['Location'];

    return out;
}

export function map_ForensicTest(row: any[]): station.ForensicTest { 
    let out = new station.ForensicTest();

    out.TestId = row['TestId']; 
    out.EvidenceId = row['EvidenceId'];
    out.ResultDescription = row['ResultDescription']; 
    out.Date = row['Date'];
    out.TestName = row['TestName'];

    return out;
}

export function map_ForensicTestForensicExpert(row: any[]): station.ForensicTestForensicExpert { 
    let out = new station.ForensicTestForensicExpert();

    out.TestId = row['TestId'];
    out.ForensicExpertId = row['ForensicExpertId'];

    return out;
}