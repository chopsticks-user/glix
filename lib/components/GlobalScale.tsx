"use client";

import React, {useEffect, useRef} from 'react';
import {motion} from 'framer-motion';

const GlobalScale: React.FC = () => {
    return (
        <section className="bg-slate-900 text-white py-24 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div
                    className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px]"></div>
                <div
                    className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Content Left */}
                    <div>
                        <motion.div
                            initial={{opacity: 0, y: 10}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            className="inline-block px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-bold text-blue-400 mb-6 uppercase tracking-wider"
                        >
                            Global Infrastructure
                        </motion.div>

                        <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                            The backbone for <br/>
                            <span className="relative inline-block">
                 <span
                     className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 font-extrabold">
                   unified digital finance.
                 </span>
                 <motion.div
                     className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-emerald-500"
                     initial={{scaleX: 0}}
                     whileInView={{scaleX: 1}}
                     transition={{duration: 1.5, ease: "anticipate"}}
                 />
              </span>
                        </h2>

                        <motion.p
                            initial={{opacity: 0}}
                            whileInView={{opacity: 1}}
                            transition={{delay: 0.3}}
                            className="text-slate-400 text-lg leading-relaxed mb-12 max-w-xl"
                        >
                            Glix makes moving money between ecosystems as easy as moving data. We bridge the gap between
                            closed payment services, processing seamless transfers for ambitious freelancers and
                            platforms of all sizes.
                        </motion.p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-12">
                            <StatItem value="Instant" label="Wallet Sync" delay={0.4}/>
                            <StatItem value="99.99%" label="Historical Uptime" delay={0.5}/>
                            <StatItem value="150+" label="Currencies Supported" delay={0.6}/>
                            <StatItem value="Bank-Grade" label="Security Standards" delay={0.7}/>
                        </div>
                    </div>

                    {/* Globe Animation Right */}
                    <div className="h-[500px] flex items-center justify-center relative perspective-1000">

                        {/* Glix Showcase Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                            <motion.div
                                className="bg-slate-900/90 backdrop-blur-xl border border-blue-500/50 px-8 py-4 rounded-3xl shadow-[0_0_50px_rgba(59,130,246,0.6)] flex items-center gap-4"
                                initial={{scale: 0.8, opacity: 0}}
                                whileInView={{scale: 1, opacity: 1}}
                                transition={{duration: 0.8}}
                                animate={{y: [0, -10, 0]}}
                            >
                                <div className="relative">
                                    <div
                                        className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-inner border border-white/10">
                                        <img src="https://uploads.onecompiler.io/43y6nw4pw/446bhcjxw/logo.png"
                                             alt="Glix" className="w-8 h-8 object-contain brightness-0 invert"/>
                                    </div>
                                    <div
                                        className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                                    <div
                                        className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping opacity-75"></div>
                                </div>
                                <div className="flex flex-col">
                                    <span
                                        className="text-[10px] text-blue-400 font-bold uppercase tracking-widest leading-none mb-1">Network Active</span>
                                    <span
                                        className="text-xl font-bold text-white leading-none tracking-tight">Glix Core</span>
                                </div>
                            </motion.div>
                        </div>

                        <GlobeAnimation/>
                    </div>

                </div>
            </div>
        </section>
    );
};

const StatItem: React.FC<{ value: string; label: string; delay: number }> = ({value, label, delay}) => (
    <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        transition={{delay, duration: 0.5}}
        className="border-l-2 border-slate-800 pl-4 group hover:border-blue-500 transition-colors duration-300"
    >
        <div className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{value}</div>
        <div className="text-sm text-slate-500 font-medium leading-tight">{label}</div>
    </motion.div>
);

const GlobeAnimation: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth * 2; // High DPI
        let height = canvas.height = canvas.offsetHeight * 2;

        const globeRadius = width * 0.35;
        const dots: { x: number; y: number; z: number; size: number }[] = [];
        const DOT_COUNT = 500;

        // Generate points on a sphere
        const phi = Math.PI * (3 - Math.sqrt(5));
        for (let i = 0; i < DOT_COUNT; i++) {
            const y = 1 - (i / (DOT_COUNT - 1)) * 2;
            const radius = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const x = Math.cos(theta) * radius;
            const z = Math.sin(theta) * radius;

            dots.push({x: x * globeRadius, y: y * globeRadius, z: z * globeRadius, size: Math.random() * 1.5 + 0.5});
        }

        let rotation = 0;

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            rotation += 0.002;

            // Sort dots by Z depth
            const projectedDots = dots.map(dot => {
                // Rotate around Y axis
                const x = dot.x * Math.cos(rotation) - dot.z * Math.sin(rotation);
                const z = dot.x * Math.sin(rotation) + dot.z * Math.cos(rotation);

                // Simple perspective projection
                const scale = (globeRadius * 2) / ((globeRadius * 2) - z);
                const px = x + width / 2;
                const py = dot.y + height / 2;

                return {x: px, y: py, z, scale, originalSize: dot.size};
            }).sort((a, b) => a.z - b.z);

            // Draw Dots
            projectedDots.forEach(dot => {
                const alpha = (dot.z + globeRadius) / (globeRadius * 2);
                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dot.originalSize * (dot.z > 0 ? 1 : 0.5), 0, Math.PI * 2);

                if (dot.z > 0) {
                    ctx.fillStyle = `rgba(96, 165, 250, ${Math.max(0.2, alpha)})`;
                } else {
                    ctx.fillStyle = `rgba(51, 65, 85, ${Math.max(0.1, alpha)})`;
                }
                ctx.fill();
            });

            // Draw Network Lines (Connecting outer nodes to Center Hub)
            const frontDots = projectedDots.filter(d => d.z > globeRadius * 0.2);
            if (frontDots.length > 0) {
                ctx.beginPath();
                ctx.lineWidth = 1;

                // Connect random dots to center to simulate Hub & Spoke
                // We limit this to just a few active lines per frame for a "scanning" effect
                const activeLineCount = 3;

                for (let i = 0; i < activeLineCount; i++) {
                    // Pick a random dot
                    const dot = frontDots[Math.floor(Math.random() * frontDots.length)];

                    // Create gradient for the line
                    const gradient = ctx.createLinearGradient(dot.x, dot.y, width / 2, height / 2);
                    gradient.addColorStop(0, 'rgba(59, 130, 246, 0)');
                    gradient.addColorStop(1, 'rgba(168, 85, 247, 0.4)'); // Purple at center

                    ctx.beginPath();
                    ctx.strokeStyle = gradient;
                    ctx.moveTo(dot.x, dot.y);
                    ctx.lineTo(width / 2, height / 2); // Connect to Glix Core
                    ctx.stroke();
                }
            }

            requestAnimationFrame(animate);
        };

        const animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, []);

    return (
        <div className="w-full h-full relative">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-contain"
                style={{width: '100%', height: '100%'}}
            />
        </div>
    );
};

export default GlobalScale;