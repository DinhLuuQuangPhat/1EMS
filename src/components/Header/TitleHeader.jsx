import React from "react";

const TitleHeader = (props) => {
  return (
    <div className="flex">
      <div className="w-full mb-3">
        <h4 className="text-xl">
          {props.TitlePage}
          {props.MainCode !== null && props.MainCode !== undefined
            ? ": " + props.MainCode
            : ""}
        </h4>
        <div className="font-semibold text-sm text-white">
          {props.StteName && (
            <span className="text-red-600 rounded-md items-center italic">
              {props.StteName ? props.StteName : ""}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default TitleHeader;
