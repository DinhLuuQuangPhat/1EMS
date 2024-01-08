import React, { useEffect } from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { useStateContext } from "../context/ContextProvider";
import { filterBy } from "@progress/kendo-data-query";
const FieldEditCombobox = (fieldRenderProps) => {
  const { appColors } = useStateContext();
  const {
    title,
    id,
    disabled,
    value,
    data,
    textField,
    dataItemKey,
    filterable,
    // onComboboxChange,
    onChange,
    onFilterChange,
    defaultValue,
    ...others
  } = fieldRenderProps;

  const [dataFt, setDataFt] = React.useState();
  useEffect(() => {
    setDataFt(data);
  }, [data]);

  const filterData = (filter) => {
    const data2 = data.slice();
    return filterBy(data2, filter);
  };
  const filterChange = (event) => {
    setDataFt(filterData(event.filter));
  };

  return (
    <FieldWrapper>
      {title && <Label className="text-sm text-gray-500">{title}</Label>}
      <div className={"k-form-field-wrap"}>
        <ComboBox
          className={appColors.inputColor}
          disabled={disabled}
          name={id}
          id={id}
          style={{ borderColor: "grey" }}
          data={dataFt}
          value={value}
          textField={textField}
          dataItemKey={dataItemKey}
          defaultValue={defaultValue}
          onChange={onChange}
          filterable={filterable}
          onFilterChange={filterChange}
          size="small"
        />
      </div>
    </FieldWrapper>
  );
};

export default FieldEditCombobox;
