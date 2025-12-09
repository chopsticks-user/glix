import React from 'react';

const TermsOfService: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-sm border border-slate-200">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Service</h1>
                <div className="prose prose-slate max-w-none text-slate-600">

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Acceptance of Terms</h2>
                    <p className="mb-6">
                        By creating a Glix account, you agree to these terms. You must be 18+ and legally allowed to hold a financial account in your jurisdiction.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Prohibited Activities</h2>
                    <p className="mb-6">
                        Glix may not be used for money laundering, illegal goods, or gambling. We reserve the right to freeze accounts suspected of violating these rules.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. Liability</h2>
                    <p className="mb-6">
                        Glix acts as an aggregator. We are responsible for the "bridge" transaction, but we are not a bank. Funds held in linked 3rd-party wallets are subject to the terms of those specific platforms.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
