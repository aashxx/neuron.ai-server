import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload
}

export type UserIdType = string | JwtPayload | undefined;
