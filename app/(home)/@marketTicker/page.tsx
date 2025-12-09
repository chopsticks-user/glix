"use client";

import React from 'react';
import {motion} from 'framer-motion';

const MarketTicker: React.FC = () => {
    return (
        <div className="w-full bg-slate-100 border-y border-slate-200 py-4 overflow-hidden flex items-center relative">
            <div
                className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
            <div
                className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>

            <motion.div
                className="flex whitespace-nowrap gap-16 text-sm font-mono tracking-wider items-center"
                animate={{x: [0, -1000]}}
                transition={{duration: 30, repeat: Infinity, ease: "linear"}}
            >
                <TickerItem label="GLOBAL FREELANCE GDP" value="$3.0 TRILLION" positive/>
                <TickerItem label="UNSEEN ECONOMY WORKERS" value="150,000,000+"/>
                <TickerItem label="AVG. BANK FEE LOSS" value="-$40 BN" negative/>
                <TickerItem label="GLIX SAVINGS PROJECTION" value="+$35 BN" positive/>
                <TickerItem label="EMERGING MKTS GROWTH" value="+18.5% YoY" positive/>
                {/* Repeat for seamless loop */}
                <TickerItem label="GLOBAL FREELANCE GDP" value="$3.0 TRILLION" positive/>
                <TickerItem label="UNSEEN ECONOMY WORKERS" value="150,000,000+"/>
                <TickerItem label="AVG. BANK FEE LOSS" value="-$40 BN" negative/>
                <TickerItem label="GLIX SAVINGS PROJECTION" value="+$35 BN" positive/>
                <TickerItem label="EMERGING MKTS GROWTH" value="+18.5% YoY" positive/>
            </motion.div>
        </div>
    );
};

const TickerItem: React.FC<{ label: string; value: string; positive?: boolean; negative?: boolean }> = (
    {label, value, positive, negative}) => (
    <div className="flex items-center gap-3">
        <span className="text-slate-500 font-semibold">{label}</span>
        <span className={`font-bold ${positive ? 'text-emerald-600' : negative ? 'text-red-500' : 'text-slate-900'}`}>
      {value}
    </span>
    </div>
);

export default MarketTicker;