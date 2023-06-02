import {db} from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";
import {getCookie} from "cookies-next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const author = getCookie('author_id', {req, res});

        const newPost = await db.post.create({
            data: {
                name: req.body.name,
                categoryId: req.body.categoryId,
                img: req.body.img,
                slug: req.body.slug,
                status: req.body.status,
                authorId: req.body.authorId,
            },
        });

        res.json({data: newPost});
    } catch (error) {
        console.log("Error:", error); // Afficher l'erreur en cas de problème
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
