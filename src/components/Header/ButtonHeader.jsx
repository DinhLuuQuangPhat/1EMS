import React from "react";
import { Button } from "@progress/kendo-react-buttons";

const ButtonHeader = (props) => {
  // return (
  //   <button
  //     onClick={props.onClick}
  //     className={`relative inline-flex items-center justify-center ml-2 outline outline-1 rounded-sm hover:text-white ${
  //       props.active ? props.active : "hover:bg-primary"
  //     }`}
  //   >
  //     <span
  //       className={`flex items-center relative px-2 py-1 transition-all ease-in duration-75 group-hover:bg-opacity-0 text-xs ${props?.className}`}
  //     >
  //       <div className="p-1">{props.icon}</div>
  //       {props.title}
  //     </span>
  //   </button>
  // )

  return (
    <Button
      onClick={props.onClick}
      // className={`inline-flex items-center justify-center ml-2 ${
      //   props.active ? props.active : "hover:bg-primary"
      // }`}
      className={`${props.className} inline-flex items-center justify-center ml-2 `}
      disabled={props.disabled}
      size="small"
    >
      <span
        // className={`flex items-center relative px-2 py-1 transition-all ease-in duration-75 group-hover:bg-opacity-0 text-xs ${props?.className}`}
        className={`flex items-center relative transition-all ease-in duration-75 text-xs`}
      >
        <div className="p-1">{props.icon}</div>
        {props.title}
      </span>
    </Button>
  );
};

export default ButtonHeader;
