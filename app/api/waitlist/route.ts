import {NextRequest, NextResponse} from "next/server";
import {z} from 'zod';

const WaitlistedCustomerSchema = z.object({
    email: z.email(),
});

export async function POST(request: NextRequest) {
    const body = await request.json();
    const result = WaitlistedCustomerSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({error: "Please provide a valid email address"}, {status: 400});
    }

    // todo: decide on what Vercel database to use
    // const email = result.data.email;

    return NextResponse.json({
        message: 'Subscribed successfully! You will receive an confirmation email from us soon.'
    }, {status: 200});
}