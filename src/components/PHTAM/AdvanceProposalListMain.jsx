import React, { useState, useEffect } from "react";
import { ActionHeader, FilterHeader, GridList, DialogDelete } from "../";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
  deletePHTAM,
  getListPHTAM,
  lockPHTAM,
  resetPHTAM,
} from "../../actions/PHTAM";

const AdvanceProposalListMain = () => {
  const {
    setNotificationsAutoClose,
    getLabelValue,
    userData,
    setDisableLocation,
    beginDateList,
    endDateList,
  } = useStateContext();
  const PageInfo = {
    DcmnCode: "PHTAM",
    UrlLinkNew: "/advn-invc/new",
    UrlLink: "/advn-invc/",
    TitlePage: getLabelValue(141, "Phiếu Đề nghị tạm ứng"),
  };

  const navigate = useNavigate();
  const actionAdd = () => {
    navigate(PageInfo.UrlLinkNew);
  };

  const dispatch = useDispatch();
  const listPHTAM = useSelector((state) => state.PHTAM.listMaster);

  const [lstChungTu, setLstChungTu] = useState([]);
  const [CountChungTu, setCountChungTu] = useState(0);
  useEffect(() => {
    if (listPHTAM && listPHTAM.length > 0) {
      setLstChungTu(listPHTAM);
      setCountChungTu(listPHTAM.length);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    }
    if (listPHTAM && listPHTAM.length === 0) {
      setLstChungTu([]);
      setCountChungTu(0);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    }
  }, [listPHTAM]);

  const loadListData = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      STTESIGN: 7,
      BEG_DATE: moment(beginDateList).format("YYYY-MM-DD"),
      END_DATE: moment(endDateList).format("YYYY-MM-DD"),
    };

    dispatch(getListPHTAM(body));
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
    dispatch(lockPHTAM(body));

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
      dispatch(deletePHTAM(body));

      // Disable nut khi nhan thao tac
      setTimeout(() => {
        setDisableDel(false);
      }, 2000);
    }
    setDialogDelete(false);
  }, [acptDelete]);

  // Code xy ly khi Xóa, Khóa ct
  const postResult = useSelector((state) => state.PHTAM.postResult);
  useEffect(() => {
    if (postResult) {
      alert(postResult.RETNMSSG);

      if (postResult.RETNCODE) {
        if (postResult.RETNDATA !== null) {
          loadListData();
          dispatch(resetPHTAM());
        } else {
          dispatch(resetPHTAM());
        }
        dispatch(resetPHTAM());
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
          DcmnCode={PageInfo.DcmnCode}
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

{
  /* <div className="hover:border-blue-700 hidden">
{!listVisiable && permissions && (
  <div className="flex items-center">
    <div className="w-[150px] ">
      <DropDownList
        data={mainFucntions}
        textField="text"
        dataItemKey="id"
        defaultValue={mainFunction}
        onChange={(e) => setMainFunction(e.target.value)}
        disabled={!permissions}
      />
    </div>
    <button
      disabled={!permissions}
      className=" bg-primary text-white pt-1 pb-1 pl-3 pr-3 rounded-md text-sm ml-3 w-[100px]"
      type="button"
      onClick={() => childRef.current.functionClick(mainFunction)}
    >
      {getLabelValue(81, "Thực hiện")}
    </button>
  </div>
)}
</div> */
}

export default AdvanceProposalListMain;
