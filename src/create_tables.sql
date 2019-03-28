-- Person(PersonId, LastName, FirstName, DoB, SSN)
CREATE TABLE Person(
    PersonId INTEGER PRIMARY KEY,
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    DoB DATETIME,
    SSN VARCHAR(10)
);

-- PhoneNumber(PId, PersonId, CountryCode, AreaCode, ExchangeCode, LineNumber, Extension)
CREATE TABLE PhoneNumber(
    PId INTEGER PRIMARY KEY,
    FOREIGN KEY PersonId 
        REFERENCES Person(PersonId)
        ON DELETE CASCADE
        NOT NULL,
    CountryCode VARCHAR(2), 
    AreaCode VARCHAR(3), 
    ExchangeCode VARCHAR(3), 
    LineNumber VARCHAR(4), 
    Extension VARCHAR(8)
)

CREATE TABLE Address (
    AId, 
    FOREIGN KEY PersonId 
        REFERENCES Person(PersonId)
        ON DELETE CASCADE
        NOT NULL,
    StreetName VARCHAR(40), 
    BuildingNumber VARCHAR(20), 
    ZipCode CHAR(5) NOT NULL, 
    ZipExtension CHAR(4) NULL
);


CREATE TABLE Email (
    EId INTEGER PRIMARY KEY, 
    FOREIGN KEY PersonId 
        REFERENCES Person(PersonId)
        ON DELETE CASCADE
        NOT NULL, 
    EmailAddress VARCHAR(40)
);

-- Employee()
CREATE TABLE Employee (
    EmployeeId INTEGER PRIMARY KEY, 
    FOREIGN KEY PersonId 
        REFERENCES Person(PersonId)
        ON DELETE CASCADE
        NOT NULL,
    Username VARCHAR(20), 
    HashedPassword VARCHAR(32), 
    JobTitle VARCHAR(20), 
    HireDate DATETIME, 
    FOREIGN KEY DeskId 
        REFERENCES Desk(DeskId)
        ON DELETE CASCADE
)

-- Desk(DeskId, FloorNumber, RoomNumber)
CREATE TABLE Desk(
    DeskId INTEGER PRIMARY KEY, 
    FloorNumber INTEGER PRIMARY KEY, 
    RoomNumber VARCHAR(6)
);
-- Officer
CREATE TABLE Officer(
    FOREIGN KEY EmployeeId
        REFERENCES Employee(EmployeeId)
        ON DELETE CASCADE, 
    BadgeId VARCHAR(10)

    CONSTRAINT Unique_BadgeId UNIQUE (BadgeId)
);

-- ForensicExpert(EmployeeId, ForensicExpertId)
CREATE TABLE ForensicExpert(
    FOREIGN KEY EmployeeId
        REFERENCES Employee(EmployeeId)
        ON DELETE CASCADE, 
    
    ForensicExpertId INTEGER PRIMARY KEY -- todo auto number, oracle does not make this easy like other dbms
);


-- Visit(VisitId, PersonId, Date, Reason)
CREATE TABLE Visit (
    VisitId INTEGER PRIMARY KEY, 
    FOREIGN KEY PersonId REFERENCES Person(PersonId), 
    "Date" DATETIME, 
    Reason VARCHAR2(255)
);

-- Arrest(ArrestNumber, PersonId, BadgeId, Date, ArrestReason)
CREATE TABLE Arrest (
    ArrestNumber INTEGER PRIMARY KEY, 
    FOREIGN KEY PersonId REFERENCES Person(PersonId), 
    FOREIGN KEY BadgeId REFERNCES Officer(BadgeId), 
    "Date" DATETIME, 
    ArrestReason VARCHAR(100)
);

-- Case(CaseId, DateEntered, Status)
CREATE TABLE Case (
    CaseId INTEGER PRIMARY KEY, 
    DateEntered DATETIME, 
    Status VARCHAR(10)
);

-- CaseVisit(CaseId, VisitId)
CREATE TABLE CaseVisit(
    FOREIGN KEY CaseId REFERENCES Case(CaseId) PRIMARY KEY,
    FOREIGN KEY VisitId REFERENCES Visit(VisitId)
);

-- CaseArrest(CaseId, ArrestNumber)
CREATE TABLE CaseArrest(
    ArrestNumber INTEGER PRIMARY KEY,
    FOREIGN KEY CaseId REFERENCES Case(CaseId)
);


-- CaseAssignments(CaseId, EmployeeId)
CREATE TABLE CaseAssignments (
    FOREIGN KEY CaseId REFERENCES Case(CaseId),
    FOREIGN KEY EmployeeId REFERENCES Employee(EmployeeId),
    
    CONSTRAINT PK_CaseAssignments PRIMARY KEY (CaseId, EmployeeId)
);
-- CaseNote(NoteId, Note, EmployeeId, DateEntered, CaseId)
CREATE TABLE CaseNote (
    NoteId INTEGER PRIMARY KEY,
    Note VARCHAR(2048),
    FOREIGN KEY EmployeeId REFERENCES Employee(EmployeeId),
    DateEntered DATETIME,
    FOREIGN KEY CaseId REFERENCES Case(CaseId)
);

-- Evidence(EvidenceId, CaseId, Date, Address, Description, Location)
CREATE TABLE Evidence(
    EvidenceId INTEGER PRIMARY KEY, 
    FOREIGN KEY CaseId REFERENCES Case(CaseId), 
    "Date" DATETIME, 
    Address VARCHAR(150), 
    Description VARCHAR(1024), 
    Location VARCHAR(150)
)


-- ForensicTest(TestId, EvidenceId, ResultDescription, Date, TestName)
CREATE TABLE ForensicTest (
    TestId INTEGER PRIMARY KEY, 
    FOREIGN KEY EvidenceId REFERENCES Evidence(EvidenceId), 
    ResultDescription VARCHAR(1024), 
    "Date" DATETIME,
    TestName VARCHAR(50)
)
-- ForensicTestForensicExpert(TestId, ForensicExpertId)
CREATE TABLE ForensicTestForensicExpert(
    FOREIGN KEY TestId REFERENCES FoensicTest(TestId),
    FOREIGN KEY ForensicExpertId REFERENCES ForensicExpert(ForensicExpertId)
);