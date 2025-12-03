"use client";

import React, {useState} from "react";

const JoinWaitlistForm = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const addToWaitlist = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            setStatus("Please enter a valid email address");
            return;
        }

        const response = await fetch("/api/waitlist", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email}),
        });

        if (!response.ok) {
            if (response.status === 409) {
                setStatus("Already subscribed");
            } else {
                setStatus("Failed to add your email address to our waitlist");
            }

            // keep the invalid email so users can make changes then resubmit
            return;
        }

        // todo: send email to user
        setStatus("Subscribed successfully! You will receive a confirmation from us soon.");
        setEmail("");
    }

    return <form className="space-y-4" onSubmit={addToWaitlist}>
        <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
            onChange={e => setEmail(e.target.value)}
            required
        />
        <button
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors text-lg shadow-lg shadow-blue-500/20"
            type="submit"
        >
            Get Early Access
        </button>
        {status && <p>{status}</p>}
    </form>
}

export default JoinWaitlistForm;