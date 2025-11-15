import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000/api/auth";

test.describe("Auth API - Login", () => {
  test("Should login an existing user", async ({ request }) => {
    const email = `login_${Date.now()}@example.com`;
    const password = "123456";

    // 1. Crear usuario
    await request.post(`${BASE_URL}/register`, {
      data: {
        name: "Login Test",
        email,
        password,
        role: "cliente",
      },
    });

    // 2. Loguear usuario
    const response = await request.post(`${BASE_URL}/login`, {
      data: { email, password },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body).toHaveProperty("token");
    expect(typeof body.token).toBe("string");
  });
});
