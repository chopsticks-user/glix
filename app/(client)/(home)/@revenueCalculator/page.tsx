"use client";

import React, {useState} from 'react';
import {motion} from 'framer-motion';
import {DollarSign} from 'lucide-react';

const RevenueCalculator: React.FC = () => {
    const [amount, setAmount] = useState<number>(1000);

    // Business Logic Simulation
    const competitorFee = amount * 0.04; // 4% markup
    const swiftFee = 25;
    const competitorTotal = amount - competitorFee - swiftFee;
    const totalCompetitorFees = competitorFee + swiftFee;

    const glixFee = 5; // Flat fee
    const glixTotal = amount - glixFee;

    return (
        <section className="px-6 max-w-7xl mx-auto w-full py-20">
            <div
                className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-2xl overflow-hidden relative">
                <div
                    className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-50"></div>

                <div className="grid lg:grid-cols-2 gap-16">

                    {/* Controls */}
                    <div className="flex flex-col justify-center relative z-10">
                        <h2 className="text-3xl font-bold mb-4 text-slate-900">We win on Volume. <br/><span
                            className="text-blue-600">You win on Value.</span></h2>
                        <p className="text-slate-600 mb-10">
                            Our business model is transparent. We charge a flat platform fee. No hidden spreads. No
                            Swift surprises.
                        </p>

                        <div className="mb-8">
                            <label className="text-sm font-semibold text-slate-500 mb-4 block">I want to send
                                (USD)</label>
                            <div className="flex items-center gap-4 text-4xl font-mono font-bold text-slate-900 mb-6">
                                <DollarSign className="text-slate-400" size={32}/>
                                {amount.toLocaleString()}
                            </div>
                            <input
                                type="range"
                                min="100"
                                max="10000"
                                step="100"
                                value={amount}
                                onChange={(e) => setAmount(Number(e.target.value))}
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                            <div className="flex justify-between text-xs text-slate-500 mt-2 font-mono">
                                <span>$100</span>
                                <span>$10,000</span>
                            </div>
                        </div>
                    </div>

                    {/* Visualization */}
                    <div className="grid grid-cols-2 gap-4 relative z-10">

                        {/* Competitor Col */}
                        <div
                            className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between relative group">
                            <div
                                className="absolute inset-0 bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl border border-red-100"></div>
                            <div>
                                <h3 className="text-slate-500 text-sm font-semibold uppercase mb-6">Others</h3>
                                <div className="space-y-2 text-sm text-red-500 font-mono mb-8">
                                    <div className="flex justify-between">
                                        <span>FX Markup (4%)</span>
                                        <span>-${Math.round(competitorFee)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Swift Fee</span>
                                        <span>-${swiftFee}</span>
                                    </div>
                                    <div
                                        className="flex justify-between pt-2 border-t border-red-200 font-bold text-red-600">
                                        <span>Total Fees</span>
                                        <span>-${Math.round(totalCompetitorFees)}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className="text-slate-500 text-xs">Recipient Gets</span>
                                <div
                                    className="text-2xl md:text-3xl font-bold text-slate-400 font-mono group-hover:text-red-400 transition-colors">
                                    ${Math.round(competitorTotal).toLocaleString()}
                                </div>
                            </div>
                        </div>

                        {/* Glix Col */}
                        <div
                            className="bg-white rounded-2xl p-6 border border-emerald-100 flex flex-col justify-between relative group shadow-lg shadow-emerald-500/5">
                            <div
                                className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl"></div>
                            <div>
                                <h3 className="text-emerald-600 text-sm font-bold uppercase mb-6 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                    Glix
                                </h3>
                                <div className="space-y-2 text-sm text-slate-600 font-mono mb-8">
                                    <div className="flex justify-between">
                                        <span>Real Rate</span>
                                        <span className="text-emerald-600">0%</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Platform Fee</span>
                                        <span>-${glixFee}</span>
                                    </div>
                                    <div
                                        className="flex justify-between pt-2 border-t border-emerald-100 font-bold text-emerald-600">
                                        <span>Total Fees</span>
                                        <span>-${glixFee}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <span className="text-emerald-600/70 text-xs">Recipient Gets</span>
                                <motion.div
                                    key={amount}
                                    initial={{scale: 0.9, color: "#059669"}}
                                    animate={{scale: 1, color: "#059669"}}
                                    className="text-2xl md:text-3xl font-bold font-mono"
                                >
                                    ${Math.round(glixTotal).toLocaleString()}
                                </motion.div>
                                <div
                                    className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-100 inline-block px-2 py-1 rounded">
                                    Save ${Math.round(glixTotal - competitorTotal)}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default RevenueCalculator;