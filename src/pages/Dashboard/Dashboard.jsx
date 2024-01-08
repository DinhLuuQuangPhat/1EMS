import React, { useEffect } from "react";
import { DashboardMain } from "../../components";
import {
  getLstBaseIndc,
  // getLstDataObjc,
  getLstTimeDsbr,
  getLstDsbrType,
  getLstDispIndc,
  getLstDispTime,
  getLstTop_Type,
  getLstCol_Ctgr,
  getLstChartType,
  getLstAdd_Data,
} from "../../actions/chart";
import { getLstLocation } from "../../actions/common";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLstLocation());
    dispatch(getLstBaseIndc());
    dispatch(getLstTimeDsbr());
    dispatch(getLstDsbrType());
    dispatch(getLstDispIndc());
    dispatch(getLstDispTime());
    dispatch(getLstTop_Type());
    dispatch(getLstCol_Ctgr());
    dispatch(getLstChartType());
    dispatch(getLstAdd_Data());
  }, []);

  return <DashboardMain />;
};

export default Dashboard;
