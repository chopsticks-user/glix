"use client";

import useWaitlistFormState from "@/app/(client)/(routes)/join-waitlist/useWaitlistFormState";

const JoinWaitlistForm = () => {
    const [state, action, pending] = useWaitlistFormState();

    return <form className="space-y-4" action={action}>
        <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
            defaultValue={state.data.email}
            required
        />
        <p aria-live="polite">{state?.message}</p>
        <button
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors text-lg shadow-lg shadow-blue-500/20"
            type="submit"
            disabled={pending}
        >
            Get Early Access
        </button>
    </form>
}

export default JoinWaitlistForm;