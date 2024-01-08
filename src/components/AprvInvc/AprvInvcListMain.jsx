import React, { useEffect, useState } from "react";
import { ActionHeader, FilterHeader, GridList } from "../";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import {
  getListAPRVINVC,
  lockAPRVINVC,
  deleteAPRVINVC,
} from "../../actions/aprvinvc";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const AprvInvcListMain = () => {
  const {
    beginDateList,
    endDateList,
    getLabelValue,
    userData,
    setNotificationsAutoClose,
  } = useStateContext();
  const PageInfo = {
    DcmnCode: "inpDcmnVrch",
    UrlLinkNew: "/aprv-invc/new",
    UrlLink: "/aprv-invc/",
    TitlePage: getLabelValue(169, "Tờ trình ký"),
  };

  const navigate = useNavigate();
  const actionAdd = () => {
    navigate(PageInfo.UrlLinkNew);
  };

  const dispatch = useDispatch();
  const listAprvInvc = useSelector((state) => state.aprvinvc.listMaster);
  const [lstChungTu, setLstChungTu] = useState([]);
  const [CountChungTu, setCountChungTu] = useState(0);
  useEffect(() => {
    if (listAprvInvc && listAprvInvc.length > 0) {
      setLstChungTu(listAprvInvc);
      setCountChungTu(listAprvInvc.length);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    }
  }, [listAprvInvc]);

  const loadListData = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      STTESIGN: 7,

      BEG_DATE: moment(beginDateList).format("YYYY-MM-DD"),
      END_DATE: moment(endDateList).format("YYYY-MM-DD"),
    };

    dispatch(getListAPRVINVC(body));
  };
  useEffect(() => {
    loadListData();
  }, [userData]);

  // Thuc thi tac vu
  const lockClick = (dataItem) => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: dataItem.KKKK0000,
    };
    dispatch(lockAPRVINVC(body));
  };
  const deleteClick = (dataItem) => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: dataItem.KKKK0000,
    };
    dispatch(deleteAPRVINVC(body));
  };

  return (
    <>
      <ActionHeader
        mode={"LIST"}
        AcceRght={0}
        StteSign={0}
        add={actionAdd}
        TitlePage={PageInfo.TitlePage}
        Counter={CountChungTu}
      />
      <div>
        <FilterHeader onClick={loadListData} />
        <GridList
          datalist={lstChungTu}
          UrlLink={PageInfo.UrlLink}
          lockClick={lockClick}
          deleteClick={deleteClick}
        />
      </div>
    </>
  );
};

export default AprvInvcListMain;
