import React from "react";
import { useSelector } from "react-redux";
import { FieldEditCombobox } from "../";

const cellTimeKeepingType = (props) => {
  const { dataItem, field } = props;
  const dataValue = dataItem[field] === null ? "" : dataItem[field];
  const permission = dataItem.permission ? dataItem.permission : false;

  const lstTimekeepingType = useSelector(
    (state) => state.common.lstTimekeepingType
  );

  return (
    <td>
      <FieldEditCombobox
        id={field}
        name={field}
        data={lstTimekeepingType}
        textField="ITEMNAME"
        dataItemKey="ITEMCODE"
        filterable={true}
        value={
          lstTimekeepingType
            ? lstTimekeepingType.find((item) => item.ITEMCODE == dataValue)
            : {}
        }
        onChange={(e) => {
          props.onChange({
            dataItem: props.dataItem,
            field: props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.value,
          });
        }}
        disabled={!permission}
      />
    </td>
  );
};

export default cellTimeKeepingType;
