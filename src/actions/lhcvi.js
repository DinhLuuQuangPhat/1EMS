import * as api from "../api/index.js";
import {
    FETCH_ALL_LHCVI,
    FETCH_DETAIL_LHCVI,
    DELETE_LHCVI,
    LOCK_LHCVI,
    POST_LHCVI,
    UPDATE_LHCVI,
    RESET_LHCVI,
} from "../constants/actionTypes.js";

export const getListLHCVI = (body) => async (dispatch) => {
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

        dispatch({ type: FETCH_ALL_LHCVI, payload: { ConvertData } });
    } catch (error) {
        console.log(error.message);
    }
};

export const getDetailLHCVI = (keycode) => async (dispatch) => {
    console.log("getDetailLHCVI is called with keycode = " + keycode);
    const body = {
        DCMNCODE: "inpWorkType",
        KEY_CODE: keycode,
    };
    try {
        const { data } = await api.fetchDetailDocument(body);
        dispatch({ type: FETCH_DETAIL_LHCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteLHCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.deleteDocument(body);

        dispatch({ type: DELETE_LHCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const postLHCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.postDocument(body);

        dispatch({ type: POST_LHCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateLHCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.updateDocument(body);

        dispatch({ type: UPDATE_LHCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

// export const updateLockLHCVI = (body) => async (dispatch) => {
//   try {
//     const { data } = await api.updateDocument(body);

//     dispatch({ type: UPDATE_LHCVI, payload: { data } });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const lockLHCVI = (body) => async (dispatch) => {
    try {
        const { data } = await api.lockDocument(body);

        dispatch({ type: LOCK_LHCVI, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const resetLHCVI = () => async (dispatch) => {
    try {
        dispatch({ type: RESET_LHCVI, payload: {} });
    } catch (error) {
        console.log(error.message);
    }
};
