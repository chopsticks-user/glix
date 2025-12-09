import React from 'react';

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-sm border border-slate-200">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">Your Privacy is our Priority.</h1>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="mb-6">
                        At Glix, we value your trust. This policy outlines how we collect, use, and protect your personal financial data.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Key Data Points</h2>

                    <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Information We Collect</h3>
                    <p className="mb-4">
                        Identity verification (KYC), transaction history, and linked account metadata.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">How We Use Data</h3>
                    <p className="mb-4">
                        To process transactions, prevent fraud, and comply with financial regulations.
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 mt-6 mb-2">Data Sharing</h3>
                    <p className="mb-6">
                        We do not sell your data. We only share necessary transaction details with the payment processors involved in your specific transfer.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
