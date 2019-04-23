export class Person {
    PersonId: number;
    LastName: string;
    FirstName: string;
    DoB: Date;
    SSN: string;

    addresses: Address[];
    emails: Email[];
    employee: Employee
}

export class PhoneNumber {
    PId: number;
    PersonId: number;
    CountryCode: string; 
    AreaCode: string; 
    ExchangeCode: string; 
    LineNumber: string; 
    Extension: string;
}

export class Address {
    AId: number; 
    PersonId: number;
    StreetName: string; 
    BuildingNumber: string; 
    ZipCode: string; 
    ZipExtension: string;

}

export class Email {
    EId: number;
    PersonId: number;
    EmailAddress: string;

}

export class Employee {
    EmployeeId: number; 
    PersonId: number;
    Username: string; 
    HashedPassword: string; 
    JobTitle: string; 
    HireDate: Date; 
    FloorNumber: number;
    RoomNumber: string;

    officer: Officer;
    forensic_expert: ForensicExpert;

}

export class Officer {
    EmployeeId: number;        
    BadgeId: number;
}

export class ForensicExpert {
    EmployeeId: number;
    ForensicExpertId: number;

}

export class Visit {
    VisitId: number;
    PersonId: number;
    DateofVisit: Date; 
    Reason: string;

    arrest: Arrest;
}

export class Arrest {
    ArrestNumber: number;
    PersonId: number;
    BadgeId: number;
    DateofArrest: Date; 
    ArrestReason: string;
}

export class Case {
    CaseId: number; 
    DateEntered: Date; 
    Status: string;

    visits: CaseVisit[];
    arrests: CaseArrest[];
    notes: CaseNote[];
    assignments: CaseAssignment[];
    evidence: Evidence[];
    tests: ForensicTest[];
}

export class CaseVisit {
    CaseId: number;
    VisitId: number;

}

export class CaseArrest {
    CaseID: number;
    ArrestNumber: number;
}

export class CaseAssignment {
    CaseId: number;
    EmployeeId: number;

}

export class CaseNote {
    NoteId: number;
    Note: string;
    EmployeeId: number;
    DateEntered: Date;
    CaseId: number;
}

export class Evidence {
    EvidenceId: number;
    CaseId: number;
    Date: Date; 
    Address: string; 
    Description: string; 
    Location: string;
}

export class ForensicTest {
    TestId: number; 
    EvidenceId: number;
    ResultDescription: string; 
    Date: Date;
    TestName: string;
    forensic_experts: ForensicTestForensicExpert[];
}

export class ForensicTestForensicExpert {
    TestId: number;
    ForensicExpertId: number;
}