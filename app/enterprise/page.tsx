import React from 'react';
import {ArrowRight, BarChart3, CheckCircle2, Globe, Users} from 'lucide-react';

const Enterprise: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="bg-slate-900 text-white py-24">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <div
                            className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-bold text-sm mb-6 uppercase tracking-wider">
                            Glix for Enterprise
                        </div>
                        <h1 className="text-5xl font-bold mb-6 leading-tight">
                            Next-Gen Treasury Management.
                        </h1>
                        <p className="text-xl text-slate-400 mb-8 leading-relaxed">
                            Unified liquidity for multi-national corporations. Manage subsidiaries, payroll, and vendor
                            payments across 100+ countries from a single interface.
                        </p>
                        <button
                            className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-500 transition-colors flex items-center gap-2">
                            Contact Sales <ArrowRight size={20}/>
                        </button>
                    </div>
                    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-4 bg-slate-700/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center font-bold">US
                                    </div>
                                    <div>
                                        <div className="font-bold">US Subsidiary</div>
                                        <div className="text-xs text-slate-400">Chase Bank •••• 4242</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">$2,450,000.00</div>
                                    <div className="text-xs text-emerald-400">+4.2%</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-700/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center font-bold">EU
                                    </div>
                                    <div>
                                        <div className="font-bold">EU HQ</div>
                                        <div className="text-xs text-slate-400">Revolut Business •••• 8899</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">€1,850,000.00</div>
                                    <div className="text-xs text-emerald-400">+1.8%</div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center p-4 bg-slate-700/50 rounded-xl">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold">SG
                                    </div>
                                    <div>
                                        <div className="font-bold">APAC Office</div>
                                        <div className="text-xs text-slate-400">DBS Bank •••• 1234</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="font-bold">S$4,200,000.00</div>
                                    <div className="text-xs text-emerald-400">+12.5%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <div
                            className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
                            <Globe size={24}/>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Global Payroll</h3>
                        <p className="text-slate-600">Pay thousands of employees and contractors in their local currency
                            with a single click.</p>
                    </div>
                    <div className="space-y-4">
                        <div
                            className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                            <BarChart3 size={24}/>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Real-time Reconciliation</h3>
                        <p className="text-slate-600">Automated syncing with NetSuite, Xero, and QuickBooks. Close your
                            books 5x faster.</p>
                    </div>
                    <div className="space-y-4">
                        <div
                            className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                            <Users size={24}/>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">Multi-User Controls</h3>
                        <p className="text-slate-600">Granular permissions, approval workflows, and audit logs for your
                            finance team.</p>
                    </div>
                </div>
            </section>

            {/* Case Study */}
            <section className="py-24 px-6 bg-white border-t border-slate-200">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
                    <div className="bg-slate-100 rounded-3xl aspect-video relative overflow-hidden">
                        <img
                            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
                            alt="Office meeting" className="w-full h-full object-cover"/>
                    </div>
                    <div>
                        <div className="text-indigo-600 font-bold uppercase tracking-wider mb-4">Case Study</div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">How TechCorp Saved $2M Annually</h2>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            TechCorp, a SaaS giant with 5,000 employees, was losing 4% on every international payroll
                            transfer. By switching to Glix's wholesale FX rates and automated routing, they cut costs by
                            85% and reduced admin time by 20 hours per week.
                        </p>
                        <ul className="space-y-3">
                            <li className="flex gap-3 items-center text-slate-700">
                                <CheckCircle2 className="text-emerald-500" size={20}/>
                                <span>Zero wire fees</span>
                            </li>
                            <li className="flex gap-3 items-center text-slate-700">
                                <CheckCircle2 className="text-emerald-500" size={20}/>
                                <span>Instant settlement in 40 currencies</span>
                            </li>
                            <li className="flex gap-3 items-center text-slate-700">
                                <CheckCircle2 className="text-emerald-500" size={20}/>
                                <span>Seamless NetSuite integration</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Enterprise;
