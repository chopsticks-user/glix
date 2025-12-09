"use client";

import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {ArrowRight, BrainCircuit, Coins, Lock, ShieldCheck, TrendingUp} from 'lucide-react';

const WhyChooseUs: React.FC = () => {
    const [activeSection, setActiveSection] = useState('liquidity');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 120; // Adjust for navbar height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveSection(id);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['liquidity', 'rates', 'security'];

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top >= 0 && rect.top <= 400) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section id="why-glix" className="px-6 max-w-7xl mx-auto w-full py-20 relative">
            <div className="flex flex-col lg:flex-row gap-16 relative">

                {/* Sticky Information Sidebar */}
                <div className="lg:w-1/3 lg:sticky lg:top-32 h-fit space-y-8">
                    <div>
                        <span
                            className="text-blue-600 font-semibold tracking-wider text-sm uppercase">Why Choose Glix</span>
                        <h2 className="text-4xl md:text-5xl font-bold mt-2 leading-tight text-slate-900">
                            Built by AI.<br/>
                            Secured by Experts.<br/>
                            Loved by You.
                        </h2>
                        <p className="text-slate-600 mt-6 text-lg leading-relaxed">
                            We aren't just another wallet. We are an intelligent financial layer that sits above the
                            fragmented banking system, optimizing every dollar you move.
                        </p>
                    </div>

                    <div className="hidden lg:flex flex-col gap-3 pt-4">
                        <InfoLink
                            icon={<BrainCircuit/>}
                            text="Liquidity Orchestrator"
                            active={activeSection === 'liquidity'}
                            onClick={() => scrollToSection('liquidity')}
                        />
                        <InfoLink
                            icon={<Coins/>}
                            text="Mid-Market Rates"
                            active={activeSection === 'rates'}
                            onClick={() => scrollToSection('rates')}
                        />
                        <InfoLink
                            icon={<ShieldCheck/>}
                            text="Bank-Grade Security"
                            active={activeSection === 'security'}
                            onClick={() => scrollToSection('security')}
                        />
                    </div>

                    <div className="pt-6 border-t border-slate-200 hidden lg:block">
                        <button
                            className="w-full py-4 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors group">
                            Start Saving Today <ArrowRight size={18}
                                                           className="group-hover:translate-x-1 transition-transform"/>
                        </button>
                    </div>
                </div>

                {/* Detailed Scrollable Content */}
                <div className="lg:w-2/3 flex flex-col gap-12 lg:pt-8">

                    {/* Feature 1: AI Integration */}
                    <div id="liquidity">
                        <InfoCard
                            icon={<BrainCircuit className="text-purple-600" size={32}/>}
                            title="Liquidity Orchestrator"
                            badge="Technology"
                        >
                            <p className="text-slate-600 mb-6">
                                Traditional banks use a single, expensive corridor for transfers. Glix utilizes a
                                proprietary <strong>Liquidity Orchestrator</strong> that scans over 50+ financial routes
                                in real-time.
                            </p>
                            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
                                        <div className="h-full w-[70%] bg-red-400"></div>
                                    </div>
                                    <span className="text-xs text-slate-500 w-20 text-right">Standard</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="h-2 flex-1 bg-slate-200 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{width: 0}}
                                            whileInView={{width: "30%"}}
                                            transition={{duration: 1, delay: 0.5}}
                                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                                        ></motion.div>
                                    </div>
                                    <span className="text-xs text-blue-600 w-20 text-right font-bold">Glix AI</span>
                                </div>
                                <p className="text-xs text-slate-500 mt-4 text-center">Our AI finds routes that are up
                                    to 70% cheaper.</p>
                            </div>
                        </InfoCard>
                    </div>

                    {/* Feature 2: Currency Value */}
                    <div id="rates">
                        <InfoCard
                            icon={<TrendingUp className="text-emerald-600" size={32}/>}
                            title="Wholesale Currency Value"
                            badge="Savings"
                        >
                            <p className="text-slate-600 mb-6">
                                Most services hide fees in the exchange rate (the "spread"). We don't. You get
                                the <strong>Mid-Market Rate</strong>—the same rate big banks trade at.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div
                                    className="p-4 rounded-xl bg-red-50 border border-red-100 flex flex-col items-center text-center">
                                    <span className="text-slate-500 text-xs mb-1">Competitors</span>
                                    <span className="text-xl font-bold text-red-500">3-5% Spread</span>
                                    <span className="text-xs text-slate-500 mt-2">Hidden cost</span>
                                </div>
                                <div
                                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 flex flex-col items-center text-center">
                                    <span className="text-emerald-600 text-xs mb-1">Glix</span>
                                    <span className="text-xl font-bold text-emerald-600">Wholesale</span>
                                    <span className="text-xs text-emerald-600 mt-2">Real market rate</span>
                                </div>
                            </div>
                        </InfoCard>
                    </div>

                    {/* Feature 3: Security */}
                    <div id="security">
                        <InfoCard
                            icon={<Lock className="text-blue-600" size={32}/>}
                            title="Fortress-Level Security"
                            badge="Safety"
                        >
                            <p className="text-slate-600 mb-6">
                                We combine military-grade encryption with AI behavioral analysis. If a transaction looks
                                suspicious, our system flags it in milliseconds.
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <ShieldCheck size={18} className="text-blue-600"/> AES-256 Encryption (Bank
                                    Standard)
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <ShieldCheck size={18} className="text-blue-600"/> Biometric Authentication
                                </li>
                                <li className="flex items-center gap-3 text-sm text-slate-600">
                                    <ShieldCheck size={18} className="text-blue-600"/> 100% Segregated User Funds
                                </li>
                            </ul>
                        </InfoCard>
                    </div>

                </div>
            </div>
        </section>
    );
};

const InfoLink: React.FC<{ icon: React.ReactNode, text: string, active?: boolean, onClick: () => void }> = ({
                                                                                                                icon,
                                                                                                                text,
                                                                                                                active,
                                                                                                                onClick
                                                                                                            }) => (
    <button
        onClick={onClick}
        className={`flex items-center gap-4 p-4 rounded-xl transition-all w-full text-left ${active ? 'bg-white border border-slate-200 shadow-sm scale-105' : 'opacity-60 hover:opacity-100 hover:bg-slate-50'}`}
    >
        <div className={`${active ? 'text-blue-600' : 'text-slate-400'}`}>{icon}</div>
        <span className={`font-medium ${active ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>{text}</span>
    </button>
);

const InfoCard: React.FC<{ icon: React.ReactNode, title: string, badge: string, children: React.ReactNode }> = ({
                                                                                                                    icon,
                                                                                                                    title,
                                                                                                                    badge,
                                                                                                                    children
                                                                                                                }) => (
    <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: "-50px"}}
        className="bg-white border border-slate-200 rounded-3xl p-8 relative overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-300"
    >
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            {icon}
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 shadow-sm">{icon}</div>
                <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{badge}</span>
                    <h3 className="text-2xl font-bold text-slate-900">{title}</h3>
                </div>
            </div>
            {children}
        </div>
    </motion.div>
);

export default WhyChooseUs;