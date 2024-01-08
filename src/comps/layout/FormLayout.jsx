import React from "react";
import {useStateContext} from "../../context/ContextProvider";

export default function FormLayout(props) {
  const { appColors } = useStateContext();
  return (
    <div
      className={`lg:ml-2 ml-0 lg:mr-2 mr-0 lg:p-5 p-0 bg-white border-solid lg:border-[1px] border-0 lg:mb-0 mb-2 border-borderBase hover:border-blue-700 ${appColors.stackColor}`}
    >
      {props.header && (
        <div className="flex">
          <div className="w-full mb-3">
            <h4 className="text-xl">
              {props.header}
            </h4>
          </div>
        </div>
      )}

      {props.children}
    </div>
  )
}