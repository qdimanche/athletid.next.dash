import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";
import {Post} from ".prisma/client";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const {categoryName} = req.query

    const posts: Post[] = await db.post.findMany();
    const categories: string[] = posts.map((obj: Post) => obj.category);

    const category = categories.find(categoryName => categoryName)

    if (category) {
        res.json(category)
    } else {
        res.status(401);
        res.json({error: "Invalid postId"});
    }
}