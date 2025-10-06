
'use client';
import SidebarCatalogMenu from "./SidebarCatalogMenu";
import SidebarInfoMenu from "./SidebarInfoMenu";
import SidebarStickyHelp from "./SidebarStickyHelp";

const Sidebar = () => {

    return ( 
        <div className="w-[25%] hidden lg:block space-y-7.5 flex flex-col">
            <SidebarCatalogMenu />
            <SidebarInfoMenu />
            <SidebarStickyHelp />
        </div>
    )
};

export default Sidebar;