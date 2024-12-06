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
  ]);
};
