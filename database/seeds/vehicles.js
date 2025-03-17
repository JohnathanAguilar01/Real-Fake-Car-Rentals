/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Vehicles").del();
  await knex("Vehicles").insert([
    {
      vin: "JHLRE3H57AC023983",
      mileage: 234,
      mpg: 40,
      price: 80.0,
      is_active: 1,
      license_plate: "5YGW550",
      car_year: "2019",
      model: "Sorento",
      make: "Kia",
      color: "Black",
      car_type: "SUV",
    },
    {
      vin: "1J4RR5GT2BC512008",
      mileage: 12465,
      mpg: 24,
      price: 80.0,
      is_active: 1,
      license_plate: "5YGW440",
      car_year: "2015",
      model: "GT-86",
      make: "Toyota",
      color: "Blue",
      car_type: "Coupe",
    },
    {
      vin: "4DRBWAFN06A207518",
      mileage: 190001,
      mpg: 18,
      price: 120.0,
      is_active: 1,
      license_plate: "6YGT250",
      car_year: "2004",
      model: "M3",
      make: "BMW",
      color: "Black",
      car_type: "Coupe",
    },
    {
      vin: "2FDKF38G3KCA42390",
      mileage: 23000,
      mpg: 18,
      price: 130.0,
      is_active: 1,
      license_plate: "6Y84U50",
      car_year: "2023",
      model: "Tacoma",
      make: "Toyota",
      color: "Grey",
      car_type: "Truck",
    },
    {
      vin: "JH4KA7570NC035422",
      mileage: 49800,
      mpg: 28,
      price: 100.0,
      is_active: 1,
      license_plate: "6Y84U90",
      car_year: "2017",
      model: "Explorer",
      make: "Ford",
      color: "White",
      car_type: "SUV",
    },
    {
      vin: "1G1BU51H2HX113345",
      mileage: 54830,
      mpg: 31,
      price: 110.0,
      is_active: 1,
      license_plate: "8YGT2U0",
      car_year: "2021",
      model: "Focus",
      make: "Ford",
      color: "Blue",
      car_type: "Sedan",
    },
    {
      vin: "1FAFP58S11A177991",
      mileage: 22000,
      mpg: 21,
      price: 180.0,
      is_active: 1,
      license_plate: "9YJT2I0",
      car_year: "2019",
      model: "911",
      make: "Porsche",
      color: "Red",
      car_type: "Coupe",
    },
  ]);
};
