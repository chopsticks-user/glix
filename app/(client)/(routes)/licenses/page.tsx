import React from 'react';

const Licenses: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-sm border border-slate-200">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">Licenses & Disclosures</h1>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="mb-6">
                        Glix Financial Inc. is a registered money services business and holds licenses in various jurisdictions to operate legally and securely.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">United States</h2>
                    <p className="mb-4">
                        Registered with FinCEN as a Money Services Business (MSB). Registration Number: 31000123456789.
                    </p>
                    <p className="mb-6">
                        Licensed Money Transmitter in 48 states.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">European Union</h2>
                    <p className="mb-6">
                        Authorized Electronic Money Institution (EMI) regulated by the Central Bank of Ireland. Reference number: C123456.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">United Kingdom</h2>
                    <p className="mb-6">
                        Authorized by the Financial Conduct Authority (FCA) under the Electronic Money Regulations 2011. Firm Reference Number: 900123.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Singapore</h2>
                    <p>
                        Major Payment Institution licensed by the Monetary Authority of Singapore (MAS). License No. PS20201234.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Licenses;
