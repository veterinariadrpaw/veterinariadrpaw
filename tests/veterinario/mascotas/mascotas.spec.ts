import { test, expect, request } from '@playwright/test';

test.describe('API de mascotas', () => {
  let apiContext: any;
  let token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MTdmNzIzNDQxNmJhOWJjZmY1YTA1ZiIsInJvbGUiOiJ2ZXRlcmluYXJpbyIsImlhdCI6MTc2MzE4NDAwNywiZXhwIjoxNzYzNzg4ODA3fQ.e36IB7Y5r737k0tABh8XfhFYdYoVmjtcZgGDngl7-wk';
  let createdPetId: string;

  test.beforeAll(async ({ playwright }) => {
    apiContext = await request.newContext({
      baseURL: 'http://localhost:3000',
      extraHTTPHeaders: {
        'Authorization': token,
        'Content-Type': 'application/json',
      },
    });
  });

  test('Crear una mascota correctamente', async () => {
    const response = await apiContext.post('/api/veterinario/mascotas', {
      data: {
        nombre: 'Firulais E2E',
        especie: 'Perro',
        raza: 'Labrador',
        edad: 3,
        propietario: 'id_cliente_valido'
      }
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body.nombre).toBe('Firulais E2E');
    createdPetId = body._id;
  });

  test('Falla al crear mascota sin campos requeridos', async () => {
    const response = await apiContext.post('/api/veterinario/mascotas', {
      data: { nombre: 'Incompleta' } // faltan otros campos
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('Faltan campos requeridos');
  });

  test('Obtener todas las mascotas', async () => {
    const response = await apiContext.get('/api/veterinario/mascotas');
    expect(response.status()).toBe(200);
    const pets = await response.json();
    expect(Array.isArray(pets)).toBe(true);
    expect(pets.some((p: any) => p.id === createdPetId)).toBeTruthy();
  });
});
