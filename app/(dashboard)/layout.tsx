import React, {ReactNode} from "react";
import '@/styles/global.css';
import Navbar from "@/components/Navbar/Navbar";

function DashboardRootLayout({children}: { children : ReactNode }) {

    return (
        <html lang={"en"}>
        <head/>
        <body>
        <div className={"relative max-w-[350px] md:max-w-[1170px] mx-auto px-4 py-xl md:py-2xl h-full"}>
            <Navbar/>
            {children}
        </div>
        </body>
        </html>
    );
}

export default DashboardRootLayout;
