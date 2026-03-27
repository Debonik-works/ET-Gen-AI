"use client";

import { Article } from '@/types';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { Printer, ChevronLeft, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface NewspaperLayoutProps {
    articles: Article[];
}

export function NewspaperLayout({ articles }: NewspaperLayoutProps) {
    const { user } = useAuth();
    const preference = user?.user_metadata?.news_preference || "Global";

    const prioritizedArticles = [...articles].sort((a, b) => {
        if (a.category.toLowerCase() === preference.toLowerCase()) return -1;
        if (b.category.toLowerCase() === preference.toLowerCase()) return 1;
        return 0;
    });

    const mainArticle = prioritizedArticles[0];
    const secondaryArticles = prioritizedArticles.slice(1, 4);
    const columnArticles = prioritizedArticles.slice(4);

    return (
        <div className="bg-[#e5e5e5] min-h-screen pt-12 pb-24 px-4 lg:px-0 print:p-0 print:bg-white overflow-x-hidden">
            {/* Top Toolbar */}
            <div className="max-w-[1100px] mx-auto mb-10 flex justify-between items-center print:hidden px-6 lg:px-0">
                <Link href="/" className="group flex items-center gap-2 text-et-grey-medium hover:text-black font-bold text-[11px] uppercase tracking-[0.2em] transition-all">
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Live Feed
                </Link>
                <div className="flex gap-4">
                    <button
                        onClick={() => window.print()}
                        className="flex items-center gap-2 bg-et-red text-white px-8 py-3 rounded-sm font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-xl hover:scale-105 active:scale-95"
                    >
                        <Printer className="w-4 h-4" /> Save as PDF / Print
                    </button>
                </div>
            </div>

            {/* The Main Newspaper Sheet */}
            <div id="newspaper-sheet" className="max-w-[1100px] mx-auto relative group">
                {/* Torn Edge Effect (Top) - Subtle */}
                <div className="absolute -top-2 left-0 w-full h-4 bg-[#fdfcf1] torn-edge-top opacity-50"></div>

                <div className="bg-[#fdfcf1] p-12 lg:p-20 font-serif text-black shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-x border-t border-[#e8e4d8] relative z-10 print:shadow-none print:border-0 print:p-0">

                    {/* Masthead Section */}
                    <div className="text-center border-b-[6px] border-double border-black pb-10 mb-12">
                        <div className="flex justify-between items-end text-[11px] font-black uppercase tracking-[0.3em] mb-6 text-et-grey-dark">
                            <span>{new Date().toLocaleDateString('en-IN', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                            <span>Vol CCIV No.12 | ₹5.00</span>
                        </div>

                        <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-4 leading-none select-none hover:scale-[1.01] transition-transform duration-500">
                            <span className="block border-y-2 border-black py-4">THE ECONOMIC TIMES</span>
                        </h1>

                        <div className="flex items-center justify-center gap-10 text-[10px] font-bold uppercase tracking-[0.6em] py-2 border-b border-black/10">
                            <span>MUMBAI</span>
                            <span className="text-et-red">●</span>
                            <span>DELHI</span>
                            <span className="text-et-red">●</span>
                            <span>BENGALURU</span>
                            <span className="text-et-red">●</span>
                            <span>KOLKATA</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {prioritizedArticles.length === 0 ? (
                            <div className="lg:col-span-12 py-32 text-center space-y-6">
                                <div className="bg-et-red/5 p-8 inline-block rounded-full mb-4">
                                    <AlertCircle className="w-16 h-16 text-et-red opacity-30 mx-auto" />
                                </div>
                                <h2 className="text-4xl font-black uppercase tracking-tighter text-et-grey-dark">No Headlines Found</h2>
                                <p className="text-xl italic text-et-grey-medium max-w-2xl mx-auto leading-relaxed">
                                    Our intelligence engines are currently recalibrating for your profile. Please check back in a few moments for your personalized morning brief.
                                </p>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-10 py-4 bg-black text-white font-black uppercase tracking-[0.2em] text-sm hover:scale-105 transition-all shadow-xl active:scale-95"
                                >
                                    Force Refresh
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* LEFT COLUMN: Sidebar & Briefs */}
                                <div className="lg:col-span-3 border-r-2 border-black/5 pr-8 space-y-12">
                                    {secondaryArticles.map((article, i) => (
                                        <div key={i} className="pb-8 border-b border-black/10 last:border-0 block group">
                                            <span className="inline-block bg-et-red/10 text-et-red px-2 py-0.5 text-[9px] font-black uppercase tracking-widest mb-3">{article.category}</span>
                                            <h3 className="text-xl font-black leading-tight mb-3 group-hover:text-et-red transition-colors">{article.title}</h3>
                                            <p className="text-[13px] leading-relaxed text-black/80 italic">
                                                {article.content.substring(0, 160)}...
                                            </p>
                                        </div>
                                    ))}

                                    <div className="bg-black text-white p-6 rotate-[-1deg] shadow-lg">
                                        <h4 className="font-black text-[10px] uppercase tracking-[0.2em] mb-4 border-b border-white/20 pb-2 flex items-center gap-2">
                                            <Sparkles className="w-3.5 h-3.5 text-et-red" /> Strategic focus
                                        </h4>
                                        <p className="text-[12px] leading-relaxed opacity-90 font-bold">
                                            Today's edition highlights prioritized {preference} trends based on current market signals.
                                        </p>
                                    </div>
                                </div>

                                {/* CENTER COLUMN: The Main Story (Multi-Column) */}
                                <div className="lg:col-span-6 px-2">
                                    {mainArticle && (
                                        <div className="space-y-8">
                                            <div className="text-center space-y-4">
                                                <span className="text-et-red text-[11px] font-black uppercase tracking-[0.4em] block">Exclusive Coverage</span>
                                                <h2 className="text-5xl lg:text-6xl font-black leading-[0.9] tracking-tighter">
                                                    {mainArticle.title}
                                                </h2>
                                                <div className="h-1 w-24 bg-et-red mx-auto"></div>
                                            </div>

                                            <div className="relative aspect-[16/10] border-[12px] border-black/5 p-1 grayscale group-hover:grayscale-0 transition-all duration-1000 print:grayscale-0">
                                                <Image src={mainArticle.imageUrl} alt={mainArticle.title} fill className="object-cover" unoptimized />
                                                <div className="absolute bottom-0 right-0 bg-black text-white px-2 py-1 text-[8px] uppercase font-black">ET Photo / {mainArticle.category}</div>
                                            </div>

                                            {/* Multi-column Body Text */}
                                            <div className="columns-1 md:columns-2 gap-8 text-[15px] leading-relaxed text-justify hyphens-auto font-serif">
                                                <p className="first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:leading-[0.8] first-letter:text-et-red mb-4">
                                                    {mainArticle.content}
                                                </p>
                                                <p className="mb-4">{mainArticle.content}</p>
                                                <div className="p-4 bg-et-grey-light/20 border-y border-black/10 my-6 italic font-bold">
                                                    "A definitive shift in {mainArticle.category} underscores the broader market sentiment today."
                                                </div>
                                                <p>{mainArticle.content.split('.').slice(0, 3).join('.')}.</p>
                                            </div>

                                            <div className="border-t-2 border-black/10 pt-8 mt-12">
                                                <h4 className="text-2xl font-black mb-4 border-l-4 border-et-red pl-4">{columnArticles[0]?.title}</h4>
                                                <p className="text-sm opacity-80">{columnArticles[0]?.content.substring(0, 300)}...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* RIGHT COLUMN: Market Briefs & Classifieds */}
                                <div className="lg:col-span-3 border-l-2 border-black/5 pl-8 space-y-10">
                                    <div className="border-[3px] border-black p-5 bg-white shadow-[4px_4px_0px_black]">
                                        <h4 className="font-black text-center border-b-2 border-black pb-2 mb-6 uppercase tracking-tight text-xl">The Daily Pulse</h4>
                                        {columnArticles.slice(1, 6).map((article, i) => (
                                            <div key={i} className="mb-6 pb-4 border-b border-black/5 last:border-0 hover:bg-et-grey-light/10 transition-colors p-1">
                                                <h5 className="font-bold text-[14px] leading-tight mb-1">{article.title}</h5>
                                                <span className="text-[10px] uppercase font-black text-et-red">{article.category}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-6 border-2 border-dotted border-black/20 bg-[#fbfaf0]">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-3 text-et-grey-medium">Market Intelligence</p>
                                        <p className="text-[12px] font-bold leading-relaxed italic">
                                            "Analysts predict a resilient outlook for {preference} as domestic consumption hits record highs."
                                        </p>
                                    </div>

                                    <div className="h-64 w-full bg-[#f6f6f6] border border-black/10 p-4 relative overflow-hidden flex items-center justify-center">
                                        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex flex-wrap gap-4 p-2 overflow-hidden uppercase font-black text-[60px] leading-none">
                                            CLASSIFIED ET
                                        </div>
                                        <div className="z-10 text-center space-y-2">
                                            <AlertCircle className="w-8 h-8 mx-auto text-black/20" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Section Reserved</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Footer / Cutout Bottom */}
                    <div className="mt-20 pt-8 border-t-4 border-black border-double flex justify-between items-center text-[10px] font-black uppercase tracking-[0.3em] text-et-grey-dark">
                        <span>© 2026 THE ECONOMIC TIMES GEN AI</span>
                        <span>Page A1 | INDIA</span>
                        <div className="flex items-center gap-4">
                            <span className="font-mono">ET-{Math.random().toString(16).slice(2, 8).toUpperCase()}</span>
                            <div className="w-16 h-4 bg-black"></div>
                        </div>
                    </div>
                </div>

                {/* Jagged Torn Bottom Edge */}
                <div className="absolute -bottom-6 left-0 w-full h-8 bg-torn-edge z-20"></div>
            </div>

            <style jsx>{`
                #newspaper-sheet {
                    filter: drop-shadow(0 40px 80px rgba(0,0,0,0.15));
                }
                
                .torn-edge-top {
                    background: linear-gradient(135deg, transparent 25%, #fdfcf1 25.5%, #fdfcf1 50%, transparent 50.5%) 0 0 / 15px 15px,
                                linear-gradient(-135deg, transparent 25%, #fdfcf1 25.5%, #fdfcf1 50%, transparent 50.5%) 0 0 / 15px 15px;
                }

                .bg-torn-edge {
                    background-color: #fdfcf1;
                    clip-path: polygon(
                        0% 0%, 100% 0%, 100% 30%, 
                        98% 10%, 96% 40%, 94% 20%, 92% 50%, 90% 15%, 
                        88% 45%, 86% 25%, 84% 60%, 82% 10%, 80% 40%, 
                        78% 20%, 76% 55%, 74% 25%, 72% 45%, 70% 15%, 
                        68% 50%, 66% 20%, 64% 40%, 62% 10%, 60% 60%, 
                        58% 25%, 56% 50%, 54% 20%, 52% 45%, 50% 15%, 
                        48% 55%, 46% 25%, 44% 40%, 42% 10%, 40% 60%, 
                        38% 20%, 36% 50%, 34% 15%, 32% 45%, 30% 25%, 
                        28% 55%, 26% 20%, 24% 40%, 22% 10%, 20% 50%, 
                        18% 25%, 16% 45%, 14% 15%, 12% 55%, 10% 20%, 
                        8% 40%, 6% 10%, 4% 60%, 2% 25%, 0% 100%
                    );
                }

                #newspaper-content {
                    background-image: 
                        radial-gradient(circle at 100% 150%, rgba(0,0,0,0.02) 24%, white 25%),
                        url("https://www.transparenttextures.com/patterns/paper-fibers.png");
                }
                
                @media print {
                    body { background: white !important; margin: 0 !important; }
                    .max-w-[1100px] { max-width: 100% !important; border: 0 !important; width: 100% !important; margin: 0 !important; }
                    .bg-[#e5e5e5] { background: white !important; padding: 0 !important; }
                    .bg-torn-edge, .torn-edge-top, .print-hidden { display: none !important; }
                    #newspaper-sheet { 
                        filter: none !important; 
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        max-width: 100% !important;
                    }
                    #newspaper-sheet div.bg-[#fdfcf1] {
                        background-color: white !important;
                        padding: 10mm !important;
                        box-shadow: none !important;
                        border: 0 !important;
                    }
                    .shadow-2xl, .shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] { 
                        box-shadow: none !important; 
                    }
                    .border-x, .border-t, .border-b, .border-double { border-color: black !important; }
                    .border-x, .border-t { border: 0 !important; }
                    main { padding: 0 !important; margin: 0 !important; max-width: 100% !important; }
                }
            `}</style>
        </div>
    );
}
