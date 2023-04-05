import {getUserFromCookie} from "@/lib/auth";
import {db} from "@/lib/db";
import {cookies} from "next/headers";
import Button from "./UI/Button";
import Card from "./UI/Card";
import {PostCardProps} from "@/types/PostCardProps";

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
const PostCard = async ({title}: PostCardProps) => {

    return (
        <Card>
            <div className="flex justify-between items-center">
                <div>
                    <span className="text-3xl text-gray-600">{title}</span>
                </div>
                <div>
                    <Button intent="text" className="text-violet-600">
                        + Create New
                    </Button>
                </div>
            </div>
        </Card>
    );
};

export default PostCard;