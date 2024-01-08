import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getLstSortSale } from "../../actions/common";
import { DropDownList } from "@progress/kendo-react-dropdowns";

const cellSortSale = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? "" : dataItem[field];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstSortSale());
  }, [dispatch]);

  const ListSortSale = useSelector((state) => state.common.listSortSale);

  return (
    <td>
      <DropDownList
        onChange={(e) =>
          props.onChange({
            dataItem: props.dataItem,
            field: props.field,
            syntheticEvent: e.syntheticEvent,
            value: e.value,
          })
        }
        defaultValue={ListSortSale.find(
          (i) => i.ITEMCODE === dataValue.toString()
        )}
        data={ListSortSale}
        textField="ITEMNAME"
      />
    </td>
  );
};

export default cellSortSale;
