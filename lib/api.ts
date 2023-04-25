import {FetcherProps} from "@/types/FetcherProps";
import slugify from "slugify";
import axios from "axios";
import {Post, Section} from ".prisma/client";


const fetcher = async ({url, method, body, json = true}: FetcherProps) => {
    const res = await fetch(url, {
        method,
        body: JSON.stringify(body),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        throw new Error("Api Error")
    }

    if (json) {
        return res.json()
    }

};

export const signin = async (user: Object) => {

    await fetcher({
        url: "/api/signin",
        method: "POST",
        body: user,
    })
}

export const logout = () => {

    return fetcher({
        url: "/api/logout",
        method: "POST",
        body: JSON.parse(JSON.stringify('user')),
    });
};


export const createNewPost = async (name: string, category: string, img: File, status: string) => {

    // Upload the image to Cloudinary and get the URL
    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ml_default");

    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    };

    const res = await axios.post("https://api.cloudinary.com/v1_1/dxplbf0t0/image/upload", formData, config);
    const imageUrl = res.data.secure_url;

    return await fetcher({
        url: "/api/post",
        method: "POST",
        body: {
            name: name,
            category: category,
            img: imageUrl,
            status: status,
            slug: slugify(name),
        },
    })
}

export const createNewSections = async (postId: string, sections: Section[]) => {

    try {
        return Promise.all(sections.map(section => {
            return fetcher({
                url: "/api/section",
                method: "POST",
                body: {
                    postId: postId,
                    subTitle: section.subTitle,
                    paragraph: section.paragraph,
                },
            });
        }))

    } catch (e) {
        console.log(e)
    }
}

export const listSections = (postId: string) => {

    return fetcher({
        url: "/api/listSections",
        method: "POST",
        body: {postId},
    });
};

export const editPost = async (post: {
    createdAt: string;
    img: string | null;
    name: string;
    id: string;
    category: string;
    authorId: string;
    slug: string;
    status: string;
    updatedAt: string
}, img: any) => {

    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    };

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ml_default");

    const res = await axios.post("https://api.cloudinary.com/v1_1/dxplbf0t0/image/upload", formData, config);
    const imageUrl = res.data.secure_url;

    const postWithNewImage = {...post, imageUrl}

    return fetcher({
        url: "/api/editPost",
        method: "POST",
        body: JSON.parse(JSON.stringify(postWithNewImage)),
    });
};

export const editSection = (section: Object) => {

    return fetcher({
        url: "/api/editSection",
        method: "POST",
        body: JSON.parse(JSON.stringify(section)),
    });
};


export const deletePost = (postId: string) => {

    return fetcher({
        url: "/api/deletePost",
        method: "POST",
        body: {postId},
    });
};