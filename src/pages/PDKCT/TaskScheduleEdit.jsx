import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { TaskScheduleEditMain } from "../../components";
import { getDetailPDKCT, resetPDKCT } from "../../actions/pdkct";
import {
  getLstLocationType,
  getLstNation,
  getLstProvince,
  getLstTimekeepingTypeCT,
  getLstSrvcRequest,
} from "../../actions/common";

const TaskScheduleEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstLocationType());
    dispatch(getLstProvince());
    dispatch(getLstNation());
    dispatch(getLstTimekeepingTypeCT());
    dispatch(getLstSrvcRequest());
  }, [dispatch]);

  // Load chi tiết chứng từ
  useEffect(() => {
    if (id === undefined) {
      dispatch(resetPDKCT());
      dispatch(getDetailPDKCT());
    } else {
      dispatch(getDetailPDKCT(id));
    }
  }, [dispatch, id]);

  return <TaskScheduleEditMain keycode={id} mode={props.mode} />;
};

export default TaskScheduleEdit;
