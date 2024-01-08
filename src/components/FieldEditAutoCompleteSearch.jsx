import React, { useEffect, useState } from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { AutoComplete } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { AiOutlineSearch } from "react-icons/ai";
import { useStateContext } from "../context/ContextProvider";
const AutoCompleteSearch = (fieldRenderProps) => {
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
      <div className={"k-form-field-wrap relative flex w-full"}>
        <Button className="k-button k-button-md k-rounded-md !rounded-r-none pointer-events-none">
          <AiOutlineSearch />
        </Button>
        <AutoComplete
          className={appColors.inputColor}
          disabled={disabled}
          id={id}
          style={stylePara}
          data={data}
          defaultValue={defaultValue}
          onChange={onChange}
          size="small"
        />
      </div>
    </FieldWrapper>
  );
};

export default AutoCompleteSearch;
