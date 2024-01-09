import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { TextArea } from "@progress/kendo-react-inputs";
import { useStateContext } from "../context/ContextProvider";

const FieldEditTextArea = (fieldRenderProps) => {
  const { appColors } = useStateContext();
  const { title, id, defaultValue, value, onChange, row, disabled, placeholder, ...others } =
    fieldRenderProps;

  return (
    <FieldWrapper>
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      <div className={`k-form-field-wrap ${appColors.inputColor}`}>
        <TextArea
          className="border-[#808080] border-[1px]"
          placeholder={placeholder}
          name={id}
          id={id}
          rows={row}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
        />
      </div>
    </FieldWrapper>
  );
};

export default FieldEditTextArea;
