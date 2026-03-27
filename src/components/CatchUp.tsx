"use client";

import { useState, useEffect } from 'react';
import { Sparkles, Clock, ArrowRight, X } from 'lucide-react';
import { Article } from '@/types';
import { Loader2 } from 'lucide-react';

interface CatchUpProps {
    lastLogin: string | null;
    articles: Article[];
    onSummarize: (articles: Article[], query: string) => Promise<void>;
    isSummarizing: boolean;
    summary: string | null;
}

export function CatchUp({ lastLogin, articles, onSummarize, isSummarizing, summary }: CatchUpProps) {
    const [isOpen, setIsOpen] = useState(true);

    if (!isOpen || !lastLogin) return null;

    const lastLoginDate = new Date(lastLogin);
    const newArticles = articles.filter(a => new Date(a.timestamp) > lastLoginDate);

    if (newArticles.length === 0) return null;

    return (
        <div className="bg-black text-white p-6 rounded-sm mb-10 relative overflow-hidden shadow-2xl border-l-4 border-et-red animate-in fade-in slide-in-from-top-4 duration-700">
            <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
                <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
                <div className="bg-et-red p-1.5 rounded-sm">
                    <Clock className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-black font-serif uppercase tracking-tight">While You Were Away</h3>
            </div>

            <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-6">
                {newArticles.length} critical updates since your last visit on {lastLoginDate.toLocaleDateString()}
            </p>

            {summary ? (
                <div className="bg-white/5 p-5 rounded-sm border border-white/10 mb-6">
                    <div className="flex items-center gap-2 mb-3 text-et-red font-black text-[10px] uppercase tracking-widest">
                        <Sparkles className="w-3.5 h-3.5" /> AI Intelligence Synthesis
                    </div>
                    <p className="text-lg font-serif leading-relaxed text-gray-200">
                        {summary}
                    </p>
                </div>
            ) : (
                <button
                    onClick={() => onSummarize(newArticles, "Summarize the most important executive updates since I last logged in.")}
                    disabled={isSummarizing}
                    className="flex items-center gap-3 bg-et-red hover:bg-red-700 text-white px-8 py-3.5 font-black text-sm uppercase tracking-widest transition-all shadow-lg active:scale-95 disabled:opacity-50"
                >
                    {isSummarizing ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            Catch Up Now <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            )}

            <div className="mt-4 flex -space-x-2 overflow-hidden">
                {newArticles.slice(0, 5).map((a, i) => (
                    <img
                        key={i}
                        src={a.imageUrl}
                        alt=""
                        className="inline-block h-8 w-8 rounded-full ring-2 ring-black object-cover"
                    />
                ))}
                {newArticles.length > 5 && (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-et-grey-dark ring-2 ring-black text-[10px] font-bold">
                        +{newArticles.length - 5}
                    </div>
                )}
            </div>
        </div>
    );
}
