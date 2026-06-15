"use client";

import { WS_URL } from "@/config";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}){
    

    const [socket, setSocket] = useState<WebSocket | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/signin");
            return;
        }

        const ws = new WebSocket(`${WS_URL}?token=${token}`)

        ws.onopen = () => {
            setSocket(ws);
            const data = JSON.stringify({
                type: "join_room",
                roomId
            })
            ws.send(data)
        }
    }, [roomId, router])

    

    if(!socket){
        return (
            <div className="h-screen w-screen bg-slate-950 flex flex-col items-center justify-center text-white">
                <div className="w-16 h-16 border-4 border-white/10 border-t-indigo-500 rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(99,102,241,0.5)]" />
                <h2 className="text-xl font-medium tracking-tight text-slate-300 animate-pulse">Connecting to server...</h2>
            </div>
        );
    }

    return (
        <div className="relative">
            <Canvas roomId={roomId} socket={socket} />
        </div>
    );
}