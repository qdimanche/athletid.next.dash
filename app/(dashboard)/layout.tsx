import React, {ReactNode} from "react";
import '@/styles/global.css';
import Navbar from "@/components/Navbar/Navbar";
import {cookies} from "next/headers";
import {User} from "@prisma/client";
import {db} from "@/lib/db";


const getUser = async () => {

    try {
        const nextCookies = cookies();
        const userId = nextCookies.get('authorId')?.value

        const user: User | null = await db.user.findFirst({
            where: {
                id: userId,
            },
        });

        return user
    } catch (e) {
        console.log(e)
    }

};

async function DashboardRootLayout({children}: { children: ReactNode }) {

    const user = await getUser();

    return (
        <html lang={"en"}>
        <head/>
        <body>
        <div className={"relative max-w-[350px] md:max-w-[1170px] mx-auto px-4 py-xl md:py-2xl h-full"}>
            <Navbar user={user}/>
            {children}
        </div>
        </body>
        </html>
    );
}

export default DashboardRootLayout;
