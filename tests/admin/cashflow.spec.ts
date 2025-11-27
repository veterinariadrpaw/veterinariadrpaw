import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, getAuthHeaders } from "../helpers/auth";
import { generateCashFlowData } from "../helpers/test-data";

const BASE_URL = "http://localhost:3000/api";

test.describe("Admin - Cash Flow Management", () => {
    let adminToken: string;

    test.beforeEach(async ({ request }) => {
        const adminUser = await createTestUser(request, "administrador");
        adminToken = await loginUser(request, adminUser.email, adminUser.password);
    });

    test("Should create a new income entry", async ({ request }) => {
        const incomeData = generateCashFlowData("ingreso");

        const response = await request.post(`${BASE_URL}/cashflow`, {
            headers: getAuthHeaders(adminToken),
            data: incomeData,
        });

        expect(response.status()).toBe(201);
        const entry = await response.json();
        expect(entry.type).toBe("ingreso");
        expect(entry.amount).toBe(incomeData.amount);
    });

    test("Should create a new expense entry", async ({ request }) => {
        const expenseData = generateCashFlowData("egreso");

        const response = await request.post(`${BASE_URL}/cashflow`, {
            headers: getAuthHeaders(adminToken),
            data: expenseData,
        });

        expect(response.status()).toBe(201);
        const entry = await response.json();
        expect(entry.type).toBe("egreso");
    });

    test("Should list all cash flow entries", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/cashflow`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const entries = await response.json();
        expect(Array.isArray(entries)).toBeTruthy();
    });

    test("Should filter cash flow by type", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/cashflow?type=ingreso`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const entries = await response.json();
        expect(Array.isArray(entries)).toBeTruthy();

        entries.forEach((entry: any) => {
            expect(entry.type).toBe("ingreso");
        });
    });

    test("Should filter cash flow by date range", async ({ request }) => {
        const startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        const endDate = new Date();

        const response = await request.get(
            `${BASE_URL}/cashflow?startDate=${startDate.toISOString().split('T')[0]}&endDate=${endDate.toISOString().split('T')[0]}`,
            {
                headers: getAuthHeaders(adminToken),
            }
        );

        expect(response.status()).toBe(200);
        const entries = await response.json();
        expect(Array.isArray(entries)).toBeTruthy();
    });

    test("Should update a cash flow entry", async ({ request }) => {
        const cashFlowData = generateCashFlowData("ingreso");
        const createResponse = await request.post(`${BASE_URL}/cashflow`, {
            headers: getAuthHeaders(adminToken),
            data: cashFlowData,
        });
        const createdEntry = await createResponse.json();

        const updateData = {
            amount: 750.00,
            description: "Updated description",
        };

        const response = await request.put(`${BASE_URL}/cashflow/${createdEntry._id}`, {
            headers: getAuthHeaders(adminToken),
            data: updateData,
        });

        expect(response.status()).toBe(200);
        const updatedEntry = await response.json();
        expect(updatedEntry.amount).toBe(updateData.amount);
    });

    test("Should delete a cash flow entry", async ({ request }) => {
        const cashFlowData = generateCashFlowData("egreso");
        const createResponse = await request.post(`${BASE_URL}/cashflow`, {
            headers: getAuthHeaders(adminToken),
            data: cashFlowData,
        });
        const createdEntry = await createResponse.json();

        const response = await request.delete(`${BASE_URL}/cashflow/${createdEntry._id}`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
    });

    test("Should get cash flow summary", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/cashflow/summary`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const summary = await response.json();
        expect(summary).toHaveProperty("totalIncome");
        expect(summary).toHaveProperty("totalExpenses");
        expect(summary).toHaveProperty("balance");
    });
});
