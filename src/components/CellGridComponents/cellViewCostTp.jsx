import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getLstCostTypeACC, // CostType
} from "../../actions/account";

const cellViewCostTp = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? 0 : dataItem[field].toString();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstCostTypeACC());
  }, []);
  const lstCostTypeACC = useSelector((state) => state.Account.lstCostTypeACC);
  const ItemNameVlue = lstCostTypeACC
    ? lstCostTypeACC.find((item) => item.ITEMCODE == dataValue) !== undefined
      ? lstCostTypeACC.find((item) => item.ITEMCODE == dataValue).ITEMNAME
      : ""
    : "";

  return <td>{ItemNameVlue}</td>;
};

export default cellViewCostTp;
