import React, { useEffect } from "react";
import { AdvanceProposalEditMain } from "../../components";

import { useDispatch } from "react-redux";
import {
  getLstAccObjcCode,
  getLstAdvnType,
  getLstCUOM,
  getLstEmployee,
  getLstPymnType,
  getLstDcmn_Sub,
  getLstAcObManage,
  getapp_DcmnList,
  getLstDepartment,
} from "../../actions/common";

import { useParams } from "react-router-dom";
import { getDetailPHTAM, resetPHTAM } from "../../actions/PHTAM";

const AdvanceProposalEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch(getLstAccObjcCode("-1"));
    dispatch(getLstAdvnType());
    dispatch(getLstCUOM());
    dispatch(getLstEmployee());
    dispatch(getLstPymnType("PymnType in(1,8,1024)"));
    dispatch(getLstDcmn_Sub("PHTAM"));
    dispatch(getLstAcObManage());
    dispatch(getapp_DcmnList());
    dispatch(getLstDepartment());
  }, [dispatch]);

  // Load chi tiết chứng từ
  useEffect(() => {
    if (id === undefined) {
      dispatch(resetPHTAM());
      dispatch(getDetailPHTAM());
    } else {
      dispatch(getDetailPHTAM(id));
    }
  }, [dispatch, id]);

  return <AdvanceProposalEditMain keycode={id} mode={props.mode} />;
};

export default AdvanceProposalEdit;
