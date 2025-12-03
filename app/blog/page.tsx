import React from 'react';

const Blog: React.FC = () => {
    return (
        <div className="bg-slate-50 min-h-screen">
            <section className="py-24 px-6 max-w-7xl mx-auto">
                <h1 className="text-5xl font-bold text-slate-900 mb-16">Latest from Glix</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    <BlogCard
                        image="https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=800&q=80"
                        category="Product"
                        title="Introducing NeuroPath™: The Future of Routing"
                        desc="How we built an AI engine that predicts currency fluctuations to save you money."
                        date="Oct 12, 2023"
                    />
                    <BlogCard
                        image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80"
                        category="Engineering"
                        title="Scaling to 1 Million Transactions Per Second"
                        desc="A deep dive into our Rust-based microservices architecture."
                        date="Sep 28, 2023"
                    />
                    <BlogCard
                        image="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
                        category="Company"
                        title="Glix Raises Series A to Expand Globally"
                        desc="We are thrilled to announce our latest funding round led by top-tier investors."
                        date="Aug 15, 2023"
                    />
                </div>
            </section>
        </div>
    );
};

const BlogCard: React.FC<{ image: string, category: string, title: string, desc: string, date: string }> = ({ image, category, title, desc, date }) => (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-200 hover:shadow-xl transition-all cursor-pointer group">
        <div className="aspect-video overflow-hidden">
            <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
        <div className="p-8">
            <div className="flex justify-between items-center mb-4">
                <span className="text-blue-600 font-bold text-xs uppercase tracking-wider">{category}</span>
                <span className="text-slate-400 text-xs">{date}</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
        </div>
    </div>
);

export default Blog;
