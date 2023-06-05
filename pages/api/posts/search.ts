import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === "GET") {
        try {
            const {q: query} = req.query;

            if (typeof query !== "string") {
                throw new Error("Invalid request");
            }

            const posts = await db.post.findMany({
                where: {
                    name: {
                        contains: query.toLowerCase(),
                    }
                }
            })

            res.status(200).json({posts})
        } catch (e) {
            res.status(500).end();
        }
    }

}