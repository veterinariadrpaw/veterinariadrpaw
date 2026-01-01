/**
 * Script de prueba para verificar la configuración de Resend
 * 
 * Uso:
 * 1. Asegúrate de tener RESEND_API_KEY en tu .env
 * 2. Ejecuta: node --loader ts-node/esm scripts/test-email.ts
 * 3. O simplemente importa y llama a testEmail() desde tu código
 */

import { EmailService } from '../services/email.service';

export async function testEmail(recipientEmail: string) {
    console.log('🧪 Probando configuración de Resend...\n');

    try {
        // Verificar variables de entorno
        console.log('📋 Variables de entorno:');
        console.log(`   RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✅ Configurada' : '❌ No configurada'}`);
        console.log(`   RESEND_FROM_EMAIL: ${process.env.RESEND_FROM_EMAIL || 'No configurada (usará default)'}`);
        console.log(`   NODE_ENV: ${process.env.NODE_ENV || 'development'}\n`);

        // Generar token de prueba
        const testToken = EmailService.generateToken();
        console.log(`🔑 Token generado: ${testToken.substring(0, 20)}...\n`);

        // Enviar email de prueba
        console.log(`📧 Enviando email de activación a: ${recipientEmail}\n`);

        await EmailService.sendActivationEmail(
            recipientEmail,
            'Usuario de Prueba',
            testToken
        );

        console.log('✅ ¡Email enviado exitosamente!');
        console.log('\n📬 Revisa tu bandeja de entrada (y spam) en:', recipientEmail);
        console.log(`🔗 URL de activación generada: ${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/activar?token=${testToken}\n`);

        return true;
    } catch (error) {
        console.error('❌ Error al enviar email:', error);
        console.log('\n💡 Posibles soluciones:');
        console.log('   1. Verifica que RESEND_API_KEY esté correctamente configurada en .env');
        console.log('   2. Asegúrate de que la API key sea válida');
        console.log('   3. Si usas un dominio personalizado, verifica que esté verificado en Resend');
        console.log('   4. Revisa los logs de Resend en https://resend.com/logs\n');

        return false;
    }
}

// Si se ejecuta directamente
if (require.main === module) {
    const email = process.argv[2];

    if (!email) {
        console.error('❌ Error: Debes proporcionar un email como argumento');
        console.log('\nUso: npm run test:email tu@email.com');
        process.exit(1);
    }

    testEmail(email)
        .then((success) => {
            process.exit(success ? 0 : 1);
        })
        .catch((error) => {
            console.error('Error fatal:', error);
            process.exit(1);
        });
}
