import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, getAuthHeaders } from "../helpers/auth";
import { generateServiceData } from "../helpers/test-data";

const BASE_URL = "http://localhost:3000/api";

test.describe("Admin - Services Management CRUD", () => {
    let adminToken: string;

    test.beforeEach(async ({ request }) => {
        const adminUser = await createTestUser(request, "administrador");
        adminToken = await loginUser(request, adminUser.email, adminUser.password);
    });

    test("Should create a new service", async ({ request }) => {
        const serviceData = generateServiceData();

        const response = await request.post(`${BASE_URL}/services`, {
            headers: getAuthHeaders(adminToken),
            data: serviceData,
        });

        expect(response.status()).toBe(201);
        const service = await response.json();
        expect(service.name).toBe(serviceData.name);
        expect(service.basePrice).toBe(serviceData.basePrice);
        expect(service.isActive).toBe(true);
    });

    test("Should list all services", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/services`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const services = await response.json();
        expect(Array.isArray(services)).toBeTruthy();
    });

    test("Should list only active services", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/services?activeOnly=true`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const services = await response.json();
        expect(Array.isArray(services)).toBeTruthy();

        services.forEach((service: any) => {
            expect(service.isActive).toBe(true);
        });
    });

    test("Should get a single service by ID", async ({ request }) => {
        // Crear un servicio
        const serviceData = generateServiceData();
        const createResponse = await request.post(`${BASE_URL}/services`, {
            headers: getAuthHeaders(adminToken),
            data: serviceData,
        });
        const createdService = await createResponse.json();

        // Obtener el servicio
        const response = await request.get(`${BASE_URL}/services/${createdService._id}`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const service = await response.json();
        expect(service._id).toBe(createdService._id);
    });

    test("Should update a service", async ({ request }) => {
        // Crear un servicio
        const serviceData = generateServiceData();
        const createResponse = await request.post(`${BASE_URL}/services`, {
            headers: getAuthHeaders(adminToken),
            data: serviceData,
        });
        const createdService = await createResponse.json();

        // Actualizar el servicio
        const updateData = {
            basePrice: 150.00,
            duration: 90,
        };

        const response = await request.put(`${BASE_URL}/services/${createdService._id}`, {
            headers: getAuthHeaders(adminToken),
            data: updateData,
        });

        expect(response.status()).toBe(200);
        const updatedService = await response.json();
        expect(updatedService.basePrice).toBe(updateData.basePrice);
        expect(updatedService.duration).toBe(updateData.duration);
    });

    test("Should toggle service active status", async ({ request }) => {
        // Crear un servicio
        const serviceData = generateServiceData();
        const createResponse = await request.post(`${BASE_URL}/services`, {
            headers: getAuthHeaders(adminToken),
            data: serviceData,
        });
        const createdService = await createResponse.json();

        // Cambiar estado
        const response = await request.patch(`${BASE_URL}/services/${createdService._id}`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const updatedService = await response.json();
        expect(updatedService.isActive).toBe(!createdService.isActive);
    });

    test("Should delete a service", async ({ request }) => {
        // Crear un servicio
        const serviceData = generateServiceData();
        const createResponse = await request.post(`${BASE_URL}/services`, {
            headers: getAuthHeaders(adminToken),
            data: serviceData,
        });
        const createdService = await createResponse.json();

        // Eliminar el servicio
        const response = await request.delete(`${BASE_URL}/services/${createdService._id}`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
    });
});
