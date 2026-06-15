import { useEffect, useRef, useState } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, RectangleHorizontalIcon } from "lucide-react";
import { Game } from "@/app/draw/Game";

export type Tool = "circle" | "rect" | "pencil";

export function Canvas({
    roomId,
    socket
}: {
    roomId: string;
    socket: WebSocket;
}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>();
    const [selectedTool, setSelectedTool] = useState<Tool>("circle");

    useEffect(() => {
        //@ts-expext-error
        game?.setTool(selectedTool)
    }, [selectedTool, game])

    useEffect(() => {
        if(canvasRef.current){
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy();
            }
        }

    }, [canvasRef, roomId, socket]);
    return (
        <div className="h-screen w-screen overflow-hidden bg-slate-950 relative">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} className="cursor-crosshair"></canvas>
            <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />
        </div>
    );
}

function Topbar({selectedTool, setSelectedTool}: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void
}) {
    return (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center gap-2 p-2 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
                <IconButton 
                    activated={selectedTool === "pencil"} 
                    icon={<Pencil className="w-5 h-5" />} 
                    onClick={() => setSelectedTool("pencil")}
                />
                
                <div className="w-px h-8 bg-white/10 mx-1" />
                
                <IconButton 
                    activated={selectedTool === "rect"} 
                    icon={<RectangleHorizontalIcon className="w-5 h-5" />} 
                    onClick={() => setSelectedTool("rect")}
                />
                <IconButton 
                    activated={selectedTool === "circle"} 
                    icon={<Circle className="w-5 h-5" />} 
                    onClick={() => setSelectedTool("circle")}
                />
            </div>
        </div>
    );
}