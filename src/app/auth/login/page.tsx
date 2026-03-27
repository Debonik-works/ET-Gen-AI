"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, Loader2, ArrowRight, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const msg = params.get('message');
        if (msg) setMessage(msg);
    }, []);

    useEffect(() => {
        if (!authLoading && user) {
            router.push('/');
        }
    }, [user, authLoading, router]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            console.log('Attempting login for:', email);
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Login error:', error);
                setError(error.message);
            } else {
                console.log('Login successful');
                router.push('/');
                router.refresh();
            }
        } catch (err: any) {
            console.error('Unexpected login error:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleSocialLogin = async (provider: 'google' | 'linkedin') => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
        if (error) {
            if (error.message.includes('not enabled')) {
                setError(`The ${provider} login is not yet configured in your Supabase Dashboard. Please enable it in Authentication > Providers.`);
            } else {
                setError(error.message);
            }
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-[80vh] flex items-center justify-center bg-et-surface">
                <Loader2 className="w-8 h-8 animate-spin text-et-red" />
            </div>
        );
    }

    return (
        <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-et-surface">
            <div className="max-w-md w-full space-y-8 bg-white p-10 border border-et-border shadow-sm">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center bg-et-red text-white w-12 h-12 font-serif font-black text-2xl mb-4 leading-none">ET</div>
                    <h2 className="text-3xl font-serif font-black text-et-grey-dark uppercase tracking-tight">Enter the Newsroom</h2>
                    <p className="mt-2 text-sm text-et-grey-medium font-sans font-bold uppercase tracking-widest"> Sign in to your Economic Times account </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    {message && (
                        <div className="bg-green-50 border-l-4 border-green-500 p-4">
                            <p className="text-sm text-green-700 font-bold font-sans">{message}</p>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-50 border-l-4 border-et-red p-4">
                            <p className="text-sm text-et-red font-bold font-sans">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email-address" className="block text-[11px] font-black text-et-grey-dark uppercase tracking-widest mb-1.5 font-sans">
                                Professional Email
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-4 w-4 text-et-grey-medium group-focus-within:text-et-red transition-colors" />
                                </div>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border-b-2 border-et-border bg-et-grey-light text-et-grey-dark placeholder-et-grey-medium focus:outline-none focus:border-et-red focus:bg-white transition-all duration-200 text-sm font-sans"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-[11px] font-black text-et-grey-dark uppercase tracking-widest mb-1.5 font-sans">
                                Password
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-4 w-4 text-et-grey-medium group-focus-within:text-et-red transition-colors" />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border-b-2 border-et-border bg-et-grey-light text-et-grey-dark placeholder-et-grey-medium focus:outline-none focus:border-et-red focus:bg-white transition-all duration-200 text-sm font-sans"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                name="remember-me"
                                type="checkbox"
                                className="h-4 w-4 text-et-red focus:ring-et-red border-et-border rounded-none"
                            />
                            <label htmlFor="remember-me" className="ml-2 block text-xs font-bold text-et-grey-dark uppercase tracking-wide font-sans">
                                Stay Signed In
                            </label>
                        </div>

                        <div className="text-xs">
                            <a href="#" className="font-bold text-et-red hover:underline uppercase tracking-wide font-sans">
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-black text-white bg-et-red hover:bg-[#d0151d] focus:outline-none transition-all duration-300 uppercase tracking-[0.2em] font-sans shadow-md disabled:bg-et-grey-medium"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            <span className="flex items-center gap-2">
                                Log In <ArrowRight className="h-4 w-4" />
                            </span>
                        )}
                    </button>
                </form>

                <div className="mt-8">
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-et-border"></div>
                        </div>
                        <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                            <span className="px-4 bg-white text-et-grey-medium font-bold font-sans">Or continue with</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="w-full inline-flex justify-center py-3 px-4 border border-et-border bg-white text-et-grey-dark text-[11px] font-black uppercase tracking-widest hover:bg-et-grey-light transition-all duration-200 font-sans shadow-sm"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            <span>Google</span>
                        </button>
                        <button
                            onClick={() => handleSocialLogin('linkedin')}
                            className="w-full inline-flex justify-center py-3 px-4 border border-et-border bg-white text-et-grey-dark text-[11px] font-black uppercase tracking-widest hover:bg-et-grey-light transition-all duration-200 font-sans shadow-sm"
                        >
                            <Globe className="w-4 h-4 mr-2" />
                            <span>LinkedIn</span>
                        </button>
                    </div>
                </div>

                <p className="mt-10 text-center text-xs text-et-grey-medium font-bold font-sans uppercase tracking-widest">
                    No account yet?{' '}
                    <Link href="/auth/signup" className="text-et-red hover:underline">
                        Join the community
                    </Link>
                </p>
            </div>
        </div>
    );
}
