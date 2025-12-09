import "./globals.css";
import Header from "@/app/(client)/(shell)/Header";
import Footer from "@/app/(client)/(shell)/Footer";
import Vercel from "@/app/(client)/(shell)/Vercel";

import React from "react";

export default function RootLayout(
    {children}: Readonly<{ children: React.ReactNode; }>
) {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Glix | The Universal Money Bridge</title>
            <link rel="icon" type="image/x-icon" href="https://uploads.onecompiler.io/43y6nw4pw/446bhcjxw/logo.png"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
        </head>
        <body
        >
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-blue-500/30">
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Ambient background glows - adjusted for light mode */}
                <div
                    className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[128px] animate-blob mix-blend-multiply"></div>
                <div
                    className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-[128px] animate-blob animation-delay-2000 mix-blend-multiply"></div>
                <div
                    className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-[128px] animate-blob animation-delay-4000 mix-blend-multiply"></div>
            </div>
            <div className="relative z-10 flex flex-col gap-20 pb-20">
                <Header/>
                <main className="flex flex-col gap-24 md:gap-32 min-h-[60vh]">
                    {children}
                </main>
                <Footer/>
            </div>
        </div>
        <Vercel/>
        </body>
        </html>
    );
}
