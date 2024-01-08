import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const cellPrdcName = (props) => {
  const lstProductAll = useSelector((state) => state.common.lstProductAll);

  const { dataItem } = props;
  const dataName =
    lstProductAll.length > 0
      ? lstProductAll.find((item) => item.ITEMCODE === dataItem.PRDCCODE)
          .ITEMNAME
      : "";

  return <td>{dataName}</td>;
};

export default cellPrdcName;
