"use server";

import db from "@/shared/lib/mongodb";
import {ActionState} from "@/shared/lib/types";

import {z} from 'zod';

const WaitlistedCustomerSchema = z.object({
    email: z.email(),
});
type WaitlistFormState = ActionState<{ email: string }>;

export async function addToWaitlist(_prev: WaitlistFormState, formData: FormData)
    : Promise<WaitlistFormState> {
    const result = WaitlistedCustomerSchema.safeParse({
        email: formData.get("email"),
    });

    if (!result.success) {
        return {
            success: false,
            message: "Please provide a valid email address",
            data: {
                email: formData.get("email")! as string,
            }
        };
    }

    const email = result.data.email;
    const waitlistedCustomers = db.collection("waitlist");

    // todo: use Next.js' error handling pattern instead
    try {
        await waitlistedCustomers.insertOne({email: email});
        return {
            success: true,
            message: "Subscribed successfully! You will receive an confirmation email from us soon.",
            data: {
                email: "",
            },
        };
    } catch (err: any) {
        const state = {
            success: false,
            message: "Already subscribed",
            data: {
                email: formData.get("email")! as string,
            },
        };

        if (err.code === 11000) {
            return {...state, message: "Already subscribed"};
        } else {
            console.error(err);
            return {...state, message: "Internal server error"};
        }
    }
}