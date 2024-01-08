import * as api from "../api/index.js";
import {
  FETCH_ALL_HDBHD,
  FETCH_DETAIL_HDBHD,
  DELETE_HDBHD,
  POST_HDBHD,
  UPDATE_HDBHD,
  LOCK_HDBHD,
  RESET_HDBHD,
} from "../constants/actionTypes.js";
// lay danh sach ct Master
export const getListHDBHD = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);
    const ConvertData = data.RETNDATA.map((item) => {
      return {
        KKKK0000: item.KKKK0000,
        MAINCODE: item.MAINCODE,
        MAINDATE: new Date(item.MAINDATE),
        NOTETEXT: item.NOTETEXT,
        STTENAME: item.STTENAME,
        STTESIGN: item.STTESIGN,
      };
    });

    // dispatch({ type: FETCH_ALL_HDBHD, payload: { data } });
    dispatch({ type: FETCH_ALL_HDBHD, payload: { ConvertData } });
  } catch (error) {
    console.log(error.message);
  }
};
// lay chi tiet ct theo DcmnCode & Key_Code
export const getDetailHDBHD = (keycode) => async (dispatch) => {
  console.log("getDetailHDBHD is called with keycode = " + keycode);
  const body = {
    DCMNCODE: "HDBHD",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    dispatch({ type: FETCH_DETAIL_HDBHD, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteHDBHD = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch({ type: DELETE_HDBHD, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const postHDBHD = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch({ type: POST_HDBHD, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateHDBHD = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_HDBHD, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLockHDBHD = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_HDBHD, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const lockHDBHD = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch({ type: LOCK_HDBHD, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetHDBHD = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_HDBHD, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};
