import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@/lib/db";

export default async function signin(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const sections = await db.section.findMany({
        where: {
            postId: req.body.postId,
        },
    });

    if (sections) {
        res.json({data: sections})
    } else {
        res.status(401);
        res.json({error: "Invalid postId"});
    }
}