import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import UserService from "../../../src/services/user-service.ts";
import db from "../../../src/config/db.ts";
import { User } from "../../../src/models/user.ts";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Mock dependencies
vi.mock("../../../src/config/db.ts");
vi.mock("../../../src/models/user.ts");
vi.mock("bcrypt");
vi.mock("crypto");

const mockDb = vi.mocked(db);
const mockUser = vi.mocked(User);
const mockBcrypt = vi.mocked(bcrypt);
const mockCrypto = vi.mocked(crypto);

describe("UserService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("createOrUpdateSession", () => {
    it("should create a new session when inputSessionId is null", async () => {
      const userId = 1;
      const mockSessionId = "mock-session-id";
      const mockQueryResults = { affectedRows: 1 };

      mockCrypto.randomUUID.mockReturnValue(mockSessionId);
      mockDb.query.mockResolvedValue([mockQueryResults]);

      const result = await UserService.createOrUpdateSession(userId);

      expect(mockCrypto.randomUUID).toHaveBeenCalledOnce();
      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO Sessions"),
        expect.arrayContaining([mockSessionId, userId, expect.any(String)]),
      );
      expect(result).toBe(mockSessionId);
    });

    it("should update existing session when inpuSessionId is provided", async () => {
      const userId = 1;
      const mockSessionId = "existing-session-id";
      const mockQueryResults = { affectedRows: 1 };

      mockDb.query.mockResolvedValue([mockQueryResults]);

      const result = await UserService.createOrUpdateSession(
        userId,
        mockSessionId,
      );

      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE Sessions SET expire_login"),
        expect.arrayContaining([expect.any(String), mockSessionId]),
      );
      expect(result).toBe(mockSessionId);
    });

    it("should handle database errors", async () => {
      const userId = 1;
      const mockError = new Error("Database connection failed");

      mockDb.query.mockRejectedValue(mockError);
      await expect(UserService.createOrUpdateSession(userId)).rejects.toThrow(
        "Error in database insert or update",
      );
    });
  });

  describe("sessionExists", () => {
    it("should check database for session Id that exist and return true", async () => {
      const mockSessionId = "mock-session-id";
      const mockQueryResults = [{ count: 1 }];
      const queryText =
        "SELECT COUNT(*) AS count FROM Sessions WHERE session_id = ?";

      mockDb.query.mockResolvedValue([mockQueryResults]);

      const results = await UserService.sessionExists(mockSessionId);

      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining(queryText),
        expect.arrayContaining([mockSessionId]),
      );
      expect(results).toBe(true);
    });

    it("should check database for session Id that dose not exist and return false", async () => {
      const mockSessionId = "mock-session-id";
      const mockQueryResults = [{ count: 0 }];
      const queryText =
        "SELECT COUNT(*) AS count FROM Sessions WHERE session_id = ?";

      mockDb.query.mockResolvedValue([mockQueryResults]);

      const results = await UserService.sessionExists(mockSessionId);

      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining(queryText),
        expect.arrayContaining([mockSessionId]),
      );
      expect(results).toBe(false);
    });

    it("should handle database errors and return false", async () => {
      const mockSessionId = "mock-session-id";
      const mockError = new Error("Database connection failed");

      mockDb.query.mockRejectedValue(mockError);

      const result = await UserService.sessionExists(mockSessionId);
      expect(result).toBe(false);
    });
  });

  describe("logout", () => {
    it("should return 1 for the deleted session", async () => {
      const mockSessionId = "mock-session-id";
      const mockQueryResults = { affectedRows: 1 };
      const queryText = "DELETE FROM Sessions WHERE session_id = ?";

      mockDb.query.mockResolvedValue([mockQueryResults]);

      const result = await UserService.logout(mockSessionId);
      expect(mockDb.query).toHaveBeenCalledWith(
        expect.stringContaining(queryText),
        expect.arrayContaining([mockSessionId]),
      );
      expect(result).toBe(1);
    });
  });
});
