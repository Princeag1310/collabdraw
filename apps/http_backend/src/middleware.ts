import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";


export function middleware(req: Request, res: Response, next: NextFunction){
    //@ts-ignore
    const token = req.headers["authorization"] || "";

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
        //@ts-ignore
        req.userId = decoded.userId;
        next();
    } catch (e) {
        res.status(403).json({ message: "Unauthorized" });
    }


}