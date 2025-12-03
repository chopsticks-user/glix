import React from "react";

import "./globals.css";
import Navbar from "@/lib/components/Navbar";
import Footer from "@/lib/components/Footer";

export default function RootLayout(
    {children}: Readonly<{ children: React.ReactNode; }>
) {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Glix | The Universal Money Bridge</title>
            <link rel="icon" type="image/x-icon" href="./favicon.ico"/>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com"/>
            <link
                href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap"
                rel="stylesheet"
            />
        </head>
        <body
        >
        <Navbar/>
        {children}
        <Footer/>
        </body>
        </html>
    );
}
