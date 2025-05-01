import React from "react";

const PlatformsList=()=> {
  const platforms = [
    { name: "Google", category: "Stock Trading", image: "public/assets/google.svg" },
    { name: "Foursquare", category: "Stock Trading", image: "public/assets/foursquare.svg" },
    { name: "Kickstarter", category: "Stock Trading", image: "public/assets/kickstarter.svg" },
    { name: "Google", category: "Stock Trading", image: "public/assets/google-talk.svg" },
  ];

  return (
    <>
      <h2 className="text-xs sm:text-sm font-bold mb-3 sm:mb-4 text-[#422F8ADE]">
        Social Trading Platform
      </h2>
      <div className="bg-white py-2 rounded-[20px] shadow-[0px_8px_16px_0px_#3232470F,0px_8px_8px_0px_#32324714]">
        <div className="space-y-2">
          {platforms.map((platform, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 sm:gap-8 px-2.5"
            >
              <img src={platform.image} alt={platform.name} className="w-8 sm:w-10" />
              <div className="text-xs sm:text-sm text-[#D0D1D2] border-b border-[#ECE9F1] py-2.5 flex-1">
                {platform.category}
                <div className="font-semibold text-[#11263C]">
                  {platform.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PlatformsList;
