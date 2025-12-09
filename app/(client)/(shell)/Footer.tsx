"use client";

import useWaitlistFormState from "@/app/(client)/(routes)/join-waitlist/useWaitlistFormState";

import {ArrowRight, Facebook, Github, Globe, Linkedin, Twitter} from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
    const [state, action, pending] = useWaitlistFormState();

    return (
        <footer className="bg-white border-t border-slate-200 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <img
                                src="https://uploads.onecompiler.io/43y6nw4pw/446bhcjxw/logo.png"
                                alt="Glix Logo"
                                className="w-10 h-10 object-contain"
                            />
                            <span className="text-xl font-bold text-slate-900">Glix</span>
                        </div>
                        <p className="text-slate-600 mb-6 max-w-sm leading-relaxed">
                            The AI-optimized financial layer for the global economy. Connecting unlimited wallets,
                            banks, and payment platforms into one unified interface.
                        </p>

                        {/* Newsletter */}
                        <div className="max-w-sm">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Subscribe
                                to our newsletter</label>
                            <form className="flex gap-2" action={action}>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-2 text-sm flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                                    defaultValue={state.data.email}
                                    required
                                />
                                <button
                                    className="bg-slate-900 text-white rounded-lg px-4 py-2 hover:bg-slate-800 transition-colors"
                                    type="submit"
                                    disabled={pending}
                                >
                                    <ArrowRight size={16}/>
                                </button>
                            </form>
                            <p aria-live="polite">{state?.message}</p> {/* todo: styling */}
                        </div>
                    </div>

                    {/* Links Columns */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Product</h4>
                        <ul className="space-y-4 text-sm text-slate-600">
                            <li><Link href="/features" className="hover:text-blue-600 transition-colors">Features</Link>
                            </li>
                            <li><Link href="/coverage" className="hover:text-blue-600 transition-colors">Global
                                Coverage</Link></li>
                            <li><Link href="/security" className="hover:text-blue-600 transition-colors">Security</Link>
                            </li>
                            <li><Link href="/enterprise"
                                      className="hover:text-blue-600 transition-colors">Enterprise</Link></li>
                            <li><Link href="/api-docs" className="hover:text-blue-600 transition-colors">API Docs</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-600">
                            <li><Link href="/about-us" className="hover:text-blue-600 transition-colors">About Us</Link>
                            </li>
                            <li><Link href="/careers" className="hover:text-blue-600 transition-colors">Careers</Link>
                                <span
                                    className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full ml-1 font-semibold">Hiring</span>
                            </li>
                            <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                            <li><Link href="/press-kit" className="hover:text-blue-600 transition-colors">Press
                                Kit</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6">Legal</h4>
                        <ul className="space-y-4 text-sm text-slate-600">
                            <li><Link href="/privacy-policy" className="hover:text-blue-600 transition-colors">Privacy
                                Policy</Link></li>
                            <li><Link href="/terms-of-service" className="hover:text-blue-600 transition-colors">Terms
                                of Service</Link></li>
                            <li><Link href="/cookie-policy" className="hover:text-blue-600 transition-colors">Cookie
                                Policy</Link></li>
                            <li><Link href="/licenses" className="hover:text-blue-600 transition-colors">Licenses</Link>
                            </li>
                            <li><Link href="/gdpr" className="hover:text-blue-600 transition-colors">GDPR</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-slate-500 text-sm">
                        &copy; {new Date().getFullYear()} Glix Financial Inc. All rights reserved.
                    </div>

                    <div className="flex gap-6">
                        <SocialLink icon={<Twitter size={20}/>}/>
                        <SocialLink icon={<Linkedin size={20}/>}/>
                        <SocialLink icon={<Github size={20}/>}/>
                        <SocialLink icon={<Facebook size={20}/>}/>
                    </div>

                    <div
                        className="flex items-center gap-2 text-sm text-slate-500 border border-slate-200 rounded-full px-3 py-1">
                        <Globe size={14}/>
                        <span>English (US)</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const SocialLink: React.FC<{ icon: React.ReactNode }> = ({icon}) => (
    <a href="#" className="text-slate-400 hover:text-blue-600 transition-colors hover:scale-110 transform duration-200">
        {icon}
    </a>
);

export default Footer;