'use client'
import React, {useEffect, useState} from 'react';
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import {Category, Section} from ".prisma/client";
import {createNewPost, createNewSections} from "@/lib/api";
import Card from "@/components/UI/Card";
import {useRouter} from "next/navigation";
import TextArea from "@/components/UI/TextArea";
import axios from "axios";
import Loading from "@/app/(dashboard)/posts/loading";

const Page = () => {

    const router = useRouter()
    const [name, setName] = useState("");
    const [status, setStatus] = useState("");
    const [img, setImg] = useState<File>();
    const [isLoad, setIsLoad] = useState(false);
    const [categoryId, setCategoryId] = useState<string>();
    const [imgUrl, setImgUrl] = useState<string | undefined>();
    const [sections, setSections] = useState<Section[]>([{id: "", postId: "", subTitle: "", paragraph: "", order: 1}]);
    const [categories, setCategories] = useState<Category[]>([]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImg(files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (img) {
            try {
                const newPost = await createNewPost(name, categoryId, img, status);
                const filteredSections = sections.filter((obj) => {
                    return obj.subTitle.trim() !== "";
                });

                // Sort the sections by order
                const sortedSections = filteredSections.sort((a, b) => a.order - b.order);

                await createNewSections(newPost.data.id, sortedSections);

                router.replace("/posts");
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleAddSection = () => {
        const lastSection = sections[sections.length - 1];
        const newOrder = lastSection ? lastSection.order + 1 : 1;

        if (!lastSection || (lastSection.subTitle.trim() !== "" && lastSection.paragraph.trim() !== "")) {
            const newSection: Section = {
                id: "",
                postId: "",
                subTitle: "",
                paragraph: "",
                order: newOrder
            };

            setSections(prevSections => [...prevSections, newSection]);
        }
    };

    const getCategories = async () => {
        try {
            const response = await axios.get("/api/categories");
            const data = response.data;
            if (data.length > 0) {
                setCategories(data);
                setCategoryId(data[0].id);
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getCategories();
    }, [])

    useEffect(() => {
        if (categories) {
            setIsLoad(true)
        }
    }, [categories]);

    return (
        <div
            className="h-full overflow-y-auto pr-6 w-1/1"
        >
            <Card>
                <div className="text-4xl mb-6">New Post</div>
                {isLoad ?
                    <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                        <Input
                            placeholder="Name"
                            className={'bg-white'}
                            value={name}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        />
                        {
                            isLoad ?
                                <select
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryId(e.target.value)}
                                    value={categoryId}
                                    className={"p-4 text-lg rounded-small w-full !border-0"}
                                >
                                    {categories.map((category) => {
                                        return (
                                            <option key={category.id} value={category.id}>{category.name}
                                            </option>
                                        )
                                    })}
                                </select> :
                                <></>
                        }


                        <select
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value)}
                            value={status}
                            className={"p-4 text-lg rounded-small w-full !border-0"}
                        >
                            <option value={"DRAFT"}>DRAFT
                            </option>
                            <option value="PUBLISHED">PUBLISHED
                            </option>
                        </select>


                        <div className={'text-xl !mt-12'}>Sections</div>

                        {sections.map((value, index) => {
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
                                    <TextArea
                                        placeholder="Paragraph"
                                        value={sections[index].paragraph || ""}
                                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                                            const newSections = [...sections];
                                            newSections[index].paragraph = e.target.value;
                                            setSections(newSections);
                                        }}
                                    />
                                </div>)
                        })}


                        <Button className={'!rounded-small !p-4'} intent={"secondary"} onClick={() => {
                            handleAddSection()
                        }}>Add</Button>

                        <Input className={'!p-1'} type={"file"} value={imgUrl}
                               onChange={handleFileChange}
                        />
                        <Button type="submit">Create</Button>
                    </form> : <Loading></Loading>
                }
            </Card>

        </div>
    );
};

export default Page;