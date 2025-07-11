"use client";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";

export default function LandingPage() {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-center h-screen bg-gradient-to-tr from-purple-700 via-indigo-800 to-gray-900 text-white px-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center animate-fade-in">
        Welcome to <span className="text-pink-400">CollabDraw</span>
      </h1>
      <p className="text-xl md:text-2xl mb-10 text-center max-w-2xl">
        A real-time collaborative drawing app for teams, classrooms, and fun!
      </p>
      <div className="flex gap-4">
        <Button
          appName="CollabDraw"
          className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
          onClick={() => router.push("/signup")}
        >
          Get Started
        </Button>
        <Button
          appName="CollabDraw"
          className="bg-white hover:bg-gray-100 text-gray-800 font-bold py-3 px-6 rounded-lg shadow-lg transition transform hover:scale-105"
          onClick={() => router.push("/signin")}
        >
          Login
        </Button>
      </div>
    </main>
  );
}
