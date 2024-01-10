import {
  FETCH_ALL_TTCVI,
  DELETE_TTCVI,
  LOCK_TTCVI,
  FETCH_DETAIL_TTCVI,
  POST_TTCVI,
  UPDATE_TTCVI,
  RESET_TTCVI,
} from "../constants/actionTypes";

const TTCVIReducer = (
  state = {
    listMaster: [],
    detailInvc: {},
    postResult: undefined,
    insertResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_TTCVI:
      // return { ...state, listMaster: action.payload.data.RETNDATA };
      return { ...state, listMaster: action.payload.ConvertData };
    case FETCH_DETAIL_TTCVI:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_TTCVI:
      return { ...state, postResult: action.payload.data };
    case LOCK_TTCVI:
      return { ...state, postResult: action.payload.data };
    case POST_TTCVI:
      return { ...state, postResult: action.payload.data };
    case UPDATE_TTCVI:
      return { ...state, postResult: action.payload.data };
    case RESET_TTCVI:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default TTCVIReducer;
