import React from 'react';
import { ShieldCheck, ScanFace, GlobeLock } from 'lucide-react';

const TrustLayer: React.FC = () => {
  return (
    <section className="px-6 max-w-7xl mx-auto w-full py-20 relative">
      <div className="text-center mb-16">
        <span className="text-emerald-600 font-bold tracking-wider text-sm uppercase">Compliance First Architecture</span>
        <h2 className="text-3xl md:text-5xl font-bold mt-2 text-slate-900">The Vault.</h2>
        <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
          We use AI not just for speed, but for safety. Our compliance stack is integrated with 40+ global regulators.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Card 1: KYC */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-blue-200 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
            <ScanFace size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Biometric KYC</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Identity verification in &lt; 30 seconds. Liveness detection and AI document scanning eliminate identity fraud at the gate.
          </p>
        </div>

        {/* Card 2: Fraud */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-purple-200 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-6 group-hover:scale-110 transition-transform">
            <ShieldCheck size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">AI Fraud Sentry</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Real-time AML (Anti-Money Laundering) scanning. Our pattern recognition blocks suspicious flows before they settle.
          </p>
        </div>

        {/* Card 3: Licensing */}
        <div className="bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-lg hover:border-emerald-200 transition-all duration-300 group">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
            <GlobeLock size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-900 mb-3">Global Licensing</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Partnered with regulated entities in 40+ jurisdictions. We operate within the rails, ensuring your money is always legal and liquid.
          </p>
        </div>

      </div>
    </section>
  );
};

export default TrustLayer;