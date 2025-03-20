import axios from "axios";
import { beforeEach, describe, expect, it, vi } from "vitest";
import api from "./api.ts";
import { config } from "./config";

describe("API Handler", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have the correct base URL", () => {
    expect(api.defaults.baseURL).toBe(config.apiUrl);
  });

  it("should handle response successfully", async () => {
    const mockResponse = { status: 200 };
    vi.spyOn(axios, "request").mockResolvedValue(mockResponse);

    const response = await api.get("products");
    expect(response.status).toBe(200);
  });
});
