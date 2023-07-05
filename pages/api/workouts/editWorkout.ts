import { db } from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";
import slugify from "slugify";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await db.workout.update({
            where: {
                id: req.body.id
            },
            data: {
                name: req.body.name,
                workoutCategoryId: req.body.workoutCategoryId,
                img: req.body.imageUrl ? req.body.imageUrl : req.body.img ,
                slug: slugify(req.body.name.substring(0, req.body.name.length - 1)),
                status: req.body.status,
                authorId:  req.body.authorId
            },
        });

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
