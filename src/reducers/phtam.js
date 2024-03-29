import {
  FETCH_ALL_PHTAM,
  DELETE_PHTAM,
  LOCK_PHTAM,
  FETCH_DETAIL_PHTAM,
  POST_PHTAM,
  UPDATE_PHTAM,
  RESET_PHTAM,
} from "../constants/actionTypes";

const PHTAMReducer = (
  state = {
    listMaster: [],
    detailInvc: {},
    postResult: undefined,
    insertResult: undefined,
  },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_PHTAM:
      // return { ...state, listMaster: action.payload.data.RETNDATA };
      return { ...state, listMaster: action.payload.ConvertData };
    case FETCH_DETAIL_PHTAM:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_PHTAM:
      return { ...state, postResult: action.payload.data };
    case LOCK_PHTAM:
      return { ...state, postResult: action.payload.data };
    case POST_PHTAM:
      return { ...state, postResult: action.payload.data };
    case UPDATE_PHTAM:
      return { ...state, postResult: action.payload.data };
    case RESET_PHTAM:
      return { ...state, postResult: undefined };
    default:
      return state;
  }
};
export default PHTAMReducer;
