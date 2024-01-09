import React, { useEffect } from "react";
import SwitchShiftEditMain from "../../components/HDXDC/SwitchShiftEditMain";
import { useParams } from "react-router-dom";
import { getDetailHDXDC } from "../../actions/hdxdc";
import {
  getLstJob,
  getLstEmployee,
  getLstDepartment,
  getLstTimekeepingType,
} from "../../actions/common";
import { useDispatch } from "react-redux";
const SwitchShiftEdit = ({ mode }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstJob());
    dispatch(getLstEmployee());
    dispatch(getDetailHDXDC(id));
    dispatch(getLstDepartment());
    dispatch(getLstTimekeepingType());
  }, [dispatch, id]);

  return <SwitchShiftEditMain mode={mode} keycode={id} />;
}

export default SwitchShiftEdit