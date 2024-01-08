import React, { useState, useRef, useEffect } from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { useStateContext } from "../context/ContextProvider";
import { filterBy } from "@progress/kendo-data-query";
const delay = 500;
const FieldEditComboboxChange = (fieldRenderProps) => {
  const { appColors } = useStateContext();
  const {
    title,
    id,
    disabled,
    value,
    data,
    textField,
    dataItemKey,
    onComboboxChange,
    defaultValue,
    onFilterChange,
    ...others
  } = fieldRenderProps;
  const [dataFilter, setDataFilter] = useState(fieldRenderProps.data);
  const [loading, setLoading] = useState(false);
  const filterDataHandler = (filter) => {
    const dataFilter = data.slice();
    return filterBy(dataFilter, filter);
  };
  const timeout = useRef();
  const filterChange = (event) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setDataFilter(filterDataHandler(event.filter));
      setLoading(false);
    }, delay);
    setLoading(true);
  };

  useEffect(() => {
    setDataFilter(fieldRenderProps.data);
  }, [fieldRenderProps.data]);
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
          data={dataFilter}
          value={value}
          textField={textField}
          dataItemKey={dataItemKey}
          defaultValue={defaultValue}
          onFilterChange={filterChange}
          filterable={true}
          loading={loading}
          onChange={(e) => {
            onComboboxChange(e, id);
          }}
          size="small"
        />
      </div>
    </FieldWrapper>
  );
};

export default FieldEditComboboxChange;
