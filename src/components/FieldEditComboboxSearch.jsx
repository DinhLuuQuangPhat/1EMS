import React, { useEffect } from "react";
import { FieldWrapper } from "@progress/kendo-react-form";
import { Label } from "@progress/kendo-react-labels";
import { ComboBox } from "@progress/kendo-react-dropdowns";
import { AiOutlineSearch } from "react-icons/ai";
import { Button } from "@progress/kendo-react-buttons";
import { useStateContext } from "../context/ContextProvider";
import { filterBy } from "@progress/kendo-data-query";
const FieldEditComboboxSearch = (fieldRenderProps) => {
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
      <div className={`k-form-field-wrap relative flex w-full `}>
        <Button className="k-button k-button-md k-rounded-md !rounded-r-none pointer-events-none">
          <AiOutlineSearch />
        </Button>
        <ComboBox
          className={`!rounded-l-none ${appColors.inputColor}`}
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

export default FieldEditComboboxSearch;
