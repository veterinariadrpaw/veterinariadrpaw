import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, getAuthHeaders } from "../helpers/auth";
import { generateLiabilityData } from "../helpers/test-data";

const BASE_URL = "http://localhost:3000/api";

test.describe("Admin - Liabilities Management CRUD", () => {
    let adminToken: string;

    test.beforeEach(async ({ request }) => {
        const adminUser = await createTestUser(request, "administrador");
        adminToken = await loginUser(request, adminUser.email, adminUser.password);
    });

    test("Should create a new liability", async ({ request }) => {
        const liabilityData = generateLiabilityData();

        const response = await request.post(`${BASE_URL}/liabilities`, {
            headers: getAuthHeaders(adminToken),
            data: liabilityData,
        });

        expect(response.status()).toBe(201);
        const liability = await response.json();
        expect(liability.description).toBe(liabilityData.description);
        expect(liability.amount).toBe(liabilityData.amount);
        expect(liability.isPaid).toBe(false);
    });

    test("Should list all liabilities", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/liabilities`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const liabilities = await response.json();
        expect(Array.isArray(liabilities)).toBeTruthy();
    });

    test("Should filter unpaid liabilities", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/liabilities?unpaidOnly=true`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const liabilities = await response.json();
        expect(Array.isArray(liabilities)).toBeTruthy();

        liabilities.forEach((liability: any) => {
            expect(liability.isPaid).toBe(false);
        });
    });

    test("Should update a liability", async ({ request }) => {
        const liabilityData = generateLiabilityData();
        const createResponse = await request.post(`${BASE_URL}/liabilities`, {
            headers: getAuthHeaders(adminToken),
            data: liabilityData,
        });
        const createdLiability = await createResponse.json();

        const updateData = {
            amount: 12000.00,
        };

        const response = await request.put(`${BASE_URL}/liabilities/${createdLiability._id}`, {
            headers: getAuthHeaders(adminToken),
            data: updateData,
        });

        expect(response.status()).toBe(200);
        const updatedLiability = await response.json();
        expect(updatedLiability.amount).toBe(updateData.amount);
    });

    test("Should mark liability as paid", async ({ request }) => {
        const liabilityData = generateLiabilityData();
        const createResponse = await request.post(`${BASE_URL}/liabilities`, {
            headers: getAuthHeaders(adminToken),
            data: liabilityData,
        });
        const createdLiability = await createResponse.json();

        const response = await request.patch(`${BASE_URL}/liabilities/${createdLiability._id}/pay`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const paidLiability = await response.json();
        expect(paidLiability.isPaid).toBe(true);
    });

    test("Should delete a liability", async ({ request }) => {
        const liabilityData = generateLiabilityData();
        const createResponse = await request.post(`${BASE_URL}/liabilities`, {
            headers: getAuthHeaders(adminToken),
            data: liabilityData,
        });
        const createdLiability = await createResponse.json();

        const response = await request.delete(`${BASE_URL}/liabilities/${createdLiability._id}`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
    });
});
