import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, getAuthHeaders } from "../helpers/auth";
import { generateAppointmentData, generatePetData } from "../helpers/test-data";

const BASE_URL = "http://localhost:3000/api";

test.describe("Veterinarian - Appointments Management", () => {
    let vetToken: string;
    let clientToken: string;
    let clientUser: any;
    let petId: string;

    test.beforeEach(async ({ request }) => {
        // Crear veterinario
        const vetUser = await createTestUser(request, "veterinario");
        vetToken = await loginUser(request, vetUser.email, vetUser.password);

        // Crear cliente con mascota para las citas
        clientUser = await createTestUser(request, "cliente");
        clientToken = await loginUser(request, clientUser.email, clientUser.password);

        // Crear una mascota
        const petData = generatePetData();
        const petResponse = await request.post(`${BASE_URL}/pets`, {
            headers: getAuthHeaders(clientToken),
            data: petData,
        });
        const pet = await petResponse.json();
        petId = pet._id;
    });

    test("Should list all appointments", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/appointments`, {
            headers: getAuthHeaders(vetToken),
        });

        expect(response.status()).toBe(200);
        const appointments = await response.json();
        expect(Array.isArray(appointments)).toBeTruthy();
    });

    test("Should get appointment by ID", async ({ request }) => {
        // Crear una cita primero
        const appointmentData = {
            ...generateAppointmentData(),
            pet: petId,
        };

        const createResponse = await request.post(`${BASE_URL}/appointments`, {
            headers: getAuthHeaders(clientToken),
            data: appointmentData,
        });
        const createdAppointment = await createResponse.json();

        // Obtener la cita
        const response = await request.get(`${BASE_URL}/appointments/${createdAppointment._id}`, {
            headers: getAuthHeaders(vetToken),
        });

        expect(response.status()).toBe(200);
        const appointment = await response.json();
        expect(appointment._id).toBe(createdAppointment._id);
    });

    test("Should update appointment status", async ({ request }) => {
        // Crear una cita
        const appointmentData = {
            ...generateAppointmentData(),
            pet: petId,
        };

        const createResponse = await request.post(`${BASE_URL}/appointments`, {
            headers: getAuthHeaders(clientToken),
            data: appointmentData,
        });
        const createdAppointment = await createResponse.json();

        // Actualizar estado
        const response = await request.patch(`${BASE_URL}/appointments/${createdAppointment._id}`, {
            headers: getAuthHeaders(vetToken),
            data: {
                status: "confirmada",
            },
        });

        expect(response.status()).toBe(200);
        const updatedAppointment = await response.json();
        expect(updatedAppointment.status).toBe("confirmada");
    });

    test("Should filter appointments by status", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/appointments?status=pendiente`, {
            headers: getAuthHeaders(vetToken),
        });

        expect(response.status()).toBe(200);
        const appointments = await response.json();
        expect(Array.isArray(appointments)).toBeTruthy();
    });

    test("Should filter appointments by date range", async ({ request }) => {
        const today = new Date().toISOString().split('T')[0];
        const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

        const response = await request.get(
            `${BASE_URL}/appointments?startDate=${today}&endDate=${nextWeek}`,
            {
                headers: getAuthHeaders(vetToken),
            }
        );

        expect(response.status()).toBe(200);
        const appointments = await response.json();
        expect(Array.isArray(appointments)).toBeTruthy();
    });

    test("Should cancel an appointment", async ({ request }) => {
        // Crear una cita
        const appointmentData = {
            ...generateAppointmentData(),
            pet: petId,
        };

        const createResponse = await request.post(`${BASE_URL}/appointments`, {
            headers: getAuthHeaders(clientToken),
            data: appointmentData,
        });
        const createdAppointment = await createResponse.json();

        // Cancelar
        const response = await request.patch(`${BASE_URL}/appointments/${createdAppointment._id}`, {
            headers: getAuthHeaders(vetToken),
            data: {
                status: "cancelada",
            },
        });

        expect(response.status()).toBe(200);
        const cancelledAppointment = await response.json();
        expect(cancelledAppointment.status).toBe("cancelada");
    });
});
