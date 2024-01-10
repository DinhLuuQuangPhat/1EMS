import {
  FETCH_ALL_LHCVI,
  DELETE_LHCVI,
  LOCK_LHCVI,
  FETCH_DETAIL_LHCVI,
  POST_LHCVI,
  UPDATE_LHCVI,
  RESET_LHCVI,
} from "../constants/actionTypes";

const LHCVIReducer = (
  state = {
    listMaster: [],
    detailInvc: {},
    postResult: undefined,
    insertResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_LHCVI:
      // return { ...state, listMaster: action.payload.data.RETNDATA };
      return { ...state, listMaster: action.payload.ConvertData };
    case FETCH_DETAIL_LHCVI:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_LHCVI:
      return { ...state, postResult: action.payload.data };
    case LOCK_LHCVI:
      return { ...state, postResult: action.payload.data };
    case POST_LHCVI:
      return { ...state, postResult: action.payload.data };
    case UPDATE_LHCVI:
      return { ...state, postResult: action.payload.data };
    case RESET_LHCVI:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default LHCVIReducer;
