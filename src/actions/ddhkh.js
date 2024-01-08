import * as api from "../api/index.js";
import {
  DELETE_DDHKH,
  FETCH_ALL_DDHKH,
  FETCH_DETAIL_DDHKH,
  LOCK_DDHKH,
  POST_DDHKH,
  UPDATE_DDHKH,
  RESET_DDHKH,
} from "../constants/actionTypes.js";

export const getListDDHKH = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch({ type: FETCH_ALL_DDHKH, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetailDDHKH = (keycode) => async (dispatch) => {
  const body = {
    DCMNCODE: "DDHKH",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    console.log("getDetailDDHKH is called with keycode = " + keycode);
    dispatch({ type: FETCH_DETAIL_DDHKH, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const postDDHKH = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch({ type: POST_DDHKH, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateDDHKH = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_DDHKH, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteDDHKH = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch({ type: DELETE_DDHKH, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
export const lockDDHKH = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch({ type: LOCK_DDHKH, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetDDHKH = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_DDHKH, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};
