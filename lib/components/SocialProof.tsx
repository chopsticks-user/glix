import React from 'react';

const SocialProof: React.FC = () => {
  return (
    <section className="py-12 border-y border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-8">
          Powering the next generation of the global economy
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-700">
           {/* Reusing text representations for logos as we don't have SVGs for brands. 
               In a real app, these would be SVG imports. */}
           <LogoPlaceholder text="Stripe" />
           <LogoPlaceholder text="PayPal" />
           <LogoPlaceholder text="Payoneer" />
           <LogoPlaceholder text="Upwork" />
           <LogoPlaceholder text="Fiverr" />
           <LogoPlaceholder text="Wise" />
        </div>
      </div>
    </section>
  );
};

const LogoPlaceholder: React.FC<{ text: string }> = ({ text }) => (
  <span className="text-2xl md:text-3xl font-bold text-slate-400 font-sans tracking-tight hover:text-slate-900 transition-colors cursor-default">
    {text}
  </span>
);

export default SocialProof;