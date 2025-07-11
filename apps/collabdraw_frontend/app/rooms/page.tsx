"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@repo/ui/button";
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

    const fetchRooms = async () => {
        const token = localStorage.getItem("token");
        if (!token) return router.push("/signin");

        const res = await axios.get("http://localhost:3001/rooms", {
            headers: { authorization: token },
        });
        setRooms(res.data.rooms);
    };

    const createRoom = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.post(
                "http://localhost:3001/room",
                { name: roomName },
                { headers: { authorization: token } }
            );
            router.push(`/canvas/${res.data.roomId}`);
        } catch {
            setMessage("❌ Room name already exists. Try something else.");
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <h1 className="text-4xl font-bold mb-4 text-center">Your Rooms</h1>
            <div className="flex items-center gap-4 justify-center mt-6 mb-12">
                <input
                    type="text"
                    placeholder="New room name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    className="p-3 rounded-lg text-black"
                />
                <Button
                    appName="CollabDraw"
                    onClick={createRoom}
                    className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700 transition"
                >
                    Create Room
                </Button>
            </div>
            {message && (
                <div className="text-center text-red-500 font-medium mb-4">{message}</div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rooms.map((room: Room) => (
                    <div
                        key={room.id}
                        onClick={() => router.push(`/canvas/${room.id}`)}
                        className="bg-gray-800 hover:bg-gray-700 p-6 rounded-xl cursor-pointer transition transform hover:scale-105 shadow-lg"
                    >
                        <h3 className="text-xl font-bold mb-2">{room.slug}</h3>
                        <p className="text-sm text-gray-300">
                            Created at: {new Date(room.createdAt).toLocaleString()}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
