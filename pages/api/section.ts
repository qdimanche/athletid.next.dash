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
                subTitle: req.body.subTitle,
                paragraph: req.body.paragraph,
                postId: req.body.postId
            },
        });

        res.json({data: {message: "ok"}});
    } catch (error) {
        console.log("Error:", error); // Afficher l'erreur en cas de problème
        res.status(500).json({data: {message: "Internal Server Error"}});
    }
}
