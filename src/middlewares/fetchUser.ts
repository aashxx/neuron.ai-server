import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { getErrorMessage } from "../utils/error";
import { AuthenticatedRequest } from '../utils/types';
const JWT_SECRET = process.env.JWT_SECRET || "secretish@1230";

export const fetchUserMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.header('auth-token');
        if(!token) {
            res.status(401).json({ error: "Authenticate using a valid token" });
            return;
        } 
        const data = jwt.verify(token, JWT_SECRET) as JwtPayload;
        (req as AuthenticatedRequest).user = data.id;
        next();
    } catch (error) {
        res.status(401).send(getErrorMessage(error));
    }
}