import React, {Suspense} from 'react';
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import {NewPost} from "@/components/NewPost";
import PostCard from "@/components/PostCard";
import {delay} from "@/lib/async";
import {getUserFromCookie} from "@/lib/auth";
import {cookies} from "next/headers";
import {db} from "@/lib/db";

const getData = async () => {
    await delay(2000)
    const user = await getUserFromCookie(cookies())

    const posts = await db.post.findMany({
        where: {
            authorId: user?.id,
        }
    })

    return {posts}
}

async function Page() {

    const {posts} = await getData()

    return (
        <div id={"modal"} className="h-full overflow-y-auto pr-6 w-1/1">
            <div className=" h-full  items-stretch justify-center min-h-[content]">
                <div className="flex-1 grow flex">
                    <Suspense fallback={<GreetingsSkeleton/>}>
                        {/* @ts-expect-error Server Component */}
                        <Greetings/>
                    </Suspense>
                </div>
                <div className="flex flex-2 grow items-center flex-wrap mt-3 -m-3 ">
                    <div className="w-1/3 p-3">
                        <NewPost/>
                    </div>
                </div>
                <div className="mt-6 flex flex-col space-y-6">
                    {posts.map(post => {
                        return (
                            <div key={post.id}>
                                <PostCard post={post}/>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default Page;