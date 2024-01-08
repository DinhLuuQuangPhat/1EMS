import {
  FETCH_ArrayProductAll,
  FETCH_ArrayProduct,
  FETCH_ArrayNVL,
  FETCH_ArrayCCDC,
  FETCH_ArraySupplier,
  FETCH_ArrayCustomer,
  FETCH_ArrayQUOM,
  FETCH_ArraySortSale,
  FETCH_ArraySort,
  FETCH_ArrayWarehouse,
} from "../constants/actionTypes.js";

const arrayListReducer = (
  state = {
    arrayProductAll: [],
    arrayProduct: [],
    arrayNVL: [],
    arrayCCDC: [],
    arraySupplier: [],
    arrayCustomer: [],
    arrayQUOM: [],
  },
  action
) => {
  switch (action.type) {
    case FETCH_ArrayProductAll:
      return {
        ...state,
        arrayProductAll:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_ArrayProduct:
      return {
        ...state,
        arrayProduct:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_ArrayNVL:
      return {
        ...state,
        arrayNVL:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_ArrayCCDC:
      return {
        ...state,
        arrayCCDC:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_ArraySupplier:
      return {
        ...state,
        arraySupplier:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_ArrayCustomer:
      return {
        ...state,
        arrayCustomer:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_ArrayQUOM:
      return {
        ...state,
        arrayQUOM:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };

    default:
      return state;
  }
};
export default arrayListReducer;
