import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLstBusnSpend } from "../../actions/account";
import moment from "moment";

const cellViewSpndCd = (props) => {
  const { dataItem } = props;
  const field = props.field || "";
  const dataValue = dataItem[field] === null ? "" : dataItem[field];

  const RFRNDCMN = dataItem.RFRNDCMN;

  const dispatch = useDispatch();
  useEffect(() => {
    let ParaBusnSpend =
      "'" + RFRNDCMN + "', '" + moment(new Date()).format("YYYY-MM-DD") + "'";
    dispatch(getLstBusnSpend(ParaBusnSpend));
  }, []);
  const lstBusnSpend = useSelector((state) => state.Account.lstBusnSpend);
  const BusnCodeVlue = lstBusnSpend
    ? lstBusnSpend.find((item) => item.ItemCode === dataValue) !== undefined
      ? lstBusnSpend.find((item) => item.ItemCode === dataValue).ItemName
      : ""
    : "";

  return <td>{BusnCodeVlue}</td>;
};

export default cellViewSpndCd;
