import {Post} from ".prisma/client";

export interface PostProps {
    post: Omit<Post, "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    };
}