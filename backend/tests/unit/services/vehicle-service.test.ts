import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import VehicleService from "../../../src/services/vehicle-service.ts";
import Vehicle from "../../../src/models/vehicle.ts";
import db from "../../../src/config/db.ts";

vi.mock("../../../src/models/vehicle.ts"); // Mock the service
vi.mock("../../../src/config/db.ts");

const mockDb = vi.mocked(db);
const mockVehicle = vi.mocked(Vehicle);

describe("VehicleService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("getAllVehicles", () => {
    test("If all is ok", async () => {
      // Mock response data
      const mockVehicles = [
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
      ];

      mockDb.query.mockResolvedValue(mockVehicles);

      const results = await VehicleService.getAllVehicles();

      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM Cars"),
      );
      expect(results).toBe(mockVehicles);
    });
  });
});
