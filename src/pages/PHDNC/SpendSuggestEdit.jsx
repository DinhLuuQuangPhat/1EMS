import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SpendSuggestEditMain } from "../../components";
import { getDetailPHDNC, resetPHDNC } from "../../actions/phdnc";
import {
  getLstCUOM, // DVTT
  getLstObjcType, // Loai doi tuong
  getLstSpndSgDtTaxRaNm, // Thue suat
  getLstDcmn_Sub, // Loai de nghi chi
  getLstmngSubDcmnSCTNC, // Loai chi tieu
  getLstEmployee, // NV
  getLstSupplier_CurrCode, // NCC
  getLstCustomer_CurrCode, // KH
  getLstCounter, // Ngan quy
  getLstBankAccount, // Ngan hang
  getLstPymnType, // Phuong thuc thanh toan
  getLstLocation, // chi nhanh
  getLstDepartment, // Phong ban
  getLstAcObManage, // Du an
} from "../../actions/common";

import {
  getLstCostTypeACC, // CostType
  getLstMnfr, // Nha may
} from "../../actions/account";

const SpendSuggestEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLstObjcType()); // Loai doi tuong 0:NV; 1:NCC
    dispatch(getLstDcmn_Sub("PHDNC")); // Loai de nghi
    dispatch(getLstmngSubDcmnSCTNC()); // Loai chi tieu
    dispatch(getLstCUOM()); // DVTT

    dispatch(getLstPymnType("PymnType in(1,8,1024,16384)")); // Phuong thuc thanh toan

    dispatch(getLstEmployee()); // ds NV
    dispatch(getLstSupplier_CurrCode()); // ds NCC
    dispatch(getLstCustomer_CurrCode()); // ds KH
    dispatch(getLstCounter()); // ds Ngan quy
    dispatch(getLstBankAccount()); // ds Ngan hang

    // ListCode duoi Detail
    dispatch(getLstSpndSgDtTaxRaNm()); // Thue suat
    dispatch(getLstCostTypeACC()); // CostType

    dispatch(getLstLocation()); // Chi nhanh
    dispatch(getLstDepartment()); // Bo phan/ Phong ban
    dispatch(getLstMnfr()); // CostType
    dispatch(getLstAcObManage()); // Du an
  }, [dispatch]);

  useEffect(() => {
    if (id === undefined) {
      dispatch(resetPHDNC());
      dispatch(getDetailPHDNC());
    } else {
      dispatch(getDetailPHDNC(id));
    }
  }, [dispatch, id]);

  return <SpendSuggestEditMain keycode={id} mode={props.mode} />;
};

export default SpendSuggestEdit;
