import React from "react";
import moment from "moment/moment";

const cellMainDate = (props) => {
  const { dataItem } = props;

  return <td>{moment(new Date(dataItem.MAINDATE)).format("DD/MM/YYYY")}</td>;
};

export default cellMainDate;
