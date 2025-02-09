import { z } from "zod"
import { UserIdType } from "../utils/types"

const contentSchema = z.object({
    type: z.enum(["image", "video", "audio", "article"]),
    link: z.string().url(),
    title: z.string(),
    tags: z.array(z.string()).optional()
})

export const addContent = async (content: z.infer<typeof contentSchema>, userId: UserIdType) => {
    
}