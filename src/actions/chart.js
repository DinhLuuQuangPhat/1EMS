import * as api from "../api/index.js";
import {
  FETCH_BaseIndc,
  FETCH_DataObjc,
  FETCH_TimeDsbr,
  FETCH_DsbrType,
  FETCH_DispIndc,
  FETCH_DispTime,
  FETCH_Top_Type,
  FETCH_Col_Ctgr,
  FETCH_ChrtType,
  FETCH_Add_Data,
  FETCH_ObjcDetail,
  FETCH_TimeCode,
  FETCH_Time,
  ///
  FETCH_SetDashboard,
  FETCH_lstDashboard,
  FETCH_DETAIL_Dashboard,
  FETCH_lstElemType,
} from "../constants/actionTypes";

// Danh sách Chi tieu
export const getLstBaseIndc = () => async (dispatch) => {
  try {
    const { data } = await api.fetchBaseIndc();

    dispatch({ type: FETCH_BaseIndc, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Doi tuong
export const getLstDataObjc = (ObjcData) => async (dispatch) => {
  const body = { INDCCODE: ObjcData };

  try {
    const { data } = await api.fetchDataObjc(body);

    dispatch({ type: FETCH_DataObjc, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Thoi gian lay du lieu
export const getLstTimeDsbr = () => async (dispatch) => {
  const body = { LISTCODE: "Enum_TimeDsbr" };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_TimeDsbr, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Dashboard
export const getLstDsbrType = () => async (dispatch) => {
  const body = { LISTCODE: "lstDsbrType" };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_DsbrType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Sap xep Chi tieu
export const getLstDispIndc = () => async (dispatch) => {
  const body = { LISTCODE: "Enum_dwhDispIndc" };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_DispIndc, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Sap xep Chu ky
export const getLstDispTime = () => async (dispatch) => {
  const body = { LISTCODE: "Enum_dwhDispTime" };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_DispTime, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Sap xep Loai Top
export const getLstTop_Type = () => async (dispatch) => {
  const body = { LISTCODE: "Enum_dwhTop_Type" };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_Top_Type, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Sap xep Nhóm
export const getLstCol_Ctgr = () => async (dispatch) => {
  const body = { LISTCODE: "Enum_dwhCol_Ctgr" };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_Col_Ctgr, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Loai Chart
export const getLstChartType = () => async (dispatch) => {
  const body = { LISTCODE: "Enum_dwhChrtType" };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_ChrtType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Tuy chon
export const getLstAdd_Data = () => async (dispatch) => {
  const body = { LISTCODE: "Enum_dwhAdd_Data" };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_Add_Data, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Doi tuong chi tiet
export const getLstDetlObjc = (ObjcType) => async (dispatch) => {
  const body = { LISTCODE: ObjcType };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_ObjcDetail, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Chu ky
export const getLstTimeCode = (ObjcCode) => async (dispatch) => {
  const body = {
    INDCCODE: ObjcCode,
  };

  try {
    const { data } = await api.urlDataTime(body);

    dispatch({ type: FETCH_TimeCode, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Thoi gian cung ky
export const getLstSameTime = (ObjcCode) => async (dispatch) => {
  const body = {
    LISTCODE: "Enum_rptProdType",
    CONDFLTR: "PrntCode=" + ObjcCode + '"',
  };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_Time, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

//  Set Dashboard default
export const updateDashboardDefault = (ObjcCode) => async (dispatch) => {
  const body = {
    SETTCODE: "DsbrCode",
    SETTVLUE: ObjcCode,
  };

  try {
    const { data } = await api.updateDashboardDefault(body);

    dispatch({ type: FETCH_SetDashboard, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sach Dashboard
export const getLstDashboard = (ObjcCode) => async (dispatch) => {
  const body = {
    DCMNCODE: "lstWorkEmpl",
    CONDFLTR: "'{{0102}}','{{0302}}','000005','090001','2023-06-10'",
  };

  try {
    const { data } = await api.urlCommonData(body);

    dispatch({ type: FETCH_lstDashboard, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

//  Chi tiet Dashboard
export const getDetailDashboard = (ObjcCode) => async (dispatch) => {
  const body = {
    SYSTCODE: 8,
    DSBRCODE: ObjcCode,
    LOADDATA: 3,
  };

  try {
    const { data } = await api.fetchDataDsbr(body);

    dispatch({ type: FETCH_DETAIL_Dashboard, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sach loai Chart
export const getLstElemType = () => async (dispatch) => {
  const body = {
    LISTCODE: "Enum_dwhElemType",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstElemType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
