import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { DropDownList } from "@progress/kendo-react-dropdowns";
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
        <DropDownList
          className={appColors.inputColor}
          disabled={disabled}
          name={id}
          id={id}
          style={stylePara}
          data={data}
          value={value}
          textField={textField}
          dataItemKey={dataItemKey}
          defaultValue={defaultValue}
          onChange={onChange}
          size="small"

          // onChange={(e) => {
          //   onChange(e, id);
          // }}
        />
      </div>
    </FieldWrapper>
  );
};

export default FieldEditDropdown;
