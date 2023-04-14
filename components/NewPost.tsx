"use client";
import {createNewPost, createNewSections} from "@/lib/api";
import React, {useState} from "react";
import Modal from "react-modal";
import Button from "./UI/Button";
import Input from "./UI/Input";
import {Post, Section} from ".prisma/client";
import {BsPlus} from "react-icons/bs";

Modal.setAppElement(`#modal`);



export const NewPost = () => {


    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [img, setImg] = useState<File>();
    const [imgUrl, setImgUrl] = useState<string | undefined>();
    const [sections, setSections] = useState<Section[]>([{id: "", postId: "", subTitle: "", paragraph: ""}]);

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
                const newPost = await createNewPost(name, category, img);
                const filteredSections = sections.filter((obj) => {
                    return obj.subTitle.trim() !== "";
                });
                await createNewSections(newPost.data.id, filteredSections);
                closeModal();
            } catch (error) {
                console.error(error)
            }
        }
    };

    const handleAddSection = () => {
        const lastSection = sections[sections.length - 1];
        if (!lastSection || (lastSection.subTitle.trim() !== "" && lastSection.paragraph.trim() !== "")) {
            const newSection: Section = {id: "", postId: "", subTitle: "", paragraph: ""};
            setSections([...sections, newSection]);
        }
    }


    return (
        <div className=" transition-all ease-in-out duration-200 h-full">
            <Button className={'!mr-0 !mt-0'} onClick={() => openModal()}>Add +</Button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-full w-screen"
                className="md:w-1/2 w-[80vw] md:max-w-[1170px] max-w-[350px] rounded-xl p-8 bg-[#F2F2F2] !z-[1]"
            >
                <div className="text-4xl mb-6">New Post</div>
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
                    <div className={'text-xl !mt-12'}>Sections</div>


                    <Button className={'!rounded-small !p-4'} intent={"secondary"} onClick={() => {
                        handleAddSection()
                    }}>Add</Button>

                    <Input className={'!p-1'} type={"file"} value={imgUrl}
                           onChange={handleFileChange}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Modal>
        </div>
    )
        ;
};