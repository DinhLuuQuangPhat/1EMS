import * as api from "../api/index.js";
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

// Danh sách loại đối tượng thanh toán
export const getArrayProductAll = () => async (dispatch) => {
  const body = { LISTCODE: "lstFullProduct", CONDFLTR: "" };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_ArrayProductAll, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
