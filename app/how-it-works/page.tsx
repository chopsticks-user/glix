"use client";

import React from 'react';
import {motion} from 'framer-motion';
import {LayoutDashboard, Link, Send} from 'lucide-react';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            id: 1,
            icon: <Link className="text-blue-600" size={40}/>,
            title: "Secure Link",
            description: "Connect your existing third-party payment accounts using our secure API integration. We never store your login passwords.",
            color: "blue"
        },
        {
            id: 2,
            icon: <LayoutDashboard className="text-purple-600" size={40}/>,
            title: "The Glix Hub",
            description: "Your balances are visualized in the Glix Dashboard. Select the source of funds (e.g., Payoneer) and the destination (e.g., PayPal).",
            color: "purple"
        },
        {
            id: 3,
            icon: <Send className="text-emerald-600" size={40}/>,
            title: "Instant Transfer",
            description: "Hit send. Glix handles the internal bridging and settlement. The recipient receives the funds in their preferred platform instantly.",
            color: "emerald"
        }
    ];

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
            <section className="max-w-7xl mx-auto px-6 pb-24">
                <div className="grid gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-200 flex flex-col md:flex-row gap-8 items-center"
                        >
                            <div
                                className={`w-24 h-24 rounded-3xl bg-${step.color}-50 flex items-center justify-center shrink-0`}>
                                {step.icon}
                            </div>
                            <div className="flex-grow text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                    <span
                                        className={`px-3 py-1 rounded-full bg-${step.color}-100 text-${step.color}-700 text-xs font-bold uppercase tracking-wider`}>Step 0{step.id}</span>
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">{step.title}</h2>
                                <p className="text-lg text-slate-600 leading-relaxed mb-4">{step.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

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
