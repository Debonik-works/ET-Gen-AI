"use client";

import { useState } from 'react';
import { FileText, Search, Filter, Sparkles, Building2, MapPin, Calendar, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function TendersPage() {
    const { user } = useAuth();
    const userMetadata = user?.user_metadata;

    const mockTenders = [
        { id: 1, title: 'Smart City Infrastructure Project - Phase II', authority: 'Municipal Corporation, Mumbai', value: '₹450 Cr', deadline: '2024-04-15', location: 'Maharashtra' },
        { id: 2, title: 'Supply of Medical Equipment for State Hospitals', authority: 'Health Department, Karnataka', value: '₹120 Cr', deadline: '2024-04-10', location: 'Karnataka' },
        { id: 3, title: 'Solar Power Plant Installation - 50MW', authority: 'SECI', value: '₹280 Cr', deadline: '2024-04-20', location: 'Rajasthan' },
    ];

    return (
        <div className="max-w-[1280px] mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b-4 border-black pb-8">
                <div>
                    <h1 className="font-serif font-black text-4xl lg:text-5xl uppercase tracking-tight mb-2">Govt Tenders</h1>
                    <p className="font-sans font-bold text-et-grey-medium uppercase tracking-[0.2em] text-xs">AI-Powered Procurement Intelligence</p>
                </div>

                {userMetadata && (
                    <div className="bg-et-red/5 border border-et-red/20 p-4 rounded-sm flex items-center gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="bg-et-red p-2 rounded-sm"><Sparkles className="w-5 h-5 text-white" /></div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-et-red">Smart Matching Active</p>
                            <p className="text-sm font-serif font-bold italic">Finding contracts relevant to: <span className="text-et-grey-dark">{userMetadata.profession}</span></p>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-6">
                    <div className="relative mb-8">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-et-grey-medium w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search by tender ID, authority, or keywords..."
                            className="w-full pl-12 pr-4 py-4 border-2 border-et-border focus:border-et-red outline-none font-serif text-lg"
                        />
                    </div>

                    <div className="space-y-4">
                        {mockTenders.map(tender => (
                            <div key={tender.id} className="bg-white border border-et-border p-6 hover:shadow-lg transition-all group">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-et-red mb-1 block">New Opportunity</span>
                                        <h3 className="font-serif font-bold text-xl leading-tight group-hover:text-et-red transition-colors">{tender.title}</h3>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xl font-black text-et-grey-dark">{tender.value}</p>
                                        <p className="text-[10px] font-bold text-et-grey-medium uppercase tracking-widest">Est. Value</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 border-t border-et-border pt-4 text-[11px] font-bold text-et-grey-medium uppercase tracking-wider">
                                    <div className="flex items-center gap-2"><Building2 className="w-3.5 h-3.5" /> {tender.authority}</div>
                                    <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {tender.location}</div>
                                    <div className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5" /> Deadine: {tender.deadline}</div>
                                </div>

                                <button className="w-full mt-6 bg-et-grey-dark hover:bg-et-red text-white py-3 font-black text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2">
                                    View full tender details <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-black text-white p-6 rounded-sm">
                        <h3 className="font-serif font-black text-xl mb-4 border-b border-white/20 pb-2">Procurement AI</h3>
                        <p className="text-xs text-gray-400 leading-relaxed mb-6">
                            Our Gen AI engine analyzes government gazettes and procurement portals daily to find direct matches for your business profile.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-et-red text-white flex items-center justify-center flex-shrink-0 text-[10px] mt-0.5 animate-pulse">!</div>
                                <p className="text-[11px] font-medium italic">3 new tenders match your professional interest in "{userMetadata?.professional_interest || 'Technology'}".</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
