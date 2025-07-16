import request from "supertest";
import { describe, it, expect } from "vitest";
import app from "../src/app.ts";

describe("GET app.com/", () => {
  it('should return a message response with "Backend is running!"', async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.text).toBe("Backend is running!");
  });
});
