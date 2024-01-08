import React, { useEffect } from "react";
import { getDetailDashboard } from "../../actions/chart";
import { useDispatch, useSelector } from "react-redux";
import FrameView from "./FrameView";

const DashboardDM1 = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDetailDashboard("100000"));
  }, []);
  const DetailDashboard = useSelector((state) => state.Chart.DetailDashboard);

  return (
    <>
      <h3>{DetailDashboard?.DsbrDesc}</h3>
      {DetailDashboard?.FramList && (
        <FrameView FrameList={DetailDashboard?.FramList} />
      )}
    </>
  );
};

export default DashboardDM1;
