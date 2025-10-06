
'use client';
import SidebarCatalogMenu from "./SidebarCatalogMenu";
import SidebarInfoMenu from "./SidebarInfoMenu";
import SidebarStickyHelp from "./SidebarStickyHelp";

const Sidebar = () => {

    return ( 
        <div className="max-w-[25%] w-full hidden lg:block space-y-7.5 flex-col">
            <SidebarCatalogMenu />
            <SidebarInfoMenu />
            <SidebarStickyHelp />
        </div>
    )
};

export default Sidebar;