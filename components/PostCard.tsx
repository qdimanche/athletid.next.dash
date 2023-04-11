'use client'
import Card from "./UI/Card";
import {FC} from "react";
import {Post} from ".prisma/client";
import Button from "@/components/UI/Button";
import {useRouter} from "next/navigation";
import {deletePost} from "@/lib/api";

interface PostCardProps {
    post: Omit<Post, "createdAt" | "updatedAt"> & {
        createdAt: string;
        updatedAt: string;
    };
}


const PostCard: FC<PostCardProps> = ({post}) => {

    const router = useRouter()

    async function deleteHandleSubmit() {

        try {
            await deletePost(post.id)
            router.refresh()
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Card>
            <div className="flex space-x-4 justify-between items-center">
                <span className="text-3xl text-gray-600">{post.name}</span>
                <Button intent={"primary"} onClick={() => {
                    router.replace(`/edit/post/${post.id}`)
                }}>Edit</Button>
                <Button intent={"secondary"} onClick={async (): Promise<void> => {
                    await deleteHandleSubmit()
                }}>Delete</Button>
            </div>
        </Card>
    );
};

export default PostCard;