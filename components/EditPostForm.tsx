'use client'
import React, {FC, useCallback, useState} from 'react';
import {Post} from ".prisma/client";
import {useRouter} from "next/navigation";
import {editPost} from "@/lib/api";
import * as console from "console";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Link from "next/link";
import Button from "@/components/UI/Button";

const EditPostForm: FC<{ post: Post }> = ({post}) => {


    const [formState, setFormState] = useState({...post})
    const [error, setError] = useState("")

    const router = useRouter();

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault()

        try {
            await editPost(formState)
            router.replace("/posts")
        } catch (e) {
            setError("Missing properties")
        } finally {
            setFormState({...formState})
        }
    }, [
        formState.name,
        formState.description,
        formState.category,
    ])

    return (
        <Card>
            <div className="w-full">
                <div className="text-center">
                    <h2 className="text-3xl mb-2">Edit post</h2>
                    <p className="tex-lg text-black/25">Fill the informations</p>
                </div>
                <form onSubmit={handleSubmit} className="py-10 w-full">
                    <div className="flex flex-col space-y-6 mb-8 justify-between">
                        <div className="pr-2">
                            <div className="text-lg mb-4 ml-2 text-black/50">
                                Name
                            </div>
                            <Input
                                required
                                placeholder="First Name"
                                value={formState.name}
                                className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormState((s) => ({ ...s, name: e.target.value }))
                                }
                            />
                        </div>
                        <div className="pl-2">
                            <div className="text-lg mb-4 ml-2 text-black/50">Category</div>
                            <Input
                                required
                                placeholder="Last Name"
                                value={formState.category}
                                className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormState((s) => ({ ...s, category: e.target.value }))
                                }
                            />
                        </div>
                        <div className="pl-2">
                            <div className="text-lg mb-4 ml-2 text-black/50">Description</div>
                            <Input
                                required
                                placeholder="Last Name"
                                value={formState.description || undefined}
                                className="border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    setFormState((s) => ({ ...s, description: e.target.value }))
                                }
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                        </div>
                        <div>
                            <Button type="submit" intent="primary">
                                Edit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </Card>
    );
};

export default EditPostForm;