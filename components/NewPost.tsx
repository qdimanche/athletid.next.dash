"use client";
import {createNewPost} from "@/lib/api";
import React, {useState} from "react";
import Modal from "react-modal";
import Button from "./UI/Button";
import Input from "./UI/Input";

Modal.setAppElement(`#modal`);

export const NewPost = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const jwt =
        await createNewPost(name, category, description);
        closeModal();
    };

    return (
        <div className="px-6 py-8 hover:scale-105 transition-all ease-in-out duration-200 flex justify-center items-center ">
            <Button onClick={() => openModal()}>+ New Post</Button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                overlayClassName="bg-[rgba(0,0,0,.4)] flex justify-center items-center absolute top-0 left-0 h-screen w-screen"
                className="w-1/4 bg-white rounded-xl p-8"
            >
                <h1 className="text-3xl mb-6">New Post</h1>
                <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
                    <Input
                        placeholder="Name"
                        value={name}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    />
                    <Input
                        placeholder="Category"
                        value={category}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)}
                    />
                    <Input
                        placeholder="Description"
                        value={description}
                        onChange={(e:React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Modal>
        </div>
    );
};