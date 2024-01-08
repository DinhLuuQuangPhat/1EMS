import React, { useEffect } from "react";
import CustomerOrderEditMain from "../../components/DDHKH/CustomerOrderEditMain";
import { useDispatch } from "react-redux";
import {
  getLstCUOM,
  getLstCustomer,
  getLstDlvrMthd,
  getLstDlvrType,
  getLstOrgnCode,
  getLstPayMthd,
  getLstProductAll,
  getLstProvince,
  getLstPymnPerd,
  getLstQUOM,
  getLstSortSale,
  getLstVATRate,
  getLstDlvrAddr,
} from "../../actions/common";
import { useParams } from "react-router-dom";
import { getDetailDDHKH } from "../../actions/ddhkh";

const CustomerOrderEdit = ({ mode }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getDetailDDHKH(id));
    dispatch(getLstCustomer());
    dispatch(getLstVATRate());
    dispatch(getLstDlvrMthd());
    dispatch(getLstDlvrType());
    dispatch(getLstDlvrAddr());
    dispatch(getLstPayMthd());
    dispatch(getLstPymnPerd());
    dispatch(getLstOrgnCode());
    dispatch(getLstSortSale());
    dispatch(getLstCUOM());
    dispatch(getLstQUOM());
    dispatch(getLstProvince());
    dispatch(getLstProductAll());
  }, [dispatch]);
  return <CustomerOrderEditMain mode={mode} />;
};

export default CustomerOrderEdit;
