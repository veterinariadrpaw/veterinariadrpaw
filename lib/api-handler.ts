import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class AppError extends Error {
    statusCode: number;
    constructor(message: string, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
    }
}

type HandlerFunction = (req: Request, ...args: any[]) => Promise<NextResponse>;

export const apiHandler = (handler: HandlerFunction) => {
    return async (req: Request, ...args: any[]) => {
        try {
            return await handler(req, ...args);
        } catch (err: any) {

            // VALIDACIÓN (400)
            if (err instanceof ZodError) {
                return NextResponse.json(
                    {
                        error: "VALIDATION_ERROR",
                        message: "Datos inválidos",
                        fields: err.issues.map((e: any) => ({
                            field: e.path.join("."),
                            message: e.message
                        }))
                    },
                    { status: 400 }
                );
            }

            // ERRORES CONTROLADOS DE NEGOCIO
            if (err instanceof AppError) {
                return NextResponse.json(
                    {
                        error: "APP_ERROR",
                        message: err.message
                    },
                    { status: err.statusCode }
                );
            }

            // ERROR DESCONOCIDO
            console.error("[UNHANDLED API ERROR]", err);

            return NextResponse.json(
                {
                    error: "INTERNAL_SERVER_ERROR",
                    message: "Ocurrió un error inesperado"
                },
                { status: 500 }
            );
        }
    };
};
