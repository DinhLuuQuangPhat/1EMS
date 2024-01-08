import { useState, useEffect } from "react";
import React from "react";

const cellPRDCCODE = (props) => {
  const { dataItem, field } = props;
  const [dataValue, setDataValue] = useState(null);
  useEffect(() => {
    setDataValue(dataItem[field] ? dataItem[field] : "");
  }, [dataItem[field]]);
  return <td>{dataItem[field]}</td>;
};

export default cellPRDCCODE;
