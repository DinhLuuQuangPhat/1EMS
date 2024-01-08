import React from "react";
import { useState, useEffect } from "react";

import { ActionHeader, FilterHeader, GridList, DialogDelete } from "../";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  getListPHDNC,
  deletePHDNC,
  lockPHDNC,
  resetPHDNC,
} from "../../actions/phdnc";

const SpendSuggestListMain = () => {
  const {
    setNotificationsAutoClose,
    getLabelValue,
    userData,
    setDisableLocation,
    beginDateList,
    endDateList,
  } = useStateContext();

  const PageInfo = {
    DcmnCode: "PHDNC",
    UrlLinkNew: "/spnd-sgst/new",
    UrlLink: "/spnd-sgst/",
    TitlePage: getLabelValue(198, "Phiếu Đề nghị thanh toán"),
  };

  const navigate = useNavigate();
  const actionAdd = () => {
    navigate(PageInfo.UrlLinkNew);
  };

  const dispatch = useDispatch();
  const listPHDNC = useSelector((state) => state.phdnc.listMaster);

  const [lstChungTu, setLstChungTu] = useState([]);
  const [CountChungTu, setCountChungTu] = useState(0);
  useEffect(() => {
    if (listPHDNC && listPHDNC.length > 0) {
      setLstChungTu(listPHDNC);
      setCountChungTu(listPHDNC.length);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    }
    if (listPHDNC && listPHDNC.length === 0) {
      setLstChungTu([]);
      setCountChungTu(0);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    }
  }, [listPHDNC]);

  const loadListData = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      STTESIGN: 7,

      BEG_DATE: moment(beginDateList).format("YYYY-MM-DD"),
      END_DATE: moment(endDateList).format("YYYY-MM-DD"),
    };

    dispatch(getListPHDNC(body));
  };
  useEffect(() => {
    loadListData();
  }, [userData]);

  // Event Chuc nang
  const [disableLock, setDisableLock] = useState(false);
  const lockClick = (dataItem) => {
    setDisableLock(true);

    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: dataItem.KKKK0000,
    };
    dispatch(lockPHDNC(body));

    // Disable nut khi nhan thao tac
    setTimeout(() => {
      setDisableLock(false);
    }, 2000);
  };
  const [dialogDelete, setDialogDelete] = useState(false);
  const [acptDelete, setAcptDelete] = useState(false);
  const [disableDel, setDisableDel] = useState(false);
  const [dataItem, setDataItem] = useState();
  const deleteClick = (dataItem) => {
    setDialogDelete(true);
    setDataItem(dataItem);
  };
  const CancelDeleteHandler = () => {
    setDialogDelete(false);
    setDataItem();
    setAcptDelete(false);
  };
  useEffect(() => {
    if (acptDelete) {
      setDisableDel(true);

      const body = {
        DCMNCODE: PageInfo.DcmnCode,
        KEY_CODE: dataItem.KKKK0000,
      };
      dispatch(deletePHDNC(body));

      // Disable nut khi nhan thao tac
      setTimeout(() => {
        setDisableDel(false);
      }, 2000);
    }
    setDialogDelete(false);
  }, [acptDelete]);

  // Code xy ly khi Xóa, Khóa ct
  const postResult = useSelector((state) => state.phdnc.postResult);
  useEffect(() => {
    if (postResult) {
      alert(postResult.RETNMSSG);

      if (postResult.RETNCODE) {
        if (postResult.RETNDATA !== null) {
          loadListData();
          dispatch(resetPHDNC());
        } else {
          loadListData();
          dispatch(resetPHDNC());
        }
        dispatch(resetPHDNC());
      }
      loadListData();
    }
  }, [postResult]);

  return (
    <>
      <ActionHeader
        mode={"LIST"}
        AcceRght={1}
        StteSign={0}
        add={actionAdd}
        TitlePage={PageInfo.TitlePage}
      />

      <div>
        <FilterHeader onClick={loadListData} CountChungTu={CountChungTu} />
        <GridList
          datalist={lstChungTu}
          datalistLength={CountChungTu}
          UrlLink={PageInfo.UrlLink}
          lockClick={lockClick}
          deleteClick={deleteClick}
          DcmnCode={PageInfo.DcmnCode}
          disableLock={disableLock}
          disableDel={disableDel}
        />
      </div>

      {dialogDelete && (
        <DialogDelete
          acptDelete={acptDelete}
          setAcptDelete={setAcptDelete}
          dialogDelete={dialogDelete}
          setDialogDelete={setDialogDelete}
          onCancelDelete={CancelDeleteHandler}
          MainCode={dataItem?.MAINCODE}
        />
      )}
    </>
  );
};

export default SpendSuggestListMain;
