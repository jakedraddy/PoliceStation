
declare c int;
-- Person(PersonId, LastName, FirstName, DoB, SSN)

CREATE TABLE Person(
    PersonId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    LastName VARCHAR(30),
    FirstName VARCHAR(30),
    DoB DATE,
    SSN VARCHAR(10)
);

-- PhoneNumber(PId, PersonId, CountryCode, AreaCode, ExchangeCode, LineNumber, Extension)
CREATE TABLE PhoneNumber(
    PId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    PersonId INTEGER NOT NULL,
    CountryCode VARCHAR(2), 
    AreaCode VARCHAR(3), 
    ExchangeCode VARCHAR(3), 
    LineNumber VARCHAR(4), 
    Extension VARCHAR(8),
    
    CONSTRAINT fk_PhoneNumber_PersonId
        FOREIGN KEY (PersonId) 
        REFERENCES Person(PersonId)
        ON DELETE CASCADE
);

CREATE TABLE Address (
    AId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    PersonId NUMBER NOT NULL,
    StreetName VARCHAR(40), 
    BuildingNumber VARCHAR(20), 
    ZipCode CHAR(5) NOT NULL, 
    ZipExtension CHAR(4) NULL,
    
    CONSTRAINT fk_Address_PersonId
        FOREIGN KEY (PersonId)
        REFERENCES Person(PersonId)
        ON DELETE CASCADE
);

CREATE TABLE Email (
    EId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    PersonId INTEGER NOT NULL,
    EmailAddress VARCHAR(40),
    
    CONSTRAINT fk_Email_PersonId
        FOREIGN KEY (PersonId) 
        REFERENCES Person(PersonId)
        ON DELETE CASCADE
);

-- Employee()
CREATE TABLE Employee (
    EmployeeId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    PersonId NUMBER NOT NULL,
    Username VARCHAR(20), 
    HashedPassword VARCHAR(32), 
    JobTitle VARCHAR(20), 
    HireDate DATE, 
    FloorNumber NUMBER,
    RoomNumber VARCHAR(6),
    
    CONSTRAINT fk_Employee_PersonId
        FOREIGN KEY (PersonId) 
        REFERENCES Person(PersonId)
        ON DELETE CASCADE
    -- Make way to check for if employee is currently active
);

-- Officer()
CREATE TABLE Officer(
    EmployeeId NUMBER NOT NULL,        
    BadgeId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    CONSTRAINT fk_Officer_EmployeeId
        FOREIGN KEY (EmployeeId)
        REFERENCES Employee(EmployeeId)
        ON DELETE CASCADE
);

-- ForensicExpert(EmployeeId, ForensicExpertId)
CREATE TABLE ForensicExpert(
    EmployeeId NUMBER NOT NULL,
    ForensicExpertId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    
    CONSTRAINT fk_ForensicExpert_EmployeeId
        FOREIGN KEY (EmployeeId)
        REFERENCES Employee(EmployeeId)
        ON DELETE CASCADE
);

-- Visit(VisitId, PersonId, Date, Reason)
CREATE TABLE Visit (
    VisitId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    PersonId NUMBER NOT NULL,
    DateofVisit DATE, 
    Reason VARCHAR2(255),
    
    CONSTRAINT fk_Visit_PersonId
        FOREIGN KEY (PersonId) 
        REFERENCES Person(PersonId)
);

-- Arrest(ArrestNumber, PersonId, BadgeId, Date, ArrestReason)
CREATE TABLE Arrest (
    ArrestNumber NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    PersonId NUMBER NOT NULL,
    BadgeId NUMBER NOT NULL,
    DateofArrest DATE, 
    ArrestReason VARCHAR(100),
    
    CONSTRAINT fk_Arrest_PersonId
        FOREIGN KEY (PersonId) 
        REFERENCES Person(PersonId),
    CONSTRAINT fk_Arrest_BadgeId
        FOREIGN KEY (BadgeId) 
        REFERENCES Officer(BadgeId)
);

-- Case(CaseId, DateEntered, Status)
CREATE TABLE "Case" (
    CaseId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    Title VARCHAR(50),
    DateEntered DATE, 
    Status VARCHAR(10)
);

-- CaseVisit(CaseId, VisitId)
CREATE TABLE CaseVisit(
    CaseId NUMBER,
    VisitId NUMBER,
    
    PRIMARY KEY (CaseId, VisitId),
    CONSTRAINT fk_CaseVisit_CaseId
        FOREIGN KEY (CaseId) 
        REFERENCES "Case"(CaseId),
    CONSTRAINT fk_CaseVisit_VisitId
        FOREIGN KEY (VisitId)
        REFERENCES Visit(VisitId)
);

-- CaseArrest(CaseId, ArrestNumber)
CREATE TABLE CaseArrest(
    CaseID NUMBER,
    ArrestNumber NUMBER,
    
    PRIMARY KEY (CaseId, ArrestNumber),
    CONSTRAINT fk_CaseArrest_CaseId
        FOREIGN KEY (CaseId) 
        REFERENCES "Case"(CaseId),
    CONSTRAINT fk_CaseArrest_ArrestNumber
        FOREIGN KEY (ArrestNumber)
        REFERENCES Arrest(ArrestNumber)
);

-- CaseAssignments(CaseId, EmployeeId)
CREATE TABLE CaseAssignments (
    CaseId NUMBER,
    EmployeeId NUMBER,
    
    CONSTRAINT PK_CaseAssignments 
        PRIMARY KEY (CaseId, EmployeeId),
    CONSTRAINT fk_CaseAssignments_CaseId
        FOREIGN KEY (CaseId) 
        REFERENCES "Case"(CaseId),
    CONSTRAINT fk_CaseAssignments_EmployeeId
        FOREIGN KEY (EmployeeId) 
        REFERENCES Employee(EmployeeId)
);

-- CaseNote(NoteId, Note, EmployeeId, DateEntered, CaseId)
CREATE TABLE CaseNote (
    NoteId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Note VARCHAR2(2048),
    EmployeeId NUMBER,
    DateEntered DATE,
    CaseId NUMBER,
    
    CONSTRAINT fk_CaseNote_EmployeeId 
        FOREIGN KEY (EmployeeId) 
        REFERENCES Employee(EmployeeId),
    CONSTRAINT fk_CaseNote_CaseId 
        FOREIGN KEY (CaseId) 
        REFERENCES "Case"(CaseId)
);

-- Evidence(EvidenceId, CaseId, Date, Address, Description, Location)
CREATE TABLE Evidence(
    EvidenceId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    CaseId NUMBER,
    "Date" DATE, 
    Address VARCHAR(150), 
    "Description" VARCHAR(1024), 
    "Location" VARCHAR(150),
    
    CONSTRAINT fk_Evidence_CaseId
        FOREIGN KEY (CaseId) 
        REFERENCES "Case"(CaseId)
);

-- ForensicTest(TestId, EvidenceId, ResultDescription, Date, TestName)
CREATE TABLE ForensicTest (
    TestId NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY, 
    EvidenceId NUMBER,
    ResultDescription VARCHAR(1024), 
    "Date" DATE,
    TestName VARCHAR(50),
    
    CONSTRAINT fk_ForensicTest_EvidenceId
        FOREIGN KEY (EvidenceId) 
        REFERENCES Evidence(EvidenceId)
);

-- ForensicTestForensicExpert(TestId, ForensicExpertId)
CREATE TABLE ForensicTestForensicExpert(
    TestId NUMBER,
    ForensicExpertId NUMBER,
    
    CONSTRAINT fk_ForensicTestForensicExpert_TestId
        FOREIGN KEY (TestId) 
        REFERENCES FoensicTest(TestId),
    CONSTRAINT fk_ForensicTestForensicExpert_ForensicExpertId
        FOREIGN KEY (ForensicExpertId) 
        REFERENCES ForensicExpert(ForensicExpertId)
);