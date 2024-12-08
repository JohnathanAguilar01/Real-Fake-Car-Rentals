/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Vehicles").del();
  await knex("Vehicles").insert([
    {
      VIN: "JHLRE3H57AC023983",
      Mileage: 234,
      MPG: 40,
      Price: 80.0,
      IsActive: 1,
      LicensePlate: "5YGW550",
      CarYear: "2019",
      Model: "Sorento",
      Make: "Kia",
      Color: "Black",
      CarType: "SUV",
    },
    {
      VIN: "1J4RR5GT2BC512008",
      Mileage: 12465,
      MPG: 24,
      Price: 80.0,
      IsActive: 1,
      LicensePlate: "5YGW440",
      CarYear: "2015",
      Model: "GT-86",
      Make: "Toyota",
      Color: "Blue",
      CarType: "Coupe",
    },
    {
      VIN: "4DRBWAFN06A207518",
      Mileage: 190001,
      MPG: 18,
      Price: 120.0,
      IsActive: 1,
      LicensePlate: "6YGT250",
      CarYear: "2004",
      Model: "M3",
      Make: "BMW",
      Color: "Black",
      CarType: "Coupe",
    },
  ]);
};
