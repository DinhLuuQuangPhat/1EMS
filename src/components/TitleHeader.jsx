import React from "react";

const TitleHeader = (props) => {
  return (
    <div className="flex">
      <div className="w-full mb-3">
        <h4 className="text-xl">
          {props.title}
          {props.header !== null && props.header.MAINCODE !== null
            ? ": " + props.header.MAINCODE
            : props.keycode}
        </h4>
        <div className="font-semibold text-sm cursor-pointer text-white">
          {props.header.STTENAME && (
            <span className="text-red-600 rounded-md underline items-center italic">
              {props.header.STTENAME ? props.header.STTENAME : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleHeader;
