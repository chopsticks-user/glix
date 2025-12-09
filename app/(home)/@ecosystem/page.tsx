"use client";

import React, {useState} from 'react';
import {AnimatePresence, motion} from 'framer-motion';
import {
    ArrowRight,
    BarChart3,
    Bitcoin,
    CreditCard,
    Landmark,
    Layers,
    PieChart,
    Rocket,
    TrendingUp,
    Umbrella,
    Users
} from 'lucide-react';

type Category = 'wealth' | 'life' | 'future';

const Ecosystem: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Category>('wealth');

    const tabs = [
        {id: 'wealth', label: 'Active Wealth', icon: <TrendingUp size={18}/>},
        {id: 'life', label: 'Daily Life', icon: <Users size={18}/>},
        {id: 'future', label: 'Future & Growth', icon: <Rocket size={18}/>},
    ];

    return (
        <section id="ecosystem" className="px-6 max-w-7xl mx-auto w-full py-24 relative">
            <div className="text-center mb-16">
                <motion.div
                    initial={{opacity: 0, y: 10}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold tracking-widest text-purple-600 uppercase bg-purple-100 border border-purple-200 rounded-full"
                >
                    <Layers size={12}/>
                    Super App Architecture
                </motion.div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-slate-900">
                    One ID. Ten Industries.<br/>
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600">
            Infinite Possibilities.
          </span>
                </h2>
                <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                    Move capital instantly between your Stock Portfolio, Crypto Wallet, and Checking Account. The only
                    financial OS you will ever need.
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center mb-12">
                <div
                    className="flex p-1 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full overflow-x-auto max-w-full shadow-sm">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as Category)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id
                                ? 'bg-slate-900 text-white shadow-lg'
                                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Content */}
            <div className="min-h-[500px] mb-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'wealth' && <WealthGrid key="wealth"/>}
                    {activeTab === 'life' && <LifeGrid key="life"/>}
                    {activeTab === 'future' && <FutureGrid key="future"/>}
                </AnimatePresence>
            </div>

            {/* Global Coverage Marquee */}
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true}}
                className="relative max-w-6xl mx-auto overflow-hidden"
            >
                <div className="text-center mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
                        We serve over <span className="text-blue-600">170 countries</span> and territories around the
                        world
                    </h3>
                    <p className="text-slate-600">Connecting financial systems across every continent</p>
                </div>

                <div className="relative">
                    <div
                        className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none"></div>
                    <div
                        className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none"></div>

                    <div className="overflow-x-auto scrollbar-hide">
                        <div className="flex gap-6 animate-[scroll_80s_linear_infinite] hover:pause">
                            {[
                                {code: 'us', name: 'United States'},
                                {code: 'gb', name: 'United Kingdom'},
                                {code: 'de', name: 'Germany'},
                                {code: 'il', name: 'Israel'},
                                {code: 'bd', name: 'Bangladesh'},
                                {code: 'fr', name: 'France'},
                                {code: 'jp', name: 'Japan'},
                                {code: 'cn', name: 'China'},
                                {code: 'in', name: 'India'},
                                {code: 'br', name: 'Brazil'},
                                {code: 'ca', name: 'Canada'},
                                {code: 'au', name: 'Australia'},
                                {code: 'sg', name: 'Singapore'},
                                {code: 'ae', name: 'UAE'},
                                {code: 'za', name: 'South Africa'},
                                {code: 'mx', name: 'Mexico'},
                                {code: 'es', name: 'Spain'},
                                {code: 'it', name: 'Italy'},
                                {code: 'nl', name: 'Netherlands'},
                                {code: 'se', name: 'Sweden'},
                                {code: 'kr', name: 'South Korea'},
                                {code: 'pk', name: 'Pakistan'},
                                {code: 'ng', name: 'Nigeria'},
                                {code: 'eg', name: 'Egypt'},
                                {code: 'tr', name: 'Turkey'},
                                {code: 'th', name: 'Thailand'},
                                {code: 'ph', name: 'Philippines'},
                                {code: 'vn', name: 'Vietnam'},
                                {code: 'id', name: 'Indonesia'},
                                {code: 'my', name: 'Malaysia'},
                                {code: 'ar', name: 'Argentina'},
                                {code: 'cl', name: 'Chile'},
                                {code: 'co', name: 'Colombia'},
                                {code: 'pe', name: 'Peru'},
                                {code: 'pl', name: 'Poland'},
                                {code: 'ro', name: 'Romania'},
                                {code: 'cz', name: 'Czech Republic'},
                                {code: 'gr', name: 'Greece'},
                                {code: 'pt', name: 'Portugal'},
                                {code: 'no', name: 'Norway'},
                                {code: 'dk', name: 'Denmark'},
                                {code: 'fi', name: 'Finland'},
                                {code: 'ie', name: 'Ireland'},
                                {code: 'nz', name: 'New Zealand'},
                                {code: 'sa', name: 'Saudi Arabia'},
                                {code: 'kw', name: 'Kuwait'},
                                {code: 'qa', name: 'Qatar'},
                                {code: 'us', name: 'United States'},
                                {code: 'gb', name: 'United Kingdom'},
                                {code: 'de', name: 'Germany'},
                                {code: 'il', name: 'Israel'},
                                {code: 'bd', name: 'Bangladesh'},
                                {code: 'fr', name: 'France'},
                                {code: 'jp', name: 'Japan'},
                                {code: 'cn', name: 'China'},
                                {code: 'in', name: 'India'},
                                {code: 'br', name: 'Brazil'},
                            ].map((country, i) => (
                                <div
                                    key={i}
                                    className="flex-shrink-0 flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all group"
                                >
                                    <div
                                        className="w-16 h-12 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <img
                                            src={`/country-img/${country.code}.svg`}
                                            alt={country.name}
                                            className="w-full h-full object-contain rounded"
                                        />
                                    </div>
                                    <div
                                        className="text-xs font-bold text-slate-700 whitespace-nowrap">{country.name}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            <style jsx>{`
                @keyframes scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                .hover\:pause:hover {
                    animation-play-state: paused;
                }

                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }

                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>

        </section>
    );
};

const WealthGrid = () => (
    <motion.div
        initial={{opacity: 0, scale: 0.95}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0.95}}
        transition={{duration: 0.3}}
        className="grid md:grid-cols-3 gap-6"
    >
        <BentoCard
            icon={<BarChart3 size={32} className="text-emerald-600"/>}
            title="Trading (Stocks)"
            subtitle="Zero-Commission Global Equities"
            desc="Trade US Stocks (Apple, Tesla) from emerging markets. Fractional shares starting at just $1."
            color="emerald"
        />
        <BentoCard
            icon={<TrendingUp size={32} className="text-orange-600"/>}
            title="Options & Futures"
            subtitle="Pro-Level Derivatives"
            desc="Institutional-grade tools for retail traders. Hedge your local currency risk instantly."
            color="orange"
        />
        <BentoCard
            icon={<Bitcoin size={32} className="text-yellow-600"/>}
            title="Crypto"
            subtitle="The Settlement Layer"
            desc="We don't just trade crypto; we use it to move money globally in seconds, bypassing SWIFT."
            color="yellow"
        />
    </motion.div>
);

const LifeGrid = () => (
    <motion.div
        initial={{opacity: 0, scale: 0.95}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0.95}}
        transition={{duration: 0.3}}
        className="grid md:grid-cols-3 gap-6"
    >
        <BentoCard
            icon={<Landmark size={32} className="text-blue-600"/>}
            title="Neobanking"
            subtitle="Border-Free Checking"
            desc="Hold 50+ currencies. Get local IBANs in US, UK, and EU instantly."
            color="blue"
        />
        <BentoCard
            icon={<CreditCard size={32} className="text-indigo-600"/>}
            title="Credit Card"
            subtitle="The 'Black Card' for Everyone"
            desc="AI-underwritten credit limits based on your freelance history, not your credit score."
            color="indigo"
        />
        <BentoCard
            icon={<Users size={32} className="text-pink-600"/>}
            title="Social Payments"
            subtitle="Chat & Pay"
            desc="Split bills, pool funds, and send cash inside the chat. Money is social; your app should be too."
            color="pink"
        />
    </motion.div>
);

const FutureGrid = () => (
    <motion.div
        initial={{opacity: 0, scale: 0.95}}
        animate={{opacity: 1, scale: 1}}
        exit={{opacity: 0, scale: 0.95}}
        transition={{duration: 0.3}}
        className="grid md:grid-cols-3 gap-6"
    >
        <BentoCard
            icon={<Umbrella size={32} className="text-teal-600"/>}
            title="Retirement"
            subtitle="Gig-Economy Pension"
            desc="Automated micro-contributions from every freelance paycheck. Retirement safety for the self-employed."
            color="teal"
        />
        <BentoCard
            icon={<Rocket size={32} className="text-purple-600"/>}
            title="Ventures"
            subtitle="Democratized VC"
            desc="Invest in the next Unicorn. Crowdfund vetted startups directly from your Glix wallet."
            color="purple"
        />
        <BentoCard
            icon={<PieChart size={32} className="text-cyan-600"/>}
            title="Invest (Managed)"
            subtitle="Auto-Pilot Wealth"
            desc="Robo-advisory tailored for high-inflation economies. Protect your purchasing power."
            color="cyan"
        />
    </motion.div>
);

const BentoCard: React.FC<{
    icon: React.ReactNode,
    title: string,
    subtitle: string,
    desc: string,
    color: string
}> = ({icon, title, subtitle, desc, color}) => {
    return (
        <div
            className="group relative bg-white border border-slate-200 rounded-3xl p-8 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] cursor-pointer overflow-hidden h-full flex flex-col">
            {/* Background Gradient on Hover */}
            <div
                className={`absolute inset-0 bg-gradient-to-br from-${color}-50 to-${color}-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
            <div
                className={`absolute top-0 right-0 p-32 bg-${color}-100 blur-[80px] rounded-full pointer-events-none group-hover:bg-${color}-200/50 transition-colors opacity-0 group-hover:opacity-100`}></div>

            <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                    <div
                        className={`p-4 rounded-2xl bg-${color}-50 border border-${color}-100 shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                        {icon}
                    </div>

                    {/* Animated Learn More Button */}
                    <div
                        className="flex items-center gap-2 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 origin-right">
                        <span className={`text-xs font-bold text-${color}-600`}>Learn more</span>
                        <ArrowRight size={16} className={`text-${color}-600`}/>
                    </div>
                </div>

                <div className="mb-2">
                    <span
                        className={`text-xs font-bold uppercase tracking-wider text-${color}-600 mb-2 block`}>{title}</span>
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{subtitle}</h3>
                </div>

                <p className="text-slate-600 leading-relaxed text-sm flex-grow">
                    {desc}
                </p>

                {/* Decorative Line */}
                <div
                    className={`w-12 h-1 bg-${color}-500/30 rounded-full mt-6 group-hover:w-full transition-all duration-500`}></div>
            </div>
        </div>
    );
};

export default Ecosystem;