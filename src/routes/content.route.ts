import { Router } from "express";
import { fetchUserMiddleware } from "../middlewares/fetchUser";
import { createContent, deleteExistingContent, getAllContent } from "../controllers/content.controller";

const router = Router();

router.post("/add-content", fetchUserMiddleware, createContent);
router.get("/fetch-content", fetchUserMiddleware, getAllContent);
router.delete("/delete-content/:id", fetchUserMiddleware, deleteExistingContent);

export default router;