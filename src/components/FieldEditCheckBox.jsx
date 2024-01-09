import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { Checkbox } from "@progress/kendo-react-inputs";
import { useStateContext } from "../context/ContextProvider";
const FieldEditDropdown = (fieldRenderProps) => {
  const { appColors } = useStateContext();
  const {
    title,
    id,
    disabled,
    value,
    data,
    textField,
    dataItemKey,
    onChange,
    defaultValue,
    style,
    ...others
  } = fieldRenderProps;

  let stylePara = Object.create({ borderColor: "grey" });
  if (style) {
    stylePara = Object.assign(style, stylePara);
  }

  return (
    <FieldWrapper>
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      <div className={"k-form-field-wrap"}>
        {data ? (
          <Checkbox
            name={id}
            id={id}
            label={data.ITEMNAME}
            value={data.ITEMCODE}
            onChange={onChange}
            size="small"
          />
        ) : {}}
      </div>
    </FieldWrapper>
  );
};

export default FieldEditDropdown;
