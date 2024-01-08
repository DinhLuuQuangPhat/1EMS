import {Input as KendoInput} from "@progress/kendo-react-inputs";
import {useEffect, useState} from "react";


export default function Input(props) {
  const [value, setValue] = useState(props.value ?? "");

  useEffect(() => {
    setValue(props.value ?? "");
  }, [props.value]);
  const onChange = (value) => {
    setValue(value);
    props.onChange(value);
  }

  return (
    <>

      <KendoInput
        value={value}
        onChange={(e) => onChange(e.value)}
      />
    </>
  )
}