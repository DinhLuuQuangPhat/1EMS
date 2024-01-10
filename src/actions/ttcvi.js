import * as api from "../api/index.js";
import {
    FETCH_ALL_TTCVI,
    FETCH_DETAIL_TTCVI,
    DELETE_TTCVI,
    LOCK_TTCVI,
    POST_TTCVI,
    UPDATE_TTCVI,
    RESET_TTCVI,
} from "../constants/actionTypes.js";

export const getListTTCVI = (body) => async (dispatch) => {
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

        dispatch({ type: FETCH_ALL_TTCVI, payload: { ConvertData } });
    } catch (error) {
        console.log(error.message);
    }
};

export const getDetailTTCVI = (keycode) => async (dispatch) => {
    console.log("getDetailTTCVI is called with keycode = " + keycode);
    const body = {
        DCMNCODE: "inpWorkOder",
        KEY_CODE: keycode,
    };
    try {
        const { data } = await api.fetchDetailDocument(body);
        dispatch({ type: FETCH_DETAIL_TTCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteTTCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.deleteDocument(body);

        dispatch({ type: DELETE_TTCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const postTTCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.postDocument(body);

        dispatch({ type: POST_TTCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateTTCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.updateDocument(body);

        dispatch({ type: UPDATE_TTCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

// export const updateLockTTCVI = (body) => async (dispatch) => {
//   try {
//     const { data } = await api.updateDocument(body);

//     dispatch({ type: UPDATE_TTCVI, payload: { data } });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const lockTTCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.lockDocument(body);

        dispatch({ type: LOCK_TTCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const resetTTCVI = () => async (dispatch) => {
    try {
        dispatch({ type: RESET_TTCVI, payload: {} });
    } catch (error) {
        console.log(error.message);
    }
};
