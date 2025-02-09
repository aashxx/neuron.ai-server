import { Router } from "express";
import { fetchUserMiddleware } from "../middlewares/fetchUser";
import { intiateLink, shareContent } from "../controllers/share.controller";

const router = Router();

router.post("/link", fetchUserMiddleware, intiateLink);
router.get("/:link", shareContent);

export default router;