"use client";

import {motion} from 'framer-motion';

export default function MotionDiv() {
    return <motion.div
        initial={{opacity: 0, scale: 0.9}}
        animate={{opacity: 1, scale: 1}}
        className="inline-block px-4 py-1 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-300 font-bold text-sm mb-6 uppercase tracking-wider"
    >
        We go where your wallets go
    </motion.div>;
}