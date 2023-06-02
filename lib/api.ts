import slugify from "slugify";
import axios from "axios";
import {Section} from ".prisma/client";


const fetcher = async ({url, method, body, json = true}: {
    url: string,
    method: string,
    body: object,
    json?: boolean
}) => {
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

    try {
        await fetcher({
            url: "/api/authentification/signin",
            method: "POST",
            body: user,
        })
    } catch (error) {
        console.log(error)
    }
}

export const logout = () => {

    return fetcher({
        url: "/api/authentification/logout",
        method: "POST",
        body: JSON.parse(JSON.stringify('user')),
    });
};


export const editUser = async (user: {
    firstName: string | null;
    lastName: string | null;
    createdAt: string;
    password: string;
    img: string | null;
    role: string;
    id: string;
    email: string;
    updatedAt: string
}, img: any) => {

    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    };

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ml_default");

    if (img) {
        const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config)
        let imageUrl = res.data.secure_url

        const postWithNewImage = {...user, imageUrl}

        return fetcher({
            url: "/api/users/editUser",
            method: "POST",
            body: JSON.parse(JSON.stringify(postWithNewImage)),
        });
    }

    return fetcher({
        url: "/api/users/editUser",
        method: "POST",
        body: JSON.parse(JSON.stringify(user)),
    });

};


export const createNewPost = async (name: string, categoryId: string | undefined, img: File, status: string, authorId: string| undefined) => {

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ml_default");

    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    };

    const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config);
    const imageUrl = res.data.secure_url;

    return await fetcher({
        url: "/api/posts/createPost",
        method: "POST",
        body: {
            name: name,
            categoryId: categoryId,
            img: imageUrl,
            status: status,
            slug: slugify(name),
            authorId: authorId
        },
    })
}

export const editPost = async (post: {
    createdAt: string;
    img: string | null;
    name: string;
    id: string;
    authorId: string;
    slug: string;
    categoryId: string;
    status: string;
    updatedAt: string
}, img: any) => {

    const config = {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
    };

    const formData = new FormData();
    formData.append("file", img);
    formData.append("upload_preset", "ml_default");

    if (img) {
        const res = await axios.post("https://api.cloudinary.com/v1_1/ddjdkkktr/image/upload", formData, config)
        let imageUrl = res.data.secure_url

        const postWithNewImage = {...post, imageUrl}

        return fetcher({
            url: "/api/posts/editPost",
            method: "POST",
            body: JSON.parse(JSON.stringify(postWithNewImage)),
        });
    }

    return fetcher({
        url: "/api/posts/editPost",
        method: "POST",
        body: JSON.parse(JSON.stringify(post)),
    });

};

export const createNewCategory = async (name: string) => {

    return await fetcher({
        url: "/api/categories/createCategory",
        method: "POST",
        body: {
            name: name,
        },
    })
}

export const deleteCategory = (categoryId: string) => {

    return fetcher({
        url: "/api/categories/deleteCategory",
        method: "POST",
        body: {categoryId},
    });
};


export const editCategory = async (category: {
    name: string;
}) => {

    return fetcher({
        url: "/api/categories/editCategory",
        method: "POST",
        body: JSON.parse(JSON.stringify(category)),
    });
};

export const createNewSections = async (postId: string, sections: Section[]) => {

    try {
        return Promise.all(sections.map(section => {
            return fetcher({
                url: "/api/sections/createSection",
                method: "POST",
                body: {
                    postId: postId,
                    subTitle: section.subTitle,
                    paragraph: section.paragraph,
                    order: section.order
                },
            });
        }))

    } catch (e) {
        console.log(e)
    }
}

export const listSections = (postId: string) => {

    return fetcher({
        url: "/api/sections/[postId]",
        method: "POST",
        body: {postId},
    });
};


export const editSection = (section: Object) => {

    return fetcher({
        url: "/api/sections/editSection",
        method: "POST",
        body: section,
    });
};


export const deletePost = (postId: string) => {

    return fetcher({
        url: "/api/posts/deletePost",
        method: "POST",
        body: {postId},
    });
};

