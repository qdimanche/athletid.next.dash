import PostCard from "@/components/PostCard";
import { getUserFromCookie } from "@/lib/auth";
import { db } from "@/lib/db";
import { cookies } from "next/headers";

const getData = async (id:any) => {
    const user = await getUserFromCookie(cookies());
    const post = await db.post.findFirst({
        where: { id, authorId: user?.id },
    });

    return post;
};

export default async function ProjectPage({ params } : {params: {id: string}}) {
    const post = await getData(params.id);

    return (
        <div className="h-full overflow-y-auto pr-6 w-1/1">
            {/* @ts-expect-error Server Component */}
            <PostCard title={post.name} />
        </div>
    );
}