import {NumericTextBox} from "@progress/kendo-react-inputs";
import React from "react";
import {useStateContext} from "../../context/ContextProvider";

export default function InputNumber(props) {
  const {appColors} = useStateContext();
  return (
    <NumericTextBox
      min={props.min}
      name={props.name}
      value={props.value}
      onChange={(e) => props.onChange(e.target.value)}

      style={{borderColor: "grey", textAlign: "right"}}
      type="number"
      className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
    />
  )
}