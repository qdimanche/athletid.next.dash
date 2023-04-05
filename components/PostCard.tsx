import {getUserFromCookie} from "@/lib/auth";
import {db} from "@/lib/db";
import {cookies} from "next/headers";
import Card from "./UI/Card";
import {FC} from "react";
import {Post} from ".prisma/client";

const getData = async () => {
    const user = await getUserFromCookie(cookies());
    const posts = await db.post.findMany({
        where: {
            authorId: user?.id,
        },
        take: 5,
    });

    return posts;
};
const PostCard : FC<{post: Post}> = ({post}) => {

    return (
        <Card>
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-3xl text-gray-600">{post.name}</span>
                </div>
            </div>
        </Card>
    );
};

export default PostCard;