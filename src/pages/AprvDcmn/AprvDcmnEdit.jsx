import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  resetAPRVDCMN,
  getReviewProcess,
  getApprovalProcess,
} from "../../actions/document";

import { useStateContext } from "../../context/ContextProvider";
import { AprvDcmnEditMain } from "../../components";
import { getLstLocation, getLstDepartment } from "../../actions/common";
import { getLstDcmnPrcs } from "../../actions/document";

const AprvDcmnEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { userData } = useStateContext();

  let PageInfo = {
    DcmnCode: "",
    Key_Code: "",
  };
  if (id) {
    const slipt = id.split("-");
    PageInfo.DcmnCode = slipt[0];
    PageInfo.Key_Code = slipt[1];
  }

  // Load chi tiết chứng từ
  useEffect(() => {
    if (id === undefined) {
      dispatch(resetAPRVDCMN());
    } else {
      const body = {
        DCMNCODE: "dmsDcmnVchr",
        PARA_001: PageInfo.DcmnCode,
        PARA_002: PageInfo.Key_Code,
        PARA_003: userData.EMPLCODE,
        PARA_004: "{{0107}}",
      };

      dispatch(getReviewProcess(body));

      const body2 = {
        DCMNCODE: PageInfo.DcmnCode,
        KEY_CODE: PageInfo.Key_Code,
      };
      dispatch(getApprovalProcess(body2));
    }

    dispatch(getLstLocation());
    dispatch(getLstDcmnPrcs());
    dispatch(getLstDepartment());
  }, [dispatch, id]);

  return <AprvDcmnEditMain />;
};

export default AprvDcmnEdit;
