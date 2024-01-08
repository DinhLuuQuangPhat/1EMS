import * as api from "../api/index.js";
import {
  FETCH_ALL_APRVINVC,
  FETCH_DETAIL_APRVINVC,
  DELETE_APRVINVC,
  LOCK_APRVINVC,
  POST_APRVINVC,
  UPDATE_APRVINVC,
  RESET_APRVINVC,
} from "../constants/actionTypes.js";

export const getListAPRVINVC = (body) => async (dispatch) => {
  try {
    const { data } = await api.fetchListDocuments(body);

    dispatch({ type: FETCH_ALL_APRVINVC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getDetailAPRVINVC = (keycode) => async (dispatch) => {
  console.log("getDetailAPRVINVC is called with keycode = " + keycode);
  const body = {
    DCMNCODE: "inpDcmnVrch",
    KEY_CODE: keycode,
  };
  try {
    const { data } = await api.fetchDetailDocument(body);
    dispatch({ type: FETCH_DETAIL_APRVINVC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAPRVINVC = (body) => async (dispatch) => {
  try {
    const { data } = await api.deleteDocument(body);

    dispatch({ type: DELETE_APRVINVC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const lockAPRVINVC = (body) => async (dispatch) => {
  try {
    const { data } = await api.lockDocument(body);

    dispatch({ type: LOCK_APRVINVC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const postAPRVINVC = (body) => async (dispatch) => {
  try {
    const { data } = await api.postDocument(body);

    dispatch({ type: POST_APRVINVC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateAPRVINVC = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_APRVINVC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateLockAPRVINVC = (body) => async (dispatch) => {
  try {
    const { data } = await api.updateDocument(body);

    dispatch({ type: UPDATE_APRVINVC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const resetAPRVINVC = () => async (dispatch) => {
  try {
    dispatch({ type: RESET_APRVINVC, payload: {} });
  } catch (error) {
    console.log(error.message);
  }
};
