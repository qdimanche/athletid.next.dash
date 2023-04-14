'use client'
import React, {FC, useCallback, useEffect, useState} from 'react';
import {Section} from ".prisma/client";
import {useRouter} from "next/navigation";
import {editPost, editSection, listSections} from "@/lib/api";
import Card from "@/components/UI/Card";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Image from 'next/image'
import {PostProps} from "@/types/PostProps";


const EditPostForm: FC<PostProps> = ({post}) => {


    const [sections, setSections] = useState<Section[]>([]);
    const [formState, setFormState] = useState({...post})
    const [img, setImg] = useState<File>();

    const getSections = async () => {
        try {
            return await listSections(post.id)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getSections().then((sections) => {
            setSections(sections.data)
        })
    }, [post.id])

    console.log(sections)


    const router = useRouter();

    const handleSubmit = useCallback(async (e: any) => {
        e.preventDefault()

        try {
            await editPost(formState)
            for (const section of sections) {
                await editSection(section);
            }
            router.replace("/posts")
        } catch (e) {
            console.log(e)
        } finally {
            setFormState({...formState})
        }
    }, [
        {...formState}
    ])


    return (
        <Card>
            <div className="text-4xl mb-6">Edit Post</div>
            <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                <Input
                    placeholder="Name"
                    className={'bg-white'}
                    value={formState.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormState((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                        }))
                    }
                />
                <Input
                    placeholder="Category"
                    value={formState.category}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFormState((prevState) => ({
                            ...prevState,
                            category: e.target.value,
                        }))
                    }
                />
                <div className={'text-xl !mt-12'}>Sections</div>

                {sections && sections.map((value, index) => {
                    return (
                        <div key={index}>

                            <Input
                                placeholder="Subtitle"
                                value={sections[index].subTitle || ""}
                                className={'mb-6'}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const newSections = [...sections];
                                    newSections[index].subTitle = e.target.value;
                                    setSections(newSections);
                                }}
                            />
                            <Input
                                placeholder="Paragraph"
                                value={sections[index].paragraph || ""}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const newSections = [...sections];
                                    newSections[index].paragraph = e.target.value;
                                    setSections(newSections);
                                }}
                            />
                        </div>)
                })}

                <Image alt={""} sizes={"50vw"} width={400} height={400} src={formState.img ?? '/placeholder.png'}/>
                <Button type="submit">Update</Button>
            </form>
        </Card>
    );
};

export default EditPostForm;