import { db } from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";
import slugify from "slugify";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await db.post.update({
            where: {
                id: req.body.id
            },
            data: {
                name: req.body.name,
                category: req.body.category,
                img: req.body.imageUrl ? req.body.imageUrl : req.body.img ,
                slug: slugify(req.body.name),
                status: req.body.status
            },
        });

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
