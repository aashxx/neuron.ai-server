import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload
}

export interface UserIdType {
    userId: string | JwtPayload | undefined
}