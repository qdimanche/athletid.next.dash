'use client'
import Card from "./UI/Card";
import {FC} from "react";
import {Post} from ".prisma/client";
import Button from "@/components/UI/Button";
import {useRouter} from "next/navigation";
import {deletePost} from "@/lib/api";
import {FiEdit2} from "react-icons/fi";
import {AiOutlineDelete} from "react-icons/ai";

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
        <Card className={'bg-white px-6'}>
            <div className="flex space-x-4 justify-between items-center ">
                <span className="text-gray-600 !text-lg">{post.name}</span>
                <div className={'space-x-4'}>
                    <Button className={'px-3 md:!px-4'} intent={"primary"} onClick={() => {
                        router.replace(`/edit/post/${post.id}`)
                    }}>{<FiEdit2 size={16} color={"white"}/>}</Button>
                    <Button className={'px-3 md:!px-4'} intent={"secondary"} onClick={async (): Promise<void> => {
                        await deleteHandleSubmit()
                    }}>{<AiOutlineDelete color={'black'} size={16}/>}</Button>
                </div>
            </div>
        </Card>
    );
};

export default PostCard;