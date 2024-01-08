import React, { useEffect, useState } from "react";
import { ActionHeader, FilterHeader, GridList, DialogDelete } from "../";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deleteHDXNP,
  getListHDXNP,
  lockHDXNP,
  resetHDXNP,
} from "../../actions/hdxnp";

const AskPermissionListMain = () => {
  const {
    beginDateList,
    endDateList,
    getLabelValue,
    userData,
    setNotificationsAutoClose,
  } = useStateContext();
  const PageInfo = {
    DcmnCode: "HDXNP",
    UrlLinkNew: "/dcmn-leave/new",
    UrlLink: "/dcmn-leave/",
    TitlePage: getLabelValue(null, "Đơn xin nghỉ phép"),
  };

  const navigate = useNavigate();
  const actionAdd = () => {
    navigate(PageInfo.UrlLinkNew);
  };

  const dispatch = useDispatch();
  const listHDXNP = useSelector((state) => state.HDXNP.list);

  const [lstChungTu, setLstChungTu] = useState([]);
  const [CountChungTu, setCountChungTu] = useState(0);
  useEffect(() => {
    if (listHDXNP && listHDXNP.length > 0) {
      setLstChungTu(listHDXNP);
      setCountChungTu(listHDXNP.length);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    } else {
      setLstChungTu([]);
      setCountChungTu(0);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    }
  }, [listHDXNP]);

  const loadListData = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      STTESIGN: 7,

      BEG_DATE: moment(beginDateList).format("YYYY-MM-DD"),
      END_DATE: moment(endDateList).format("YYYY-MM-DD"),
    };

    dispatch(getListHDXNP(body));
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
    dispatch(lockHDXNP(body));

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
      const body = {
        DCMNCODE: PageInfo.DcmnCode,
        KEY_CODE: dataItem.KKKK0000,
      };
      dispatch(deleteHDXNP(body));

      // Disable nut khi nhan thao tac
      setDisableDel(true);
      setTimeout(() => {
        setDisableDel(false);
      }, 2000);
    }
    setDialogDelete(false);
  }, [acptDelete]);

  // Code xy ly khi Xóa, Khóa ct
  const postResult = useSelector((state) => state.HDXNP.postResult);
  useEffect(() => {
    if (postResult) {
      alert(postResult.RETNMSSG);

      if (postResult.RETNCODE) {
        if (postResult.RETNDATA !== null) {
          loadListData();
          dispatch(resetHDXNP());
        } else {
          dispatch(resetHDXNP());
        }
        dispatch(resetHDXNP());
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
          DcmnCode={PageInfo.DcmnCode}
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

export default AskPermissionListMain;
