import React from 'react';
import {delay} from "@/lib/async";
import {db} from "@/lib/db";
import PostCard from "@/components/PostCard";

const getData = async () => {
    await delay(2000)

    const posts = await db.post.findMany({})
    return {posts}
}

async function Page() {

    const {posts} = await getData()


    return (
        <div>
            {posts.map(post => {

                const { createdAt: createdDate, updatedAt: updatedDate, ...rest } = post;
                const createdAt = createdDate.toISOString();
                const updatedAt = updatedDate.toISOString();

                return (
                    <>
                        <PostCard key={post.id} post={{...rest, createdAt, updatedAt}}/>
                    </>
                )
            })}
        </div>
    );
};

export default Page;