import * as api from "../api/index.js";
import {
  FETCH_APPROVAL_PROCESS,
  FETCH_REVIEW_PROCESS,
  CLOSE_APPROVAL_PROCESS,
  CLOSE_REVIEW_PROCESS,
  Get_LvTm,
  FETCH_DcmnCntn,
  FETCH_ALL_APRVDCMN,
  RESET_APRVDCMN,
  FETCH_lstDcmnPrcs,
  FETCH_APRVDCMN,
} from "../constants/actionTypes.js";

// Quy trinh xet duyet
export const getApprovalProcess = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchApprovalProcess(body);

    dispatch({ type: FETCH_APPROVAL_PROCESS, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Qua trinh xet duyet
export const getReviewProcess = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchReviewProcess(body);

    dispatch({ type: FETCH_REVIEW_PROCESS, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const closeReviewProcess = () => async (dispatch) => {
  try {
    dispatch({ type: CLOSE_REVIEW_PROCESS, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};

export const closeApprovalProcess = () => async (dispatch) => {
  try {
    dispatch({ type: CLOSE_APPROVAL_PROCESS, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};

export const getLvTm = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchCommonDcmn(body);
    dispatch({ type: Get_LvTm, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Tim kiem cong van tai lieu
export const getListDcmnCntn = (filterdata) => async (dispatch) => {
  let var_PARA_001 = "";

  var_PARA_001 =
    var_PARA_001 +
    "'" +
    filterdata.PrcsType +
    "', '" +
    filterdata.LctnList +
    "', '" +
    filterdata.MainNumb +
    "', '" +
    filterdata.DcTpCode +
    "', '" +
    filterdata.CntnCode +
    "', '" +
    filterdata.CntnBrif +
    "', '" +
    filterdata.CntnDcmn +
    "', '" +
    filterdata.Set_Code +
    "', '" +
    filterdata.CabnCode +
    "', '" +
    filterdata.StorCabn +
    "', '" +
    filterdata.Beg_Date +
    "', '" +
    filterdata.End_Date +
    "', " +
    filterdata.ChckTime +
    ", " +
    filterdata.All_Dcmn +
    ", '" +
    filterdata.DcmnYear +
    "', '" +
    filterdata.PblsCode;
  var_PARA_001 = var_PARA_001 + "'";

  const body = {
    FUNCNAME: "sp_Win_DcmnCntn_App",
    DTBSNAME: "Document",
    LCTNCODE: "{{0202}}",
    PARA_001: var_PARA_001,
  };

  try {
    const { data } = await api.fetchCommonFuncList(body);
    dispatch({ type: FETCH_DcmnCntn, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// danh sach chung tu phe duyet
export const getLstAprvDcmn = (body) => async (dispatch) => {
  const { data } = await api.fetchCommonDcmn(body);
  try {
    dispatch({ type: FETCH_ALL_APRVDCMN, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetAPRVDCMN = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_APRVDCMN, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};

// Phe duyet chung tu
export const ApproveDocument = (body) => async (dispatch) => {
  const { data } = await api.fetchApprovalAccept(body);
  try {
    dispatch({ type: FETCH_APRVDCMN, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sach PrcsCode
export const getLstDcmnPrcs = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstDcmnPrcs",
  };

  const { data } = await api.fetchCommonList(body);
  try {
    dispatch({ type: FETCH_lstDcmnPrcs, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
