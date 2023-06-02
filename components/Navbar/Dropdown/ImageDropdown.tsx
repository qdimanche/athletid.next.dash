import React from 'react';
import Image from "next/image"
import {delay} from "@/lib/async";
import {getUserFromCookie} from "@/lib/auth";
import {cookies} from "next/headers";


const getData = async () => {
    await delay(4000)
    return await getUserFromCookie(cookies())
}

const ImageDropdown = () => {

    const user= getData();
    console.log(user)

    return (
        <Image alt={""} sizes={"20vw"} fill className={'object-cover'}
               src={"/assets/images/avatar.png"}/>
    );
};

export default ImageDropdown;