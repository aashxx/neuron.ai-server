import { Request, Response } from "express";
import { createNewUser, fetchUserData, loginUser } from "../services/auth.service";
import { getErrorMessage } from "../utils/error";
import { AuthenticatedRequest } from "../utils/types";

export const signUp = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await createNewUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(getErrorMessage(error));
    }
}

export const login = async (req: Request, res: Response): Promise<void>  => {
    try {
        const user = await loginUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(getErrorMessage(error));
    }
}

export const getUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        const user = await fetchUserData(userId);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).send(getErrorMessage(error));
    }
}