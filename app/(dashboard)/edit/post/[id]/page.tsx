import {db} from "@/lib/db";
import EditPostForm from "@/components/EditPostForm";
import {Post} from ".prisma/client";

const getData = async (id: any) => {
    const post: Post | null = await db.post.findFirst({
        where: {id},
    });

    return post;
};

export default async function ProjectPage({params}: { params: { id: string } }) {
    const post = await getData(params.id);

    return (
        <div className="h-full overflow-y-auto pr-6 w-1/1">
            {post &&
				<EditPostForm post={post}/>
            }
        </div>
    )
}