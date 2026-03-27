"use client";

import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User as UserIcon, Loader2, ArrowRight, Briefcase, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [interest, setInterest] = useState('Markets');
    const [profession, setProfession] = useState('');
    const [location, setLocation] = useState('');
    const [investmentGoals, setInvestmentGoals] = useState('Growth');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const supabase = createClient();
    const { user, loading: authLoading } = useAuth();

    useEffect(() => {
        if (!authLoading && user) {
            router.push('/');
        }
    }, [user, authLoading, router]);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        setError(null);

        try {
            console.log('Attempting signup for:', email);
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                        professional_interest: interest,
                        profession: profession,
                        location: location,
                        investment_goals: investmentGoals,
                        last_login_at: new Date().toISOString(),
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) {
                console.error('Signup error:', error);
                if (error.message.toLowerCase().includes('rate limit')) {
                    setError('Signup rate limit exceeded. This is a security feature in your Supabase Dashboard (Default: 3 per hour). You can increase this in Authentication > App Settings > Rate Limits.');
                } else {
                    setError(error.message);
                }
            } else if (data.session || data.user) {
                console.log('Signup successful');
                router.push('/auth/login?message=Check your email to confirm your account');
            }
        } catch (err: any) {
            console.error('Unexpected signup error:', err);
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
                setError(`The ${provider} provider is not yet enabled in your Supabase Dashboard.`);
            } else {
                setError(error.message);
            }
        }
    };

    if (authLoading) {
        return (
            <div className="min-h-[90vh] flex items-center justify-center bg-et-surface">
                <Loader2 className="w-8 h-8 animate-spin text-et-red" />
            </div>
        );
    }

    const interests = ['Markets', 'Tech', 'Policy', 'Economy', 'Wealth'];

    return (
        <div className="min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-et-surface">
            <div className="max-w-md w-full space-y-8 bg-white p-10 border border-et-border shadow-sm">
                <div className="text-center">
                    <div className="inline-flex items-center justify-center bg-et-red text-white w-12 h-12 font-serif font-black text-2xl mb-4 leading-none">ET</div>
                    <h2 className="text-3xl font-serif font-black text-et-grey-dark uppercase tracking-tight">Join the Network</h2>
                    <p className="mt-2 text-sm text-et-grey-medium font-sans font-bold uppercase tracking-widest"> Create your exclusive Economic Times profile </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSignup}>
                    {error && (
                        <div className="bg-red-50 border-l-4 border-et-red p-4">
                            <p className="text-sm text-et-red font-bold font-sans">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label htmlFor="full-name" className="block text-[11px] font-black text-et-grey-dark uppercase tracking-widest mb-1.5 font-sans">
                                Full Name
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <UserIcon className="h-4 w-4 text-et-grey-medium group-focus-within:text-et-red transition-colors" />
                                </div>
                                <input
                                    id="full-name"
                                    name="name"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border-b-2 border-et-border bg-et-grey-light text-et-grey-dark placeholder-et-grey-medium focus:outline-none focus:border-et-red focus:bg-white transition-all duration-200 text-sm font-sans"
                                    placeholder="John Doe"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>
                        </div>

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
                            <label htmlFor="profession" className="block text-[11px] font-black text-et-grey-dark uppercase tracking-widest mb-1.5 font-sans">
                                Your Profession
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Briefcase className="h-4 w-4 text-et-grey-medium group-focus-within:text-et-red transition-colors" />
                                </div>
                                <input
                                    id="profession"
                                    name="profession"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border-b-2 border-et-border bg-et-grey-light text-et-grey-dark placeholder-et-grey-medium focus:outline-none focus:border-et-red focus:bg-white transition-all duration-200 text-sm font-sans"
                                    placeholder="e.g. Software Engineer, Trader"
                                    value={profession}
                                    onChange={(e) => setProfession(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="location" className="block text-[11px] font-black text-et-grey-dark uppercase tracking-widest mb-1.5 font-sans">
                                City / Location
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Globe className="h-4 w-4 text-et-grey-medium group-focus-within:text-et-red transition-colors" />
                                </div>
                                <input
                                    id="location"
                                    name="location"
                                    type="text"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border-b-2 border-et-border bg-et-grey-light text-et-grey-dark placeholder-et-grey-medium focus:outline-none focus:border-et-red focus:bg-white transition-all duration-200 text-sm font-sans"
                                    placeholder="e.g. Mumbai, New York"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="investment-goals" className="block text-[11px] font-black text-et-grey-dark uppercase tracking-widest mb-1.5 font-sans">
                                Investment Goals
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <ArrowRight className="h-4 w-4 text-et-grey-medium group-focus-within:text-et-red transition-colors" />
                                </div>
                                <select
                                    id="investment-goals"
                                    className="block w-full pl-10 pr-3 py-3 border-b-2 border-et-border bg-et-grey-light text-et-grey-dark focus:outline-none focus:border-et-red focus:bg-white transition-all duration-200 text-sm font-sans appearance-none"
                                    value={investmentGoals}
                                    onChange={(e) => setInvestmentGoals(e.target.value)}
                                >
                                    {['Growth', 'Income', 'Value', 'Speculative', 'Safe Haven'].map((g) => (
                                        <option key={g} value={g}>{g}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-[11px] font-black text-et-grey-dark uppercase tracking-widest mb-1.5 font-sans">
                                Create Password
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

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-black text-white bg-et-red hover:bg-[#d0151d] focus:outline-none transition-all duration-300 uppercase tracking-[0.2em] font-sans shadow-md disabled:bg-et-grey-medium"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin h-5 w-5" />
                        ) : (
                            <span className="flex items-center gap-2">
                                Create Account <ArrowRight className="h-4 w-4" />
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
                            <span className="px-4 bg-white text-et-grey-medium font-bold font-sans">Or join using</span>
                        </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-4">
                        <button
                            onClick={() => handleSocialLogin('google')}
                            className="w-full inline-flex justify-center py-3 px-4 border border-et-border bg-white text-et-grey-dark text-[11px] font-black uppercase tracking-widest hover:bg-et-grey-light transition-all duration-200 font-sans shadow-sm group"
                        >
                            <Globe className="w-4 h-4 mr-2 group-hover:text-et-red transition-colors" />
                            <span>Google</span>
                        </button>
                        <button
                            onClick={() => handleSocialLogin('linkedin')}
                            className="w-full inline-flex justify-center py-3 px-4 border border-et-border bg-white text-et-grey-dark text-[11px] font-black uppercase tracking-widest hover:bg-et-grey-light transition-all duration-200 font-sans shadow-sm group"
                        >
                            <Globe className="w-4 h-4 mr-2 group-hover:text-et-red transition-colors" />
                            <span>LinkedIn</span>
                        </button>
                    </div>
                </div>

                <p className="mt-10 text-center text-xs text-et-grey-medium font-bold font-sans uppercase tracking-widest">
                    Already a member?{' '}
                    <Link href="/auth/login" className="text-et-red hover:underline">
                        Sign in here
                    </Link>
                </p>
            </div>
        </div>
    );
}
