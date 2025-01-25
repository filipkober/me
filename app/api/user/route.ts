import { prisma } from '@/util/prisma';
import bcrypt from 'bcrypt';

export async function POST(request: Request) {
    const body = await request.json();
    const { email, password, name, superAdminPassword } = body;
    
    if (superAdminPassword !== process.env.SUPER_ADMIN_PASSWORD) {
        return new Response("Unauthorized", { status: 401 });
    }

    if (!email || !password) {
        return new Response("Email and password are required", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            admin: true
        }
    });

    return new Response(JSON.stringify(user), { status: 201 });

}