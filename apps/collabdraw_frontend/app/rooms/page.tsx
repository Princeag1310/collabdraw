"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
import { HTTP_BACKEND } from "@/config";
type Room = {
    id: number;
    slug: string;
    createdAt: string;
};

export default function RoomPage() {
    const [rooms, setRooms] = useState<Room[]>([]);
    const [roomName, setRoomName] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const fetchRooms = async () => {
            const token = localStorage.getItem("token");
            if (!token) return router.push("/signin");

            const res = await axios.get(`${HTTP_BACKEND}rooms`, {
                headers: { authorization: token },
            });
            setRooms(res.data.rooms);
        };
        fetchRooms();
    }, [router]);

    const createRoom = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                `${HTTP_BACKEND}room`,
                { name: roomName },
                { headers: { authorization: token } }
            );
            router.push(`/canvas/${res.data.roomId}`);
        } catch {
            setMessage("❌ Room name already exists. Try something else.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500/30">
            {/* Top Navigation */}
            <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => router.push("/")}>
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">CollabDraw</span>
                    </div>
                    <button 
                        onClick={() => { localStorage.removeItem("token"); router.push("/"); }}
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12 max-w-5xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Your Workspace</h1>
                        <p className="text-slate-400">Create a new canvas or jump back into a recent room.</p>
                    </div>
                    
                    <div className="flex w-full md:w-auto relative group">
                        <input
                            type="text"
                            placeholder="Name your new room..."
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && createRoom()}
                            className="w-full md:w-80 p-3 pr-32 bg-slate-900 border border-white/10 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-white placeholder:text-slate-500"
                        />
                        <Button
                            appName="CollabDraw"
                            onClick={createRoom}
                            className="absolute right-1 top-1 bottom-1 bg-indigo-600 px-5 rounded-lg font-medium hover:bg-indigo-500 transition-colors shadow-sm"
                        >
                            Create
                        </Button>
                    </div>
                </div>

                {message && (
                    <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl flex items-center gap-3">
                        <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        {message}
                    </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {rooms.map((room: Room) => (
                        <div
                            key={room.id}
                            onClick={() => router.push(`/canvas/${room.id}`)}
                            className="group relative flex flex-col justify-between h-48 p-6 bg-slate-900/50 border border-white/5 rounded-2xl cursor-pointer hover:bg-slate-800/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 overflow-hidden"
                        >
                            {/* Decorative gradient blob inside card */}
                            <div className="absolute -right-10 -top-10 w-32 h-32 bg-indigo-500/10 blur-2xl rounded-full group-hover:bg-indigo-500/20 transition-colors" />
                            
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-indigo-500/10 group-hover:text-indigo-400 transition-colors">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-indigo-300 transition-colors truncate">
                                    {room.slug}
                                </h3>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-slate-500 mt-4">
                                <span>{new Date(room.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                                <span className="group-hover:text-indigo-400 transition-colors flex items-center gap-1">
                                    Join Room <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </span>
                            </div>
                        </div>
                    ))}
                    
                    {rooms.length === 0 && !message && (
                        <div className="col-span-full py-20 flex flex-col items-center justify-center text-center border-2 border-dashed border-white/10 rounded-2xl bg-white/[0.02]">
                            <svg className="w-12 h-12 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                            <h3 className="text-lg font-medium text-slate-300">No rooms yet</h3>
                            <p className="text-slate-500 mt-1 max-w-sm">Create your first room above to start drawing collaboratively with your team.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
