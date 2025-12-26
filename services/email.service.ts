import crypto from "crypto";
import { Resend } from "resend";

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Initialize Resend only if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const EmailService = {
  /**
   * Sends an email using Resend in production, logs to console in development
   */
  send: async (options: EmailOptions): Promise<void> => {
    const isDev = process.env.NODE_ENV === "development";
    const hasResendKey = !!process.env.RESEND_API_KEY;

    // Development mode or no Resend key: log to console
    if (isDev || !hasResendKey) {
      console.log("\n📧 ===== EMAIL SENT (DEV MODE) =====");
      console.log(`To: ${options.to}`);
      console.log(`Subject: ${options.subject}`);
      console.log(`Body:\n${options.html}`);
      console.log("=====================================\n");

      if (!isDev && !hasResendKey) {
        console.warn("⚠️  RESEND_API_KEY not configured. Emails will only be logged to console.");
      }
      return;
    }

    // Production mode with Resend
    try {
      const fromEmail = process.env.RESEND_FROM_EMAIL || "VetDrPaw <noreply@vetdrpaw.com>";

      await resend!.emails.send({
        from: fromEmail,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });

      console.log(`✅ Email sent successfully to ${options.to}`);
    } catch (error) {
      console.error("❌ Error sending email with Resend:", error);
      throw new Error("Failed to send email");
    }
  },

  /**
   * Sends activation email to guest user
   */
  sendActivationEmail: async (
    email: string,
    name: string,
    token: string
  ): Promise<void> => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const activationUrl = `${baseUrl}/activar?token=${token}`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 15px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🐾 Bienvenido a VetDrPaw</h1>
            </div>
            <div class="content">
              <h2>Hola ${name},</h2>
              <p>Tu veterinario ha creado una cuenta para ti en VetDrPaw. Ahora puedes acceder a toda la información médica de tus mascotas en un solo lugar.</p>
              
              <p>Para activar tu cuenta y establecer tu contraseña, haz clic en el siguiente botón:</p>
              
              <div style="text-align: center;">
                <a href="${activationUrl}" class="button">Activar Mi Cuenta</a>
              </div>
              
              <p>O copia y pega este enlace en tu navegador:</p>
              <p style="background: #fff; padding: 10px; border-radius: 5px; word-break: break-all;">
                ${activationUrl}
              </p>
              
              <p><strong>Este enlace expirará en 7 días.</strong></p>
              
              <p>Si no solicitaste esta cuenta, puedes ignorar este correo.</p>
              
              <p>Saludos,<br>El equipo de VetDrPaw</p>
            </div>
            <div class="footer">
              <p>Este es un correo automático, por favor no respondas a este mensaje.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    await EmailService.send({
      to: email,
      subject: "Activa tu cuenta en VetDrPaw 🐾",
      html,
    });
  },

  /**
   * Generates a secure random token
   */
  generateToken: (): string => {
    return crypto.randomBytes(32).toString("hex");
  },
};
