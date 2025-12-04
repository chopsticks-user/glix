"use client";

import {motion} from "motion/react";

export default function HeroSection() {
    return <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-blue-600/5 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
            <motion.h1
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                className="text-5xl md:text-7xl font-bold text-slate-900 mb-6"
            >
                Speed, Freedom, and <span className="text-blue-600">Control</span>.
            </motion.h1>
            <motion.p
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.1}}
                className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            >
                Powerful tools for a borderless economy.
            </motion.p>
        </div>
    </section>;
}