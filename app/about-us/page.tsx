import React from 'react';
import {Linkedin, Twitter} from 'lucide-react';

const AboutUs: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="py-24 px-6 max-w-4xl mx-auto text-center">
                <h1 className="text-5xl font-bold text-slate-900 mb-8">We are breaking down the "Walled Gardens" of
                    Finance.</h1>
                <p className="text-xl text-slate-600 leading-relaxed mb-12">
                    The digital economy is global, but payment networks are still local. Freelancers and businesses lose
                    days of productivity and percentages of revenue simply trying to move their own money from one
                    platform to another.
                </p>
            </section>

            <section className="bg-white py-24 border-y border-slate-200">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Story</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            We built Glix to fix this. We believe that if you earned it, you should be able to move
                            it—instantly, anywhere, and to any platform. We are not a bank; we are the bridge that
                            connects them all.
                        </p>
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Vision: True Cross-Platform
                            Freedom</h2>
                        <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                            The digital economy is vast, but until now, the financial systems that support it have been
                            fragmented. Our vision is to eliminate this friction entirely. Glix is not just another
                            payment app; it is a unified financial hub that connects your existing wallets.
                        </p>
                    </div>
                    <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Glix?</h3>
                        <ul className="space-y-4">
                            <li className="flex gap-4">
                                <div
                                    className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold shrink-0">1
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Say Goodbye to Hassle</h4>
                                    <p className="text-slate-600 text-sm">We remove the common headache where different
                                        payment platforms don't support direct transactions with each other.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div
                                    className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold shrink-0">2
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Efficiency</h4>
                                    <p className="text-slate-600 text-sm">Perform smooth, secure transactions across
                                        multiple financial ecosystems without unnecessary steps or delays.</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <div
                                    className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shrink-0">3
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">Security & Trust</h4>
                                    <p className="text-slate-600 text-sm">We prioritize a secure environment, allowing
                                        you to manage all your funds with confidence.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Leadership Team */}
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Our Team</h2>
                <div className="grid md:grid-cols-4 gap-8">
                    <TeamMember
                        name="Sarah Chen"
                        role="CEO & Co-Founder"
                        image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
                    />
                    <TeamMember
                        name="David Miller"
                        role="CTO"
                        image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80"
                    />
                    <TeamMember
                        name="Elena Rodriguez"
                        role="Head of Product"
                        image="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
                    />
                    <TeamMember
                        name="James Wilson"
                        role="VP of Engineering"
                        image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80"
                    />
                </div>
            </section>

            {/* Investors */}
            <section className="py-24 px-6 bg-slate-900 text-white text-center">
                <h2 className="text-3xl font-bold mb-12">Backed by the Best</h2>
                <div className="flex flex-wrap justify-center gap-12 opacity-70 grayscale">
                    <div className="text-2xl font-bold">SEQUOIA</div>
                    <div className="text-2xl font-bold">Y COMBINATOR</div>
                    <div className="text-2xl font-bold">ANDREESSEN HOROWITZ</div>
                    <div className="text-2xl font-bold">INDEX VENTURES</div>
                </div>
            </section>
        </div>
    );
};

const TeamMember: React.FC<{ name: string, role: string, image: string }> = ({name, role, image}) => (
    <div className="text-center group">
        <div
            className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 border-4 border-white shadow-lg group-hover:scale-105 transition-transform">
            <img src={image} alt={name} className="w-full h-full object-cover"/>
        </div>
        <h3 className="text-xl font-bold text-slate-900">{name}</h3>
        <div className="text-blue-600 font-medium text-sm mb-3">{role}</div>
        <div className="flex justify-center gap-3">
            <Linkedin size={18} className="text-slate-400 hover:text-blue-700 cursor-pointer transition-colors"/>
            <Twitter size={18} className="text-slate-400 hover:text-blue-400 cursor-pointer transition-colors"/>
        </div>
    </div>
);

export default AboutUs;
