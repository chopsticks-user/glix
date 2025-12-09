"use client";

import React, {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {Menu, X} from 'lucide-react';
import Link from 'next/link';

const Header: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <motion.nav
            initial={{y: -100}}
            animate={{y: 0}}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm' : 'py-6 bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 cursor-pointer group">
                    <img
                        src="https://uploads.onecompiler.io/43y6nw4pw/446bhcjxw/logo.png"
                        alt="Glix Logo"
                        className="w-10 h-10 object-contain"
                    />
                    <span
                        className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">Glix</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
                    <Link href="/features" className="hover:text-blue-600 transition-colors">Features</Link>
                    <Link href="/how-it-works" className="hover:text-blue-600 transition-colors">How it Works</Link>
                    <Link href="/coverage" className="hover:text-blue-600 transition-colors">Global Coverage</Link>
                </div>

                {/* CTA */}
                <div className="hidden md:block">
                    <Link href="/join-waitlist"
                          className="px-6 py-2.5 rounded-full bg-slate-900 text-white font-semibold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                        Join Waitlist
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-slate-900 p-2">
                        {mobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{opacity: 0, y: -20}}
                    animate={{opacity: 1, y: 0}}
                    className="absolute top-full left-0 right-0 bg-white border-b border-slate-200 p-6 md:hidden flex flex-col gap-4 shadow-xl"
                >
                    <Link href="/features" className="text-slate-600 hover:text-blue-600 font-medium"
                          onClick={() => setMobileMenuOpen(false)}>Features</Link>
                    <Link href="/how-it-works" className="text-slate-600 hover:text-blue-600 font-medium"
                          onClick={() => setMobileMenuOpen(false)}>How it Works</Link>
                    <Link href="/coverage" className="text-slate-600 hover:text-blue-600 font-medium"
                          onClick={() => setMobileMenuOpen(false)}>Global Coverage</Link>
                    <Link href="/join-waitlist"
                          className="w-full mt-2 px-6 py-3 rounded-full bg-slate-900 text-white font-semibold hover:opacity-90 transition-opacity text-center"
                          onClick={() => setMobileMenuOpen(false)}>
                        Join Waitlist
                    </Link>
                </motion.div>
            )}
        </motion.nav>
    );
};

export default Header;