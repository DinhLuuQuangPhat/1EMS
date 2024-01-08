import React, { useEffect } from "react";
import { ServiceContactEditMain } from "../../components";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAppEmplList, getLstDcmn_Sub } from "../../actions/common";
import { getDetailLHCV, resetLHCV } from "../../actions/lhcv";

const ServiceContactsEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const LctnCode = JSON.parse(localStorage.getItem("userData")).LCTNCODE;

  useEffect(() => {
    dispatch(getAppEmplList(LctnCode));
    dispatch(getLstDcmn_Sub("LHCV"));
  }, [dispatch]);

  // Load chi tiết chứng từ
  useEffect(() => {
    if (id === undefined) {
      dispatch(resetLHCV());
      dispatch(getDetailLHCV());
    } else {
      dispatch(getDetailLHCV(id));
    }
  }, [dispatch, id]);

  return <ServiceContactEditMain keycode={id} mode={props.mode} />;
};

export default ServiceContactsEdit;
