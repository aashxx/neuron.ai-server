import { Request, Response } from "express";
import { getErrorMessage } from "../utils/error";
import { AuthenticatedRequest } from "../utils/types";
import { addContent, deleteContent, fetchAllContent } from "../services/content.service";

export const createContent = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        const newContent = await addContent(req.body, userId);
        res.status(200).send(newContent);
    } catch (error) {
        res.status(400).send(getErrorMessage(error));
    }
}

export const getAllContent = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        const content = await fetchAllContent(userId);
        res.status(200).send(content);
    } catch (error) {
        res.status(400).send(getErrorMessage(error));
    }
}

export const deleteExistingContent = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        const deletion = await deleteContent(req.params.id, userId);
        res.status(200).send(deletion);
    } catch (error) {
        res.status(400).send(getErrorMessage(error));
    }
}