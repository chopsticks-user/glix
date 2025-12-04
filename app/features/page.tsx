import HeroSection from "./HeroSection";

import React from 'react';
import FeatureSections from "./FeatureSections";

const Features: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <HeroSection/>
            <FeatureSections/>

            {/* Comparison Table */}
            <section className="py-24 px-6 bg-slate-50">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose Glix?</h2>
                        <p className="text-slate-600">See how we stack up against traditional banking.</p>
                    </div>
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-200">
                        <div
                            className="grid grid-cols-3 p-6 bg-slate-50 border-b border-slate-200 font-bold text-slate-900">
                            <div>Feature</div>
                            <div className="text-center text-slate-500">Traditional Banks</div>
                            <div className="text-center text-blue-600">Glix</div>
                        </div>
                        {[
                            {feature: "Transfer Speed", bank: "3-5 Business Days", glix: "Instant"},
                            {feature: "Cross-Platform", bank: "Not Supported", glix: "Native Support"},
                            {feature: "Currency Rates", bank: "High Markup (3-5%)", glix: "Mid-Market (0.5%)"},
                            {feature: "Hidden Fees", bank: "Yes ($25-50 wires)", glix: "None"},
                            {feature: "24/7 Availability", bank: "No (Banking Hours)", glix: "Yes (Always On)"}
                        ].map((row, i) => (
                            <div key={i}
                                 className="grid grid-cols-3 p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                                <div className="font-medium text-slate-700">{row.feature}</div>
                                <div className="text-center text-slate-500">{row.bank}</div>
                                <div className="text-center font-bold text-blue-600">{row.glix}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Built for Everyone</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <UseCaseCard
                            title="Freelancers"
                            desc="Get paid in USD, spend in EUR. Consolidate earnings from Upwork, Fiverr, and direct clients into one hub."
                        />
                        <UseCaseCard
                            title="Digital Nomads"
                            desc="Move money instantly between countries. Never get stranded waiting for a wire transfer to clear."
                        />
                        <UseCaseCard
                            title="Agencies"
                            desc="Pay your global team in their local currency with a single click. Simplify your payroll operations."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const UseCaseCard: React.FC<{ title: string, desc: string }> = ({title, desc}) => (
    <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
        <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{desc}</p>
    </div>
);

export default Features;
