import React from 'react';
import { Link2, Zap, Route, LayoutDashboard } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section id="features" className="px-6 max-w-7xl mx-auto w-full">
      <div className="text-center mb-16">
         <span className="text-blue-600 font-bold tracking-wider text-sm uppercase">Capabilities</span>
         <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 text-slate-900">Engineered for Freedom & Speed.</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
        
        {/* Card 1: Limitless Wallet Sync (Large) */}
        <div className="md:col-span-2 group relative rounded-3xl bg-white border border-slate-200 p-8 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4">
              <Link2 size={24} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-slate-900">Limitless Wallet Sync</h3>
              <p className="text-slate-600 max-w-lg text-lg">Connect unlimited accounts—from PayPal and Wise to local banks—into one central powerhouse. Shatter the "walled gardens" of individual apps and reclaim total ownership of your financial footprint.</p>
            </div>
            
            {/* Visual: Connection Nodes */}
            <div className="absolute right-8 bottom-8 md:block hidden opacity-50 group-hover:opacity-100 transition-opacity">
               <div className="flex items-center gap-2">
                 <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center font-bold text-xs text-slate-500">PYPL</div>
                 <div className="w-8 h-px bg-blue-300"></div>
                 <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-lg shadow-blue-500/30 overflow-hidden">
                    <img src="https://uploads.onecompiler.io/43y6nw4pw/446bhcjxw/logo.png" alt="Glix" className="w-8 h-8 object-contain brightness-0 invert" />
                 </div>
                 <div className="w-8 h-px bg-blue-300"></div>
                 <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 shadow-sm flex items-center justify-center font-bold text-xs text-slate-500">WISE</div>
               </div>
            </div>
          </div>
        </div>

        {/* Card 2: Direct-to-Platform Velocity */}
        <div className="group relative rounded-3xl bg-white border border-slate-200 p-8 overflow-hidden hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600 mb-4">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Direct-to-Platform Velocity</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Zap funds directly from Platform A to Platform B instantly, bypassing slow bank withdrawals. Why wait 3 business days when you can do it in 3 seconds?</p>
            </div>
          </div>
        </div>

        {/* Card 3: Cost-Killer Routing */}
        <div className="group relative rounded-3xl bg-white border border-slate-200 p-8 overflow-hidden hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
           <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative z-10 h-full flex flex-col justify-between">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4">
              <Route size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-slate-900">Cost-Killer Routing</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Glix automatically scans global financial corridors to hunt down the cheapest path. Never overpay on fees; let AI maximize every dollar.</p>
            </div>
          </div>
        </div>

        {/* Card 4: Global Command Center (Large) */}
        <div className="md:col-span-2 group relative rounded-3xl bg-white border border-slate-200 p-8 overflow-hidden hover:shadow-xl hover:shadow-indigo-900/5 transition-all duration-300">
           <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-violet-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
           
           <div className="relative z-10 h-full flex flex-col md:flex-row items-center md:items-end justify-between gap-6">
             <div className="w-full max-w-lg">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 mb-4">
                  <LayoutDashboard size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-900">Global Command Center</h3>
                <p className="text-slate-600 text-lg">Visualize your entire liquid net worth across every connected app in a single, real-time dashboard. Stop toggling tabs and manage your global wealth with absolute clarity.</p>
             </div>
             
             {/* Abstract Dashboard Visual */}
             <div className="w-32 h-24 shrink-0 relative bg-white border border-indigo-100 rounded-lg shadow-sm p-2 hidden md:flex flex-col gap-2">
                <div className="w-full h-8 bg-indigo-50 rounded flex items-center px-2 gap-1">
                   <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                   <div className="w-12 h-1 bg-indigo-200 rounded-full"></div>
                </div>
                <div className="flex gap-2 h-full">
                   <div className="w-1/2 h-full bg-slate-50 rounded"></div>
                   <div className="w-1/2 h-full bg-slate-50 rounded relative">
                      <div className="absolute bottom-1 left-1 right-1 h-1/2 bg-indigo-100 rounded-sm"></div>
                   </div>
                </div>
             </div>
           </div>
        </div>

      </div>
    </section>
  );
};

export default Features;