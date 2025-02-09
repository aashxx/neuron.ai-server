import { z } from "zod"
import { UserIdType } from "../utils/types"
import Content from "../schemas/content";

const contentSchema = z.object({
    title: z.string(),
    category: z.enum(["image", "video", "audio", "article"]),
    link: z.string().url(),
    tags: z.array(z.string()).optional()
});

export const addContent = async (content: z.infer<typeof contentSchema>, userId: UserIdType) => {
    try {
        const result = contentSchema.safeParse(content);
        if(!result.success) throw new Error(JSON.stringify(result.error.format()));

        const { title, category, tags, link } = result.data;
        await Content.create({ title, category, link, tags, userId });

        return {
            success: true,
            message: "Content added successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

export const fetchAllContent = async (userId: UserIdType) => {
    try {
        const snapshot = await Content.find({ userId });
        return {
            success: true,
            docs: snapshot
        }
    } catch (error) {
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

export const deleteContent = async (contentId: string, userId: UserIdType) => {
    try {
        const content = await Content.findById(contentId);
        if(!content) return { error: "Document does not exist" };
        if(content.userId?.toString() !== userId) return { error: "Unauthorized" };

        await Content.findByIdAndDelete(contentId);
        return {
            success: true,
            message: "Content deleted successfully"
        }
    } catch (error) {
        return {
            success: false,
            message: "Internal server error"
        }
    }
} 