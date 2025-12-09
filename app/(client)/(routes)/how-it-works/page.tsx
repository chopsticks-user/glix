import StepsSection from "./StepsSection";

import React from 'react';

const HowItWorks: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Header */}
            <section className="py-20 px-6 text-center">
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Simplicity.</h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                    From fragmented to fluid in three steps.
                </p>
            </section>

            {/* Steps */}
            <StepsSection/>

            {/* Technical Architecture */}
            <section className="py-24 px-6 bg-slate-900 text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Under the Hood</h2>
                        <p className="text-slate-400">How we process millions of transactions securely.</p>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        <TechCard
                            title="API Gateway"
                            desc="Handles incoming requests, rate limiting, and authentication via OAuth 2.0."
                        />
                        <TechCard
                            title="Liquidity Engine"
                            desc="Real-time matching engine that finds the best route for your currency conversion."
                        />
                        <TechCard
                            title="Ledger"
                            desc="Double-entry immutable ledger that records every transaction for auditability."
                        />
                        <TechCard
                            title="Settlement"
                            desc="Connects to local payment rails (ACH, SEPA, etc.) for final fund delivery."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const TechCard: React.FC<{ title: string, desc: string }> = ({title, desc}) => (
    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h3 className="font-bold text-lg mb-2 text-blue-400">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
    </div>
);

export default HowItWorks;
