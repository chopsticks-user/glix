"use server";

import {ActionState} from "@/lib/types";
import env from "@/lib/env";
import payload from "@/lib/payload";

import {z} from 'zod';
import {cookies, headers as nextHeaders} from "next/headers";

export async function auth() {
    const headers = await nextHeaders();
    return await payload.auth({headers, canSetHeaders: false});
}

const LoginSchema = z.object({
    email: z.email(),
    password: z.string(),
});
export type LoginActionState = ActionState<{ email: string, password: string }>;

export async function login(_prev: LoginActionState, formData: FormData)
    : Promise<LoginActionState> {
    const result = LoginSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!result.success) {
        console.log(result);
        return {
            success: false,
            message: "Please provide a valid email address",
            data: {
                email: formData.get("email")! as string,
                password: formData.get("password")! as string,
            }
        };
    }

    const data = result.data;
    const failureResponse = {
        success: false,
        message: "Authentication failed",
        data: data,
    };

    try {
        const res = await payload.login({
            collection: "users",
            data: {
                email: data.email,
                password: data.password,
            }
        });

        if (!res.token) {
            return failureResponse;
        }

        (await cookies()).set("payload-token", res.token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60,
            sameSite: "strict",
        });

        return {
            success: true,
            message: "You are logged in! Redirecting...",
            data: {
                email: "",
                password: "",
            }
        };
    } catch (error: any) {
        console.error(error);
        return failureResponse;
    }
}

export async function logout() {
    try {
        const res = await fetch(
            `${env.url.server}/api/users/logout?allSessions=true`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Cookie: `payload-token=${(await cookies()).get("payload-token")?.value}`,
                },
            },
        );
        console.log(res);
    } catch (error: any) {
        // todo
    }
}

const ForgotSchema = z.object({
    email: z.email(),
});
export type ForgotActionState = ActionState<{ email: string }>;

export async function forgotPassword(
    _prev: ForgotActionState, formData: FormData
): Promise<ForgotActionState> {
    const result = ForgotSchema.safeParse({
        email: formData.get("email"),
    });

    if (!result.success) {
        console.log(result);
        return {
            success: false,
            message: "Please provide a valid email address",
            data: {
                email: formData.get("email")! as string,
            }
        };
    }

    const data = result.data;
    try {
        const token = await payload.forgotPassword({
            collection: "users",
            data: {
                email: data.email,
            },
        });

        // todo: email the token to the user

        return {
            success: true,
            message: "An instruction to reset password will be sent to your email",
            data: {
                email: data.email,
            }
        };
    } catch (error: any) {
        return {
            success: false,
            message: "Unknown error",
            data: data,
        };
    }
}

const ResetSchema = z.object({
    token: z.string(),
    newPassword: z.string(),
});
export type ResetActionState = ActionState<{ token: string, newPassword: string }>;

export async function resetPassword(_prev: ResetActionState, formData: FormData)
    : Promise<ResetActionState> {
    const result = ResetSchema.safeParse({
        token: formData.get("token"),
        newPassword: formData.get("newPassword"),
    });

    if (!result.success) {
        console.log(result);
        return {
            success: false,
            message: "Please provide a valid password",
            data: {
                token: formData.get("newPassword")! as string,
                newPassword: formData.get("newPassword")! as string,
            }
        };
    }

    const data = result.data;
    const failureResponse = {
        success: false,
        message: "Failed to reset your password",
        data: data,
    };
    try {
        const res = await payload.resetPassword({
            collection: "users",
            data: {
                token: data.token,
                password: data.newPassword,
            },
            overrideAccess: true,
        });

        if (!res.token) {
            return failureResponse;
        }

        (await cookies()).set("payload-token", res.token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60,
            sameSite: "strict",
        });

        return {
            success: true,
            message: "Your password has been reset! Redirecting...",
            data: {
                token: "",
                newPassword: data.newPassword,
            }
        };
    } catch (error: any) {
        return failureResponse;
    }
}
