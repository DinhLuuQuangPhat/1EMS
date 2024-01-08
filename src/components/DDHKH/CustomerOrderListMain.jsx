import React, { useEffect, useState } from "react";
import { ActionHeader, FilterHeader, GridList } from "../";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { deleteDDHKH, getListDDHKH, lockDDHKH } from "../../actions/ddhkh";

const CustomerOrderListMain = () => {
  const {
    beginDateList,
    endDateList,
    getLabelValue,
    userData,
    setNotificationsAutoClose,
  } = useStateContext();
  const PageInfo = {
    DcmnCode: "DDHKH",
    UrlLinkNew: "/order-end-user/new",
    UrlLink: "/order-end-user/",
    TitlePage: getLabelValue(24, "Đơn đặt hàng"),
  };

  const navigate = useNavigate();
  const actionAdd = () => {
    navigate(PageInfo.UrlLinkNew);
  };

  const dispatch = useDispatch();
  const listDDHKH = useSelector((state) => state.ddhkh.listMaster);

  const [lstChungTu, setLstChungTu] = useState([]);
  const [CountChungTu, setCountChungTu] = useState(0);
  useEffect(() => {
    if (listDDHKH && listDDHKH.length > 0) {
      setLstChungTu(listDDHKH);
      setCountChungTu(listDDHKH.length);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    } else {
      setLstChungTu([]);
      setCountChungTu(0);
    }
  }, [listDDHKH]);

  const loadListData = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      STTESIGN: 7,
      BEG_DATE: moment(beginDateList).format("YYYY-MM-DD"),
      END_DATE: moment(endDateList).format("YYYY-MM-DD"),
    };

    dispatch(getListDDHKH(body));
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
    dispatch(lockDDHKH(body));
  };
  const deleteClick = (dataItem) => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: dataItem.KKKK0000,
    };
    dispatch(deleteDDHKH(body));
  };

  return (
    <>
      <ActionHeader
        mode={"LIST"}
        AcceRght={0}
        StteSign={0}
        add={actionAdd}
        TitlePage={PageInfo.TitlePage}
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

export default CustomerOrderListMain;
