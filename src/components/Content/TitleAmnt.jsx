import React from "react";
import { useStateContext } from "../../context/ContextProvider";

const TitleAmnt = ({ children, title }) => {
  const { appColors } = useStateContext();

  return (
    <div className="w-full md:basis-1/4">
      <div
        className={`border-solid border-[1px] md:border-0 md:p-0 border-borderBase hover:border-blue-700 h-full lg:mr-2 mr-0 ${appColors.stackColor}`}
      >
        <p className="text-sm text-black font-semibold w-full p-3">{title}</p>
        <div className="h-[1px] bg-borderBase"></div>
        <div className="p-3">{children}</div>
      </div>
    </div>
  );
};

export default TitleAmnt;
