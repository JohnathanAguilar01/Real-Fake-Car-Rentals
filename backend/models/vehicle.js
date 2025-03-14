class Vehicle {
  constructor() {
    vin =
    mileage bigint not null,
    MPG int not null,
    Price decimal(7, 2) not null,
    IsActive bool,
    LicensePlate char(7) unique not null,
    CarYear year not null,
    Model varchar(255) not null,
    Make varchar(255) not null,
    Color varchar(255) not null,
    CarType varchar(255) not null

  }
}

export default Vehicle;
