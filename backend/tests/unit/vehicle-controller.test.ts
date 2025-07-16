import { describe, expect, jest, test } from "@jest/globals";
import { Request, Response } from "express";
import VehicleController from "../../src/controllers/vehicle-controller";
import VehicleService from "../../src/services/vehicle-service";
import Vehicle from "../../src/models/vehicle";

jest.mock("../../src/services/vehicle-service"); // Mock the service

describe("Testing getAllVehicles", () => {
  test("If all is ok", async () => {
    // Mock response data

    const mockVehicles: Vehicle[] = [
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

    // Mock the service function to return the mock data
    (
      VehicleService.getAllVehicles as jest.MockedFunction<
        typeof VehicleService.getAllVehicles
      >
    ).mockResolvedValue(mockVehicles);

    let req: jest.Mocked<Request>;
    let res: jest.Mocked<Response>;

    beforeEach(() => {
      // Create Jest mocks for Request and Response
      req = {
        body: { type: "coupe", startDate: "2025-03-16", endDate: "2025-03-26" },
      } as unknown as jest.Mocked<Request>;

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as jest.Mocked<Response>;
    });

    // Call the controller function
    await VehicleController.getAllVehicles(req, res);

    // Assertions
    expect(VehicleService.getAllVehicles).toHaveBeenCalled(); // Ensure service was called
    expect(res.json).toHaveBeenCalledWith(mockVehicles); // Ensure response is correct
  });

  describe("Testing getAvailableVehicles", () => {
    let req: jest.Mocked<Request>;
    let res: jest.Mocked<Response>;

    beforeEach(() => {
      // Create Jest mocks for Request and Response
      req = {
        body: { type: "coupe", startDate: "2025-03-16", endDate: "2025-03-26" },
      } as unknown as jest.Mocked<Request>;

      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      } as unknown as jest.Mocked<Response>;

      test("Testing happy path", () => {
        req.body = {};
      });
    });
  });
});
