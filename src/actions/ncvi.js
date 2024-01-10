import * as api from "../api/index.js";
import {
    FETCH_ALL_NCVI,
    FETCH_DETAIL_NCVI,
    DELETE_NCVI,
    LOCK_NCVI,
    POST_NCVI,
    UPDATE_NCVI,
    RESET_NCVI,
} from "../constants/actionTypes.js";

export const getListNCVI = (body) => async (dispatch) => {
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

        dispatch({ type: FETCH_ALL_NCVI, payload: { ConvertData } });
    } catch (error) {
        console.log(error.message);
    }
};

export const getDetailNCVI = (keycode) => async (dispatch) => {
    console.log("getDetailNCVI is called with keycode = " + keycode);
    const body = {
        DCMNCODE: "inpWorkOder",
        KEY_CODE: keycode,
    };
    try {
        const { data } = await api.fetchDetailDocument(body);
        dispatch({ type: FETCH_DETAIL_NCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteNCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.deleteDocument(body);

        dispatch({ type: DELETE_NCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const postNCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.postDocument(body);

        dispatch({ type: POST_NCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateNCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.updateDocument(body);

        dispatch({ type: UPDATE_NCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

// export const updateLockNCVI = (body) => async (dispatch) => {
//   try {
//     const { data } = await api.updateDocument(body);

//     dispatch({ type: UPDATE_NCVI, payload: { data } });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const lockNCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.lockDocument(body);

        dispatch({ type: LOCK_NCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const resetNCVI = () => async (dispatch) => {
    try {
        dispatch({ type: RESET_NCVI, payload: {} });
    } catch (error) {
        console.log(error.message);
    }
};
