import React from 'react';
import { ShieldCheck, Lock, Key, Smartphone, FileCheck, Bug } from 'lucide-react';

const Security: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="py-20 px-6 max-w-7xl mx-auto text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto mb-8">
                    <ShieldCheck size={40} />
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">Bank-Grade Security. Zero Compromises.</h1>
                <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                    Trust and Technology.
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-8">
                <SecurityCard
                    icon={<Lock size={32} />}
                    title="AES-256 Encryption"
                    desc="All data moving through Glix is encrypted at the highest standard available."
                    color="blue"
                />
                <SecurityCard
                    icon={<Key size={32} />}
                    title="Tokenized Access"
                    desc="We use OAuth tokens to link your wallets. This means we never see or store your banking passwords."
                    color="purple"
                />
                <SecurityCard
                    icon={<ShieldCheck size={32} />}
                    title="Fraud Detection Engine"
                    desc="AI-driven monitoring runs 24/7 to detect and block suspicious transactions before they happen."
                    color="emerald"
                />
                <SecurityCard
                    icon={<Smartphone size={32} />}
                    title="Two-Factor Authentication (2FA)"
                    desc="Your money doesn't move unless you say so via your verified device."
                    color="indigo"
                />
            </section>

            {/* Compliance & Certifications */}
            <section className="py-24 px-6 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12">Compliance & Certifications</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-8 border border-slate-200 rounded-2xl flex flex-col items-center">
                            <FileCheck size={48} className="text-slate-400 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">SOC 2 Type II</h3>
                            <p className="text-slate-500 text-sm">Audited annually for security, availability, and confidentiality.</p>
                        </div>
                        <div className="p-8 border border-slate-200 rounded-2xl flex flex-col items-center">
                            <ShieldCheck size={48} className="text-slate-400 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">PCI DSS Level 1</h3>
                            <p className="text-slate-500 text-sm">Highest level of certification for payment data security.</p>
                        </div>
                        <div className="p-8 border border-slate-200 rounded-2xl flex flex-col items-center">
                            <Lock size={48} className="text-slate-400 mb-4" />
                            <h3 className="font-bold text-slate-900 mb-2">GDPR Compliant</h3>
                            <p className="text-slate-500 text-sm">Full compliance with European data protection regulations.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bug Bounty */}
            <section className="py-24 px-6 bg-slate-900 text-white text-center">
                <div className="max-w-3xl mx-auto">
                    <Bug size={48} className="text-emerald-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-6">White Hat Hacker?</h2>
                    <p className="text-slate-400 mb-8 text-lg">
                        We value the security community. If you find a vulnerability, we want to know about it. Our bug bounty program offers rewards up to $50,000.
                    </p>
                    <button className="px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500 transition-colors">
                        View Program Details
                    </button>
                </div>
            </section>
        </div>
    );
};

const SecurityCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, color: string }> = ({ icon, title, desc, color }) => (
    <div className={`bg-white p-8 rounded-3xl border border-slate-200 hover:border-${color}-300 hover:shadow-lg transition-all group`}>
        <div className={`w-14 h-14 rounded-2xl bg-${color}-50 flex items-center justify-center text-${color}-600 mb-6 group-hover:scale-110 transition-transform`}>
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm">
            {desc}
        </p>
    </div>
);

export default Security;
