import {
  FETCH_ALL_APRVINVC,
  FETCH_DETAIL_APRVINVC,
  DELETE_APRVINVC,
  LOCK_APRVINVC,
  POST_APRVINVC,
  UPDATE_APRVINVC,
  RESET_APRVINVC,
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
    case FETCH_ALL_APRVINVC:
      return { ...state, listMaster: action.payload.data.RETNDATA };
    case FETCH_DETAIL_APRVINVC:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_APRVINVC:
      return { ...state, postResult: action.payload.data };
    case LOCK_APRVINVC:
      return { ...state, postResult: action.payload.data };
    case POST_APRVINVC:
      return { ...state, postResult: action.payload.data };
    case UPDATE_APRVINVC:
      return { ...state, postResult: action.payload.data };
    case RESET_APRVINVC:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default aprvtempReducer;
