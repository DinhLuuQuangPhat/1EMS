import {
  FETCH_ALL_DSCH,
  DELETE_DSCH,
  LOCK_DSCH,
  FETCH_DETAIL_DSCH,
  POST_DSCH,
  UPDATE_DSCH,
  RESET_DSCH,
} from "../constants/actionTypes";

const DSCHReducer = (
  state = {
    listMaster: [],
    detailInvc: {},
    postResult: undefined,
    insertResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_DSCH:
      // return { ...state, listMaster: action.payload.data.RETNDATA };
      return { ...state, listMaster: action.payload.ConvertData };
    case FETCH_DETAIL_DSCH:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_DSCH:
      return { ...state, postResult: action.payload.data };
    case LOCK_DSCH:
      return { ...state, postResult: action.payload.data };
    case POST_DSCH:
      return { ...state, postResult: action.payload.data };
    case UPDATE_DSCH:
      return { ...state, postResult: action.payload.data };
    case RESET_DSCH:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default DSCHReducer;
