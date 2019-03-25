-- Person(PersonId, LastName, FirstName, DoB, SSN)
CREATE TABLE Person(
    PersonId INTEGER PRIMARY KEY,
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    DoB DATETIME,
    SSN VARCHAR(10)
)

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
CREATE TABLE (
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
)
-- Officer
CREATE TABLE Officer(
    FOREIGN KEY EmployeeId
        REFERENCES Employee(EmployeeId)
        ON DELETE CASCADE, 
    BadgeId VARCHAR(10)

    CONSTRAINT Unique_BadgeId UNIQUE (BadgeId)
)

-- ForensicExpert(EmployeeId, ForensicExpertId)
CREATE TABLE ForensicExpert(
    FOREIGN KEY EmployeeId
        REFERENCES Employee(EmployeeId)
        ON DELETE CASCADE, 
    
    ForensicExpertId INTEGER PRIMARY KEY -- todo auto number, oracle does not make this easy like other dbms
)


-- Visit(VisitId, PersonId, Date, Reason)
-- Arrest(ArrestNumber, PersonId, BadgeId, Date, ArrestReason)

-- Case(CaseId, DateEntered, Status)
-- CaseVisit(CaseId, VisitId)
-- CaseArrest(CaseId, ArrestNumber)
-- CaseAssignments(CaseId, EmployeeId)
-- CaseNote(NoteId, Note, EmployeeId, DateEntered, CaseId)

-- Evidence(EvidenceId, CaseId, Date, Address, Description, Location)

-- ForensicTest(TestId, EvidenceId, ResultDescription, Date, TestName)
-- ForensicTestForensicExpert(TestId, ForensicExpertId)