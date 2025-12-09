import JoinWaitlistForm from "./JoinWaitListForm";

import React from 'react';

const JoinWaitlist: React.FC = () => {
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

                <JoinWaitlistForm/>

                <p className="text-xs text-slate-400 mt-6">
                    By joining, you agree to our Terms of Service and Privacy Policy.
                </p>
            </div>
        </div>
    );
};

export default JoinWaitlist;
