import { test, expect } from "@playwright/test";
import { createTestUser, loginUser, getAuthHeaders } from "../helpers/auth";
import { generateProductData } from "../helpers/test-data";

const BASE_URL = "http://localhost:3000/api";

test.describe("Admin - Inventory Management CRUD", () => {
    let adminToken: string;

    test.beforeEach(async ({ request }) => {
        const adminUser = await createTestUser(request, "administrador");
        adminToken = await loginUser(request, adminUser.email, adminUser.password);
    });

    test("Should create a new product", async ({ request }) => {
        const productData = generateProductData();

        const response = await request.post(`${BASE_URL}/inventory`, {
            headers: getAuthHeaders(adminToken),
            data: productData,
        });

        expect(response.status()).toBe(201);
        const product = await response.json();
        expect(product.name).toBe(productData.name);
        expect(product.price).toBe(productData.price);
        expect(product.stock).toBe(productData.stock);
    });

    test("Should list all products", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/inventory`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const products = await response.json();
        expect(Array.isArray(products)).toBeTruthy();
    });

    test("Should get a single product by ID", async ({ request }) => {
        // Crear un producto primero
        const productData = generateProductData();
        const createResponse = await request.post(`${BASE_URL}/inventory`, {
            headers: getAuthHeaders(adminToken),
            data: productData,
        });
        const createdProduct = await createResponse.json();

        // Obtener el producto
        const response = await request.get(`${BASE_URL}/inventory/${createdProduct._id}`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const product = await response.json();
        expect(product._id).toBe(createdProduct._id);
        expect(product.name).toBe(productData.name);
    });

    test("Should update a product", async ({ request }) => {
        // Crear un producto
        const productData = generateProductData();
        const createResponse = await request.post(`${BASE_URL}/inventory`, {
            headers: getAuthHeaders(adminToken),
            data: productData,
        });
        const createdProduct = await createResponse.json();

        // Actualizar el producto
        const updateData = {
            price: 75.00,
            stock: 150,
        };

        const response = await request.put(`${BASE_URL}/inventory/${createdProduct._id}`, {
            headers: getAuthHeaders(adminToken),
            data: updateData,
        });

        expect(response.status()).toBe(200);
        const updatedProduct = await response.json();
        expect(updatedProduct.price).toBe(updateData.price);
        expect(updatedProduct.stock).toBe(updateData.stock);
    });

    test("Should delete a product", async ({ request }) => {
        // Crear un producto
        const productData = generateProductData();
        const createResponse = await request.post(`${BASE_URL}/inventory`, {
            headers: getAuthHeaders(adminToken),
            data: productData,
        });
        const createdProduct = await createResponse.json();

        // Eliminar el producto
        const response = await request.delete(`${BASE_URL}/inventory/${createdProduct._id}`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);

        // Verificar que fue eliminado
        const checkResponse = await request.get(`${BASE_URL}/inventory/${createdProduct._id}`, {
            headers: getAuthHeaders(adminToken),
        });
        expect(checkResponse.status()).toBe(404);
    });

    test("Should record inventory movement", async ({ request }) => {
        // Crear un producto
        const productData = generateProductData();
        const createResponse = await request.post(`${BASE_URL}/inventory`, {
            headers: getAuthHeaders(adminToken),
            data: productData,
        });
        const createdProduct = await createResponse.json();

        // Registrar movimiento
        const movementData = {
            product: createdProduct._id,
            type: "entrada",
            quantity: 50,
            reason: "Compra de inventario",
        };

        const response = await request.post(`${BASE_URL}/inventory/movement`, {
            headers: getAuthHeaders(adminToken),
            data: movementData,
        });

        expect(response.status()).toBe(201);
        const movement = await response.json();
        expect(movement.type).toBe(movementData.type);
        expect(movement.quantity).toBe(movementData.quantity);
    });

    test("Should filter products by low stock", async ({ request }) => {
        const response = await request.get(`${BASE_URL}/inventory?lowStock=true`, {
            headers: getAuthHeaders(adminToken),
        });

        expect(response.status()).toBe(200);
        const products = await response.json();
        expect(Array.isArray(products)).toBeTruthy();
    });
});
