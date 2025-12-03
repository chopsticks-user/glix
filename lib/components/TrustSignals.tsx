"use client";

import React from 'react';
import {motion} from 'framer-motion';
import {Award, FileCheck, Lock, Shield, Star} from 'lucide-react';

const TrustSignals: React.FC = () => {
    return (
        <section className="px-6 max-w-7xl mx-auto w-full py-20 border-t border-slate-200">
            <div className="text-center mb-16">
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-6 tracking-wide uppercase">
                    <Award size={12}/>
                    Verified Excellence
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900">Trusted by the Global Economy</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    From solo freelancers to enterprise platforms, thousands rely on Glix to move their money safely and
                    instantly.
                </p>
            </div>

            {/* Testimonials */}
            <div className="grid md:grid-cols-3 gap-8 mb-20">
                <TestimonialCard
                    quote="I used to lose almost 8% on every withdrawal. With Glix, I save around $400 every single month. It's a game changer for my design business."
                    author="Sarah Jenkins"
                    role="UX Designer, Philippines"
                    delay={0}
                />
                <TestimonialCard
                    quote="The speed is unreal. Money hits my local bank account before I even close the browser tab. The AI routing actually works as promised."
                    author="David Chen"
                    role="E-commerce Seller, Taiwan"
                    delay={0.2}
                />
                <TestimonialCard
                    quote="Compliance was a nightmare for our agency. Glix handles all the KYC and AML automatically, allowing us to focus purely on hiring talent."
                    author="Elena Rodriguez"
                    role="Agency Founder, Argentina"
                    delay={0.4}
                />
            </div>

            {/* Certifications Strip */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                <p className="text-center text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
                    Bank-Grade Compliance & Security Standards
                </p>
                <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-80">
                    <CertBadge icon={<Shield/>} text="SOC 2 Type II"/>
                    <CertBadge icon={<Lock/>} text="PCI DSS Level 1"/>
                    <CertBadge icon={<FileCheck/>} text="ISO 27001"/>
                    <CertBadge icon={<Shield/>} text="GDPR Compliant"/>
                </div>
            </div>
        </section>
    );
};

const TestimonialCard: React.FC<{ quote: string; author: string; role: string; delay: number }> = ({
                                                                                                       quote,
                                                                                                       author,
                                                                                                       role,
                                                                                                       delay
                                                                                                   }) => (
    <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{delay, duration: 0.5}}
        viewport={{once: true}}
        className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:border-blue-200 transition-all duration-300 relative flex flex-col h-full"
    >
        <div className="flex gap-1 text-yellow-500 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={16} fill="currentColor"/>
            ))}
        </div>
        <p className="text-slate-600 leading-relaxed mb-6 flex-grow">"{quote}"</p>
        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
            <div
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {author.charAt(0)}
            </div>
            <div>
                <h4 className="text-slate-900 font-bold text-sm">{author}</h4>
                <p className="text-slate-500 text-xs">{role}</p>
            </div>
        </div>
    </motion.div>
);

const CertBadge: React.FC<{ icon: React.ReactNode; text: string }> = ({icon, text}) => (
    <div className="flex flex-col items-center gap-3 group cursor-default">
        <div
            className="p-4 rounded-full bg-slate-50 text-slate-400 border border-slate-200 group-hover:text-emerald-600 group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all duration-300">
            {React.cloneElement(icon as React.ReactElement<any>, {size: 24})}
        </div>
        <span
            className="text-xs font-semibold text-slate-500 group-hover:text-slate-800 transition-colors">{text}</span>
    </div>
);

export default TrustSignals;