import React, { useEffect, useState } from "react";
import { ActionHeader, FilterHeader, GridList, DialogDelete } from "..";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deletePDKCT,
  getListPDKCT,
  lockPDKCT,
  resetPDKCT,
} from "../../actions/pdkct";

const TaskScheduleListMain = () => {
  const {
    beginDateList,
    endDateList,
    getLabelValue,
    userData,
    setNotificationsAutoClose,
  } = useStateContext();
  const PageInfo = {
    DcmnCode: "PDKCT",
    UrlLinkNew: "/task-schedule/new",
    UrlLink: "/task-schedule/",
    TitlePage: getLabelValue(187, "Phiếu đăng ký công tác"),
  };

  const navigate = useNavigate();
  const actionAdd = () => {
    navigate(PageInfo.UrlLinkNew);
  };

  const dispatch = useDispatch();
  const listPDKCT = useSelector((state) => state.PDKCT.list);

  const [lstChungTu, setLstChungTu] = useState([]);
  const [CountChungTu, setCountChungTu] = useState(0);
  useEffect(() => {
    if (listPDKCT && listPDKCT.length > 0) {
      setLstChungTu(listPDKCT);
      setCountChungTu(listPDKCT.length);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    } else {
      setLstChungTu([]);
      setCountChungTu(0);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    }
  }, [listPDKCT]);

  const loadListData = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      STTESIGN: 7,

      BEG_DATE: moment(beginDateList).format("YYYY-MM-DD"),
      END_DATE: moment(endDateList).format("YYYY-MM-DD"),
    };

    dispatch(getListPDKCT(body));
  };
  useEffect(() => {
    loadListData();
  }, [userData]);

  // Thuc thi tac vu
  const [disableLock, setDisableLock] = useState(false);
  const lockClick = (dataItem) => {
    setDisableLock(true);

    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: dataItem.KKKK0000,
    };
    dispatch(lockPDKCT(body));

    // Disable nut khi nhan thao tac
    setTimeout(() => {
      setDisableLock(false);
    }, 2000);
  };
  // Hien Popup khi xoa
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
      dispatch(deletePDKCT(body));

      // Disable nut khi nhan thao tac
      setTimeout(() => {
        setDisableDel(false);
      }, 2000);
    }
    setDialogDelete(false);
  }, [acptDelete]);

  // Code xy ly khi Xóa, Khóa ct
  const postResult = useSelector((state) => state.PDKCT.postResult);
  useEffect(() => {
    if (postResult) {
      alert(postResult.RETNMSSG);

      if (postResult.RETNCODE) {
        if (postResult.RETNDATA !== null) {
          dispatch(resetPDKCT());
          loadListData();
        } else {
          dispatch(resetPDKCT());
          loadListData();
        }
        dispatch(resetPDKCT());
        loadListData();
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

export default TaskScheduleListMain;
