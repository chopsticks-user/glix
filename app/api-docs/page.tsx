import React from 'react';
import {Box, ShieldAlert} from 'lucide-react';

const ApiDocs: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="bg-slate-900 text-white py-20">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12 items-center">
                    <div className="flex-1">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6 font-mono">Build on the Glix
                            Infrastructure.</h1>
                        <p className="text-xl text-slate-400 mb-8">
                            Integrate our cross-platform payment rails directly into your app.
                        </p>
                    </div>
                    <div className="flex-1 w-full max-w-lg">
                        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
                            <div
                                className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
                                <div className="text-xs text-slate-500 font-mono">POST /api/v1/transfers</div>
                            </div>
                            <div className="p-6 font-mono text-sm overflow-x-auto">
                                <div className="text-slate-400">// Example: Create a Bridge Transaction</div>
                                <div className="text-purple-400">POST <span
                                    className="text-blue-400">/api/v1/transfers</span></div>
                                <div className="text-yellow-400">{'{'}</div>
                                <div className="pl-4 text-slate-300">"source_wallet": <span
                                    className="text-green-400">"payoneer_01"</span>,
                                </div>
                                <div className="pl-4 text-slate-300">"destination_wallet": <span
                                    className="text-green-400">"paypal_user_email"</span>,
                                </div>
                                <div className="pl-4 text-slate-300">"amount": <span
                                    className="text-emerald-400">150.00</span>,
                                </div>
                                <div className="pl-4 text-slate-300">"currency": <span
                                    className="text-green-400">"USD"</span>,
                                </div>
                                <div className="pl-4 text-slate-300">"description": <span className="text-green-400">"Design Services"</span>
                                </div>
                                <div className="text-yellow-400">{'}'}</div>
                                <br/>
                                <div className="text-slate-400">// Response</div>
                                <div className="text-yellow-400">{'{'}</div>
                                <div className="pl-4 text-slate-300">"status": <span
                                    className="text-green-400">"success"</span>,
                                </div>
                                <div className="pl-4 text-slate-300">"transaction_id": <span
                                    className="text-green-400">"glix_8839202"</span>,
                                </div>
                                <div className="pl-4 text-slate-300">"estimated_arrival": <span
                                    className="text-green-400">"instant"</span></div>
                                <div className="text-yellow-400">{'}'}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24 px-6 max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-12">Documentation</h2>
                <div className="grid md:grid-cols-3 gap-8 mb-24">
                    <FeatureCard
                        title="Authentication"
                        desc="API Keys & OAuth 2.0"
                    />
                    <FeatureCard
                        title="Webhooks"
                        desc="Real-time transaction updates"
                    />
                    <FeatureCard
                        title="Sandbox Environment"
                        desc="Test with dummy data before going live."
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <Box className="text-blue-600"/> SDKs & Libraries
                        </h3>
                        <div className="space-y-4">
                            <SdkRow lang="Node.js" ver="v2.4.0" cmd="npm install glix-node"/>
                            <SdkRow lang="Python" ver="v1.8.2" cmd="pip install glix-py"/>
                            <SdkRow lang="Go" ver="v1.1.0" cmd="go get github.com/glix/go"/>
                            <SdkRow lang="PHP" ver="v3.0.1" cmd="composer require glix/php"/>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                            <ShieldAlert className="text-amber-600"/> Rate Limits
                        </h3>
                        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                            <table className="w-full text-left text-sm">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="p-4 font-bold text-slate-700">Environment</th>
                                    <th className="p-4 font-bold text-slate-700">Requests / Sec</th>
                                    <th className="p-4 font-bold text-slate-700">Burst</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="p-4 text-slate-600">Sandbox</td>
                                    <td className="p-4 text-slate-900 font-mono">10</td>
                                    <td className="p-4 text-slate-900 font-mono">50</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-slate-600">Production (Starter)</td>
                                    <td className="p-4 text-slate-900 font-mono">100</td>
                                    <td className="p-4 text-slate-900 font-mono">500</td>
                                </tr>
                                <tr>
                                    <td className="p-4 text-slate-600">Production (Enterprise)</td>
                                    <td className="p-4 text-slate-900 font-mono">1,000+</td>
                                    <td className="p-4 text-slate-900 font-mono">5,000+</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard: React.FC<{ title: string, desc: string }> = ({title, desc}) => (
    <div className="p-6 bg-white rounded-2xl border border-slate-200">
        <h3 className="font-bold text-lg text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-600 text-sm">{desc}</p>
    </div>
);

const SdkRow: React.FC<{ lang: string, ver: string, cmd: string }> = ({lang, ver, cmd}) => (
    <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
        <div>
            <div className="font-bold text-slate-900">{lang}</div>
            <div className="text-xs text-slate-500">{ver}</div>
        </div>
        <code className="px-3 py-1 bg-slate-100 rounded text-xs font-mono text-slate-600">{cmd}</code>
    </div>
);

export default ApiDocs;
