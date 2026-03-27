"use client";

import { useState } from 'react';
import { Search, MapPin, Briefcase, DollarSign, Sparkles, Send, FileText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function JobsPage() {
    const { user } = useAuth();
    const userMetadata = user?.user_metadata;
    const [resumeSaved, setResumeSaved] = useState(false);

    const mockJobs = [
        { id: 1, role: 'Senior Quantitative Analyst', company: 'Goldman Sachs', location: 'Mumbai/Remote', salary: '₹45-65LPA', type: 'Full-time' },
        { id: 2, role: 'VP, Engineering (FinTech)', company: 'Razorpay', location: 'Bengaluru', salary: '₹80-1.2Cr', type: 'Hybrid' },
        { id: 3, role: 'Lead Economic Strategist', company: 'Reserve Bank of India', location: 'Delhi', salary: 'Grade-A Scale', type: 'Contract' },
    ];

    return (
        <div className="max-w-[1280px] mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b-4 border-black pb-8">
                <div>
                    <h1 className="font-serif font-black text-4xl lg:text-5xl uppercase tracking-tight mb-2">ET Careers</h1>
                    <p className="font-sans font-bold text-et-grey-medium uppercase tracking-[0.2em] text-xs">Gen AI Backed Opportunities</p>
                </div>

                <div className="flex items-center gap-4">
                    {!resumeSaved ? (
                        <button
                            onClick={() => setResumeSaved(true)}
                            className="bg-et-grey-light border border-et-border px-6 py-3 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-et-grey-medium transition-all flex items-center gap-2"
                        >
                            <FileText className="w-4 h-4" /> Import & Autosave Resume
                        </button>
                    ) : (
                        <div className="bg-green-50 text-green-700 px-6 py-3 border border-green-200 rounded-sm font-black text-xs uppercase tracking-widest flex items-center gap-2 animate-in zoom-in-95 duration-300">
                            <CheckCircle2 className="w-4 h-4" /> Resume AI-Analyzed & Saved
                        </div>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-6">
                    {userMetadata && (
                        <div className="bg-black text-white p-6 rounded-sm mb-8 relative border-l-4 border-et-red">
                            <div className="flex items-center gap-2 text-et-red font-black text-[11px] mb-2 uppercase tracking-[0.2em]">
                                <Sparkles className="w-4 h-4" /> AI Career Path Optimization
                            </div>
                            <h2 className="text-xl font-serif font-bold italic mb-4">
                                Recommended Transitions for a {userMetadata.profession} in {userMetadata.location}
                            </h2>
                            <p className="text-gray-400 text-sm leading-relaxed max-w-2xl">
                                Based on recent {userMetadata.professional_interest} trends, your {userMetadata.investment_goals} mindset and engineer background makes you a 98% match for these high-priority roles.
                            </p>
                        </div>
                    )}

                    <div className="space-y-4">
                        {mockJobs.map(job => (
                            <div key={job.id} className="bg-white border border-et-border p-6 hover:border-et-red hover:shadow-lg transition-all group">
                                <div className="flex items-start justify-between">
                                    <div className="flex gap-4">
                                        <div className="w-14 h-14 bg-et-grey-light flex items-center justify-center font-serif font-black text-et-grey-medium text-2xl group-hover:bg-et-red group-hover:text-white transition-colors">
                                            {job.company[0]}
                                        </div>
                                        <div>
                                            <h3 className="font-serif font-black text-lg group-hover:text-et-red transition-colors">{job.role}</h3>
                                            <p className="text-[13px] font-bold text-et-grey-dark mb-2">{job.company}</p>
                                            <div className="flex items-center gap-4 text-[11px] font-bold text-et-grey-medium uppercase tracking-wider">
                                                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                                                <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {job.type}</span>
                                                <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> {job.salary}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className="bg-et-grey-dark hover:bg-et-red text-white px-8 py-3 font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2">
                                        <Send className="w-3.5 h-3.5" /> 1-Click Apply
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-et-grey-light p-6 rounded-sm border border-et-border">
                        <h4 className="font-serif font-black text-[18px] mb-4 border-b border-et-border pb-2 uppercase">Industry Salary Pulse</h4>
                        <div className="space-y-6 mt-6">
                            {['Banking', 'FinTech', 'Renewables', 'Auto'].map((ind, i) => (
                                <div key={i}>
                                    <div className="flex justify-between items-center mb-1 text-[11px] font-black uppercase tracking-widest">
                                        <span>{ind}</span>
                                        <span className="text-et-red">+12% YoY</span>
                                    </div>
                                    <div className="w-full bg-et-border h-1.5 rounded-full overflow-hidden">
                                        <div className="bg-et-red h-full" style={{ width: `${80 - i * 15}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
