import * as api from "../api/index.js";

import {
  FETCH_lst_PHTAM_PHDNC, // ct Tam ung can hoan ung
  FETCH_lstAcctDcmn, // Load danh sach tk Ke toan
  FETCH_lstBusnSpend, // Load Ma chi phi theo tk
  FETCH_lstCostTypeACC, // CostType
  FETCH_lstMnfr,
} from "../constants/actionTypes.js";

export const getLstPHTAM_PHDNC = (ObjcType) => async (dispatch) => {
  try {
    // let para001 =
    //   "'" +
    //   ObjcType.DCMNCODE +
    //   "','" +
    //   ObjcType.DCMNSBCD +
    //   "','" +
    //   ObjcType.DCMNSBCD +
    //   "'," +
    //   ObjcType.OBJCTYPE +
    //   ",'" +
    //   ObjcType.OBJCCODE +
    //   "','" +
    //   ObjcType.CUOMCODE +
    //   "','','1900-01-01','',1,2";

    const body = {
      DTBSNAME: "Account",
      FUNCNAME: "spWIN_SRC_LoadBusnRfrnDcmn_Store_App",
      LCTNCODE: "{{0202}}",
      // PARA_001: para001,
      PARA_001: ObjcType,
    };
    const { data } = await api.fetchCommonFuncList(body);

    dispatch({ type: FETCH_lst_PHTAM_PHDNC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

//Danh mục Tai khoan ke toan cho cac form
export const getLstAcctDcmn = (ObjcType) => async (dispatch) => {
  const body = {
    DTBSNAME: "Account",
    FUNCNAME: "spDtaLoadAcctDcmnn_Telerik_App",
    PARA_001: ObjcType,
  };
  try {
    const { data } = await api.fetchCommonFuncList(body);
    dispatch({ type: FETCH_lstAcctDcmn, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Mã chi phí
export const getLstBusnSpend = (ObjcType) => async (dispatch) => {
  const body = {
    DTBSNAME: "Account",
    FUNCNAME: "spDtaLoadBusnSpend_App",
    LCTNCODE: "{{0202}}",
    PARA_001: ObjcType,
  };
  try {
    const { data } = await api.fetchCommonFuncList(body);

    dispatch({ type: FETCH_lstBusnSpend, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách CostType
export const getLstCostTypeACC = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstCostType_ACC",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstCostTypeACC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách CostCode
export const getLstMnfr = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstMnfrList",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstMnfr, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
