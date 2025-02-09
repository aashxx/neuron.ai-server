import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { z } from "zod";
import User from "../schemas/user.schema";
import { UserIdType } from '../utils/types';

const JWT_SECRET = process.env.JWT_SECRET || "secretish@1230";

const signUpSchema = z.object({
    username: z.string().min(2, "Username must be two characters long"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be 6 characters long")
});

export const createNewUser = async (credentials: z.infer<typeof signUpSchema>) => {
    const result = signUpSchema.safeParse(credentials);
    if(!result.success) throw new Error(JSON.stringify(result.error.format()));

    try {
        const { username, email, password } = result.data;
        const user = await User.findOne({ email });
        if(user) throw new Error("User already exists");

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({ username, email, password: hashedPassword });
        const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: "48h" });

        return {
            success: true,
            token
        };
    } catch (error) {
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

const loginSchema = z.object({
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be 6 characters long")
});

export const loginUser = async (credentials:  z.infer<typeof loginSchema>) => {
    const result = loginSchema.safeParse(credentials);
    if(!result.success) throw new Error(JSON.stringify(result.error.format()));

    try {
        const { email, password } = result.data;
        const user = await User.findOne({ email });
        if(!user) throw new Error("User does not exist");

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) throw new Error("Invalid credentials");

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "48h" });

        return {
            success: true,
            token
        };
    } catch (error) {
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

export const fetchUserData = async (userId: UserIdType) => {
    try {
        const user = await User.findById(userId).select('-password');
        if (!userId) return;
        return user;
    } catch (error) {
        return {
            success: false,
            message: "Internal server error"
        }
    }
}