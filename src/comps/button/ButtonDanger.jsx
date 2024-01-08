import React from "react";

export default function ButtonDanger(props){
  return (
    <button
      className="bg-red-500 text-sm text-white rounded-md pr-3 pl-3 pt-1 pb-1"
      onClick={props.onClick}
    >
      {props.icon && (
        <span className="pr-1">{props.icon}</span>
      )}

      {props.children}
    </button>
  )
}