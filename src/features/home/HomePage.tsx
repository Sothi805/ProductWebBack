import React from "react";


import Header from "@/components/layouts/Header";
import SideBar from "@/components/layouts/Sidebar";
import { Outlet } from "react-router-dom";


export default function HomePage() {
    const [collapse, setCollapse] = React.useState(false);
    const [hideDrawer, setHideDrawer] = React.useState(false);

    const onCollapse = () => {
        setCollapse(!collapse);
    }

    return (
        <div className="w-full h-full flex relative">
            <SideBar collapse={collapse} hidden={hideDrawer} />
            <div className="grow w-full h-full overflow-auto flex flex-col md:bg-white">
                <Header setCollapse={onCollapse} />
                {/* every pages will go here */}
                <div className="grow overflow-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
