import * as React from "react";
import * as ReactDOM from "react-dom";
import { RadioGroup } from "@progress/kendo-react-inputs";

export default function Radio(props){
  const handleOnChange= (e) => {
    props.onChange(e.value);
  }
  return (
    <RadioGroup layout={props.layout ?? "vertical"} name={props.name} value={props.value} data={props.options} onChange={handleOnChange} />
  )
}