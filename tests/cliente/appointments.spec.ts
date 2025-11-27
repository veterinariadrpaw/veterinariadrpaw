import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, getAuthHeaders } from "../helpers/auth";
import { generateAppointmentData, generatePetData } from "../helpers/test-data";

const BASE_URL = "http://localhost:3000/api";

test.describe("Client - Appointment Booking", () => {
    let clientToken: string;
    let petId: string;

    test.beforeEach(async ({ request }) => {
        const clientUser = await createTestUser(request, "cliente");
        clientToken = await loginUser(request, clientUser.email, clientUser.password);

        // Crear una mascota para las citas
        const petData = generatePetData();
        const petResponse = await request.post(`${BASE_URL}/pets`, {
            headers: getAuthHeaders(clientToken),
            data: petData,
        });
        const pet = await petResponse.json();
        petId = pet._id;
    });

    test("Should create a new appointment", async ({ request }) => {
        const appointmentData = {
            ...generateAppointmentData(),
            pet: petId,
        };

        const response = await request.post(`${BASE_URL}/appointments`, {
            headers: getAuthHeaders(clientToken),
            data: appointmentData,
        });

        expect(response.status()).toBe(201);
        const appointment = await response.json();
        expect(appointment.pet).toBe(petId);
        expect(appointment.reason).toBe(appointmentData.reason);
    });

    test("Should list client's appointments", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/appointments`, {
            headers: getAuthHeaders(clientToken),
        });

        expect(response.status()).toBe(200);
        const appointments = await response.json();
        expect(Array.isArray(appointments)).toBeTruthy();
    });

    test("Should get a single appointment by ID", async ({ request }) => {
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

        // Obtener la cita
        const response = await request.get(`${BASE_URL}/appointments/${createdAppointment._id}`, {
            headers: getAuthHeaders(clientToken),
        });

        expect(response.status()).toBe(200);
        const appointment = await response.json();
        expect(appointment._id).toBe(createdAppointment._id);
    });

    test("Should update an appointment", async ({ request }) => {
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

        // Actualizar la cita
        const updateData = {
            reason: "Updated reason",
            notes: "Updated notes",
        };

        const response = await request.put(`${BASE_URL}/appointments/${createdAppointment._id}`, {
            headers: getAuthHeaders(clientToken),
            data: updateData,
        });

        expect(response.status()).toBe(200);
        const updatedAppointment = await response.json();
        expect(updatedAppointment.reason).toBe(updateData.reason);
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

        // Cancelar la cita
        const response = await request.delete(`${BASE_URL}/appointments/${createdAppointment._id}`, {
            headers: getAuthHeaders(clientToken),
        });

        expect(response.status()).toBe(200);
    });

    test("Should filter appointments by pet", async ({ request }) => {
        // Crear cita
        const appointmentData = {
            ...generateAppointmentData(),
            pet: petId,
        };

        await request.post(`${BASE_URL}/appointments`, {
            headers: getAuthHeaders(clientToken),
            data: appointmentData,
        });

        // Filtrar por mascota
        const response = await request.get(`${BASE_URL}/appointments?pet=${petId}`, {
            headers: getAuthHeaders(clientToken),
        });

        expect(response.status()).toBe(200);
        const appointments = await response.json();
        expect(Array.isArray(appointments)).toBeTruthy();

        appointments.forEach((appointment: any) => {
            expect(appointment.pet).toBe(petId);
        });
    });

    test("Should get upcoming appointments", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/appointments?upcoming=true`, {
            headers: getAuthHeaders(clientToken),
        });

        expect(response.status()).toBe(200);
        const appointments = await response.json();
        expect(Array.isArray(appointments)).toBeTruthy();
    });
});
