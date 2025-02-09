import Content from "../schemas/content.schema";
import Link from "../schemas/link.schema"
import User from "../schemas/user.schema";
import { random } from "../utils/random";
import { UserIdType } from "../utils/types"

export const toggleSharing = async (share: boolean, userId: UserIdType) => {
    try {
        if(share) {
            const existingLink = await Link.findOne({ userId });
            if(existingLink) return { success: true, hash: existingLink.hash };

            const hash = random(10);
            await Link.create({ hash, userId });
            return { success: true, hash };
        } else {
            await Link.deleteOne({ userId });
            return { 
                success: true, 
                message: "Deleted shareable link" 
            }
        }
    } catch (error) {
        return {
            success: false,
            message: "Internal server error"
        }
    }
}

export const shareContentPublic = async (link: string) => {
    try {
        const existingLink = await Link.findOne({ hash: link });
        if(!existingLink) return { error: "Link does not exist" };

        const user = await User.findOne({ _id: existingLink.userId });
        const content = await Content.find({ userId: existingLink.userId });

        if(!user) return { error: "User does not exist" };

        return {
            username: user?.username,
            content
        }
    } catch (error) {
        return {
            success: false,
            message: "Internal server error"
        }
    }
}