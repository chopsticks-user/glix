import React from 'react';

const Gdpr: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen py-24 px-6">
            <div className="max-w-4xl mx-auto bg-white p-12 rounded-3xl shadow-sm border border-slate-200">
                <h1 className="text-4xl font-bold text-slate-900 mb-8">GDPR Compliance</h1>
                <div className="prose prose-slate max-w-none text-slate-600">
                    <p className="mb-6">
                        Glix is committed to compliance with the General Data Protection Regulation (GDPR), which went
                        into effect on May 25, 2018.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Your Rights</h2>
                    <p className="mb-4">
                        Under the GDPR, you have the following rights regarding your personal data:
                    </p>
                    <ul className="list-disc pl-6 mb-6 space-y-2">
                        <li>The right to access your data</li>
                        <li>The right to rectification</li>
                        <li>The right to erasure ("right to be forgotten")</li>
                        <li>The right to restrict processing</li>
                        <li>The right to data portability</li>
                        <li>The right to object</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Data Processing Agreement</h2>
                    <p className="mb-6">
                        We have updated our Data Processing Agreement (DPA) to reflect GDPR requirements. If you are a
                        business customer processing data of EU citizens, you can request our DPA by contacting support.
                    </p>

                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Data Protection Officer</h2>
                    <p>
                        We have appointed a Data Protection Officer (DPO) to ensure our ongoing compliance. You can
                        contact our DPO at <a href="mailto:dpo@glix.com"
                                              className="text-blue-600 hover:underline">dpo@glix.com</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Gdpr;
