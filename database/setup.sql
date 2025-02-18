CREATE DATABASE IF NOT EXISTS Real_Fake_Car_Rentals;

USE Real_Fake_Car_Rentals;

CREATE TABLE IF NOT EXISTS Vehicles(
	CarID int auto_increment primary key,
    VIN varchar(255) unique not null,
    Mileage bigint not null,
    MPG int not null,
    Price decimal(7, 2) not null,
    IsActive bool,
    LicensePlate char(7) unique not null,
    CarYear year not null,
    Model varchar(255) not null,
    Make varchar(255) not null,
    Color varchar(255) not null,
    CarType varchar(255) not null
);

CREATE TABLE IF NOT EXISTS Administrator(
    AdminID int auto_increment primary key,
    `User` varchar(255) not null,           
    Email varchar(255) not null,           
    `Password` varchar(255) not null          
);

CREATE TABLE IF NOT EXISTS Customers(
	CustomerID int auto_increment primary key,
    FirstName varchar(255) not null,
    LastName varchar(255) not null,
    Email varchar(255) UNIQUE NOT NULL,
    UserName varchar(255) NOT NULL,
    Password varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Reservations(
	ReservationID int auto_increment primary key,
    StartDate date not null,
    EndDate date not null,
    Insurance boolean not null,
    CustomerID int not null,
    Vehicle int not null,
    constraint FK_CustomerReservation foreign key (CustomerID)
    references Customers(CustomerID),
    constraint FK_VehicleReservation foreign key (Vehicle)
    references Vehicles(CarID)
);

CREATE TABLE IF NOT EXISTS Reports(
	ReportID int auto_increment primary key,
    Damage varchar(255),
    GasAmount int not null,
    Vehicle int not null,
    ReservationID int not null,
    constraint FK_VehicleReport foreign key (Vehicle)
    references Vehicles(CarID),
    constraint FK_ReservationReport foreign key (ReservationID)
    references Reservations(ReservationID)
);

CREATE TABLE IF NOT EXISTS Sessions(
    SessionID VARCHAR(255) PRIMARY KEY,
    CustomerID INT,
    CONSTRAINT FK_SessionsCustomerID 
    FOREIGN KEY (CustomerID) 
    REFERENCES Customers(CustomerID)
);
