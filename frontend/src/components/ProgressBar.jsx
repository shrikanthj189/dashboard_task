import React from 'react';

const ProgressBar = ({ value = 45 }) => {
  const safeValue = Math.min(Math.max(value, 0), 100);
  
  return (
    <div className="w-full bg-[#7459D933] rounded-full">
      <div
        className="bg-[#7459D9] text-[10px] sm:text-xs font-medium text-blue-100 text-center px-1 sm:px-0.5 leading-none rounded-full h-3.5 sm:h-4"
        style={{ width: `${safeValue}%` }}
      >
      </div>
    </div>
  );
};

export default ProgressBar;