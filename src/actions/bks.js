import * as api from "../api/index.js";
import {
    FETCH_ALL_BKS,
    FETCH_DETAIL_BKS,
    DELETE_BKS,
    LOCK_BKS,
    POST_BKS,
    UPDATE_BKS,
    RESET_BKS,
} from "../constants/actionTypes.js";

export const getListBKS = (body) => async (dispatch) => {
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

        dispatch({ type: FETCH_ALL_BKS, payload: { ConvertData } });
    } catch (error) {
        console.log(error.message);
    }
};

export const getDetailBKS = (keycode) => async (dispatch) => {
    console.log("getDetailBKS is called with keycode = " + keycode);
    const body = {
        DCMNCODE: "inpWorkOder",
        KEY_CODE: keycode,
    };
    try {
        const { data } = await api.fetchDetailDocument(body);
        dispatch({ type: FETCH_DETAIL_BKS, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteBKS = (body) => async (dispatch) => {
    try {
        const { data } = await api.deleteDocument(body);

        dispatch({ type: DELETE_BKS, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const postBKS = (body) => async (dispatch) => {
    try {
        const { data } = await api.postDocument(body);

        dispatch({ type: POST_BKS, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateBKS = (body) => async (dispatch) => {
    try {
        const { data } = await api.updateDocument(body);

        dispatch({ type: UPDATE_BKS, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

// export const updateLockBKS = (body) => async (dispatch) => {
//   try {
//     const { data } = await api.updateDocument(body);

//     dispatch({ type: UPDATE_BKS, payload: { data } });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const lockBKS = (body) => async (dispatch) => {
    try {
        const { data } = await api.lockDocument(body);

        dispatch({ type: LOCK_BKS, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const resetBKS = () => async (dispatch) => {
    try {
        dispatch({ type: RESET_BKS, payload: {} });
    } catch (error) {
        console.log(error.message);
    }
};
