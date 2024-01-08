import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AprvInvcEditMain } from "../../components";
import { getDetailAPRVINVC, resetAPRVINVC } from "../../actions/aprvinvc";

const AprvInvcEdit = (props) => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Load danh sách list
  useEffect(() => {}, [dispatch]);

  // Load chi tiết chứng từ
  useEffect(() => {
    if (id === undefined) {
      dispatch(resetAPRVINVC());
    } else {
      dispatch(getDetailAPRVINVC(id));
    }
  }, [dispatch, id]);

  return <AprvInvcEditMain keycode={id} mode={props.mode} />;
};

export default AprvInvcEdit;
