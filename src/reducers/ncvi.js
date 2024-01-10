import {
  FETCH_ALL_NCVI,
  DELETE_NCVI,
  LOCK_NCVI,
  FETCH_DETAIL_NCVI,
  POST_NCVI,
  UPDATE_NCVI,
  RESET_NCVI,
} from "../constants/actionTypes";

const NCVIReducer = (
  state = {
    listMaster: [],
    detailInvc: {},
    postResult: undefined,
    insertResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_NCVI:
      // return { ...state, listMaster: action.payload.data.RETNDATA };
      return { ...state, listMaster: action.payload.ConvertData };
    case FETCH_DETAIL_NCVI:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_NCVI:
      return { ...state, postResult: action.payload.data };
    case LOCK_NCVI:
      return { ...state, postResult: action.payload.data };
    case POST_NCVI:
      return { ...state, postResult: action.payload.data };
    case UPDATE_NCVI:
      return { ...state, postResult: action.payload.data };
    case RESET_NCVI:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default NCVIReducer;
