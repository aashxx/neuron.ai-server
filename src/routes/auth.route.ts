import { Router } from "express";
import { getUser, login, signUp } from "../controllers/auth.controller";
import { fetchUserMiddleware } from "../middlewares/fetchUser";

const router = Router();

router.post('/create-account', signUp);
router.post('/login', login);
router.get('/get-user', fetchUserMiddleware, getUser);

export default router;