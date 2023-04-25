import { db } from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";
import slugify from "slugify";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Créer un nouveau post avec l'utilisateur en tant qu'auteur
        await db.post.update({
            where: {
                id: req.body.id
            },
            data: {
                name: req.body.name,
                category: req.body.category,
                img: req.body.imageUrl,
                slug: slugify(req.body.name),
                status: req.body.status
            },
        });

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error); // Afficher l'erreur en cas de problème
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
