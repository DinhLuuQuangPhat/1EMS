import * as api from "../api/index.js";
import {
    FETCH_ALL_DSCH,
    FETCH_DETAIL_DSCH,
    DELETE_DSCH,
    LOCK_DSCH,
    POST_DSCH,
    UPDATE_DSCH,
    RESET_DSCH,
} from "../constants/actionTypes.js";

export const getListDSCH = (body) => async (dispatch) => {
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

        dispatch({ type: FETCH_ALL_DSCH, payload: { ConvertData } });
    } catch (error) {
        console.log(error.message);
    }
};

export const getDetailDSCH = (keycode) => async (dispatch) => {
    console.log("getDetailDSCH is called with keycode = " + keycode);
    const body = {
        DCMNCODE: "inpWorkOder",
        KEY_CODE: keycode,
    };
    try {
        const { data } = await api.fetchDetailDocument(body);
        dispatch({ type: FETCH_DETAIL_DSCH, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const deleteDSCH = (body) => async (dispatch) => {
    try {
        const { data } = await api.deleteDocument(body);

        dispatch({ type: DELETE_DSCH, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const postDSCH = (body) => async (dispatch) => {
    try {
        const { data } = await api.postDocument(body);

        dispatch({ type: POST_DSCH, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const updateDSCH = (body) => async (dispatch) => {
    try {
        const { data } = await api.updateDocument(body);

        dispatch({ type: UPDATE_DSCH, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

// export const updateLockDSCH = (body) => async (dispatch) => {
//   try {
//     const { data } = await api.updateDocument(body);

//     dispatch({ type: UPDATE_DSCH, payload: { data } });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

export const lockDSCH = (body) => async (dispatch) => {
    try {
        const { data } = await api.lockDocument(body);

        dispatch({ type: LOCK_DSCH, payload: { data } });
    } catch (error) {
        console.log(error.message);
    }
};

export const resetDSCH = () => async (dispatch) => {
    try {
        dispatch({ type: RESET_DSCH, payload: {} });
    } catch (error) {
        console.log(error.message);
    }
};
