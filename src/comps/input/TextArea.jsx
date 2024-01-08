import React from "react";
import {useStateContext} from "../../context/ContextProvider";
import {TextArea as KendoTextArea} from "@progress/kendo-react-inputs";


export default function TextArea({name, value, onChange, rows, placeholder}){
  const {appColors} = useStateContext();

  return (
    <KendoTextArea
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}

      className={`border-[#808080] border-[1px] ${appColors.inputColor}`}
      rows={rows ?? 3}
    />
  )
}