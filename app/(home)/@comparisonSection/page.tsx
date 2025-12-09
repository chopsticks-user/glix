"use client";

import React from 'react';
import {motion} from 'framer-motion';
import {AlertTriangle, Check, CheckCircle2, Clock, X, XCircle, Zap} from 'lucide-react';

const ComparisonSection: React.FC = () => {
    return (
        <section className="px-6 max-w-7xl mx-auto w-full py-20">
            <div className="text-center mb-16">
                <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">The Unfair Advantage</span>
                <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-4 text-slate-900">Why Glix Wins.</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">
                    We don't just move money. We optimize it. See how the Glix Ecosystem outperforms legacy banking.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-20">

                {/* The Old Way */}
                <div
                    className="relative p-8 rounded-3xl bg-slate-50 border border-slate-200 grayscale opacity-80 hover:opacity-100 transition-all duration-500 group">
                    <div
                        className="absolute top-6 left-6 flex items-center gap-2 text-slate-500 font-semibold uppercase tracking-wider text-xs">
                        <X size={14} className="text-red-500"/> Legacy (Banks & Wallets)
                    </div>

                    <div className="mt-12 h-64 flex items-center justify-center relative">
                        {/* Chaotic SVG lines */}
                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 200">
                            <path d="M 50 100 Q 100 20 150 100 T 250 100 T 350 100" fill="none" stroke="#cbd5e1"
                                  strokeWidth="2" strokeDasharray="5,5"/>
                            <path d="M 50 100 Q 100 180 200 100" fill="none" stroke="#cbd5e1" strokeWidth="2"
                                  strokeDasharray="5,5"/>
                        </svg>

                        {/* Nodes */}
                        <div className="absolute left-[10%] bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-600">Fee 1</span>
                        </div>
                        <div
                            className="absolute left-[40%] top-[20%] bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-600">FX Markup</span>
                        </div>
                        <div
                            className="absolute left-[40%] bottom-[20%] bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-600">Delay</span>
                        </div>
                        <div className="absolute right-[10%] bg-white p-3 rounded-lg border border-slate-200 shadow-sm">
                            <span className="text-xs text-slate-600">Fee 2</span>
                        </div>

                        {/* Pain Points */}
                        <div
                            className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-red-50 text-red-600 px-3 py-1 rounded text-xs border border-red-100 flex items-center gap-1 font-medium">
                            <Clock size={12}/> 3-5 Business Days
                        </div>
                    </div>

                    <div
                        className="flex justify-between text-sm text-slate-500 mt-4 px-4 border-t border-slate-200 pt-4">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase">Cost</span>
                            <span className="font-bold text-slate-700">Expensive (5-8%)</span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-xs uppercase">Ecosystem</span>
                            <span className="font-bold text-slate-700">Fragmented</span>
                        </div>
                    </div>
                </div>

                {/* The Glix Way */}
                <div
                    className="relative p-8 rounded-3xl bg-white border border-blue-100 shadow-[0_10px_40px_rgba(59,130,246,0.1)] overflow-hidden">
                    <div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600"></div>

                    <div
                        className="absolute top-6 left-6 flex items-center gap-2 text-blue-600 font-semibold uppercase tracking-wider text-xs">
                        <Check size={14} className="text-blue-600"/> The Glix Ecosystem
                    </div>

                    <div className="mt-12 h-64 flex items-center justify-center relative">
                        {/* Straight Line */}
                        <div className="absolute inset-0 flex items-center justify-center px-12">
                            <div className="w-full h-1 bg-slate-100 relative">
                                <motion.div
                                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                                    initial={{width: "0%"}}
                                    whileInView={{width: "100%"}}
                                    transition={{duration: 1.5, ease: "circOut"}}
                                ></motion.div>
                            </div>
                        </div>

                        {/* Nodes */}
                        <div
                            className="absolute left-[10%] bg-blue-50 text-blue-700 p-3 rounded-lg border border-blue-100 z-10 shadow-sm">
                            <span className="text-xs font-semibold">Any Source</span>
                        </div>
                        <div
                            className="absolute right-[10%] bg-purple-50 text-purple-700 p-3 rounded-lg border border-purple-100 z-10 shadow-sm">
                            <span className="text-xs font-semibold">Any Asset</span>
                        </div>

                        {/* Benefit Badge */}
                        <motion.div
                            initial={{scale: 0}}
                            whileInView={{scale: 1}}
                            transition={{delay: 0.5, type: 'spring'}}
                            className="absolute top-[35%] bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg shadow-emerald-200 flex items-center gap-1 z-20"
                        >
                            <Zap size={12} fill="currentColor"/> Instant Settlement
                        </motion.div>
                    </div>

                    <div
                        className="flex justify-between text-sm text-slate-700 mt-4 px-4 pt-4 border-t border-slate-100 font-medium">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase text-slate-400">Cost</span>
                            <span className="font-bold text-emerald-600">Minimal (Wholesale)</span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="text-xs uppercase text-slate-400">Ecosystem</span>
                            <span className="font-bold text-blue-600">Unified</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* The Feature Matrix */}
            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
                <table className="w-full text-left border-collapse table-fixed md:table-auto">
                    <thead>
                    <tr className="border-b border-slate-100 bg-slate-50/50">
                        <th className="p-4 md:p-6 text-sm font-bold text-slate-700 uppercase tracking-wider w-[30%]">Feature
                            Name
                        </th>
                        <th className="p-4 md:p-6 text-sm font-bold text-slate-500 text-center w-[35%]">Traditional
                            Banking Route
                        </th>
                        <th className="p-4 md:p-6 text-sm font-bold text-blue-600 text-center w-[35%] bg-blue-50/50 border-x border-blue-100 relative">
                            Glix Ecosystem
                            <div
                                className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm">WINNER</div>
                        </th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                    <ComparisonRow
                        feature="Transfer Speed"
                        traditional="3-5 Business Days (Withdraw to Bank → Deposit to App)"
                        traditionalIcon={<Clock size={18} className="text-amber-500"/>}
                        glix="Instant Cross-Platform Transfer"
                        glixIcon={<Zap size={18} className="text-emerald-500 fill-emerald-500"/>}
                    />
                    <ComparisonRow
                        feature="Connectivity"
                        traditional="Siloed (PayPal only talks to Banks)"
                        traditionalIcon={<XCircle size={18} className="text-red-500"/>}
                        glix="Universal (PayPal talks to Payoneer, Wise, etc.)"
                        glixIcon={<CheckCircle2 size={18} className="text-emerald-600"/>}
                    />
                    <ComparisonRow
                        feature="Fees"
                        traditional="Double Fees (Withdrawal fee + Deposit fee + FX rates)"
                        traditionalIcon={<AlertTriangle size={18} className="text-red-500"/>}
                        glix="One Single 'Bridge' Fee"
                        glixIcon={<CheckCircle2 size={18} className="text-emerald-600"/>}
                    />
                    <ComparisonRow
                        feature="Convenience"
                        traditional="Multiple logins and manual tracking"
                        traditionalIcon={<XCircle size={18} className="text-red-500"/>}
                        glix="One Unified Dashboard"
                        glixIcon={<CheckCircle2 size={18} className="text-emerald-600"/>}
                    />
                    </tbody>
                </table>
            </div>

        </section>
    );
};

const ComparisonRow: React.FC<{
    feature: string;
    traditional: string;
    traditionalIcon: React.ReactNode;
    glix: string;
    glixIcon: React.ReactNode;
}> = ({feature, traditional, traditionalIcon, glix, glixIcon}) => (
    <tr className="hover:bg-slate-50 transition-colors group">
        <td className="p-4 md:p-6 font-bold text-slate-800 text-sm md:text-base">
            {feature}
        </td>
        <td className="p-4 md:p-6 text-center text-slate-500 font-medium bg-slate-50/30">
            <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-slate-100 rounded-full">{traditionalIcon}</div>
                <span className="text-sm">{traditional}</span>
            </div>
        </td>
        <td className="p-4 md:p-6 text-center font-bold border-x border-blue-100 bg-blue-50/20">
            <div className="flex flex-col items-center gap-2">
                <div className="p-2 bg-emerald-100 rounded-full">{glixIcon}</div>
                <span className="text-sm text-slate-900">{glix}</span>
            </div>
        </td>
    </tr>
);

export default ComparisonSection;
