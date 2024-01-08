import React, { useEffect, useState } from "react";
import { ActionHeader, FilterHeader, GridList } from "../";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { getListHDBHD, lockHDBHD, deleteHDBHD } from "../../actions/hdbhd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

const RetailBillListMain = () => {
  const {
    beginDateList,
    endDateList,
    getLabelValue,
    userData,
    setNotificationsAutoClose,
  } = useStateContext();
  const PageInfo = {
    DcmnCode: "HDBHD",
    UrlLinkNew: "/retail-bill/new",
    UrlLink: "/retail-bill/",
    TitlePage: getLabelValue(134, "Biên nhận bán hàng"),
  };

  const navigate = useNavigate();
  const actionAdd = () => {
    navigate(PageInfo.UrlLinkNew);
  };

  const dispatch = useDispatch();
  const listHDBHD = useSelector((state) => state.hdbhd.listMaster);
  const [lstChungTu, setLstChungTu] = useState([]);
  const [CountChungTu, setCountChungTu] = useState(0);
  useEffect(() => {
    if (listHDBHD && listHDBHD.length > 0) {
      setLstChungTu(listHDBHD);
      setCountChungTu(listHDBHD.length);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    }
  }, [listHDBHD]);

  const loadListData = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      STTESIGN: 7,

      BEG_DATE: moment(beginDateList).format("YYYY-MM-DD"),
      END_DATE: moment(endDateList).format("YYYY-MM-DD"),
    };

    dispatch(getListHDBHD(body));
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
    dispatch(lockHDBHD(body));
  };
  const deleteClick = (dataItem) => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: dataItem.KKKK0000,
    };
    dispatch(deleteHDBHD(body));
  };

  return (
    <>
      <ActionHeader
        mode={"LIST"}
        AcceRght={1}
        StteSign={0}
        add={actionAdd}
        TitlePage={PageInfo.TitlePage}
        Counter={CountChungTu}
      />
      <div>
        <FilterHeader onClick={loadListData} CountChungTu={CountChungTu} />
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

export default RetailBillListMain;
