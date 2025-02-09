import { Router } from "express";
import { fetchUserMiddleware } from "../middlewares/fetchUser";
import { createContent } from "../controllers/content.controller";

const router = Router();

router.post("/add-content", fetchUserMiddleware, createContent);

export default router;