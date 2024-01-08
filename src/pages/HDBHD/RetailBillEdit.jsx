import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { RetailBillEditMain } from "../../components";
import {
  getLstProvince,
  getLstPayMthd,
  getLstCUOM,
  getLstCustomer,
  getLstWareHouse,
  getLstCounter,
  getLstVATRate,
  getLstProduct,
} from "../../actions/common";
import { getDetailHDBHD, resetHDBHD } from "../../actions/hdbhd";

const RetailBillEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Load danh sách list
  useEffect(() => {
    dispatch(getLstCustomer());
    dispatch(getLstWareHouse());
    dispatch(getLstCounter());
    dispatch(getLstCUOM());
    dispatch(getLstProvince());
    dispatch(getLstPayMthd());
    dispatch(getLstVATRate());
    dispatch(getLstProduct());
  }, [dispatch]);

  // Load chi tiết chứng từ
  useEffect(() => {
    if (id === undefined) {
      dispatch(resetHDBHD());
    } else {
      dispatch(getDetailHDBHD(id));
    }
  }, [dispatch, id]);

  return <RetailBillEditMain keycode={id} mode={props.mode} />;
};

export default RetailBillEdit;
