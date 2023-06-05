import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";
import NextCors from 'nextjs-cors';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    await NextCors(req, res, {
        // Options
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
        origin: '*',
        optionsSuccessStatus: 200,
    });

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

            if (posts){
                res.status(200).json({posts})
            }
        } catch (e) {
            res.status(500).end();
        }
    }

}