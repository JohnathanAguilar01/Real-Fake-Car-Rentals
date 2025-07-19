import { describe, it, expect } from "vitest";
import Utils from "../../../src/utility/utils";

describe("Testing utils", () => {
  it("Testing isValidMySQLDate gives true for '2025-03-16'", () => {
    const response = Utils.isValidMySQLDate("2025-03-16");
    expect(response).toBe(true);
  });

  it("Testing isValidMySQLDate gives false for '03/16/2025'", () => {
    const response = Utils.isValidMySQLDate("03/16/2025");
    expect(response).toBe(false);
  });
});
