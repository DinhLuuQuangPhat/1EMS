import * as api from "../api/index.js";
import {
  FETCH_ALL_APRVTEMP,
  FETCH_DETAIL_APRVTEMP,
  DELETE_APRVTEMP,
  LOCK_APRVTEMP,
  POST_APRVTEMP,
  UPDATE_APRVTEMP,
  RESET_APRVTEMP,
} from "../constants/actionTypes.js";

export const getListAPRVTEMP = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch({ type: FETCH_ALL_APRVTEMP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetailAPRVTEMP = (keycode) => async (dispatch) => {
  console.log("getDetailHDXDC is called with keycode = " + keycode);
  const body = {
    DCMNCODE: "HDXDC",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    dispatch({ type: FETCH_DETAIL_APRVTEMP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAPRVTEMP = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch({ type: DELETE_APRVTEMP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const lockAPRVTEMP = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch({ type: LOCK_APRVTEMP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const postAPRVTEMP = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch({ type: POST_APRVTEMP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateAPRVTEMP = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_APRVTEMP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLockAPRVTEMP = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_APRVTEMP, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetAPRVTEMP = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_APRVTEMP, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};
