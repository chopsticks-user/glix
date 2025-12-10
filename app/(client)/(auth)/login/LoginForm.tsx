"use client";

import {login} from "@/services/auth";

import React, {useActionState, useEffect} from "react";
import Link from "next/link";
import {useRouter} from "next/navigation";

export default function LoginForm() {
    const [state, action, pending] = useActionState(
        login, {
            success: false,
            message: "",
            data: {
                email: "",
                password: "",
            },
        }
    );

    const router = useRouter();
    useEffect(() => {
        if (state.success) {
            router.refresh();
            router.push("/dashboard");
        }
    }, [state.success]);

    return <div className="bg-slate-50 min-h-screen flex items-center justify-center py-24 px-6">
        <div
            className="flex flex-col max-w-xl w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-200 text-center">
            <div className={"w-full pb-16 justify-center items-center flex"}>
                <span
                    className="text-4xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">Login</span>
            </div>
            <form className="space-y-4" action={action}>
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                    defaultValue={state.data.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                    defaultValue={state.data.password}
                    required
                />
                <Link
                    className={"block"}
                    href="/forgot-password"
                >
                    <p className={"max-w-fit text-blue-500 underline"}>
                        Forgot password?
                    </p>
                </Link>
                <p aria-live="polite">{state?.message}</p>
                <button
                    className="cursor-pointer w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors text-lg shadow-lg shadow-blue-500/20"
                    type="submit" disabled={pending}
                >
                    Login
                </button>
            </form>
            <p className="text-xs text-slate-400 mt-6">
                By joining, you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>
    </div>
}