"use client";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export default function LandingPage() {
  const router = useRouter();
  
  return (
    <main className="relative flex flex-col items-center justify-center min-h-screen bg-slate-950 overflow-hidden text-white px-6">
      {/* Decorative background gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full mix-blend-screen animate-pulse" />

      {/* Main Content */}
      <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto space-y-8 animate-fade-in-up">
        <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-indigo-300 backdrop-blur-sm mb-4">
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 mr-2"></span>
          Now available in early access
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-purple-400 drop-shadow-sm">
          Welcome to <span className="text-white">CollabDraw</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-light">
          A real-time collaborative drawing platform built for seamless teamwork, classrooms, and creative minds.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full sm:w-auto">
          <Button
            appName="CollabDraw"
            className="group relative flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 bg-indigo-600 rounded-xl hover:bg-indigo-500 hover:shadow-[0_0_40px_-10px_rgba(79,70,229,0.5)] hover:scale-105 active:scale-95"
            onClick={() => router.push("/signup")}
          >
            Start Drawing Free
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
          </Button>
          
          <Button
            appName="CollabDraw"
            className="px-8 py-4 font-semibold text-white transition-all duration-300 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:shadow-lg backdrop-blur-sm hover:scale-105 active:scale-95"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </Button>
        </div>
      </div>
      
      {/* Decorative App Mockup / Floating element */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[800px] h-[400px] bg-slate-900 border border-white/10 rounded-t-3xl shadow-[0_0_100px_rgba(79,70,229,0.2)] opacity-60 backdrop-blur-3xl" />
    </main>
  );
}
