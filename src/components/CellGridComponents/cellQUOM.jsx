import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getLstQUOMPrdc, getLstQUOM } from "../../actions/common";
import { DropDownList } from "@progress/kendo-react-dropdowns";

const cellQUOM = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? "" : dataItem[field];

  const dispatch = useDispatch();
  useEffect(
    () => {
      dispatch(getLstQUOMPrdc(dataItem.PRDCCODE));
      dispatch(getLstQUOM());
    },
    [dispatch],
    dataItem
  );

  const lstQUOMPrdc = useSelector((state) => state.common.lstQUOMPrdc);

  return (
    <td>
      <DropDownList
        value={
          lstQUOMPrdc
            ? lstQUOMPrdc.find((i) => i.ITEMCODE === dataValue.toString()) !==
              undefined
              ? lstQUOMPrdc.find((i) => i.ITEMCODE === dataValue.toString())
              : lstQUOMPrdc[0]
            : {}
        }
        data={lstQUOMPrdc}
        defaultValue={
          lstQUOMPrdc
            ? lstQUOMPrdc.find((i) => i.ITEMCODE === dataValue.toString()) !==
              undefined
              ? lstQUOMPrdc.find((i) => i.ITEMCODE === dataValue.toString())
              : lstQUOMPrdc[0]
            : {}
        }
        dataItemKey="ITEMCODE"
        textField="ITEMNAME"
        onChange={(e) =>
          props.onChange({
            dataItem: props.dataItem,
            field: props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.value,
          })
        }
      />
    </td>
  );
};

export default cellQUOM;
