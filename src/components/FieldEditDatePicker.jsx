import React from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import {
  DatePicker,
  MultiViewCalendar,
} from "@progress/kendo-react-dateinputs";
import { useStateContext } from "../context/ContextProvider";

export const CustomCalendar = (props) => {
  return <MultiViewCalendar {...props} views={1} />;
};

const FieldEditDatePicker = (fieldRenderProps) => {
  const { appColors } = useStateContext();
  const {
    title,
    id,
    disabled,
    value,
    onChange,
    style,
    format,
    defaultValue,
    ...others
  } = fieldRenderProps;

  return (
    <FieldWrapper>
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      {/* <div className={"k-form-field-wrap"}> */}
      <div>
        <DatePicker
          className={appColors.inputColor}
          disabled={disabled}
          name={id}
          id={id}
          format={format}
          defaultValue={defaultValue}
          value={value}
          onChange={onChange}
          size="small"
          calendar={CustomCalendar}
        />
      </div>
    </FieldWrapper>
  );
};

export default FieldEditDatePicker;
