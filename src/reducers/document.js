import {
  FETCH_APPROVAL_PROCESS,
  FETCH_REVIEW_PROCESS,
  Get_LvTm,
  FETCH_DcmnCntn,
  FETCH_ALL_APRVDCMN,
  RESET_APRVDCMN,
  FETCH_lstDcmnPrcs,
  FETCH_APRVDCMN,
} from "../constants/actionTypes";

const documentReducer = (
  state = {
    approvalProcess: {
      showPopup: false,
      data: [],
    },
    reviewProcess: {
      showPopup: false,
      data: [],
    },
    leaveTime: {},
    lstDcmnCntn: [],
    lstAprvDcmn: [],
    postResult: undefined,
    lstDcmnPrcs: [],
    fetch_AprvDcmn: [],
  },
  action
) => {
  switch (action.type) {
    case FETCH_APPROVAL_PROCESS:
      return {
        ...state,
        approvalProcess: {
          showPopup: true,
          data: action.payload.data.RETNDATA,
        },
      };
    case FETCH_REVIEW_PROCESS:
      return {
        ...state,
        reviewProcess: {
          showPopup: true,
          data: action.payload.data.RETNDATA,
        },
      };
    case Get_LvTm:
      return {
        ...state,
        leaveTime: {
          data: action.payload.data.RETNDATA,
        },
      };
    case FETCH_DcmnCntn:
      return {
        ...state,
        lstDcmnCntn: {
          data: action.payload.data.RETNDATA,
        },
      };
    case FETCH_ALL_APRVDCMN:
      return {
        ...state,
        lstAprvDcmn: {
          data: action.payload.data.RETNDATA,
        },
      };
    case RESET_APRVDCMN:
      return { ...state, postResult: undefined };
    case FETCH_lstDcmnPrcs:
      return {
        ...state,
        lstDcmnPrcs:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_APRVDCMN:
      return {
        ...state,
        postResult: action.payload.data,
      };

    default:
      return state;
  }
};
export default documentReducer;
