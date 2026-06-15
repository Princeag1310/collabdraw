"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@repo/ui/button";
import { HTTP_BACKEND } from "@/config";

export function AuthPage({ isSignin }: { isSignin: boolean }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        setLoading(true);
        setMessage("");
        
        const backendUrl = HTTP_BACKEND?.endsWith("/") ? HTTP_BACKEND : `${HTTP_BACKEND}/`;

        try {
            if (isSignin) {
                const res = await axios.post(`${backendUrl}signin`, {
                    username: email,
                    password,
                });
                const token = res.data.token;
                localStorage.setItem("token", token);
                router.push("/rooms");
            } else {
                await axios.post(`${backendUrl}signup`, {
                    username: email,
                    password,
                    name: email.split("@")[0],
                });
                setMessage("🎉 Signup successful! Redirecting to login...");
                setTimeout(() => router.push("/signin"), 1500);
            }
        } catch  {
            setMessage("❌ Authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-slate-950 overflow-hidden text-white px-6">
            {/* Background elements */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[100px] rounded-full mix-blend-screen" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 blur-[100px] rounded-full mix-blend-screen" />

            <div className="z-10 w-full max-w-md p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl animate-fade-in-up">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">
                        {isSignin ? "Welcome Back" : "Create an Account"}
                    </h2>
                    <p className="text-sm text-slate-400">
                        {isSignin ? "Sign in to access your drawing rooms." : "Get started with your free account."}
                    </p>
                </div>
                
                <div className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Email address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500 text-white"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            className="w-full p-3 bg-slate-900/50 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-500 text-white"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        appName="CollabDraw"
                        className="w-full py-3.5 mt-2 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-500 transition-all hover:shadow-[0_0_20px_-5px_rgba(79,70,229,0.5)] active:scale-95 disabled:opacity-50 disabled:active:scale-100"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? "Please wait..." : isSignin ? "Sign In" : "Sign Up"}
                    </Button>
                </div>

                {message && (
                    <div className={`mt-6 p-3 rounded-lg text-sm font-medium text-center backdrop-blur-md border ${
                        message.includes("❌") 
                            ? "bg-red-500/10 border-red-500/20 text-red-400" 
                            : "bg-green-500/10 border-green-500/20 text-green-400"
                    }`}>
                        {message}
                    </div>
                )}
                
                <p className="mt-8 text-center text-sm text-slate-400">
                    {isSignin ? "Don't have an account? " : "Already have an account? "}
                    <button 
                        onClick={() => router.push(isSignin ? "/signup" : "/signin")}
                        className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                        {isSignin ? "Sign up" : "Sign in"}
                    </button>
                </p>
            </div>
        </div>
    );
}
