"use client";

import {login} from "@/services/auth";

import React, {useState} from "react";
import {useRouter} from "next/navigation";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return <div className="bg-slate-50 min-h-screen flex items-center justify-center py-24 px-6">
        <div
            className="flex flex-col max-w-xl w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-200 text-center">
            <div className={"w-full pb-16 justify-center items-center flex"}>
                <img src="https://uploads.onecompiler.io/43y6nw4pw/446bhcjxw/logo.png" alt="Glix"
                     className="w-20 h-20 object-contain"/>
                <span
                    className="text-4xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">Glix</span>
            </div>
            <form
                className="space-y-4"
                onSubmit={async e => {
                    e.preventDefault();
                    const res = await login(email, password);
                    if (!res.ok) {
                        return;
                    }
                    router.push("/dashboard");
                }}
            >
                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                    value={email}
                    onChange={e => {
                        setEmail(e.target.value)
                    }}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                    value={password}
                    onChange={e => {
                        setPassword(e.target.value)
                    }}
                    required
                />
                {/*<p aria-live="polite">{state?.message}</p>*/}
                <button
                    className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors text-lg shadow-lg shadow-blue-500/20"
                    type="submit"
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