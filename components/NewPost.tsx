"use client";
import {createNewPost} from "@/lib/api";
import React, {useState} from "react";
import Modal from "react-modal";
import Button from "./UI/Button";
import Input from "./UI/Input";
import {Section} from ".prisma/client";

Modal.setAppElement(`#modal`);

export const NewPost = () => {



    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [img, setImg] = useState<File>();
    const [imgUrl, setImgUrl] = useState<string | undefined>();
    const [sections, setSections] = useState<Section[]>([{ id: "", postId: "", subTitle: "", paragraph: "" }]);


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImg(files[0]);
        }
    };

    console.log(sections)



    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (img) {
            await createNewPost(name, category, img, sections);
            closeModal();
        }
    };

    const handleAddSection = () => {
        const newSection: Section = { id: "", postId: "", subTitle: "", paragraph: "" };
        setSections([...sections, newSection]);
    }


    return (
        <div className=" hover:scale-105 transition-all ease-in-out duration-200 h-full">
            <Button onClick={() => openModal()}>+ New Post</Button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                className="w-1/2 rounded-xl p-8 bg-[#F2F2F2] !z-[900]"
            >
                <h1 className="text-3xl mb-6">New Post</h1>
                <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                    <Input
                        placeholder="Name"
                        className={'bg-white'}
                        value={name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Category"
                        value={category}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                    />
                    <h2>Sections</h2>
                    {sections.map((value, index) => {
                        return (
                            <div key={index} className={'bg-blue-600'}>
                                <Input
                                    placeholder="Subtitle"
                                    value={sections[index].subTitle || ""}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const newSections = [...sections];
                                        newSections[index] = {...newSections[index], subTitle: e.target.value};
                                        setSections(newSections);
                                    }}
                                />
                                <Input
                                    placeholder="Paragraph"
                                    value={sections[index].paragraph || ""}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        const newSections = [...sections];
                                        newSections[index] = {...newSections[index], paragraph: e.target.value};
                                        setSections(newSections);
                                    }}
                                />
                            </div>)
                    })}


                    <Button intent={"secondary"} onClick={() => {
                        handleAddSection()
                    }}/>

                    <Input type={"file"} value={imgUrl}
                           onChange={handleFileChange}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Modal>
        </div>
    )
        ;
};