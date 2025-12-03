import React from 'react';

const CookiePolicy: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-sm border border-slate-200">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">Cookie Policy</h1>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="mb-6">
                        This Cookie Policy explains how Glix uses cookies and similar technologies to recognize you when you visit our website.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">What are cookies?</h2>
                    <p className="mb-6">
                        Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Why do we use cookies?</h2>
                    <p className="mb-4">
                        We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">How can I control cookies?</h2>
                    <p>
                        You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicy;
