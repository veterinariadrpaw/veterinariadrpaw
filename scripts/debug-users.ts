import dbConnect from "../lib/db";
import { User } from "../models/User";

async function debugGuestUsers() {
    await dbConnect();
    const users = await User.find({ isGuest: true });

    console.log(`🔍 Encontrados ${users.length} usuarios invitados:`);
    users.forEach(u => {
        console.log(`- Nombre: ${u.name}`);
        console.log(`  Email: ${u.email}`);
        console.log(`  Creado: ${u.createdAt}`);
        console.log(`  Token: ${u.activationToken}`);
        console.log(`  Expira: ${u.activationExpires}`);
        console.log(`  Activado: ${u.activatedAt}`);
        console.log('-------------------');
    });

    process.exit(0);
}

debugGuestUsers().catch(err => {
    console.error(err);
    process.exit(1);
});
