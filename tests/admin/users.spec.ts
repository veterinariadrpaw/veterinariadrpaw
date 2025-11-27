import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, getAuthHeaders } from "../helpers/auth";

const BASE_URL = "http://localhost:3000/api";

test.describe("Admin - User Management CRUD", () => {
    let adminToken: string;
    let adminUser: any;

    test.beforeEach(async ({ request }) => {
        // Crear un usuario administrador para las pruebas
        adminUser = await createTestUser(request, "administrador");
        adminToken = await loginUser(request, adminUser.email, adminUser.password);
    });

    test("Should list all users", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const users = await response.json();
        expect(Array.isArray(users)).toBeTruthy();
    });

    test("Should filter users by role", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/users?role=cliente`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const users = await response.json();
        expect(Array.isArray(users)).toBeTruthy();

        if (users.length > 0) {
            users.forEach((user: any) => {
                expect(user.role).toBe("cliente");
            });
        }
    });

    test("Should update user information", async ({ request }) => {
        // Crear un usuario para actualizar
        const testUser = await createTestUser(request, "cliente");

        const updateData = {
            name: "Updated Name",
            telefono: "1234567890",
        };

        const response = await request.patch(`${BASE_URL}/users?id=${testUser.email}`, {
            headers: getAuthHeaders(adminToken),
            data: updateData,
        });

        expect(response.status()).toBe(200);
        const updatedUser = await response.json();
        expect(updatedUser.name).toBe(updateData.name);
    });

    test("Should change user role", async ({ request }) => {
        // Crear un usuario cliente
        const testUser = await createTestUser(request, "cliente");

        const response = await request.post(`${BASE_URL}/users/change-role`, {
            headers: getAuthHeaders(adminToken),
            data: {
                userId: testUser.email,
                newRole: "veterinario",
            },
        });

        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result.user.role).toBe("veterinario");
    });

    test("Should delete a user", async ({ request }) => {
        // Crear un usuario para eliminar
        const testUser = await createTestUser(request, "cliente");

        const response = await request.delete(`${BASE_URL}/users?id=${testUser.email}`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);

        // Verificar que el usuario fue eliminado
        const checkResponse = await request.get(`${BASE_URL}/users`, {
            headers: getAuthHeaders(adminToken),
        });

        const users = await checkResponse.json();
        const deletedUser = users.find((u: any) => u.email === testUser.email);
        expect(deletedUser).toBeUndefined();
    });
});
