
-- Preferably, you would run this on fresh tables...
INSERT INTO PERSON (PersonId,FirstName, LastName, DoB, SSN) VALUES (1,'Jacob','Draddy',DATE '1927-12-12','1231231233');
INSERT INTO PERSON (PersonId,FirstName, LastName, DoB, SSN) VALUES (2,'Joe','Tester',DATE '1999-1-1','6456456456');
INSERT INTO PERSON (PersonId,FirstName, LastName, DoB, SSN) VALUES (3,'Joe','Smith',DATE '1980-2-2','456456456');
INSERT INTO PERSON (PersonId,FirstName, LastName, DoB, SSN) VALUES (4,'Bad','McScum',DATE '2000-3-10','267567576');

INSERT INTO PhoneNumber
(PId,PersonId,CountryCode,AreaCode,ExchangeCode,LineNumber,Extension) VALUES
(1,1,'1','540','234','1233',NULL);


INSERT INTO PhoneNumber
(PId,PersonId,CountryCode,AreaCode,ExchangeCode,LineNumber,Extension) VALUES
(2,1,'1','423','543','2344',NULL);


INSERT INTO PhoneNumber
(PId,PersonId,CountryCode,AreaCode,ExchangeCode,LineNumber,Extension) VALUES
(3,2,'1','546','675','3456','12453');

INSERT INTO Address
(AId,PersonId,StreetName,BuildingNumber,ZipCode,ZipExtension) VALUES
(1,1,'123 main street',NULL,'20005','1234');

INSERT INTO Address
(AId,PersonId,StreetName,BuildingNumber,ZipCode,ZipExtension) VALUES
(2,1,'124 main street','3','44102',NULL);

INSERT INTO Address
(AId,PersonId,StreetName,BuildingNumber,ZipCode,ZipExtension) VALUES
(3,2,'12 Picket Drive',NULL,'22445',NULL);


INSERT INTO Email
(EId,PersonId,EmailAddress) VALUES
(1,1,'email@example.com');

INSERT INTO Email
(EId,PersonId,EmailAddress) VALUES
(2,2,'test2@email2.com');

INSERT INTO Email
(EId,PersonId,EmailAddress) VALUES
(3,2,'test@email.com');

-- Hash is for asdfasdf
INSERT INTO Employee
(EmployeeId,PersonId,Username,HashedPassword,JobTitle,HireDate,FloorNumber,RoomNumber) VALUES
(1,1,'jdraddy','2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892','Detective',DATE '2019-10-3',2, '204');

INSERT INTO Employee
(EmployeeId,PersonId,Username,HashedPassword,JobTitle,HireDate,FloorNumber,RoomNumber) VALUES
(2,2,'jodraddy','2413fb3709b05939f04cf2e92f7d0897fc2596f9ad0b8a9ea855c7bfebaae892','ForensicExpert',DATE '2019-10-3',1, '101');



INSERT INTO Officer
(EmployeeId,BadgeId) VALUES
(1,1234);

    

INSERT INTO ForensicExpert
(EmployeeId,ForensicExpertId) VALUES
(2,1);

INSERT INTO Visit
(VisitId,PersonId,DateofVisit,Reason) VALUES
(1,3,DATE '2019-10-3','Mother');

INSERT INTO Arrest
(ArrestNumber,PersonId,BadgeId,DateofArrest,ArrestReason) VALUES
(1,4,1234,DATE '2019-10-3','Stole a sweet roll');


INSERT INTO "Case"
(CaseId,DateEntered,Status) VALUES
(1,DATE '2019-10-3','Closed');

INSERT INTO CaseVisit
(CaseId,VisitId) VALUES
(1,1);

INSERT INTO CaseArrest
(CaseId,ArrestNumber) VALUES
(1,1);

INSERT INTO CaseAssignments
(CaseId,EmployeeId) VALUES
(1,1);

INSERT INTO CaseAssignments
(CaseId,EmployeeId) VALUES
(1,2);

INSERT INTO CaseNote
(NoteId,Note,EmployeeId,DateEntered,CaseId) VALUES
(1,'Arrested someone',1,DATE '2019-10-3',1);

INSERT INTO CaseNote
(NoteId,Note,EmployeeId,DateEntered,CaseId) VALUES
(2,'Ran tests',2,DATE '2019-10-3',1);

INSERT INTO Evidence
(EvidenceId,CaseId,"Date",Address,"Description","Location") VALUES
(1,1,DATE '2019-10-3','123 Shop Street','sweet roll','bin 234A');


INSERT INTO ForensicTest
(TestId,EvidenceId,ResultDescription,"Date",TestName) VALUES
(1,1,'dna match id 12312312',DATE '2019-10-3','Dna Test');

INSERT INTO ForensicTestForensicExpert
(TestId,ForensicExpertId) VALUES
(1,1);


-- ROLLBACK;
COMMIT;
