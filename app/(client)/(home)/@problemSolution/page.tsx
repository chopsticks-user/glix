"use client";

import React from 'react';
import {motion} from 'framer-motion';
import {ArrowDown, CheckCircle2, Globe, Layers, Link2, RefreshCw, Unplug, Wallet, XCircle, Zap} from 'lucide-react';

const ProblemSolution: React.FC = () => {
    return (
        <section className="px-6 max-w-7xl mx-auto w-full py-24 border-b border-slate-200 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-16 items-center">

                {/* Left: The Narrative */}
                <div className="lg:w-1/2 relative z-10">
                    <motion.div
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold mb-6 tracking-wide uppercase"
                    >
                        <Unplug size={12}/>
                        The Problem
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-8 text-slate-900 leading-tight">
                        Financial Platforms Don't Talk to Each Other. <br/>
                        <span className="text-blue-600">Until Now.</span>
                    </h2>

                    <div className="prose prose-lg text-slate-600 leading-relaxed">
                        <p className="mb-6">
                            <strong className="text-slate-900">Glix is a next-generation money transaction
                                platform</strong> designed to eliminate the limitations of traditional payment services.
                        </p>
                        <p className="mb-6">
                            It allows users to link multiple third-party payment accounts—such as PayPal, Payoneer, and
                            similar platforms—directly into Glix as individual wallets. By doing so, Glix
                            enables <strong>true cross-platform money transfers</strong>, letting users send and receive
                            funds seamlessly regardless of which services they or the recipient use.
                        </p>
                        <p>
                            This removes the common hassle where different payment platforms don’t support direct
                            transactions with each other. With Glix, users gain a unified, flexible, and efficient way
                            to manage all their digital wallets and perform smooth, secure transactions across multiple
                            financial ecosystems.
                        </p>
                    </div>

                    <div className="mt-8 flex gap-4">
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                            <div
                                className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                                <Link2 size={16}/>
                            </div>
                            Link Accounts
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                            <div
                                className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                                <Globe size={16}/>
                            </div>
                            Cross-Platform
                        </div>
                        <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                            <div
                                className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                                <Layers size={16}/>
                            </div>
                            Unified Wallet
                        </div>
                    </div>
                </div>

                {/* Right: The Visual Solution */}
                <div className="lg:w-1/2 relative perspective-1000">
                    {/* Decorative Background Blob */}
                    <div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-100/40 via-purple-100/40 to-emerald-100/40 blur-3xl rounded-full -z-10"></div>

                    <div
                        className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden ring-1 ring-slate-100 flex flex-col relative">

                        {/* Section 1: The Problem (Legacy Silos) */}
                        <div className="p-8 border-b border-slate-100 bg-slate-50/80 relative overflow-hidden group">
                            <div className="absolute top-4 left-4 z-10">
                <span
                    className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                   <XCircle size={12} className="text-red-400"/> Legacy Silos
                </span>
                            </div>

                            <div
                                className="flex justify-between items-center mt-6 gap-8 opacity-70 group-hover:opacity-100 transition-opacity">
                                {/* Silo A */}
                                <div
                                    className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm w-32 flex flex-col items-center gap-2 z-10 relative">
                                    <div
                                        className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">P
                                    </div>
                                    <span className="text-xs font-semibold text-slate-500">PayPal</span>
                                </div>

                                {/* The Wall / Error Animation */}
                                <div className="flex-1 flex flex-col items-center justify-center relative h-12">
                                    {/* The Wall */}
                                    <div className="h-full w-0.5 bg-slate-200 absolute left-1/2 -translate-x-1/2"></div>
                                    <div
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-1 rounded-full border border-red-100 shadow-sm z-20">
                                        <XCircle className="text-red-400" size={20}/>
                                    </div>

                                    {/* Failed Packet Animation */}
                                    <motion.div
                                        className="absolute w-2 h-2 bg-red-400 rounded-full top-1/2 -translate-y-1/2"
                                        initial={{left: '10%', opacity: 0}}
                                        animate={{left: '45%', opacity: [0, 1, 0]}}
                                        transition={{duration: 2, repeat: Infinity}}
                                    />
                                    <motion.div
                                        className="absolute w-2 h-2 bg-red-400 rounded-full top-1/2 -translate-y-1/2"
                                        initial={{right: '10%', opacity: 0}}
                                        animate={{right: '45%', opacity: [0, 1, 0]}}
                                        transition={{duration: 2, repeat: Infinity, delay: 1}}
                                    />
                                </div>

                                {/* Silo B */}
                                <div
                                    className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm w-32 flex flex-col items-center gap-2 z-10 relative">
                                    <div
                                        className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">W
                                    </div>
                                    <span className="text-xs font-semibold text-slate-500">Wise</span>
                                </div>
                            </div>
                        </div>

                        {/* Section 2: The Solution (Glix Unified) */}
                        <div
                            className="p-8 bg-gradient-to-b from-white to-blue-50/30 relative min-h-[320px] flex flex-col justify-center">

                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                                <div
                                    className="bg-slate-900 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-xl flex items-center gap-2 ring-4 ring-white">
                                    <ArrowDown size={12} className="text-emerald-400"/>
                                    Glix Unified Layer
                                </div>
                            </div>

                            {/* Grid Layout for Flow */}
                            <div className="flex flex-col gap-6 mt-4 relative">

                                {/* Connection Lines (SVG) */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                    <defs>
                                        <linearGradient id="flowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1"/>
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="1"/>
                                        </linearGradient>
                                    </defs>
                                    <path d="M 60 50 C 60 100, 50% 100, 50% 120" fill="none" stroke="#cbd5e1"
                                          strokeWidth="1" strokeDasharray="4 4"/>
                                    <path d="M 100% - 60 50 C 100% - 60 100, 50% 100, 50% 120" fill="none"
                                          stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4"/>
                                    <line x1="50%" y1="180" x2="50%" y2="220" stroke="#10b981" strokeWidth="2"/>
                                </svg>

                                {/* Inputs */}
                                <div className="flex justify-between px-2 sm:px-8 relative z-10">
                                    <motion.div
                                        className="bg-white border border-blue-100 p-3 rounded-xl flex items-center gap-2 shadow-sm w-36"
                                        whileHover={{scale: 1.05}}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">P
                                        </div>
                                        <div className="flex flex-col leading-none">
                                            <span className="text-xs font-bold text-slate-700">PayPal</span>
                                            <span
                                                className="text-[10px] text-emerald-600 flex items-center gap-0.5"><CheckCircle2
                                                size={8}/> Linked</span>
                                        </div>
                                    </motion.div>

                                    <motion.div
                                        className="bg-white border border-indigo-100 p-3 rounded-xl flex items-center gap-2 shadow-sm w-36"
                                        whileHover={{scale: 1.05}}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-bold shrink-0">W
                                        </div>
                                        <div className="flex flex-col leading-none">
                                            <span className="text-xs font-bold text-slate-700">Wise</span>
                                            <span
                                                className="text-[10px] text-emerald-600 flex items-center gap-0.5"><CheckCircle2
                                                size={8}/> Linked</span>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* The Hub (Center) */}
                                <div className="flex justify-center relative z-10">
                                    <div className="relative group cursor-default">
                                        <div
                                            className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse group-hover:bg-blue-500/30 transition-all"></div>

                                        <div
                                            className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-xl border border-slate-700 relative flex flex-col items-center w-56">
                                            <div className="flex items-center gap-3 mb-2">
                                                <motion.div
                                                    animate={{rotate: 360}}
                                                    transition={{duration: 8, repeat: Infinity, ease: "linear"}}
                                                >
                                                    <RefreshCw size={24} className="text-blue-400"/>
                                                </motion.div>
                                                <span className="font-bold text-lg">Glix Engine</span>
                                            </div>
                                            <div className="flex items-center justify-between w-full px-2 mt-1">
                                                <span className="text-[10px] text-slate-400">Processing</span>
                                                <div className="flex gap-1">
                                                    <motion.div animate={{opacity: [0.3, 1, 0.3]}}
                                                                transition={{duration: 1, repeat: Infinity}}
                                                                className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></motion.div>
                                                    <motion.div animate={{opacity: [0.3, 1, 0.3]}}
                                                                transition={{duration: 1, repeat: Infinity, delay: 0.2}}
                                                                className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></motion.div>
                                                    <motion.div animate={{opacity: [0.3, 1, 0.3]}}
                                                                transition={{duration: 1, repeat: Infinity, delay: 0.4}}
                                                                className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></motion.div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Particles flowing into hub */}
                                        <motion.div
                                            className="absolute top-[-30px] left-[10px] w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50 flex items-center justify-center text-[8px] text-white font-bold"
                                            animate={{x: [0, 60], y: [0, 50], scale: [1, 0]}}
                                            transition={{duration: 2, repeat: Infinity, ease: "easeInOut"}}
                                        >$
                                        </motion.div>
                                        <motion.div
                                            className="absolute top-[-30px] right-[10px] w-3 h-3 bg-indigo-500 rounded-full shadow-lg shadow-indigo-500/50 flex items-center justify-center text-[8px] text-white font-bold"
                                            animate={{x: [0, -60], y: [0, 50], scale: [1, 0]}}
                                            transition={{duration: 2, repeat: Infinity, delay: 1, ease: "easeInOut"}}
                                        >$
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Output (Bottom) */}
                                <div className="flex justify-center relative z-10">
                                    <motion.div
                                        initial={{y: 10, opacity: 0}}
                                        whileInView={{y: 0, opacity: 1}}
                                        transition={{delay: 0.5}}
                                        className="bg-emerald-50/80 border border-emerald-200 text-emerald-900 p-4 rounded-xl shadow-lg shadow-emerald-100/50 flex items-center gap-4 min-w-[240px] backdrop-blur-sm"
                                    >
                                        <div className="bg-white p-2.5 rounded-lg shadow-sm border border-emerald-100">
                                            <Wallet size={20} className="text-emerald-600"/>
                                        </div>
                                        <div className="flex flex-col">
                                            <span
                                                className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider mb-0.5">Destination Reached</span>
                                            <span className="text-base font-bold flex items-center gap-2">
                             Local Bank
                             <Zap size={14} className="text-amber-500 fill-amber-500"/>
                           </span>
                                        </div>
                                    </motion.div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProblemSolution;