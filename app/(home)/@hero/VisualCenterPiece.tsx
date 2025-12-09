"use client";

import {motion} from "framer-motion";
import {CreditCard, Globe, Landmark, Wallet} from "lucide-react";
import React from "react";

export default function VisualCenterPiece() {
    return <div className="relative h-[400px] md:h-[500px] w-full flex items-center justify-center perspective-1000">
        {/* Connection Lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2"/>
                    <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8"/>
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2"/>
                </linearGradient>
            </defs>

            <ConnectionLine x1="20%" y1="30%" x2="50%" y2="50%" delay={0}/>
            <ConnectionLine x1="80%" y1="25%" x2="50%" y2="50%" delay={1}/>
            <ConnectionLine x1="20%" y1="70%" x2="50%" y2="50%" delay={2}/>
            <ConnectionLine x1="80%" y1="75%" x2="50%" y2="50%" delay={3}/>
        </svg>

        {/* Central Orb */}
        <motion.div
            initial={{scale: 0.8, opacity: 0}}
            animate={{
                scale: 1,
                opacity: 1,
                boxShadow: ["0 0 0 rgba(59,130,246,0)", "0 0 40px rgba(59,130,246,0.3)", "0 0 0 rgba(59,130,246,0)"]
            }}
            transition={{
                scale: {duration: 1, delay: 0.2},
                opacity: {duration: 1, delay: 0.2},
                boxShadow: {duration: 3, repeat: Infinity, ease: "easeInOut"}
            }}
            className="relative z-20 w-32 h-32 rounded-full bg-white border border-slate-200 flex items-center justify-center group"
        >
            <div
                className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 opacity-10 blur-xl group-hover:opacity-20 transition-opacity"></div>
            <img src="https://uploads.onecompiler.io/43y6nw4pw/446bhcjxw/logo.png" alt="Glix"
                 className="w-20 h-20 object-contain relative z-10"/>

            {/* Orbiting Ring */}
            <motion.div
                animate={{rotate: 360}}
                transition={{duration: 20, repeat: Infinity, ease: "linear"}}
                className="absolute inset-[-10px] rounded-full border border-blue-100 border-dashed"
            />
        </motion.div>

        {/* Floating Satellite Icons */}
        <FloatingIcon x="20%" y="30%" delay={0} icon={<Wallet className="text-blue-500"/>} label="Wallet"/>
        <FloatingIcon x="80%" y="25%" delay={1.5} icon={<CreditCard className="text-purple-500"/>}
                      label="Cards"/>
        <FloatingIcon x="20%" y="70%" delay={0.8} icon={<Landmark className="text-emerald-500"/>}
                      label="Banks"/>
        <FloatingIcon x="80%" y="75%" delay={2.2} icon={<Globe className="text-orange-500"/>} label="Global"/>

        {/* Floating Particles */}
        <motion.div
            animate={{y: [0, -40], opacity: [0, 1, 0]}}
            transition={{duration: 2, repeat: Infinity, delay: 0.5}}
            className="absolute left-[45%] top-[40%] text-emerald-600 text-xs font-bold bg-white/90 px-2 py-1 rounded-full shadow-sm border border-emerald-100"
        >
            +$250.00
        </motion.div>
        <motion.div
            animate={{y: [0, -40], opacity: [0, 1, 0]}}
            transition={{duration: 2.5, repeat: Infinity, delay: 1.5}}
            className="absolute left-[55%] top-[60%] text-blue-600 text-xs font-bold bg-white/90 px-2 py-1 rounded-full shadow-sm border border-blue-100"
        >
            Received
        </motion.div>
    </div>;
}

interface ConnectionLineProps {
    x1: string;
    y1: string;
    x2: string;
    y2: string;
    delay: number;
}

function ConnectionLine({x1, y1, x2, y2, delay}: ConnectionLineProps) {
    return <>
        <motion.line
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke="url(#lineGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{pathLength: 0, opacity: 0}}
            animate={{pathLength: 1, opacity: 1}}
            transition={{duration: 1.5, delay, ease: "easeInOut"}}
        />
        <motion.circle
            r="4"
            fill="#3b82f6"
            initial={{cx: x1, cy: y1, opacity: 0}}
            animate={{
                cx: [x1, x2],
                cy: [y1, y2],
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                delay: delay + 1.5,
                ease: "easeInOut",
                repeatDelay: 1
            }}
        />
        <motion.circle
            r="4"
            fill="#8b5cf6"
            initial={{cx: x2, cy: y2, opacity: 0}}
            animate={{
                cx: [x2, x1],
                cy: [y2, y1],
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                delay: delay + 2.5,
                ease: "easeInOut",
                repeatDelay: 1
            }}
        />
    </>;
}

interface FloatingIconProps {
    x: string;
    y: string;
    delay: number;
    icon: React.ReactNode;
    label: string;
}

function FloatingIcon({x, y, delay, icon, label}: FloatingIconProps) {
    return (
        <motion.div
            style={{left: x, top: y}}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2"
            animate={{y: [0, -15, 0]}}
            transition={{duration: 4, repeat: Infinity, ease: "easeInOut", delay}}
        >
            <div
                className="w-16 h-16 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-lg shadow-slate-200/50">
                {icon}
            </div>
            <span
                className="text-xs font-bold text-slate-500 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-100 shadow-sm">{label}</span>
        </motion.div>
    );
}