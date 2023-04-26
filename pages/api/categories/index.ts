import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";
import {Post} from ".prisma/client";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    interface NewArray {
        category: string;
    }

    const posts: Post[] = await db.post.findMany();

    const categories: string[] = posts.map((obj: Post) => obj.category);

    if (categories) {
        res.json(categories)
    } else {
        res.status(401);
        res.json({error: "No categories"});
    }
}