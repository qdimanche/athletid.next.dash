import React from "react";
import GlassPane from "@/components/UI/GlassPane";
import '@/styles/global.css';
import {Props} from "@/types/Props";

function DashboardRootLayout({children}: Props) {

    return (
        <html lang={"en"}>
        <head/>
        <body className={"h-screen w-screen rainbow-mesh p-6"}>
        <GlassPane
            className={"w-full h-full flex items-center justify-center"}>
            {children}
        </GlassPane>
        <div id={"modal"}></div>
        </body>
        </html>
    );
}

export default DashboardRootLayout;
