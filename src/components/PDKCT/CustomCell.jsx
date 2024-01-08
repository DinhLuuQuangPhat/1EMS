import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  getLstTimekeepingTypeCT,
  getLstProvince,
  getLstNation,
} from "../../actions/common";

export const CellDate = (cell) => {
  return (
    <td>{moment(new Date(cell.dataItem[cell.field])).format("DD/MM/YYYY")}</td>
  );
};

export const CellBussinessType = (cell) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstTimekeepingTypeCT());
  }, [dispatch]);

  const lstTimekeepingTypeCT = useSelector(
    (state) => state.common.lstTimekeepingTypeCT
  );

  const field = cell.field;
  const dataItem = cell.dataItem;
  const cellvalue = dataItem[field];

  return (
    <td>
      {lstTimekeepingTypeCT && cellvalue
        ? lstTimekeepingTypeCT.find((item) => item.ITEMCODE === cellvalue)
            .ITEMNAME
        : ""}
    </td>
  );
};

export const CellBussinessPlace = (cell) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstProvince());
    dispatch(getLstNation());
  }, [dispatch]);

  const lstProvince = useSelector((state) => state.common.lstProvince);
  const lstNation = useSelector((state) => state.common.lstNation);

  const field = cell.field;
  const dataItem = cell.dataItem;
  const cellvalue = dataItem[field];

  const WorkType = cell.dataItem.WORKTYPE;
  let viewhtml = "";
  WorkType === "01"
    ? (viewhtml =
        lstProvince && lstProvince.find((item) => item.ITEMCODE === cellvalue)
          ? lstProvince.find((item) => item.ITEMCODE === cellvalue).ITEMNAME
          : "")
    : (viewhtml =
        lstNation && lstNation.find((item) => item.ITEMCODE === cellvalue)
          ? lstNation.find((item) => item.ITEMCODE === cellvalue).ITEMNAME
          : "");

  return <td>{viewhtml}</td>;
};
