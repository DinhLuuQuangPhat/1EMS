import {
  FETCH_ALL_TCCVI,
  DELETE_TCCVI,
  LOCK_TCCVI,
  FETCH_DETAIL_TCCVI,
  POST_TCCVI,
  UPDATE_TCCVI,
  RESET_TCCVI,
} from "../constants/actionTypes";

const TCCVIReducer = (
  state = {
    listMaster: [],
    detailInvc: {},
    postResult: undefined,
    insertResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_TCCVI:
      // return { ...state, listMaster: action.payload.data.RETNDATA };
      return { ...state, listMaster: action.payload.ConvertData };
    case FETCH_DETAIL_TCCVI:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_TCCVI:
      return { ...state, postResult: action.payload.data };
    case LOCK_TCCVI:
      return { ...state, postResult: action.payload.data };
    case POST_TCCVI:
      return { ...state, postResult: action.payload.data };
    case UPDATE_TCCVI:
      return { ...state, postResult: action.payload.data };
    case RESET_TCCVI:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default TCCVIReducer;
