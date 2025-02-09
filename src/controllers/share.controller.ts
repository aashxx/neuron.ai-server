import { Request, Response } from "express"
import { getErrorMessage } from "../utils/error"
import { AuthenticatedRequest } from "../utils/types";
import { toggleSharing, shareContentPublic } from "../services/share.service";

export const intiateLink = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user;
        const shareLink = await toggleSharing(req.body.share, userId);
        res.status(200).json(shareLink); 
    } catch (error) {
        res.status(400).send(getErrorMessage(error));
    }
}

export const shareContent = async (req: Request, res: Response) => {
    try {
        const content = await shareContentPublic(req.params.link);
        res.status(200).json(content);
    } catch (error) {
        res.status(400).send(getErrorMessage(error));
    }
}