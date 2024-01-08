import React, { useEffect, useState } from "react";
import { FieldEditDropdown } from "../";
import { useSelector } from "react-redux";

const cellOrgnCode = (props) => {
  const { dataItem, field } = props;
  const dataValue = dataItem[field] === null ? "" : dataItem[field];
  const lstOrgnCode = useSelector((state) => state.common.lstOrgnCode);

  return (
    <td>
      <FieldEditDropdown
        title={""}
        id={`${field}`}
        data={lstOrgnCode}
        value={
          lstOrgnCode
            ? lstOrgnCode.find((item) => item.ITEMCODE == dataValue)
            : ""
        }
        textField="ITEMNAME"
        dataItemKey="ITEMCODE"
        onChange={(e) => {
          props.onChange({
            dataItem: props.dataItem,
            field: props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.value,
          });
        }}
        disabled={false}
      />
    </td>
  );
};

export default cellOrgnCode;
