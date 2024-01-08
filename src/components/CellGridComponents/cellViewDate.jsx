import React from "react";
import moment from "moment/moment";

const cellViewDate = (props) => {
  const { dataItem } = props;
  const Field = props.field;
  const dataValue = dataItem[Field] === null ? new Date() : dataItem[Field];

  return <td>{moment(new Date(dataValue)).format("DD/MM/YYYY")}</td>;
};

export default cellViewDate;
