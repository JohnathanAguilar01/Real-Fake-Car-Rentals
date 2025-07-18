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
    it("should return all vehicles from the database", async () => {
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

      mockDb.query.mockResolvedValue([mockVehicles]);

      const results = await VehicleService.getAllVehicles();

      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining("SELECT * FROM Cars"),
      );
      expect(results).toBe(mockVehicles);
    });

    it("should handle database errors", async () => {
      const mockError = new Error("Database connection failed");

      mockDb.query.mockRejectedValue(mockError);
      await expect(VehicleService.getAllVehicles()).rejects.toThrow(
        "Database connection failed",
      );
    });
  });

  describe("getAllAvailableVehicles", () => {
    it("should return available vehicles for given type and date range", async () => {
      const carType = "sedan";
      const startDate = "2025-07-15";
      const endDate = "2025-07-18";

      const mockVehicles = [
        {
          vin: "JHLRE3H57AC023983",
          mileage: 234,
          mpg: 30,
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
          mpg: 54,
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

      mockDb.query.mockResolvedValue([mockVehicles]);

      const results = await VehicleService.getAvailableVehicles(
        carType,
        startDate,
        endDate,
      );

      expect(results).toBe(mockVehicles);
      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining(
          "SELECT car_id, mileage, mpg, price, car_year, model, make, color, car_type, vin from Cars",
        ),
        expect.arrayContaining([carType, startDate, endDate]),
      );
    });

    it("should return empty array when no vehicles are available", async () => {
      const carType = "sedan";
      const startDate = "2025-07-15";
      const endDate = "2025-07-18";

      const mockVehicles = [];

      mockDb.query.mockResolvedValue([mockVehicles]);

      const results = await VehicleService.getAvailableVehicles(
        carType,
        startDate,
        endDate,
      );

      expect(results).toBe(mockVehicles);
      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining(
          "SELECT car_id, mileage, mpg, price, car_year, model, make, color, car_type, vin from Cars",
        ),
        expect.arrayContaining([carType, startDate, endDate]),
      );
    });

    it("should handle database errors", async () => {
      const carType = "sedan";
      const startDate = "2025-07-15";
      const endDate = "2025-07-18";
      const mockError = new Error("Database connection failed");

      mockDb.query.mockRejectedValue(mockError);
      await expect(
        VehicleService.getAvailableVehicles(carType, startDate, endDate),
      ).rejects.toThrow("Database connection failed");
    });
  });

  describe("rentVehicle", () => {
    it("should successfully create a vehicle reservation and return reservation id", async () => {
      const startDate = "2025-07-15";
      const endDate = "2025-07-18";
      const insuranceBoolean = 1;
      const userId = 2;
      const carId = 3;

      const mockInsertId = 123;
      const mockDbResponse = { insertId: mockInsertId };
      const queryCall =
        "INSERT INTO Reservations (start_date, end_date, insurance, user_id, car_id)" +
        "VALUES (?, ?, ?, ?, ?)";

      mockDb.query.mockResolvedValue([mockDbResponse]);

      const results = await VehicleService.rentVehicle(
        startDate,
        endDate,
        insuranceBoolean,
        userId,
        carId,
      );

      expect(results).toEqual({ reservationsId: mockInsertId });
      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining(queryCall),
        expect.arrayContaining([
          startDate,
          endDate,
          insuranceBoolean,
          userId,
          carId,
        ]),
      );
    });

    it("should return null if reservation insert fails silently", async () => {
      const startDate = "2025-07-15";
      const endDate = "2025-07-18";
      const insuranceBoolean = true;
      const userId = 2;
      const carId = 3;

      const mockInsertId = null;
      const mockDbResponse = { insertId: mockInsertId };
      const queryCall =
        "INSERT INTO Reservations (start_date, end_date, insurance, user_id, car_id)" +
        "VALUES (?, ?, ?, ?, ?)";

      mockDb.query.mockResolvedValue([mockDbResponse]);

      const results = await VehicleService.rentVehicle(
        startDate,
        endDate,
        insuranceBoolean,
        userId,
        carId,
      );

      expect(results).toEqual(null);
      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining(queryCall),
        expect.arrayContaining([
          startDate,
          endDate,
          insuranceBoolean,
          userId,
          carId,
        ]),
      );
    });

    it("should handle database errors", async () => {
      const startDate = "2025-07-15";
      const endDate = "2025-07-18";
      const insuranceBoolean = 1;
      const userId = 2;
      const carId = 3;
      const mockError = new Error("Database connection failed");

      mockDb.query.mockRejectedValue(mockError);
      await expect(
        VehicleService.rentVehicle(
          startDate,
          endDate,
          insuranceBoolean,
          userId,
          carId,
        ),
      ).rejects.toThrow("Database connection failed");
    });
  });
});
