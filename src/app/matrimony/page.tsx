"use client";

import { Sparkles, Heart, Shield, Award, Users, Search, Filter, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function MatrimonyPage() {
    const { user } = useAuth();
    const userMetadata = user?.user_metadata;

    return (
        <div className="max-w-[1280px] mx-auto py-10 px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 border-b-2 border-et-border pb-12">
                <div className="inline-flex items-center gap-2 bg-et-red text-white px-4 py-1.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] mb-6">
                    <Award className="w-4 h-4" /> Elite Networking
                </div>
                <h1 className="font-serif font-black text-5xl lg:text-6xl uppercase tracking-tighter mb-4">ET Matrimony</h1>
                <p className="font-serif text-2xl italic text-et-grey-medium">Where High-Performance Careers Meet Life Partners</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                {[
                    { icon: Shield, title: 'Verified Backgrounds', desc: 'Every profile is vetted against professional and social credentials.' },
                    { icon: Sparkles, title: 'AI Compatibility', desc: 'Matching based on professional ambition, investment goals, and shared values.' },
                    { icon: Users, title: 'Exclusive Network', desc: 'Connect within a curated circle of business leaders and industry experts.' }
                ].map((feat, i) => (
                    <div key={i} className="bg-white p-8 border border-et-border text-center group hover:border-et-red transition-all shadow-sm">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-et-grey-light mb-6 group-hover:bg-et-red/10 transition-colors">
                            <feat.icon className="w-8 h-8 text-et-red" />
                        </div>
                        <h3 className="font-serif font-black text-xl mb-3">{feat.title}</h3>
                        <p className="text-sm text-et-grey-medium leading-relaxed">{feat.desc}</p>
                    </div>
                ))}
            </div>

            <div className="relative h-[400px] overflow-hidden bg-et-grey-dark group rounded-sm mb-20 shadow-2xl">
                <img
                    src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2000"
                    className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
                    alt="Business Couple"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white px-6">
                    <h2 className="font-serif font-black text-4xl text-center mb-6 leading-tight">Apply for Prime Selection</h2>
                    <p className="text-lg font-serif italic text-center max-w-xl mb-10 opacity-80">
                        Join an exclusive community where professional growth and personal happiness align.
                        {userMetadata ? ` Welcome, ${userMetadata.full_name}, let's find your peer match.` : ''}
                    </p>
                    <button className="bg-et-red text-white px-12 py-4 font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl active:scale-95">
                        Join the Private Circle
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="border border-et-border p-8 rounded-sm">
                    <h4 className="font-serif font-black text-2xl mb-6">Discovery Dashboard</h4>
                    <p className="text-sm text-et-grey-medium mb-8">Set your parameters for elite professional compatibility matching.</p>

                    <div className="space-y-4">
                        {['Professional Domain', 'Minimum Net Worth Filter', 'Education Level', 'Geographic Mobility'].map((f, i) => (
                            <div key={i} className="flex items-center justify-between border-b border-et-border pb-3">
                                <span className="text-xs font-black uppercase tracking-widest text-et-grey-dark">{f}</span>
                                <span className="text-et-red font-bold text-xs cursor-pointer hover:underline">Set Filter</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-et-grey-light p-8 rounded-sm flex flex-col justify-center border border-et-border">
                    <div className="flex items-center gap-2 text-et-red font-black text-[10px] mb-4 uppercase tracking-[0.2em]">
                        <Sparkles className="w-4 h-4" /> AI Suggestion
                    </div>
                    <p className="font-serif text-[22px] leading-relaxed italic mb-8">
                        "We've identified 14 candidates in {userMetadata?.location || 'your area'} who share your {userMetadata?.investment_goals || 'Growth'} investment goals and {userMetadata?.professional_interest || 'Technology'} background."
                    </p>
                    <button className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.15em] text-et-grey-dark hover:text-et-red transition-all">
                        Browse Potential Matches <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
