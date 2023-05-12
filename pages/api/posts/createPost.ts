import {db} from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";
import {getCookie} from "cookies-next";
import {Post} from ".prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const author =   getCookie('author_id', { req, res });

        const newPost: Post  = await db.post.create({
            data: {
                id: "",
                name: req.body.name,
                categoryId: req.body.categoryId,
                img: req.body.img,
                slug: req.body.slug,
                status : req.body.status,
                authorId: JSON.parse(JSON.stringify(author)),
            },
        });

        res.json({data: newPost});
    } catch (error) {
        console.log("Error:", error); // Afficher l'erreur en cas de problème
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
