import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { Input } from "@progress/kendo-react-inputs";
import { AutoComplete } from "@progress/kendo-react-dropdowns";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "@progress/kendo-react-buttons";
import { useStateContext } from "../context/ContextProvider";
const FieldEditInputSearch = (fieldRenderProps) => {
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
    textField,
    dataItemKey,
    ...others
  } = fieldRenderProps;

  return (
    <FieldWrapper className="w-full">
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      <div className={`k-form-field-wrap relative flex w-full ${appColors.inputColor}`}>
        <Button className="k-button k-button-md k-rounded-md !rounded-r-none pointer-events-none">
          <AiOutlineSearch />
        </Button>
        <AutoComplete
          className="!rounded-l-none"
          name={id}
          id={id}
          value={value}
          defaultValue={defaultValue}
          textField={textField}
          dataItemKey={dataItemKey}
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

export default FieldEditInputSearch;
