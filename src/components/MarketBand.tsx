"use client";

import { Search, TrendingUp, TrendingDown } from 'lucide-react';

export default function MarketBand() {
    const indices = [
        { name: 'NIFTY 50', value: '23,245.50', change: '+125.40', percent: '0.54%', up: true },
        { name: 'SENSEX', value: '76,510.12', change: '+412.30', percent: '0.54%', up: true },
        { name: 'NIFTY BANK', value: '50,123.45', change: '-45.20', percent: '-0.09%', up: false },
        { name: 'GOLD', value: '72,450', change: '+210', percent: '0.29%', up: true },
    ];

    return (
        <div className="bg-et-grey-light border-b border-et-border hidden md:block overflow-hidden">
            <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex items-center justify-between h-[40px]">
                <div className="flex-1 overflow-hidden relative mr-8">
                    <div className="animate-ticker hover:pause flex items-center">
                        {[...indices, ...indices].map((index, i) => (
                            <div key={i} className="flex items-center gap-2 whitespace-nowrap text-[11px] font-bold pr-12">
                                <span className="text-et-grey-dark/70 uppercase tracking-wider">{index.name}</span>
                                <span className="text-et-grey-dark">{index.value}</span>
                                <span className={`flex items-center gap-0.5 ${index.up ? 'text-sensex-green' : 'text-sensex-red'}`}>
                                    {index.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                    {index.change} ({index.percent})
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center gap-4 pl-4 border-l border-et-border h-full">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Search News, Stock Quotes..."
                            className="w-[240px] h-[34px] pl-3 pr-10 text-[13px] border border-et-border rounded-sm focus:outline-none focus:border-et-red transition-colors"
                        />
                        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-et-grey-medium group-focus-within:text-et-red transition-colors" />
                    </div>
                </div>
            </div>
        </div>
    );
}
