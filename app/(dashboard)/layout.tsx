import React from "react";
import '@/styles/global.css';
import {Props} from "@/types/Props";
import Navbar from "@/components/Navbar/Navbar";

function DashboardRootLayout({children}: Props) {

    return (
        <html lang={"en"}>
        <head/>
        <body>
        <div className={"relative max-w-[350px] md:max-w-[1170px] mx-auto px-4 pt-xl md:pt-2xl h-full"}>
            <Navbar/>
            {children}
        </div>
        </body>
        </html>
    );
}

export default DashboardRootLayout;
