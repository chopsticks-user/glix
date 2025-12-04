// "use client";

import MotionDiv from "./MotionDiv";

import React from 'react';
import {Globe2, Map} from 'lucide-react';

const GlobalCoverage: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            {/* Hero */}
            <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/10 pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <MotionDiv/>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">
                        Truly Global. Limitless Reach.
                    </h1>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Glix leverages the combined networks of the world's largest payment providers.
                    </p>
                </div>
            </section>

            {/* Stats Grid */}
            <section className="py-12 -mt-16 relative z-20 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">190+</div>
                        <div className="text-slate-500 font-medium text-sm uppercase tracking-wide">Countries</div>
                        <p className="text-sm text-slate-400 mt-2">If your linked wallet supports the region, Glix
                            supports it.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-1">20+</div>
                        <div className="text-slate-500 font-medium text-sm uppercase tracking-wide">Currencies</div>
                        <p className="text-sm text-slate-400 mt-2">Hold, send, and bridge USD, EUR, GBP, AUD, and more
                            effortlessly.</p>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
                        <div className="text-3xl font-bold text-emerald-600 mb-1">Local</div>
                        <div className="text-slate-500 font-medium text-sm uppercase tracking-wide">Settlement</div>
                        <p className="text-sm text-slate-400 mt-2">We utilize local payment rails to ensure your
                            recipient gets paid without massive fees.</p>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <div
                        className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 aspect-[16/9] flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-blue-50 opacity-50"></div>
                        <Globe2 className="text-blue-200 w-full h-full absolute opacity-20" strokeWidth={0.5}/>
                        <div className="relative z-10 text-center">
                            <Map size={64} className="text-blue-600 mx-auto mb-4"/>
                            <h3 className="text-2xl font-bold text-slate-900">Interactive Map</h3>
                            <p className="text-slate-500 text-sm mb-6">Explore our global network coverage.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Popular Corridors */}
            <section className="py-24 px-6 bg-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Popular Corridors</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <CorridorCard from="USA (USD)" to="Europe (EUR)" time="Instant"/>
                        <CorridorCard from="USA (USD)" to="India (INR)" time="Instant"/>
                        <CorridorCard from="Europe (EUR)" to="UK (GBP)" time="Instant"/>
                        <CorridorCard from="UK (GBP)" to="USA (USD)" time="Instant"/>
                        <CorridorCard from="Australia (AUD)" to="Philippines (PHP)" time="~1 Hour"/>
                        <CorridorCard from="Canada (CAD)" to="USA (USD)" time="Instant"/>
                    </div>
                </div>
            </section>
        </div>
    );
};

const CorridorCard: React.FC<{ from: string, to: string, time: string }> = ({from, to, time}) => (
    <div
        className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-200 transition-colors">
        <div>
            <div className="font-bold text-slate-900">{from} <span className="text-slate-400 mx-2">→</span> {to}</div>
            <div className="text-xs text-slate-500 mt-1">Direct Settlement</div>
        </div>
        <div className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
            {time}
        </div>
    </div>
);

export default GlobalCoverage;
