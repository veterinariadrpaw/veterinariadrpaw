import { Page, APIRequestContext } from "@playwright/test";

export interface TestUser {
    email: string;
    password: string;
    name: string;
    role: "cliente" | "veterinario" | "administrador";
    token?: string;
}

/**
 * Helper para crear un usuario de prueba
 */
export async function createTestUser(
    request: APIRequestContext,
    role: "cliente" | "veterinario" | "administrador" = "cliente"
): Promise<TestUser> {
    const timestamp = Date.now();
    const user: TestUser = {
        email: `test_${role}_${timestamp}@example.com`,
        password: "Test123456",
        name: `Test ${role} ${timestamp}`,
        role,
    };

    const response = await request.post("http://localhost:3000/api/auth/register", {
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
            role: user.role,
        },
    });

    if (!response.ok()) {
        throw new Error(`Failed to create test user: ${await response.text()}`);
    }

    return user;
}

/**
 * Helper para hacer login y obtener el token
 */
export async function loginUser(
    request: APIRequestContext,
    email: string,
    password: string
): Promise<string> {
    const response = await request.post("http://localhost:3000/api/auth/login", {
        data: { email, password },
    });

    if (!response.ok()) {
        throw new Error(`Login failed: ${await response.text()}`);
    }

    const data = await response.json();
    return data.token;
}

/**
 * Helper para hacer login en el navegador (UI)
 */
export async function loginUserUI(
    page: Page,
    email: string,
    password: string
): Promise<void> {
    await page.goto("http://localhost:3000/login");
    await page.fill('input[name="email"]', email);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');

    // Esperar a que la redirección ocurra
    await page.waitForURL(/\/(cliente|veterinario|administrador)/);
}

/**
 * Helper para hacer logout
 */
export async function logoutUser(page: Page): Promise<void> {
    // Buscar y hacer clic en el botón de logout
    await page.click('button:has-text("Cerrar Sesión")');
    await page.waitForURL("http://localhost:3000/login");
}

/**
 * Helper para obtener headers con autenticación
 */
export function getAuthHeaders(token: string) {
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
}

/**
 * Helper para limpiar cookies
 */
export async function clearCookies(page: Page): Promise<void> {
    await page.context().clearCookies();
}
