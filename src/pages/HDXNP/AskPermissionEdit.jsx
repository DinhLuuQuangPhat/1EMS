import React, { useEffect } from "react";
import AskPermissionEditMain from "../../components/HDXNP/AskPermissionEditMain";
import { useParams } from "react-router-dom";
import { getDetailHDXNP } from "../../actions/hdxnp";
import {
  getLstJob,
  getLstEmployee,
  getLstDepartment,
  getLstTimekeepingType,
} from "../../actions/common";
import { useDispatch } from "react-redux";
const AskPermissionEdit = ({ mode }) => {
  const { id } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstJob());
    dispatch(getLstEmployee());
    dispatch(getDetailHDXNP(id));
    dispatch(getLstDepartment());
    dispatch(getLstTimekeepingType());
  }, [dispatch, id]);

  return <AskPermissionEditMain mode={mode} keycode={id} />;
};

export default AskPermissionEdit;
