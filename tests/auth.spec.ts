import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, loginUserUI, logoutUser } from "./helpers/auth";

const BASE_URL = "http://localhost:3000";

test.describe("Authentication E2E Tests", () => {

    test("Should register a new client user", async ({ request }) => {
        const timestamp = Date.now();
        const userData = {
            name: `Test Client ${timestamp}`,
            email: `client_${timestamp}@example.com`,
            password: "Test123456",
            role: "cliente",
        };

        const response = await request.post(`${BASE_URL}/api/auth/register`, {
            data: userData,
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body).toHaveProperty("_id");
        expect(body.email).toBe(userData.email);
        expect(body.role).toBe("cliente");
    });

    test("Should register a new veterinarian user", async ({ request }) => {
        const timestamp = Date.now();
        const userData = {
            name: `Test Vet ${timestamp}`,
            email: `vet_${timestamp}@example.com`,
            password: "Test123456",
            role: "veterinario",
        };

        const response = await request.post(`${BASE_URL}/api/auth/register`, {
            data: userData,
        });

        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.role).toBe("veterinario");
    });

    test("Should login with valid credentials", async ({ request }) => {
        const user = await createTestUser(request, "cliente");
        const token = await loginUser(request, user.email, user.password);

        expect(token).toBeTruthy();
        expect(typeof token).toBe("string");
    });

    test("Should fail login with invalid password", async ({ request }) => {
        const user = await createTestUser(request, "cliente");

        const response = await request.post(`${BASE_URL}/api/auth/login`, {
            data: {
                email: user.email,
                password: "wrongpassword",
            },
        });

        expect(response.status()).toBe(400);
    });

    test("Should fail login with non-existent user", async ({ request }) => {
        const response = await request.post(`${BASE_URL}/api/auth/login`, {
            data: {
                email: "nonexistent@example.com",
                password: "Test123456",
            },
        });

        expect(response.status()).toBe(404);
    });

    test("Should login via UI and redirect to client dashboard", async ({ page, request }) => {
        const user = await createTestUser(request, "cliente");

        await loginUserUI(page, user.email, user.password);

        // Verificar que estamos en el dashboard del cliente
        await expect(page).toHaveURL(/\/cliente/);
    });

    test("Should login via UI and redirect to veterinarian dashboard", async ({ page, request }) => {
        const user = await createTestUser(request, "veterinario");

        await loginUserUI(page, user.email, user.password);

        await expect(page).toHaveURL(/\/veterinario/);
    });

    test("Should logout successfully", async ({ page, request }) => {
        const user = await createTestUser(request, "cliente");
        await loginUserUI(page, user.email, user.password);

        // Verificar que estamos logueados
        await expect(page).toHaveURL(/\/cliente/);

        // Hacer logout
        await logoutUser(page);

        // Verificar que fuimos redirigidos al login
        await expect(page).toHaveURL(/\/login/);
    });

    test("Should show profile button after login", async ({ page, request }) => {
        const user = await createTestUser(request, "cliente");
        await loginUserUI(page, user.email, user.password);

        // Verificar que el botón de perfil aparece
        const profileButton = page.locator('a:has-text("Perfil")');
        await expect(profileButton).toBeVisible();
    });
});
