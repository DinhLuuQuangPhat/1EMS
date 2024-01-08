import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLstMnfr } from "../../actions/account";
import {
  getLstLocation, // chi nhanh
  getLstDepartment, // Phong ban
  getLstAcObManage, // Du an
} from "../../actions/common";

const cellViewCostCd = (props) => {
  const [lstCostCode, setLstCostCode] = useState([]);
  const lstLocation = useSelector((state) => state.common.lstLocation);
  const lstDepartment = useSelector((state) => state.common.lstDepartment);
  const lstMnfr = useSelector((state) => state.Account.lstMnfr); // CostType
  const lstAcObManage = useSelector((state) => state.common.lstAcObManage); // Du an

  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? 0 : dataItem[field];

  useEffect(() => {
    if (dataItem.COSTTYPE == 1) {
      setLstCostCode(lstLocation);
    } else if (dataItem.COSTTYPE == 2) {
      setLstCostCode(lstDepartment);
    } else if (dataItem.COSTTYPE == 3) {
      setLstCostCode(lstMnfr);
    } else if (dataItem.COSTTYPE == 4) {
      setLstCostCode(lstAcObManage);
    } else setLstCostCode([]);
  }, [dataItem]);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstLocation());
    dispatch(getLstDepartment());
    dispatch(getLstMnfr()); // CostType
    dispatch(getLstAcObManage()); // Du an
  }, []);

  const ItemNameVlue = lstCostCode
    ? lstCostCode.find((item) => item.ITEMCODE == dataValue) !== undefined
      ? lstCostCode.find((item) => item.ITEMCODE == dataValue).ITEMNAME
      : ""
    : "";

  return <td>{ItemNameVlue}</td>;
};

export default cellViewCostCd;
