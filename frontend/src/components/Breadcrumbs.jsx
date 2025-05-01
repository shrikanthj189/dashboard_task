import React from "react";

const Breadcrumbs = ({ options = [] }) => {
  return (
    <div className="breadcrumbs text-sm ">
      <ul className="flex items-center space-x-2">
        <li className="flex items-center gap-2 sm:gap-3">
          <a className="text-[#422F8ADE] text-xs font-bold" href="/dashboard">
            DASHBOARD
          </a>
          <svg
            className="w-2 h-2 text-[#D0D1D2]"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </li>

        {options.map((item, index) => (
          <li key={index}>
            {item.path ? (
              <a
                className="rounded-md px-2 py-1 text-xs font-medium text-[#D0D1D2]"
                href={item.path}
              >
                {item.label}
              </a>
            ) : (
              <div className="rounded-md bg-[#F9FAFB] px-2 py-1 text-xs text-gray-500">
                {item.label}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
