import React from "react";
import { NumericTextBox } from "@progress/kendo-react-inputs";
import { useStateContext } from "../context/ContextProvider";

const FieldEditAmnt = (fieldRenderProps) => {
  const { appColors } = useStateContext();
  const {
    title,
    id,
    disabled,
    value,
    defaultValue,
    format,
    onChange,
    ...others
  } = fieldRenderProps;

  return (
    <div className='flex items-center mb-2'>
      {title && <p className='text-sm text-gray-500 w-full'>{title}</p>}
      <NumericTextBox
        className={`numberic-right ${appColors.inputColor}`}
        disabled={disabled}
        name={id}
        id={id}
        style={{ borderColor: "grey" }}
        value={value}
        defaultValue={defaultValue}
        size='small'
        format={format}
        step={1}
        onChange={onChange}
      />
    </div>
  );
};

export default FieldEditAmnt;
