"use client";

import useWaitlistFormState from "@/app/(client)/(routes)/join-waitlist/useWaitlistFormState";

import React from "react";
import {ArrowRight} from 'lucide-react';

export default function EarlyAccessForm() {
    const [state, action, pending] = useWaitlistFormState();

    return <>
        <form
            className="flex flex-col sm:flex-row gap-3 max-w-md"
            action={action}
        >
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="flex-1 bg-white border border-slate-300 rounded-full px-6 py-3.5 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm"
                defaultValue={state.data.email}
                required
            />
            <button
                className="px-8 py-3.5 rounded-full bg-slate-900 text-white font-bold hover:bg-slate-800 hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group shadow-md"
                type="submit" disabled={pending}
            >
                Get Access <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </button>
        </form>
        <p aria-live="polite">{state?.message}</p> {/* todo: styling */}
    </>

}