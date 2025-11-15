// validateBody.ts
export async function validateBody(req: Request, schema: any) {
  const body = await req.json();
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    throw new Error("Invalid body");
  }

  return parsed.data;
}
