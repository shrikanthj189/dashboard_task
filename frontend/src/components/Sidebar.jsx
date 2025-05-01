import React from "react";

const Sidebar=()=> {
  return (
    <div className="bg-white shadow-lg h-full w-16 sm:w-20 flex flex-col items-center border-r border-gray-200">
      <div className="divide-y-2 divide-[#EEECFA]">
        <div className="h-16 sm:h-20 flex items-center justify-center cursor-pointer">
          <img src="public/assets/menu.svg" alt="Side links" className="w-6 sm:w-auto" />
        </div>

        <div className="flex flex-col pb-2 mb-2">
          {["icon1", "icon2", "icon3"].map((icon, idx) => (
            <div
              key={idx}
              className="h-[56px] sm:h-[66px] flex items-center justify-center cursor-pointer"
            >
              <img src={`public/assets/${icon}.svg`} alt="Side links" className="w-6 sm:w-auto" />
            </div>
          ))}
        </div>

        <div className="flex flex-col py-2 mb-2">
          <div className="flex flex-col bg-[#F8F9FE] p-0.5 gap-2 rounded-3xl w-[38px] sm:w-[44px] mx-auto">
            {["command", "pie-chart", "clock", "globe", "loader"].map((icon, idx) => (
              <div
                key={idx}
                className="flex items-center justify-center size-9 sm:size-10 cursor-pointer border border-transparent hover:border-[#F2F2F7] hover:bg-white hover:shadow-[0px_4px_8px_0px_#32324702,0px_4px_4px_0px_#00000014] rounded-2xl"
              >
                <img src={`public/assets/${icon}.svg`} alt="Side links" className="w-5 sm:w-auto" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto ">
        <div className="border-t-2 border-[#EEECFA]">
          <div className="flex flex-col py-4">
            <div className="size-10 sm:size-[44px] bg-[#F8F9FE] rounded-3xl flex items-center justify-center cursor-pointer mx-auto">
              <img src="public/assets/bottom-icon.svg" alt="Side links" className="w-5 sm:w-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
