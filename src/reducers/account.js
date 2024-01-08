import {
  FETCH_lst_PHTAM_PHDNC,
  FETCH_lstBusnSpend,
  FETCH_lstAcctDcmn, // Load danh sach tk Ke toan
  FETCH_lstCostTypeACC,
  FETCH_lstMnfr,
} from "../constants/actionTypes";

const lstAccountReducer = (
  state = {
    lst_PHTAM_PHDNC: [],
    lstBusnSpend: [],
    lstAcctDcmn: [],
    lstCostTypeACC: [],
    lstMnfr: [],
  },
  action
) => {
  switch (action.type) {
    case FETCH_lst_PHTAM_PHDNC:
      return {
        ...state,
        lst_PHTAM_PHDNC:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };

    case FETCH_lstBusnSpend:
      return {
        ...state,
        lstBusnSpend:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstAcctDcmn:
      return {
        ...state,
        lstAcctDcmn:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstCostTypeACC:
      return {
        ...state,
        lstCostTypeACC:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstMnfr:
      return {
        ...state,
        lstMnfr:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };

    default:
      return state;
  }
};
export default lstAccountReducer;
