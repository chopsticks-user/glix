"use client";

import React from 'react';
import {motion} from 'framer-motion';
import {
    AppWindow,
    ArrowRight,
    Bitcoin,
    Bot,
    BrainCircuit,
    Building2,
    Code2,
    Globe2,
    Handshake,
    Heart,
    Layout,
    Music,
    Plane,
    RefreshCw,
    Rocket,
    ShoppingBag,
    Smartphone,
    Store,
    Tag,
    Umbrella,
    Video
} from 'lucide-react';

const Solutions: React.FC = () => {
    return (
        <section id="solutions" className="px-6 max-w-7xl mx-auto w-full py-24 relative border-t border-slate-200">
            {/* Background decoration for light mode */}
            <div
                className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

            {/* Header */}
            <div className="text-center mb-20 relative z-10">
                <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">The Glix Platform</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6 text-slate-900">Solutions for Every
                    Ambition.</h2>
                <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
                    Built on our Interoperability Layer, Glix offers tailored financial solutions for any business
                    model, industry, or growth stage.
                </p>
            </div>

            {/* Main Grid: 3 Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-24 relative z-10">

                {/* Column 1: By Stage */}
                <div className="space-y-8">
                    <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">By Stage</h3>
                    <div className="space-y-6">
                        <SolutionItem
                            icon={<Building2 className="text-blue-600"/>}
                            title="Enterprises"
                            desc="Next-Gen Treasury Management for Multi-National Corporations."
                        />
                        <SolutionItem
                            icon={<Rocket className="text-purple-600"/>}
                            title="Startups"
                            desc="API-First Payments for Rapid Scale and Global Go-To-Market."
                        />
                    </div>
                </div>

                {/* Column 2: By Use Case */}
                <div className="space-y-8">
                    <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">By Use Case</h3>
                    <div className="space-y-6">
                        <SolutionItem icon={<Bitcoin className="text-orange-600"/>} title="Crypto"
                                      desc="On/Off-Ramps & Cross-Border Settlement Rail."/>
                        <SolutionItem icon={<ShoppingBag className="text-pink-600"/>} title="E-commerce"
                                      desc="Local Payment Methods & One-Click Global Checkout."/>
                        <SolutionItem icon={<Code2 className="text-emerald-600"/>} title="Embedded Finance"
                                      desc="Launch your own Wallet or Credit Product powered by Glix API."/>
                        <SolutionItem icon={<Bot className="text-cyan-600"/>} title="Finance Automation"
                                      desc="AI-driven Reconciliation and Invoice Management."/>
                        <SolutionItem icon={<Globe2 className="text-blue-600"/>} title="Global Businesses"
                                      desc="Unified Reporting and Local Tax Compliance in Emerging Markets."/>
                        <SolutionItem icon={<Smartphone className="text-indigo-600"/>} title="In-app Payments"
                                      desc="Seamless Mobile SDK for Direct User Billing."/>
                        <SolutionItem icon={<Store className="text-yellow-600"/>} title="Marketplaces"
                                      desc="Splitting Payments & Handling Mass Payouts to Global Vendors."/>
                        <SolutionItem icon={<Layout className="text-teal-600"/>} title="Platforms"
                                      desc="Managed Accounts & Treasury for SaaS providers."/>
                        <SolutionItem icon={<RefreshCw className="text-violet-600"/>} title="SaaS"
                                      desc="Subscription Billing, Usage-Based Pricing, and Dunning."/>
                    </div>
                </div>

                {/* Column 3: By Industry */}
                <div className="space-y-8">
                    <h3 className="text-xl font-bold text-slate-900 border-b border-slate-200 pb-4">Vertical
                        Expertise</h3>
                    <div className="space-y-6">
                        <SolutionItem icon={<BrainCircuit className="text-purple-600"/>} title="AI Companies"
                                      desc="Micro-Payments for Model Training and Data Labeling."/>
                        <SolutionItem icon={<Video className="text-red-500"/>} title="Creator Economy"
                                      desc="Instant Creator Payouts, Tips, and Fan Subscriptions."/>
                        <SolutionItem icon={<Plane className="text-sky-600"/>} title="Hospitality & Travel"
                                      desc="Global Booking Payments & Cross-Currency Settlement."/>
                        <SolutionItem icon={<Umbrella className="text-emerald-600"/>} title="Insurance"
                                      desc="Automated Payouts for Claims and Policy Management."/>
                        <SolutionItem icon={<Music className="text-rose-500"/>} title="Media & Entertainment"
                                      desc="Global Royalties & Digital Content Monetization."/>
                        <SolutionItem icon={<Heart className="text-red-600"/>} title="Nonprofits"
                                      desc="Low-Fee Global Donations and Disbursement Tracking."/>
                        <SolutionItem icon={<Tag className="text-amber-500"/>} title="Retail"
                                      desc="Omnichannel Payments (In-Person, Online, Mobile)."/>
                    </div>
                </div>
            </div>

            {/* The Ecosystem Footer */}
            <div className="pt-16 border-t border-slate-200 relative z-10">
                <div
                    className="absolute inset-0 bg-gradient-to-b from-transparent to-white/50 pointer-events-none"></div>
                <div className="text-center mb-12">
                    <h3 className="text-2xl font-bold mb-2 text-slate-900">The Glix Ecosystem</h3>
                    <p className="text-slate-600">Open infrastructure designed for collaboration.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Marketplace Card */}
                    <motion.div
                        whileHover={{scale: 1.02}}
                        className="group p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    >
                        <div
                            className="absolute top-0 right-0 p-32 bg-blue-50 rounded-full blur-3xl group-hover:bg-blue-100 transition-colors opacity-50"></div>

                        {/* Hover Arrow Reveal */}
                        <div
                            className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                            <ArrowRight className="text-slate-400"/>
                        </div>

                        <div className="relative z-10 flex gap-6 items-start">
                            <div
                                className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 group-hover:scale-110 transition-transform duration-300">
                                <AppWindow size={32}/>
                            </div>
                            <div className="pr-8">
                                <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">Glix
                                    App Marketplace</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    Extend your Glix functionality with powerful third-party apps for Tax, CRM, and
                                    Analytics.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Partners Card */}
                    <motion.div
                        whileHover={{scale: 1.02}}
                        className="group p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-xl hover:border-purple-200 transition-all duration-300 cursor-pointer relative overflow-hidden"
                    >
                        <div
                            className="absolute top-0 right-0 p-32 bg-purple-50 rounded-full blur-3xl group-hover:bg-purple-100 transition-colors opacity-50"></div>

                        {/* Hover Arrow Reveal */}
                        <div
                            className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
                            <ArrowRight className="text-slate-400"/>
                        </div>

                        <div className="relative z-10 flex gap-6 items-start">
                            <div
                                className="p-4 rounded-2xl bg-purple-50 border border-purple-100 text-purple-600 group-hover:scale-110 transition-transform duration-300">
                                <Handshake size={32}/>
                            </div>
                            <div className="pr-8">
                                <h4 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-purple-600 transition-colors">Partner
                                    Network</h4>
                                <p className="text-slate-600 leading-relaxed">
                                    Join the Glix Partner Network: Collaborate with system integrators, agencies, and
                                    technology partners.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const SolutionItem: React.FC<{ icon: React.ReactNode, title: string, desc: string }> = ({icon, title, desc}) => (
    <motion.div
        initial={{opacity: 0, x: -10}}
        whileInView={{opacity: 1, x: 0}}
        viewport={{once: true}}
        className="group flex gap-4 items-start p-4 rounded-xl hover:bg-slate-50 transition-colors cursor-default"
    >
        <div
            className="mt-1 shrink-0 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
            {React.cloneElement(icon as React.ReactElement<any>, {size: 20})}
        </div>
        <div>
            <h4 className="text-slate-900 font-semibold text-base mb-1 group-hover:text-blue-600 transition-colors">{title}</h4>
            <p className="text-slate-600 text-sm leading-relaxed">
                {desc}
            </p>
        </div>
    </motion.div>
);

export default Solutions;