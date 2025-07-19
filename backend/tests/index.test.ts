import { describe, it } from "vitest";

describe("server entry", () => {
  it("should run without throwing", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    await import("../src/index.ts"); // just runs the code
  });
});
