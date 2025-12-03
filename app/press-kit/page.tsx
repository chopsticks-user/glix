import React from 'react';
import { Download } from 'lucide-react';

const PressKit: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold text-slate-900 mb-6">Press Kit</h1>
                <p className="text-xl text-slate-600 max-w-2xl mb-16">
                    Assets, logos, and brand guidelines for media use.
                </p>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Logos</h2>
                        <div className="space-y-4">
                            <AssetCard title="Glix Logo (Dark)" type="SVG, PNG" />
                            <AssetCard title="Glix Logo (Light)" type="SVG, PNG" />
                            <AssetCard title="Glix Icon" type="SVG, PNG" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Media Contact</h2>
                        <div className="bg-white p-8 rounded-3xl border border-slate-200">
                            <p className="text-slate-600 mb-4">For press inquiries, please contact:</p>
                            <a href="mailto:press@glix.com" className="text-xl font-bold text-blue-600 hover:underline">press@glix.com</a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

const AssetCard: React.FC<{ title: string, type: string }> = ({ title, type }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 flex justify-between items-center hover:border-blue-300 transition-colors cursor-pointer">
        <div>
            <h3 className="font-bold text-slate-900">{title}</h3>
            <span className="text-xs text-slate-500">{type}</span>
        </div>
        <Download className="text-slate-400" size={20} />
    </div>
);

export default PressKit;
