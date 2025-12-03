import React, {useState} from 'react';

const JoinWaitlist: React.FC = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("");

    const addToWaitlist = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email) {
            setStatus("Please enter a valid email address");
            return;
        }

        const response = await fetch("http://localhost:8080/api/waitlist", {
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

    return (
        <div className="bg-slate-50 min-h-screen flex items-center justify-center py-24 px-6">
            <div className="max-w-xl w-full bg-white p-10 rounded-3xl shadow-2xl border border-slate-200 text-center">
                <div
                    className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-lg shadow-blue-500/30">
                    <img src="https://uploads.onecompiler.io/43y6nw4pw/446bhcjxw/logo.png" alt="Glix"
                         className="w-10 h-10 object-contain brightness-0 invert"/>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">Join the Waitlist</h1>
                <p className="text-slate-600 mb-8 text-lg">
                    We are rolling out access gradually. Secure your spot in line to experience the future of finance.
                </p>

                <form className="space-y-4" onSubmit={addToWaitlist}>
                    <input
                        type="email"
                        placeholder="Enter your email address"
                        className="w-full px-6 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                        onChange={e => setEmail(e.target.value)}
                    />
                    <button
                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors text-lg shadow-lg shadow-blue-500/20"
                        type="submit"
                    >
                        Get Early Access
                    </button>
                    {status && <p>{status}</p>}
                </form>

                <p className="text-xs text-slate-400 mt-6">
                    By joining, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default JoinWaitlist;
