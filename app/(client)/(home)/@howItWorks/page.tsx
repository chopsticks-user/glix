"use client";

import React from 'react';
import {motion} from 'framer-motion';
import {ArrowRight, CheckCircle2, Cpu, Wallet} from 'lucide-react';

const HowItWorks: React.FC = () => {
    const steps = [
        {
            id: 1,
            icon: <Wallet className="text-blue-600" size={32}/>,
            title: "Connect Source",
            description: "Link your PayPal, Payoneer, or Wise account securely. We only read balance data—we never hold your login credentials.",
            color: "blue"
        },
        {
            id: 2,
            icon: <Cpu className="text-purple-600" size={32}/>,
            title: "AI Analysis",
            description: "Our NeuroPath™ engine scans 50+ global banking corridors in milliseconds to find the route with the lowest fees and fastest speed.",
            color: "purple"
        },
        {
            id: 3,
            icon: <CheckCircle2 className="text-emerald-600" size={32}/>,
            title: "Instant Transfer",
            description: "Funds land in your local bank account or digital wallet. 90% of transfers arrive in under 60 seconds.",
            color: "emerald"
        }
    ];

    return (
        <section id="how-it-works" className="py-24 relative overflow-hidden">
            {/* Background Line */}
            <div
                className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent -translate-y-1/2 hidden md:block"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-20">
                    <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Process</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 text-slate-900">How Glix Works</h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {steps.map((step, index) => (
                        <motion.div
                            key={step.id}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            transition={{delay: index * 0.2}}
                            className="relative group"
                        >
                            {/* Card */}
                            <div
                                className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:shadow-blue-900/5 transition-all relative z-20 h-full">

                                {/* Step Number Badge */}
                                <div
                                    className="absolute -top-6 left-8 bg-slate-900 border border-slate-900 px-4 py-1 rounded-full text-sm font-bold text-white shadow-lg">
                                    Step 0{step.id}
                                </div>

                                <div
                                    className={`w-16 h-16 rounded-2xl bg-${step.color}-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    {step.icon}
                                </div>

                                <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                                <p className="text-slate-600 leading-relaxed text-sm">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connecting Arrow (Desktop Only) */}
                            {index < steps.length - 1 && (
                                <div
                                    className="absolute top-1/2 -right-6 -translate-y-1/2 z-30 hidden md:block text-slate-300">
                                    <ArrowRight size={24}/>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;