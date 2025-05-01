import { useState } from "react";
import SideDrawer from "./SideDrawer";

 const Header=()=> {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false); 

  const tabs = ["Dashboard", "Advanced Query", "Events"];

  return (
    <div className="relative md:h-[82px] flex max-md:flex-col md:items-center justify-between gap-2 max-md:py-2 max-lg:px-4 lg:px-8 bg-white mb-0.5">
      
      {drawerOpen && (
        <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setDrawerOpen(false)}>
          <div
            className="absolute right-0 top-0 h-full w-80 bg-[#F2F2F7] p-8 space-y-4 overflow-y-auto animate-slide-in"
            onClick={(e) => e.stopPropagation()} 
          >
            <SideDrawer isMobile/>
            <button 
              className="absolute top-4 right-4 text-2xl text-black" 
              onClick={() => setDrawerOpen(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center space-x-3 md:space-x-4 lg:space-x-10 relative h-full">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="relative text-sm md:text-base font-semibold transition-colors h-full cursor-pointer"
          >
            <span
              className={`${
                activeTab === tab ? "text-[#11263C]" : "text-[#D0D1D2]"
              }`}
            >
              {tab}
            </span>

            {activeTab === tab && (
              <span className="absolute -bottom-0.5 left-0 right-0 h-1 w-[35px] mx-auto bg-[#11263C]"></span>
            )}
          </button>
        ))}
        <div className="h-10 w-0.5 bg-[#EEECFA] rounded-lg"></div>
        <div className="flex items-center justify-center size-4 md:size-8.5 hover:bg-[#D0D1D2]/25 rounded-md cursor-pointer">
          <img src="public/assets/search-icon.svg" alt="search" />
        </div>
      </div>

      <div className="flex items-center max-md:justify-end">
        <div className="flex items-center gap-3 lg:gap-5">
          <div className="mr-3 cursor-pointer"></div>
          <div className="flex items-center space-x-5">
            <span className="text-base md:text-lg font-bold text-[#11263C]">John Doe</span>
            <div className="flex items-center space-x-4">
              <img src="public/assets/profile.svg" alt="profile" />
              <img
                src="public/assets/down-arrow.svg"
                alt="arrow"
                className="cursor-pointer"
              />
            </div>
          </div>
          <div className="flex items-center justify-center size-8.5 hover:bg-[#D0D1D2]/25 rounded-md cursor-pointer">
            <img src="public/assets/dark.svg" alt="Mode" />
          </div>
        </div>
        <div
          className="hidden max-lg:flex items-center justify-center size-8.5 hover:bg-[#D0D1D2]/25 rounded-md cursor-pointer"
          onClick={() => setDrawerOpen(true)}
        >
          <img src="public/assets/menu.svg" alt="Menu" />
        </div>
      </div>
    </div>
  );
}
export default Header
