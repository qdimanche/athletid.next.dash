import {validateJWT} from "@/lib/auth";
import {db} from "@/lib/db";
import {NextApiRequest, NextApiResponse} from "next";
import {parseCookies} from "nookies";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cookies = parseCookies({req});
        const jwt = cookies["jwt_cookie_id"];
        const user = await validateJWT(jwt);

        await db.post.create({
            data: {
                name: req.body.name,
                category: req.body.category,
                img: req.body.img,
                slug: req.body.slug,
                authorId: user.id,
                sections: {
                    createMany: {
                        data: req.body.sections ? req.body.sections : [{subTitle: '', paragraph: ''}]
                    }
                }
            },
        });

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error); // Afficher l'erreur en cas de problème
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}