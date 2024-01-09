import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { Checkbox } from "@progress/kendo-react-inputs";
import { useStateContext } from "../context/ContextProvider";
const FieldEditCheckBox = (fieldRenderProps) => {
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
    checked,
    ...others
  } = fieldRenderProps;

  let stylePara = Object.create({ borderColor: "grey" });
  if (style) {
    stylePara = Object.assign(style, stylePara);
  }
  const handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    const updatedHeader = isChecked
      ? { ...value, [checkboxValue]: checkboxValue }
      : { ...value };

    onChange(updatedHeader); // Call the onChange prop with the updated header object
  };

  return (
    <FieldWrapper>
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      <div className={"k-form-field-wrap grid"}>
        {data ? (
          data.map((data) => {
            return (
              <Checkbox
                name={id}
                id={id}
                label={data.ITEMNAME}
                value={data.ITEMCODE}
                onChange={handleCheckboxChange}
                size="small"
              />
            );
          })
        ) : {}}
      </div>
    </FieldWrapper>
  );
};

export default FieldEditCheckBox;
