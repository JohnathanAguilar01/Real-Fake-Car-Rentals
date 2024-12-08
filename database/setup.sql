DROP DATABASE IF EXISTS Real_Fake_Car_Rentals;
CREATE DATABASE IF NOT EXISTS Real_Fake_Car_Rentals;

USE Real_Fake_Car_Rentals;

create table Vehicles(
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

create table Administrator(
    AdminID int auto_increment primary key,
    `User` varchar(255) not null,           
    Email varchar(255) not null,           
    `Password` varchar(255) not null          
);

create table Customers(
	CustomerID int auto_increment primary key,
    FirstName varchar(255) not null,
    LastName varchar(255) not null,
    Email varchar(255),
    UserName varchar(255),
    Password varchar(255)
);

create table Reservations(
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

create table Reports(
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
