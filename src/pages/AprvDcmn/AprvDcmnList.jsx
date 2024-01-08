import React, { useEffect } from "react";
import { AprvDcmnListMain } from "../../components";
import { getLstEmployeeAll } from "../../actions/common";
import { useDispatch } from "react-redux";

const AprvDcmnList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstEmployeeAll());
  }, []);

  return <AprvDcmnListMain />;
};

export default AprvDcmnList;
