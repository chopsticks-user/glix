"use client";

import {motion} from "motion/react";
import {Coins, Route, Wallet, Zap} from "lucide-react";

export default function FeatureSections() {
    return <>
        {/* Feature 1: Unified Digital Wallet */}
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{opacity: 0, x: -50}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                >
                    <div
                        className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 mb-6">
                        <Wallet size={32}/>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Unified Digital Wallet</h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        Connect PayPal, Payoneer, Wise, and Skrill. See your total net worth in one dashboard
                        instead of logging into five different apps.
                    </p>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true}}
                    className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200"
                >
                    <div
                        className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50"></div>
                        <div className="text-center relative z-10">
                            <div className="text-4xl font-bold text-slate-900 mb-2">$12,450.00</div>
                            <div className="text-slate-500 uppercase tracking-widest text-sm">Total Net Worth</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Feature 2: Instant Bridge Technology */}
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                <div className="md:order-2">
                    <motion.div
                        initial={{opacity: 0, x: 50}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                    >
                        <div
                            className="w-16 h-16 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600 mb-6">
                            <Zap size={32}/>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Instant Bridge Technology</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            Move funds from Wallet A to Wallet B in seconds. We eliminate the 3-day bank withdrawal
                            wait time.
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true}}
                    className="md:order-1 bg-slate-50 rounded-3xl shadow-xl p-8 border border-slate-200"
                >
                    <div
                        className="aspect-video bg-white rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-100">
                        <div
                            className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
                        <div className="text-center">
                            <div className="text-6xl font-black text-slate-900 mb-2">Instant</div>
                            <div className="text-slate-500 font-medium uppercase tracking-widest">Transfer Speed
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Feature 3: Smart Currency Routing */}
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{opacity: 0, x: -50}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                >
                    <div
                        className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6">
                        <Route size={32}/>
                    </div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Smart Currency Routing</h2>
                    <p className="text-lg text-slate-600 leading-relaxed mb-6">
                        Glix automatically detects the currency of your recipient and offers the most efficient
                        conversion route.
                    </p>
                </motion.div>
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true}}
                    className="bg-white rounded-3xl shadow-2xl p-8 border border-slate-200"
                >
                    <div
                        className="aspect-video bg-emerald-50 rounded-2xl flex items-center justify-center relative overflow-hidden">
                        <div className="w-full max-w-xs bg-white rounded-xl shadow-sm p-4 text-center">
                            <div className="text-emerald-600 font-bold mb-2">Best Rate Detected</div>
                            <div className="text-2xl font-bold text-slate-900">USD → EUR</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>

        {/* Feature 4: Zero-Idle Balances */}
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                <div className="md:order-2">
                    <motion.div
                        initial={{opacity: 0, x: 50}}
                        whileInView={{opacity: 1, x: 0}}
                        viewport={{once: true}}
                    >
                        <div
                            className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-purple-600 mb-6">
                            <Coins size={32}/>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">Zero-Idle Balances</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-6">
                            Consolidate small, "leftover" amounts from different accounts into one usable fund.
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{opacity: 0, scale: 0.9}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true}}
                    className="md:order-1 bg-slate-50 rounded-3xl shadow-xl p-8 border border-slate-200"
                >
                    <div
                        className="aspect-video bg-white rounded-2xl flex items-center justify-center relative overflow-hidden border border-slate-100">
                        <div className="text-center">
                            <div className="text-slate-400 mb-2">$2.40 + $5.10 + $1.50 =</div>
                            <div className="text-4xl font-bold text-purple-600">$9.00</div>
                            <div className="text-slate-500 text-sm mt-2">Usable Funds</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    </>;
}