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