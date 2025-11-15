import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000/api/auth";

test.describe("Auth API - Register", () => {
  test("Should register a new user successfully", async ({ request }) => {
    const uniqueEmail = `test_${Date.now()}@example.com`;

    const response = await request.post(`${BASE_URL}/register`, {
      data: {
        name: "Test User",
        email: uniqueEmail,
        password: "123456",
        role: "cliente"
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();

    expect(body).toHaveProperty("_id");
    expect(body).toHaveProperty("email", uniqueEmail);
    expect(body).not.toHaveProperty("password"); // seguridad
  });
});
