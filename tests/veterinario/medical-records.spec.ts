import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, getAuthHeaders } from "../helpers/auth";
import { generateMedicalRecordData, generatePetData } from "../helpers/test-data";

const BASE_URL = "http://localhost:3000/api";

test.describe("Veterinarian - Medical Records Management", () => {
    let vetToken: string;
    let clientToken: string;
    let petId: string;

    test.beforeEach(async ({ request }) => {
        // Crear veterinario
        const vetUser = await createTestUser(request, "veterinario");
        vetToken = await loginUser(request, vetUser.email, vetUser.password);

        // Crear cliente con mascota
        const clientUser = await createTestUser(request, "cliente");
        clientToken = await loginUser(request, clientUser.email, clientUser.password);

        // Crear mascota
        const petData = generatePetData();
        const petResponse = await request.post(`${BASE_URL}/pets`, {
            headers: getAuthHeaders(clientToken),
            data: petData,
        });
        const pet = await petResponse.json();
        petId = pet._id;
    });

    test("Should create a medical record", async ({ request }) => {
        const recordData = {
            ...generateMedicalRecordData(),
            pet: petId,
        };

        const response = await request.post(`${BASE_URL}/medical-records`, {
            headers: getAuthHeaders(vetToken),
            data: recordData,
        });

        expect(response.status()).toBe(201);
        const record = await response.json();
        expect(record.diagnosis).toBe(recordData.diagnosis);
        expect(record.treatment).toBe(recordData.treatment);
    });

    test("Should list all medical records", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/medical-records`, {
            headers: getAuthHeaders(vetToken),
        });

        expect(response.status()).toBe(200);
        const records = await response.json();
        expect(Array.isArray(records)).toBeTruthy();
    });

    test("Should get medical records by pet ID", async ({ request }) => {
        // Crear un historial médico
        const recordData = {
            ...generateMedicalRecordData(),
            pet: petId,
        };

        await request.post(`${BASE_URL}/medical-records`, {
            headers: getAuthHeaders(vetToken),
            data: recordData,
        });

        // Obtener historiales de la mascota
        const response = await request.get(`${BASE_URL}/medical-records?pet=${petId}`, {
            headers: getAuthHeaders(vetToken),
        });

        expect(response.status()).toBe(200);
        const records = await response.json();
        expect(Array.isArray(records)).toBeTruthy();

        records.forEach((record: any) => {
            expect(record.pet).toBe(petId);
        });
    });

    test("Should get a single medical record by ID", async ({ request }) => {
        const recordData = {
            ...generateMedicalRecordData(),
            pet: petId,
        };

        const createResponse = await request.post(`${BASE_URL}/medical-records`, {
            headers: getAuthHeaders(vetToken),
            data: recordData,
        });
        const createdRecord = await createResponse.json();

        const response = await request.get(`${BASE_URL}/medical-records/${createdRecord._id}`, {
            headers: getAuthHeaders(vetToken),
        });

        expect(response.status()).toBe(200);
        const record = await response.json();
        expect(record._id).toBe(createdRecord._id);
    });

    test("Should update a medical record", async ({ request }) => {
        const recordData = {
            ...generateMedicalRecordData(),
            pet: petId,
        };

        const createResponse = await request.post(`${BASE_URL}/medical-records`, {
            headers: getAuthHeaders(vetToken),
            data: recordData,
        });
        const createdRecord = await createResponse.json();

        const updateData = {
            diagnosis: "Updated diagnosis",
            treatment: "Updated treatment",
        };

        const response = await request.put(`${BASE_URL}/medical-records/${createdRecord._id}`, {
            headers: getAuthHeaders(vetToken),
            data: updateData,
        });

        expect(response.status()).toBe(200);
        const updatedRecord = await response.json();
        expect(updatedRecord.diagnosis).toBe(updateData.diagnosis);
    });

    test("Should delete a medical record", async ({ request }) => {
        const recordData = {
            ...generateMedicalRecordData(),
            pet: petId,
        };

        const createResponse = await request.post(`${BASE_URL}/medical-records`, {
            headers: getAuthHeaders(vetToken),
            data: recordData,
        });
        const createdRecord = await createResponse.json();

        const response = await request.delete(`${BASE_URL}/medical-records/${createdRecord._id}`, {
            headers: getAuthHeaders(vetToken),
        });

        expect(response.status()).toBe(200);
    });
});
