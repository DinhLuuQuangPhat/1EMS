import {
  DELETE_DDHKH,
  FETCH_ALL_DDHKH,
  FETCH_DETAIL_DDHKH,
  LOCK_DDHKH,
  POST_DDHKH,
  UPDATE_DDHKH,
  RESET_DDHKH,
} from "../constants/actionTypes";

const ddhkhReducer = (
  state = { listMaster: [], detailInvc: {}, postResult: undefined },
  action
) => {
  switch (action.type) {
    case FETCH_ALL_DDHKH:
      return { ...state, listMaster: action.payload.data.RETNDATA };
    case FETCH_DETAIL_DDHKH:
      return {
        ...state,
        detailInvc:
          action.payload.data.RETNDATA !== undefined
            ? action.payload.data.RETNDATA[0]
            : {},
      };
    case DELETE_DDHKH:
      return { ...state, postResult: action.payload.data };
    case POST_DDHKH:
      return { ...state, postResult: action.payload.data };
    case UPDATE_DDHKH:
      return { ...state, postResult: action.payload.data };
    case LOCK_DDHKH:
      return { ...state, postResult: action.payload.data };
    case RESET_DDHKH:
      return { ...state, postResult: undefined };

    default:
      return state;
  }
};
export default ddhkhReducer;
