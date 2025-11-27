import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, getAuthHeaders } from "../helpers/auth";
import { generatePetData } from "../helpers/test-data";

const BASE_URL = "http://localhost:3000/api";

test.describe("Client - Pet Management CRUD", () => {
    let clientToken: string;

    test.beforeEach(async ({ request }) => {
        const clientUser = await createTestUser(request, "cliente");
        clientToken = await loginUser(request, clientUser.email, clientUser.password);
    });

    test("Should create a new pet", async ({ request }) => {
        const petData = generatePetData();

        const response = await request.post(`${BASE_URL}/pets`, {
            headers: getAuthHeaders(clientToken),
            data: petData,
        });

        expect(response.status()).toBe(201);
        const pet = await response.json();
        expect(pet.name).toBe(petData.name);
        expect(pet.species).toBe(petData.species);
        expect(pet.breed).toBe(petData.breed);
    });

    test("Should list all client's pets", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/pets`, {
            headers: getAuthHeaders(clientToken),
        });

        expect(response.status()).toBe(200);
        const pets = await response.json();
        expect(Array.isArray(pets)).toBeTruthy();
    });

    test("Should get a single pet by ID", async ({ request }) => {
        // Crear una mascota
        const petData = generatePetData();
        const createResponse = await request.post(`${BASE_URL}/pets`, {
            headers: getAuthHeaders(clientToken),
            data: petData,
        });
        const createdPet = await createResponse.json();

        // Obtener la mascota
        const response = await request.get(`${BASE_URL}/pets/${createdPet._id}`, {
            headers: getAuthHeaders(clientToken),
        });

        expect(response.status()).toBe(200);
        const pet = await response.json();
        expect(pet._id).toBe(createdPet._id);
        expect(pet.name).toBe(petData.name);
    });

    test("Should update a pet", async ({ request }) => {
        // Crear una mascota
        const petData = generatePetData();
        const createResponse = await request.post(`${BASE_URL}/pets`, {
            headers: getAuthHeaders(clientToken),
            data: petData,
        });
        const createdPet = await createResponse.json();

        // Actualizar la mascota
        const updateData = {
            age: 4,
            weight: 27.0,
        };

        const response = await request.put(`${BASE_URL}/pets/${createdPet._id}`, {
            headers: getAuthHeaders(clientToken),
            data: updateData,
        });

        expect(response.status()).toBe(200);
        const updatedPet = await response.json();
        expect(updatedPet.age).toBe(updateData.age);
        expect(updatedPet.weight).toBe(updateData.weight);
    });

    test("Should delete a pet", async ({ request }) => {
        // Crear una mascota
        const petData = generatePetData();
        const createResponse = await request.post(`${BASE_URL}/pets`, {
            headers: getAuthHeaders(clientToken),
            data: petData,
        });
        const createdPet = await createResponse.json();

        // Eliminar la mascota
        const response = await request.delete(`${BASE_URL}/pets/${createdPet._id}`, {
            headers: getAuthHeaders(clientToken),
        });

        expect(response.status()).toBe(200);

        // Verificar que fue eliminada
        const checkResponse = await request.get(`${BASE_URL}/pets/${createdPet._id}`, {
            headers: getAuthHeaders(clientToken),
        });
        expect(checkResponse.status()).toBe(404);
    });

    test("Should not access other client's pets", async ({ request }) => {
        // Crear otro cliente
        const otherClient = await createTestUser(request, "cliente");
        const otherToken = await loginUser(request, otherClient.email, otherClient.password);

        // Crear mascota con el otro cliente
        const petData = generatePetData();
        const createResponse = await request.post(`${BASE_URL}/pets`, {
            headers: getAuthHeaders(otherToken),
            data: petData,
        });
        const otherPet = await createResponse.json();

        // Intentar acceder con el primer cliente
        const response = await request.get(`${BASE_URL}/pets/${otherPet._id}`, {
            headers: getAuthHeaders(clientToken),
        });

        expect(response.status()).toBe(403);
    });
});
