import React from "react";

const ObrasSkeleton = () => {
  return (
    <div role="status" className="max-w-sm animate-pulse">
      <div className="h-[35px] bg-gray-200 rounded-full dark:bg-gray-600 w-[150px] m-8 mx-auto"></div>
      <div className="h-[70px] bg-gray-200 rounded dark:bg-gray-700 my-[55px] mx-[20%]"></div>
      <div className="h-[70px] bg-gray-200 rounded dark:bg-gray-700 my-[55px] mx-[20%]"></div>
      <div className="h-[70px] bg-gray-200 rounded dark:bg-gray-700 my-[55px] mx-[20%]"></div>
    </div>
  );
};

export default ObrasSkeleton;
