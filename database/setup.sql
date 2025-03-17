CREATE DATABASE IF NOT EXISTS Real_Fake_Car_Rentals;

USE Real_Fake_Car_Rentals;

CREATE TABLE IF NOT EXISTS Cars(
	car_id int auto_increment primary key,
  vin varchar(255) unique not null,
  mileage bigint not null,
  mpg int not null,
  price DECIMAL(7, 2) NOT NULL,
  is_active BOOLEAN,
  license_plate CHAR(7) UNIQUE NOT NULL,
  car_year year NOT NULL,
  model VARCHAR(255) NOT NULL,
  make VARCHAR(255) NOT NULL,
  color VARCHAR(255) NOT NULL,
  car_type VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Users(
	user_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS Reservations(
	reservation_id INT AUTO_INCREMENT PRIMARY KEY,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  insurance BOOLEAN NOT NULL,
  user_id INT NOT NULL,
  car_id INT NOT NULL,
  CONSTRAINT FK_UserReservation FOREIGN KEY (user_id)
  REFERENCES Users(user_id),
  CONSTRAINT FK_CarReservation FOREIGN KEY (car_id)
  REFERENCES Cars(car_id)
);

CREATE TABLE IF NOT EXISTS Sessions(
    session_id VARCHAR(255) PRIMARY KEY,
    user_id INT,
    expire_login DATE,
    last_login DATE,
    CONSTRAINT FK_SessionsUserID 
    FOREIGN KEY (user_id) 
    REFERENCES Users(user_id)
);
