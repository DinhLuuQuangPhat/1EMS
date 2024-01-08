import React from "react";
import { useSelector } from "react-redux";
import FieldEditCombobox from "../FieldEditCombobox";

const cellEmployee = (props) => {
  const { dataItem, field } = props;
  const dataValue = dataItem[field] === null ? "" : dataItem[field];
  const permission = dataItem.permission ? dataItem.permission : false;

  const lstEmployee = useSelector((state) => state.common.lstEmployee);

  return (
    <td>
      <FieldEditCombobox
        id={field}
        name={field}
        data={lstEmployee}
        value={
          lstEmployee
            ? lstEmployee.find((item) => item.ITEMCODE == dataValue)
            : ""
        }
        textField="ITEMSRCH"
        dataItemKey="ITEMCODE"
        onChange={(e) => {
          props.onChange({
            dataItem: props.dataItem,
            field: props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.value,
          });
        }}
        filterable={true}
        disabled={!permission}
      />
    </td>
  );
};

export default cellEmployee;
