import {
  FETCH_ALL_APRVTEMP,
  FETCH_DETAIL_APRVTEMP,
  DELETE_APRVTEMP,
  LOCK_APRVTEMP,
  POST_APRVTEMP,
  UPDATE_APRVTEMP,
  RESET_APRVTEMP,
} from "../constants/actionTypes";

const aprvtempReducer = (
  state = {
    listMaster: [],
    detailInvc: {},
    postResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_APRVTEMP:
      return { ...state, listMaster: action.payload.data.RETNDATA };
    case FETCH_DETAIL_APRVTEMP:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_APRVTEMP:
      return { ...state, postResult: action.payload.data };
    case LOCK_APRVTEMP:
      return { ...state, postResult: action.payload.data };
    case POST_APRVTEMP:
      return { ...state, postResult: action.payload.data };
    case UPDATE_APRVTEMP:
      return { ...state, postResult: action.payload.data };
    case RESET_APRVTEMP:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default aprvtempReducer;
