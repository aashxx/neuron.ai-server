import { Router } from "express";
import { fetchUserMiddleware } from "../middlewares/fetchUser";
import { createContent, deleteExistingContent, getAllContent, updatedExistingContent } from "../controllers/content.controller";

const router = Router();
router.use(fetchUserMiddleware);

router.post("/add-content", createContent);
router.get("/fetch-content", getAllContent);
router.put("/update-content/:id", updatedExistingContent);
router.delete("/delete-content/:id", deleteExistingContent);

export default router;