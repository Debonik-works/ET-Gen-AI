"use client";

import { useEffect, useState } from 'react';
import { fetchArticles } from '@/data/db';
import { createClient } from '@/utils/supabase/client';
import { Article } from '@/types';
import { NewspaperLayout } from '@/components/NewspaperLayout';
import { Loader2 } from 'lucide-react';

export default function EPaperPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false);
        }, 8000);

        async function loadArticles() {
            try {
                const data = await fetchArticles(supabase);
                setArticles(data);
            } catch (error) {
                console.error("Error loading ePaper:", error);
            } finally {
                clearTimeout(timeoutId);
                setLoading(false);
            }
        }
        loadArticles();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfcf1] font-serif">
                <Loader2 className="w-12 h-12 text-et-red animate-spin mb-4" />
                <h2 className="text-2xl font-black uppercase tracking-tighter">Preparing Today's ePaper</h2>
                <p className="text-et-grey-medium italic mt-2">Personalizing your professional business daily...</p>
            </div>
        );
    }

    return <NewspaperLayout articles={articles} />;
}
