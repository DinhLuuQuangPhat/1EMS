import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { useStateContext } from "../context/ContextProvider";
const FieldEditInput = (fieldRenderProps) => {
  const { appColors } = useStateContext();
  const {
    title,
    id,
    defaultValue,
    value,
    onChange,
    disabled,
    onDoubleClick,
    readOnly,
    placeholder,
    ...others
  } = fieldRenderProps;

  return (
    <FieldWrapper className="w-full">
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      <div className={`k-form-field-wrap ${appColors.inputColor}`}>
        <Input
          name={id}
          id={id}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e, id);
          }}
          size="small"
          disabled={disabled}
          onDoubleClick={onDoubleClick}
          readOnly={readOnly}
        />
      </div>
    </FieldWrapper>
  );
};

export default FieldEditInput;
