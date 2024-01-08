import React from "react";
import { MaskedTextBox } from "@progress/kendo-react-inputs";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { useStateContext } from "../context/ContextProvider";

const FieldEditMaskText = (fieldRenderProps) => {
  const { appColors } = useStateContext();
  const { title, id, value, ...others } = fieldRenderProps;

  return (
    <FieldWrapper>
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      <div className={`k-form-field-wrap ${appColors.inputColor}`}>
        <MaskedTextBox
          id={id}
          value={value}
          size="small"
          readonly={true}
          others={others}
        />
      </div>
    </FieldWrapper>
  );
};

export default FieldEditMaskText;
