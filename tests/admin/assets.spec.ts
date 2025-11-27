import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, getAuthHeaders } from "../helpers/auth";
import { generateAssetData } from "../helpers/test-data";

const BASE_URL = "http://localhost:3000/api";

test.describe("Admin - Assets Management CRUD", () => {
    let adminToken: string;

    test.beforeEach(async ({ request }) => {
        const adminUser = await createTestUser(request, "administrador");
        adminToken = await loginUser(request, adminUser.email, adminUser.password);
    });

    test("Should create a new asset", async ({ request }) => {
        const assetData = generateAssetData();

        const response = await request.post(`${BASE_URL}/assets`, {
            headers: getAuthHeaders(adminToken),
            data: assetData,
        });

        expect(response.status()).toBe(201);
        const asset = await response.json();
        expect(asset.name).toBe(assetData.name);
        expect(asset.category).toBe(assetData.category);
        expect(asset.isDepreciable).toBe(assetData.isDepreciable);
    });

    test("Should list all assets", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/assets`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const assets = await response.json();
        expect(Array.isArray(assets)).toBeTruthy();
    });

    test("Should get a single asset by ID", async ({ request }) => {
        const assetData = generateAssetData();
        const createResponse = await request.post(`${BASE_URL}/assets`, {
            headers: getAuthHeaders(adminToken),
            data: assetData,
        });
        const createdAsset = await createResponse.json();

        const response = await request.get(`${BASE_URL}/assets/${createdAsset._id}`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const asset = await response.json();
        expect(asset._id).toBe(createdAsset._id);
    });

    test("Should update an asset", async ({ request }) => {
        const assetData = generateAssetData();
        const createResponse = await request.post(`${BASE_URL}/assets`, {
            headers: getAuthHeaders(adminToken),
            data: assetData,
        });
        const createdAsset = await createResponse.json();

        const updateData = {
            quantity: 2,
            unitCost: 6000.00,
        };

        const response = await request.put(`${BASE_URL}/assets/${createdAsset._id}`, {
            headers: getAuthHeaders(adminToken),
            data: updateData,
        });

        expect(response.status()).toBe(200);
        const updatedAsset = await response.json();
        expect(updatedAsset.quantity).toBe(updateData.quantity);
    });

    test("Should delete an asset", async ({ request }) => {
        const assetData = generateAssetData();
        const createResponse = await request.post(`${BASE_URL}/assets`, {
            headers: getAuthHeaders(adminToken),
            data: assetData,
        });
        const createdAsset = await createResponse.json();

        const response = await request.delete(`${BASE_URL}/assets/${createdAsset._id}`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
    });

    test("Should calculate total asset value", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/assets/total-value`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const result = await response.json();
        expect(result).toHaveProperty("totalValue");
        expect(typeof result.totalValue).toBe("number");
    });
});
