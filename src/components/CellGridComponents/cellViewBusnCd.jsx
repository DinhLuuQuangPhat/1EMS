import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLstAcctDcmn } from "../../actions/account";
import moment from "moment";

const cellViewBusnCd = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? "" : dataItem[field];
  const DCMNCODE = dataItem.DCMNCODE;
  const DCMNSBCD = dataItem.DCMNSBCD;
  const OBJCTYPE = dataItem.OBJCTYPE;

  const dispatch = useDispatch();
  useEffect(() => {
    let ParaAcctDcmn =
      "'ACC', '" +
      DCMNCODE +
      "', '" +
      DCMNSBCD +
      "', '" +
      moment(new Date()).format("YYYY-MM-DD") +
      "', '" +
      OBJCTYPE +
      "', '0'";
    dispatch(getLstAcctDcmn(ParaAcctDcmn));
  }, []);
  const lstAcctDcmn = useSelector((state) => state.Account.lstAcctDcmn);
  const BusnCodeVlue = lstAcctDcmn
    ? lstAcctDcmn.find((item) => item.ItemCode === dataValue) !== undefined
      ? lstAcctDcmn.find((item) => item.ItemCode === dataValue).ItemName
      : ""
    : "";

  return <td>{BusnCodeVlue}</td>;
};

export default cellViewBusnCd;
