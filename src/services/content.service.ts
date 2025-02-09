import { z } from "zod"
import { UserIdType } from "../utils/types"
import Content from "../schemas/content";

const addContentSchema = z.object({
    title: z.string(),
    category: z.enum(["image", "video", "audio", "article"]),
    link: z.string().url(),
    tags: z.array(z.string()).optional()
});

export const addContent = async (content: z.infer<typeof addContentSchema>, userId: UserIdType) => {
    try {
        const result = addContentSchema.safeParse(content);
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

const updateContentSchema = z.object({
    title: z.string().optional(),
    category: z.enum(["image", "video", "audio", "article"]).optional(),
    link: z.string().url().optional(),
    tags: z.array(z.string()).optional()
});

export const updateContent = async (content: z.infer<typeof updateContentSchema>, contentId: string, userId: UserIdType) => {
    try {
        const existingContent = await Content.findById(contentId);
        if(!existingContent) return { error: "Document does not exist" };
        if(existingContent.userId?.toString() !== userId) return { error: "Unauthorized" };

        const result = updateContentSchema.safeParse(content);
        if(!result.success) throw new Error(JSON.stringify(result.error.format()));

        const { title, category, link, tags } = result.data;
        const updatedContent: z.infer<typeof updateContentSchema> = {};
        if(title) updatedContent.title = title;
        if(category) updatedContent.category = category;
        if(link) updatedContent.link = link;
        if(tags) updatedContent.tags = tags;

        const snapshot = await Content.findByIdAndUpdate(contentId, { $set: updatedContent }, { new: true });
        return {
            success: true,
            updatedContent: snapshot
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