import React, { useEffect } from "react";
import { getLstEmployee } from "../../actions/common";
import { useDispatch, useSelector } from "react-redux";

const cellViewEmplCd = (props) => {
  const { dataItem } = props;
  const Field = props.field;
  const dataValue = dataItem[Field] === null ? "" : dataItem[Field];

  const dispatch = useDispatch();
  const lstEmployee = useSelector((state) => state.common.lstEmployee);
  useEffect(() => {
    dispatch(getLstEmployee());
  }, []);

  //   const EmplName = lstEmployee
  //     ? lstEmployee.find((item) => item.ITEMCODE === dataValue).ITEMNAME
  //     : "";

  const EmplName = "abc";

  return <td>{EmplName}</td>;
};

export default cellViewEmplCd;
