import React from 'react';
import {delay} from "@/lib/async";
import {db} from "@/lib/db";
import PostCard from "@/components/PostCard";
import {NewPost} from "@/components/NewPost";

const getData = async () => {
    await delay(2000)

    const posts = await db.post.findMany({})
    return {posts}
}

async function Page() {

    const {posts} = await getData()

    return (
        <div>
            <div className={'flex justify-between items-center mb-medium md:mb-mediumXl'}>
                <h1 className={''}>All posts</h1>
                <NewPost/>
            </div>
            <div className={'space-y-4'}>
                {posts.map(post => {

                    const { createdAt: createdDate, updatedAt: updatedDate, ...rest } = post;
                    const createdAt = createdDate.toISOString();
                    const updatedAt = updatedDate.toISOString();

                    return (
                            <PostCard key={post.id} post={{...rest, createdAt, updatedAt}}/>
                    )
                })}
            </div>
        </div>
    ); 
};

export default Page;