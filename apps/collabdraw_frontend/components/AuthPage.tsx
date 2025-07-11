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
        try {
            if (isSignin) {
                const res = await axios.post(`${HTTP_BACKEND}signin`, {
                    username: email,
                    password,
                });
                const token = res.data.token;
                localStorage.setItem("token", token);
                router.push("/rooms");
            } else {
                await axios.post(`${HTTP_BACKEND}signup`, {
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
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 via-indigo-800 to-gray-900 text-white px-6">
            <div className="bg-white text-black p-8 rounded-xl shadow-2xl w-full max-w-md animate-fade-up">
                <h2 className="text-3xl font-bold mb-6 text-center">
                    {isSignin ? "Welcome Back" : "Create an Account"}
                </h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-3 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    appName="CollabDraw"
                    className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    onClick={handleSubmit}
                >
                    {loading ? "Please wait..." : isSignin ? "Sign In" : "Sign Up"}
                </Button>
                {message && (
                    <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
                )}
            </div>
        </div>
    );
}
