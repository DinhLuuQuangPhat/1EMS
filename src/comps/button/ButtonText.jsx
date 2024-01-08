import {FcLeft} from "react-icons/fc";
import React from "react";

export default function ButtonText(props) {
  return (
    <button className="text-base mr-2" onClick={props.onClick}>
      {props.icon && (
        <>{props.icon}</>
      )}

      {props.children}
    </button>
  )
}