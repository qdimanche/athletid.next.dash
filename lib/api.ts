import {FetcherProps} from "@/types/FetcherProps";


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
        return json
    }

};


export const register = (user: Object) => {
    return fetcher({
        url: "/api/register",
        method: "POST",
        body: JSON.parse(JSON.stringify(user)),
    })
}

export const signin = (user: Object) => {
    return fetcher({
        url: "/api/signin",
        method: "POST",
        body: JSON.parse(JSON.stringify(user)),
    })
}




export const createNewPost = (name:String, category:String, description:String) => {

    const requestBody: object = {
        name: name,
        category: category,
        description: description,
    };

    return fetcher({
        url: "/api/post",
        method: "POST",
        body: JSON.parse(JSON.stringify(requestBody)),
    });
};