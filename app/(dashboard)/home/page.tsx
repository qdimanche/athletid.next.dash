import React, {Suspense} from 'react';
import Greetings from "@/components/Greetings";
import GreetingsSkeleton from "@/components/GreetingsSkeleton";
import PostCard from "@/components/PostCard";
import {NewPost} from "@/components/NewPost";

const Page = () => {
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
                <div className="mt-6 flex-2 grow w-full flex">
                    <div className="w-full">
                        {/* @ts-expect-error Server Component */}
                        <PostCard title={"aloha"}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;