import React from "react";
import PlatformsList from "./PlatformsList";
import IncomeSection from "./IncomeSection";

const SideDrawer = ({ isMobile = false }) => {
  return (
    <div
      className={`
        w-80 bg-[#F2F2F7] h-full p-8 space-y-4 overflow-y-auto [scrollbar-width:none]
        ${isMobile ? "" : "hidden lg:block"} 
      `}
    >
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-2.5">
          <h3 className="text-lg font-bold text-[#11263C]">Superiority</h3>
          <img src="public/assets/info.svg" alt="Information" />
        </div>
        <img
          src="public/assets/superiority.svg"
          alt="superiority"
          className="h-[156px] rounded-[20px] shadow-[0px_8px_16px_0px_#3232470F,0px_8px_8px_0px_#32324714]"
        />
      </div>
      <PlatformsList />
      <IncomeSection />
    </div>
  );
};

export default SideDrawer;
