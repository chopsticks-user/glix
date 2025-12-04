"use client";

import {LayoutDashboard, Link, Send} from "lucide-react";
import {motion} from "motion/react";

const steps = [
    {
        id: 1,
        icon: <Link className="text-blue-600" size={40}/>,
        title: "Secure Link",
        description: "Connect your existing third-party payment accounts using our secure API integration. We never store your login passwords.",
        color: "blue"
    },
    {
        id: 2,
        icon: <LayoutDashboard className="text-purple-600" size={40}/>,
        title: "The Glix Hub",
        description: "Your balances are visualized in the Glix Dashboard. Select the source of funds (e.g., Payoneer) and the destination (e.g., PayPal).",
        color: "purple"
    },
    {
        id: 3,
        icon: <Send className="text-emerald-600" size={40}/>,
        title: "Instant Transfer",
        description: "Hit send. Glix handles the internal bridging and settlement. The recipient receives the funds in their preferred platform instantly.",
        color: "emerald"
    }
];

export default function StepsSection() {
    return <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid gap-12">
            {steps.map((step, index) => (
                <motion.div
                    key={step.id}
                    initial={{opacity: 0, y: 20}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-slate-200 flex flex-col md:flex-row gap-8 items-center"
                >
                    <div
                        className={`w-24 h-24 rounded-3xl bg-${step.color}-50 flex items-center justify-center shrink-0`}>
                        {step.icon}
                    </div>
                    <div className="flex-grow text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-4 mb-2">
                                    <span
                                        className={`px-3 py-1 rounded-full bg-${step.color}-100 text-${step.color}-700 text-xs font-bold uppercase tracking-wider`}>Step 0{step.id}</span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-4">{step.title}</h2>
                        <p className="text-lg text-slate-600 leading-relaxed mb-4">{step.description}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    </section>;
}