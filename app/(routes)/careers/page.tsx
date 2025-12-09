import React from 'react';
import { ArrowRight } from 'lucide-react';

const Careers: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="bg-slate-900 text-white py-24 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">Join the Revolution.</h1>
                    <p className="text-xl text-slate-400 mb-12">
                        We're a team of engineers, designers, and dreamers building the future of finance. If you're obsessed with solving hard problems, we want you.
                    </p>
                    <button className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-colors">
                        View Open Roles
                    </button>
                </div>
            </section>

            <section className="py-24 px-6 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold text-slate-900 mb-12">Open Positions</h2>
                <div className="space-y-4">
                    <JobCard title="Senior Backend Engineer" team="Engineering" location="Remote (Global)" />
                    <JobCard title="Product Designer" team="Design" location="New York, NY" />
                    <JobCard title="Growth Marketing Manager" team="Marketing" location="London, UK" />
                    <JobCard title="Compliance Officer" team="Legal" location="Singapore" />
                    <JobCard title="Customer Success Lead" team="Operations" location="Remote (US)" />
                </div>
            </section>
        </div>
    );
};

const JobCard: React.FC<{ title: string, team: string, location: string }> = ({ title, team, location }) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex justify-between items-center group">
        <div>
            <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">{title}</h3>
            <div className="flex gap-4 text-sm text-slate-500 mt-1">
                <span>{team}</span>
                <span>•</span>
                <span>{location}</span>
            </div>
        </div>
        <ArrowRight className="text-slate-300 group-hover:text-blue-600 transition-colors" />
    </div>
);

export default Careers;
