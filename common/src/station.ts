export class Person {
    PersonId: number;
    LastName: string;
    FirstName: string;
    DoB: Date;
    SSN: string;

    addresses: Address[];
    emails: Email[];
    phones: PhoneNumber[];
    employee: Employee | undefined;

    constructor () {
        this.PersonId = 0;
        this.LastName = '';
        this.FirstName = '';
        this.DoB = new Date();
        this.SSN = '';
    
        this.addresses = [];
        this.emails = [];
        this.phones = [];
        this.employee = new Employee();
    }
}

export class PhoneNumber {
    PId: number;
    PersonId: number;
    CountryCode: string; 
    AreaCode: string; 
    ExchangeCode: string; 
    LineNumber: string; 
    Extension: string;

    constructor () {
        this.PId = 0;
        this.PersonId = 0;
        this.CountryCode = ''; 
        this.AreaCode = ''; 
        this.ExchangeCode = ''; 
        this.LineNumber = ''; 
        this.Extension = '';
    }
}

export class Address {
    AId: number; 
    PersonId: number;
    StreetName: string; 
    BuildingNumber: string; 
    ZipCode: string; 
    ZipExtension: string;

    constructor () {
        this.AId = 0; 
        this.PersonId = 0;
        this.StreetName = ''; 
        this.BuildingNumber = ''; 
        this.ZipCode = ''; 
        this.ZipExtension = '';
    }
}

export class Email {
    EId: number;
    PersonId: number;
    EmailAddress: string;

    constructor () {
        this.EId = 0;
        this.PersonId = 0;
        this.EmailAddress = '';
    }
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

    officer: Officer | undefined;
    forensic_expert: ForensicExpert | undefined;

    constructor () {
        this.EmployeeId = 0; 
        this.PersonId = 0;
        this.Username = ''; 
        this.HashedPassword = ''; 
        this.JobTitle = ''; 
        this.HireDate = new Date(); 
        this.FloorNumber = 0;
        this.RoomNumber = '';
    
        this.officer = undefined;
        this.forensic_expert = undefined;
    }
}

export class Officer {
    EmployeeId: number;        
    BadgeId: number;
    
    constructor () {
        this.EmployeeId = 0;        
        this.BadgeId = 0;
    }
}

export class ForensicExpert {
    EmployeeId: number;
    ForensicExpertId: number;

    constructor () {
        this.EmployeeId = 0;
        this.ForensicExpertId = 0;
    }
}

export class Visit {
    VisitId: number;
    PersonId: number;
    DateofVisit: Date; 
    Reason: string;

    arrest: Arrest | undefined;
    
    constructor () {
        this.VisitId = 0;
        this.PersonId = 0;
        this.DateofVisit = new Date(); 
        this.Reason = '';
    
        this.arrest = undefined;
    }
}

export class Arrest {
    ArrestNumber: number;
    PersonId: number;
    BadgeId: number;
    DateofArrest: Date; 
    ArrestReason: string;
    
    constructor () {
        this.ArrestNumber = 0;
        this.PersonId = 0;
        this.BadgeId = 0;
        this.DateofArrest = new Date(); 
        this.ArrestReason = '';
    }
}


export class Case {
    CaseId: number; 
    DateEntered: Date; 
    Status: string;
    Title: string;

    visits: CaseVisit[];
    arrests: CaseArrest[];
    notes: CaseNote[];
    assignments: CaseAssignment[];
    evidence: Evidence[];
    tests: ForensicTest[];
    
    constructor () {
        this.CaseId = 0; 
        this.DateEntered = new Date(); 
        this.Status = '';
        this.Title = '';
    
        this.visits = [];
        this.arrests = [];
        this.notes = [];
        this.assignments = [];
        this.evidence = [];
        this.tests = [];
    }
}

export class CaseVisit {
    CaseId: number;
    VisitId: number;

    constructor () {
        this.CaseId = 0;
        this.VisitId = 0;
    }
}

export class CaseArrest {
    CaseID: number;
    ArrestNumber: number;
    
    constructor () {
        this.CaseID = 0;
        this.ArrestNumber = 0;
    }
}

export class CaseAssignment {
    CaseId: number;
    EmployeeId: number;

    constructor () {
        this.CaseId = 0;
        this.EmployeeId = 0;
    }
}

export class CaseNote {
    NoteId: number;
    Note: string;
    EmployeeId: number;
    DateEntered: Date;
    CaseId: number;
    
    constructor () {
        this.NoteId = 0;
        this.Note = '';
        this.EmployeeId = 0;
        this.DateEntered = new Date();
        this.CaseId = 0;
        
    }
}

export class Evidence {
    EvidenceId: number;
    CaseId: number;
    Date: Date; 
    Address: string; 
    Description: string; 
    Location: string;
    
    constructor () {
        this.EvidenceId = 0;
        this.CaseId = 0;
        this.Date = new Date(); 
        this.Address = ''; 
        this.Description = ''; 
        this.Location = '';
    }
}

export class ForensicTest {
    TestId: number; 
    EvidenceId: number;
    ResultDescription: string; 
    Date: Date;
    TestName: string;
    forensic_experts: ForensicTestForensicExpert[];
    
    constructor () {
        this.TestId = 0; 
        this.EvidenceId = 0;
        this.ResultDescription = ''; 
        this.Date = new Date();
        this.TestName = '';
        this.forensic_experts = [];
    }
}

export class ForensicTestForensicExpert {
    TestId: number;
    ForensicExpertId: number;
    
    constructor () {
        this.TestId = 0;
        this.ForensicExpertId = 0;
    }
}