import {
  FETCH_ALL_HDBHD,
  FETCH_DETAIL_HDBHD,
  DELETE_HDBHD,
  POST_HDBHD,
  UPDATE_HDBHD,
  LOCK_HDBHD,
  RESET_HDBHD,
} from "../constants/actionTypes";

const hdbhdReducer = (
  state = {
    listMaster: [],
    detailInvc: {},
    postResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_HDBHD:
      return { ...state, listMaster: action.payload.ConvertData };
    case FETCH_DETAIL_HDBHD:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_HDBHD:
      return { ...state, postResult: action.payload.data };
    case POST_HDBHD:
      return { ...state, postResult: action.payload.data };
    case UPDATE_HDBHD:
      return { ...state, postResult: action.payload.data };
    case LOCK_HDBHD:
      return { ...state, postResult: action.payload.data };
    case RESET_HDBHD:
      return { ...state, postResult: undefined };

    default:
      return state;
  }
};
export default hdbhdReducer;
