"use client";

import React from 'react';
import {motion} from 'framer-motion';
import {ArrowRight, Globe, Laptop, Store} from 'lucide-react';

const BusinessTypes: React.FC = () => {
    return (
        <section className="py-24 px-6 max-w-7xl mx-auto w-full bg-slate-50">
            <div className="mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900">Support for any business type</h2>
                <p className="text-slate-600 text-lg max-w-2xl leading-relaxed">
                    From solo creators to global marketplaces, Glix removes the friction of fragmented finance.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <Card
                    icon={<Laptop size={32}/>}
                    title="Freelancers"
                    description="Consolidate earnings from different gigs. Receive in Payoneer or Wise, and bridge funds instantly to where you need them most."
                    delay={0}
                />
                <Card
                    icon={<Store size={32}/>}
                    title="E-commerce"
                    description="Unify your revenue. Move money from payment gateways directly to inventory purchases without the 3-day bank wait."
                    delay={0.1}
                />
                <Card
                    icon={<Globe size={32}/>}
                    title="Agencies"
                    description="Simplify global payroll. Pay your remote team in their preferred local wallet (PayPal, Skrill, etc.) from one single Glix dashboard."
                    delay={0.2}
                />
            </div>
        </section>
    );
};

const Card: React.FC<{ icon: React.ReactNode, title: string, description: string, delay: number }> = ({
                                                                                                          icon,
                                                                                                          title,
                                                                                                          description,
                                                                                                          delay
                                                                                                      }) => (
    <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true}}
        transition={{delay, duration: 0.5}}
        className="bg-white border border-slate-200 rounded-2xl p-8 flex flex-col h-full hover:shadow-xl hover:border-blue-200 transition-all duration-300 group cursor-pointer"
    >
        <div className="mb-6 text-blue-600 group-hover:scale-110 transition-transform duration-300 origin-left">
            {icon}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4">{title}</h3>
        <p className="text-slate-600 leading-relaxed mb-8 flex-grow">
            {description}
        </p>
        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group/link">
            Learn more <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform"/>
        </div>
    </motion.div>
);

export default BusinessTypes;