import styles from "./page.module.css";
import EarlyAccessForm from "./EarlyAccessForm";
import VisualCenterPiece from "./VisualCenterPiece";

import {Sparkles} from 'lucide-react';
import React from "react";

/**
 * @remarks
 * The text content of the Hero section is important during
 * the search engine indexing process. Thus, doing our best to make sure
 * the Hero section is server-rendered is worth the effort. That's why
 * I isolated each of the animated and interactive components to their own
 * respective React component file and make them client-rendered.
 * Also, under the same justification, I manually wrote the animation,
 * located in ./hero.module.css for the text content section, to avoid
 * making the text section a client component since the original motion
 * animation is trivial anyway.
 *
 * @author Quang Cap
 */
export default function Page() {
    return (
        <section
            className="relative pt-32 md:pt-48 px-6 max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">

            {/* Text Content */}
            <div className={`${styles.textContent} max-w-2xl`}>
                <div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 border border-blue-200 text-blue-700 text-xs font-semibold mb-6 tracking-wide uppercase">
                    <Sparkles size={12} className="text-blue-600"/>
                    <span className="font-bold">AI-Driven</span> Liquidity Orchestrator
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900">
                    The First AI-Optimized <br/>
                    <span
                        className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"
                    >
                        Money Bridge.
                    </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-8 max-w-lg">
                    We use artificial intelligence to orchestrate liquidity across global corridors. Connect PayPal,
                    Payoneer, and banks with <strong>Mid-Market (Wholesale) Rates</strong>.
                </p>

                <EarlyAccessForm/>

                <div className="mt-8 flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex -space-x-2">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i}
                                 className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-xs overflow-hidden shadow-sm">
                                <img src={`https://picsum.photos/32/32?random=${i}`} alt="user"
                                     className="w-full h-full object-cover"/>
                            </div>
                        ))}
                    </div>
                    <p>Trusted by 10,000+ global freelancers</p>
                </div>
            </div>

            <VisualCenterPiece/>
        </section>
    );
}