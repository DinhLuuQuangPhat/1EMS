import * as api from "../api/index.js";
import {
    FETCH_ALL_TCCVI,
    FETCH_DETAIL_TCCVI,
    DELETE_TCCVI,
    LOCK_TCCVI,
    POST_TCCVI,
    UPDATE_TCCVI,
    RESET_TCCVI,
} from "../constants/actionTypes.js";

export const getListTCCVI = (body) => async (dispatch) => {
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

        dispatch({ type: FETCH_ALL_TCCVI, payload: { ConvertData } });
    } catch (error) {
        console.log(error.message);
    }
};

export const getDetailTCCVI = (keycode) => async (dispatch) => {
    console.log("getDetailTCCVI is called with keycode = " + keycode);
    const body = {
        DCMNCODE: "inpWorkPrcs",
        KEY_CODE: keycode,
    };
    try {
        const { data } = await api.fetchDetailDocument(body);
        dispatch({ type: FETCH_DETAIL_TCCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteTCCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.deleteDocument(body);

        dispatch({ type: DELETE_TCCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const postTCCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.postDocument(body);

        dispatch({ type: POST_TCCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateTCCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.updateDocument(body);

        dispatch({ type: UPDATE_TCCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

// export const updateLockTCCVI = (body) => async (dispatch) => {
//   try {
//     const { data } = await api.updateDocument(body);

//     dispatch({ type: UPDATE_TCCVI, payload: { data } });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const lockTCCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.lockDocument(body);

        dispatch({ type: LOCK_TCCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const resetTCCVI = () => async (dispatch) => {
    try {
        dispatch({ type: RESET_TCCVI, payload: {} });
    } catch (error) {
        console.log(error.message);
    }
};
