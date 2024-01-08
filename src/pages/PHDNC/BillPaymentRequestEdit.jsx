import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BillPaymentRequestEditMain } from "../../components";
import {
  getLstCUOM,
  getLstLoadAcctDcmn,
  getLstObjcType,
  getLstSpndSgDtTaxRaNm,
  getLstYesOrNo,
  getLstmngSubDcmn,
  getLstmngSubDcmnSCTNC,
} from "../../actions/common";

import { getLstBusnSpend, getLstCostTypeACC } from "../../actions/account";

import { getDetailPHDNC, resetPHDNC } from "../../actions/phdnc";
const BillPaymentRequestEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Load danh sách list
  useEffect(() => {
    dispatch(getLstObjcType());
    dispatch(getLstmngSubDcmn());
    dispatch(getLstmngSubDcmnSCTNC());
    dispatch(getLstCUOM());
    dispatch(getLstLoadAcctDcmn());
    dispatch(getLstBusnSpend());
    dispatch(getLstSpndSgDtTaxRaNm());
    dispatch(getLstCostTypeACC());
    dispatch(getLstYesOrNo());
  }, [dispatch]);

  // Load chi tiết chứng từ
  useEffect(() => {
    if (id === undefined) {
      dispatch(resetPHDNC());
    } else {
      dispatch(getDetailPHDNC(id));
    }
  }, [dispatch, id]);

  return <BillPaymentRequestEditMain keycode={id} mode={props.mode} />;
};

export default BillPaymentRequestEdit;
