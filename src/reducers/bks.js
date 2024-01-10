import {
  FETCH_ALL_BKS,
  DELETE_BKS,
  LOCK_BKS,
  FETCH_DETAIL_BKS,
  POST_BKS,
  UPDATE_BKS,
  RESET_BKS,
} from "../constants/actionTypes";

const BKSReducer = (
  state = {
    listMaster: [],
    detailInvc: {},
    postResult: undefined,
    insertResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_BKS:
      // return { ...state, listMaster: action.payload.data.RETNDATA };
      return { ...state, listMaster: action.payload.ConvertData };
    case FETCH_DETAIL_BKS:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_BKS:
      return { ...state, postResult: action.payload.data };
    case LOCK_BKS:
      return { ...state, postResult: action.payload.data };
    case POST_BKS:
      return { ...state, postResult: action.payload.data };
    case UPDATE_BKS:
      return { ...state, postResult: action.payload.data };
    case RESET_BKS:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default BKSReducer;
