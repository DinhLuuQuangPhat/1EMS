import React, { useEffect, useState, useRef } from "react";
import {
  FieldEditCombobox,
  FieldEditDatePicker,
  FieldEditInput,
  ActionHeader,
  TitleHeader,
  FieldEditMaskText,
  DialogSystem,
  DialogDelete,
} from "../../components";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import AskPermissionEditGrid from "./AskPermissionEditGrid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import {
  deleteHDXNP,
  postHDXNP,
  updateHDXNP,
  getDetailHDXNP,
  resetHDXNP,
  getListHDXNP,
  lockHDXNP,
} from "../../actions/hdxnp";
import { useStateContext } from "../../context/ContextProvider";
import { getReviewProcess, getApprovalProcess } from "../../actions/document";

const AskPermissionEditMain = (props) => {
  const [tabSelected, setTabSelected] = useState(0);
  const [mode, setMode] = useState(props.mode);
  useEffect(() => {
    props.keycode === undefined ? setMode("ADD") : props.mode;
  }, [props.keycode]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getLabelValue, appColors, userData } = useStateContext();

  const PageInfo = {
    TitlePage: getLabelValue(167, "Đơn xin nghỉ phép"),
    UrlLink: "/dcmn-leave/",
    UrlLinkNew: "/dcmn-leave/new",
    DcmnCode: "hdxnp",
  };

  // Chi tiet chung tu
  const detailHDXNP = useSelector((state) => state.HDXNP.detail);
  const [AcceRght, setAcceRght] = useState(0);
  const [StteSign, setStteSign] = useState(0);
  // Cho phep sua du lieu hay khong
  const [permissions, setPermissions] = useState(true);

  // Khỏi tạo ct
  const initHeader = {
    COMPCODE: JSON.parse(localStorage.getItem("userData")).COMPCODE,
    LCTNCODE: JSON.parse(localStorage.getItem("userData")).LCTNCODE,
    DPTMCODE: "",
    MAINCODE: "",
    MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
    EMPLCODE: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
    MEXLNNTE: "",
    SUMLEAV: 0,
    SHFTCODE: "",
    DDDD: "HDXNP",
    ACCERGHT: 1,
    STTESIGN: 0,
    STTENAME: "",
    DCMNCODE: "HDXNP",
    KKKK0000: "",

    DETAIL: [],
    ITEMTREE: "",
  };
  const [header, setHeader] = useState(initHeader);
  useEffect(() => {
    if (detailHDXNP && detailHDXNP !== undefined) {
      setHeader({
        ACCERGHT: detailHDXNP.ACCERGHT,
        COMPCODE: detailHDXNP.COMPCODE,
        DDDD: detailHDXNP.DDDD,
        DPTMCODE: detailHDXNP.DPTMCODE,
        EMPLCODE: detailHDXNP.EMPLCODE,
        KKKK0000: detailHDXNP.KKKK0000,
        LCTNCODE: detailHDXNP.LCTNCODE,
        MAINCODE: detailHDXNP.MAINCODE,
        MAINDATE: detailHDXNP.MAINDATE,
        MEXLNNTE: detailHDXNP.MEXLNNTE,
        STTENAME: detailHDXNP.STTENAME,
        STTESIGN: detailHDXNP.STTESIGN,
        SUMLEAV: detailHDXNP.SUMLEAV,
        DETAIL: detailHDXNP.DETAIL?.map((items) => {
          return {
            // EMPLRLNM: items.EMPLRLNM,
            EMPLRLTN: items.EMPLRLTN,
            FRLVDATE: moment(new Date(items.FRLVDATE)).format("YYYY-MM-DD"),
            KKKK0001: items.KKKK0001,
            LEAVTYPE: items.LEAVTYPE,
            MAINCODE: items.MAINCODE,
            PRDCLEAV: items.PRDCLEAV,
            SUMLVDT: items.SUMLVDT,
            TIMEAFTR: items.TIMEAFTR,
            TIMEEVEN: items.TIMEEVEN,
            TIMELEAV: items.TIMELEAV,
            TIMEMORN: items.TIMEMORN,
            TOLVDATE: moment(new Date(items.TOLVDATE)).format("YYYY-MM-DD"),
          };
        }),
      });

      detailHDXNP.STTESIGN <= 0 ? setPermissions(true) : setPermissions(false);
      setAcceRght(detailHDXNP.ACCERGHT);
      setStteSign(detailHDXNP.STTESIGN);

      // Quyen chinh sua duoi Detail
      if (detailHDXNP.DETAIL && detailHDXNP.DETAIL.length > 0) {
        const Detail_New = detailHDXNP.DETAIL.map((element) => ({
          ...element,
          permission: detailHDXNP.STTESIGN <= 0 ? true : false,
        }));

        setHeader((header) => ({
          ...header,
          DETAIL: Detail_New,
        }));
      }
    }

    if (!detailHDXNP) {
      setHeader(initHeader);
      setAcceRght(1);
      setStteSign(0);
      setPermissions(true);
    }
  }, [detailHDXNP]);

  //Get list các danh mục
  const lstJob = useSelector((state) => state.common.lstJob);
  const lstEmployee = useSelector((state) => state.common.lstEmployee);
  const lstDepartment = useSelector((state) => state.common.lstDepartment);
  // End list

  // Biến dùng để hiển thị tên Bộ phận / Chức danh
  const [dptmName, setDptmName] = useState();
  const [jobName, setJobName] = useState();
  const [shifName, setShifName] = useState("");
  useEffect(() => {
    if (
      lstEmployee.find((item) => item.ITEMCODE === header.EMPLCODE) !==
      undefined
    ) {
      const infoEmpl = lstEmployee.find(
        (item) => item.ITEMCODE === header.EMPLCODE
      ).ITEMTREE;

      // Chuc danh
      lstJob
        ? setJobName(
            lstJob.find((item) => item.ITEMCODE == infoEmpl.split("@@@")[0]) !==
              undefined
              ? lstJob.find((item) => item.ITEMCODE == infoEmpl.split("@@@")[0])
                  .ITEMNAME
              : ""
          )
        : setJobName("");

      // Bo phan
      lstDepartment
        ? setDptmName(
            lstDepartment.find(
              (item) => item.ITEMCODE == infoEmpl.split("@@@")[1]
            ) !== undefined
              ? lstDepartment.find(
                  (item) => item.ITEMCODE == infoEmpl.split("@@@")[1]
                ).ITEMNAME
              : ""
          )
        : setDptmName("");
    } else {
      setDptmName("");
      setJobName("");
    }
  }, [header, lstEmployee, lstJob, lstDepartment]);

  const [openNotify, setOpenNotify] = useState(false);
  const [contentNotify, setContentNotify] = useState({});
  const CancelNotifyHandler = () => {
    setOpenNotify(false);
    setContentNotify({ type: -1, content: "" });
  };

  // su kien Action Bar
  const ClickBackList = () => {
    navigate(PageInfo.UrlLink);
  };
  const actionAdd = () => {
    navigate(PageInfo.UrlLinkNew);
    setHeader(initHeader);
    setAcceRght(1);
    setStteSign(0);
    setPermissions(true);
    setMode("ADD");
  };
  const actionDup = () => {
    setHeader({
      ...header,
      STTESIGN: 0,
      STTENAME: "",
      MAINCODE: "",
      MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
      KKKK0000: "",
      // DETAIL: [],
    });
    setAcceRght(1);
    setStteSign(0);
    setMode("DUP");
  };

  const actionSave = () => {
    //Kiểm tra có trùng nhân viên thay thế
    if (header.DETAIL && header.DETAIL.length > 0) {
      let CondFltrEMPLRLTN = (element) => element.EMPLRLTN === header.EMPLCODE;
      let index = header.DETAIL.findIndex(CondFltrEMPLRLTN);
      if (index !== -1) {
        const numbRow = index + 1;
        setOpenNotify(true);
        setContentNotify({
          type: "",
          content:
            "Nhân viên thay thế ở dòng số " +
            numbRow +
            " trùng với tên nhân viên xin nghỉ phép",
        });
        return;
      }
    }
    // Kiem tra Nhap dong chi tiet
    if (header.DETAIL && header.DETAIL.length == 0) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng nhập vào Chi tiết ca nghỉ",
      });
      return;
    }
    if (header.DETAIL && header.DETAIL.length > 0) {
      // kiem tra ngay bat dau va ngay ket thuc cua dong do
      let CondFltrDAYFROMTO = (element) =>
        new Date(element.TOLVDATE) < new Date(element.FRLVDATE);
      let index = header.DETAIL.findIndex(CondFltrDAYFROMTO);
      if (index !== -1) {
        const numbRow = index + 1;
        setOpenNotify(true);
        setContentNotify({
          type: "",
          content:
            "Ngày nghỉ bắt đầu không được lớn hơn ngày nghỉ kết thúc trong dòng số " +
            numbRow,
        });
        return;
      }

      // Kiem tra không chọn loai nghi duoi Detail
      let CondFltrSUMLVDT = (element) => parseFloat(element.SUMLVDT) < 0.5;
      let index2 = header.DETAIL.findIndex(CondFltrSUMLVDT);
      if (index2 !== -1) {
        const numbRow = index2 + 1;
        setOpenNotify(true);
        setContentNotify({
          type: "",
          content: "Vui lòng chọn Buổi nghỉ ở dòng " + numbRow,
        });
        return;
      }

      // Kiem tra NV nghi trung NV Thay the duoi Detail
      let CondFltrEMPLCODE_EMPLRLTN = (element) =>
        element.EMPLCODE == element.EMPLRLTN;
      let index3 = header.DETAIL.findIndex(CondFltrEMPLCODE_EMPLRLTN);

      if (index3 !== -1) {
        const numbRow = index3 + 1;
        setOpenNotify(true);
        setContentNotify({
          type: "",
          content: "NV Nghỉ trùng NV Thay thế trong dòng số " + numbRow,
        });
        return;
      }
    }

    if (header.MEXLNNTE == "") {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng nhập Lý do xin phép",
      });
      return;
    }

    // con lai
    var postJson = {
      DCMNCODE: PageInfo.DcmnCode,
      HEADER: [header],
    };

    if (header.KKKK0000) {
      // update
      dispatch(updateHDXNP(postJson));
    } else {
      // Post
      dispatch(postHDXNP(postJson));
    }
  };

  const [disableLock, setDisableLock] = useState(false);
  const actionLock = () => {
    setDisableLock(true);

    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
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
  const actionDelete = () => {
    setDialogDelete(true);
  };
  const CancelDeleteHandler = () => {
    setDialogDelete(false);
    setAcptDelete(false);
  };
  useEffect(() => {
    if (acptDelete) {
      setDisableDel(true);

      const body = {
        DCMNCODE: PageInfo.DcmnCode,
        KEY_CODE: header.KKKK0000,
      };
      dispatch(deleteHDXNP(body));

      // Disable nut khi nhan thao tac
      setTimeout(() => {
        setDisableDel(false);
      }, 2000);
    }
    setDialogDelete(false);
  }, [acptDelete]);

  // Code xy ly khi Post ct
  const postResult = useSelector((state) => state.HDXNP.postResult);
  useEffect(() => {
    if (postResult) {
      alert(postResult.RETNMSSG); // Hien thong bao Khi nhan nut Luu

      if (postResult.RETNCODE) {
        if (postResult.RETNDATA !== null) {
          dispatch(getDetailHDXNP(postResult.RETNDATA[0].KKKK0000));
          setMode("EDIT");
        } else {
          dispatch(resetHDXNP());
          dispatch(getDetailHDXNP());
          navigate(PageInfo.UrlLink);
        }
      }
      dispatch(resetHDXNP());
    }
  }, [postResult]);

  // Quy trinh xet duyet
  const [disableReview, setDisableReview] = useState(false);
  const reviewProcess = useSelector((state) => state.document.reviewProcess);
  const [showReviewProcess, setShowReviewProcess] = useState(false);
  const actionReviewProcess = () => {
    const body = {
      DCMNCODE: "dmsAprvVchr",
      PARA_001: PageInfo.DcmnCode,
      PARA_002: header.KKKK0000,
      PARA_003: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
    };
    if (showReviewProcess) {
      setShowReviewProcess(false);
    } else {
      dispatch(getReviewProcess(body));
      setShowApprovalProcess(false);
      setShowReviewProcess(true);
      setDisableReview(true);
    }
  };
  const closeReviewProcess = () => {
    setShowReviewProcess(false);
    setDisableReview(false);
  };
  // Qua trinh xet duyet
  const [disableApproval, setDisableApproval] = useState(false);
  const approvalProcess = useSelector(
    (state) => state.document.approvalProcess
  );
  const [showApprovalProcess, setShowApprovalProcess] = useState(false);
  const actionApprovalProcess = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    if (showApprovalProcess) {
      setShowApprovalProcess(false);
    } else {
      dispatch(getApprovalProcess(body));
      setShowApprovalProcess(true);
      setShowReviewProcess(false);
      setDisableApproval(true);
    }
  };
  const closeApprovalProcess = () => {
    setShowApprovalProcess(false);
    setDisableApproval(false);
  };

  // Thay đổi DETAIL
  const itemChangeField = (Item) => {
    // Code xu ly Update DETAIL vao header
    var newData = [];
    const Field = Item.field;
    if (
      Field == "EMPLCODE" ||
      Field == "EMPLRLTN" ||
      Field == "TIMEMORN" ||
      Field == "TIMEAFTR" ||
      Field == "TIMEEVEN"
    ) {
      Item.value != null && Item.value != "" && Item.value != undefined
        ? (Item.dataItem[Field] = Item.value.ITEMCODE)
        : (Item.dataItem[Field] = "");
    }

    if (Field == "FRLVDATE" || Field == "TOLVDATE") {
      Item.dataItem[Field] = moment(Item.value).format("YYYY-MM-DD");
    }

    if (Field == "MCONTENT") {
      Item.dataItem[Field] = Item.value;
    }

    // Tinh tong ngay nghi
    let NumbMorn =
      Item.dataItem.TIMEMORN === "" || Item.dataItem.TIMEMORN === undefined
        ? 0
        : 0.5;
    let NumbAftr =
      Item.dataItem.TIMEAFTR === "" || Item.dataItem.TIMEAFTR === undefined
        ? 0
        : 0.5;
    let NumbEven =
      Item.dataItem.TIMEEVEN === "" || Item.dataItem.TIMEEVEN === undefined
        ? 0
        : 0.5;
    let newTolvDate = moment(Item.dataItem.TOLVDATE).format("YYYY/MM/DD");
    let newFrlvDate = moment(Item.dataItem.FRLVDATE).format("YYYY/MM/DD");
    let NumbLeav =
      (new Date(newTolvDate) - new Date(newFrlvDate)) / (1000 * 3600 * 24) + 1;
    let newSumLvDt = NumbLeav * (NumbMorn + NumbAftr + NumbEven);
    Item.dataItem.SUMLVDT = newSumLvDt;

    newData = header.DETAIL.map((itemDetl) => {
      if (Item.dataItem.KKKK0001 === itemDetl.KKKK0001) {
        itemDetl = {
          ...Item.dataItem,
        };
      }
      return itemDetl;
    });

    // Tinh tong ngay nghi duoi Detail
    let newSumLeav = newData.reduce((accumulator, object) => {
      return accumulator + object.SUMLVDT;
    }, 0);

    setHeader({ ...header, DETAIL: newData, SUMLEAV: newSumLeav });
  };

  //Xóa chứng từ Detail
  const enterRemove = (dataItem) => {
    setHeader({
      ...header,
      DETAIL: header.DETAIL.filter(
        (item) => item.KKKK0001 != dataItem.KKKK0001
      ),
    });
  };
  //Thêm dòng mới
  const addNewRow = (e) => {
    e.preventDefault();
    header.DETAIL = [
      ...header.DETAIL,
      { ...initDetail, KKKK0001: header.DETAIL.length + 1 },
    ];
    setHeader({ ...header });
  };
  // Khởi tạo Detail
  const initDetail = {
    // INDEX: 0,
    EMPLCODE: "",
    EMPLRLTN: "",
    TIMEAFTR: "",
    TIMEEVEN: "",
    TIMEMORN: "",
    FRLVDATE: moment(new Date()).format("YYYY-MM-DD"),
    TOLVDATE: moment(new Date()).format("YYYY-MM-DD"),
    SUMLVDT: 0.0,
    MCONTENT: "",
    permission: true,
  };

  return (
    <>
      <div>
        <ActionHeader
          mode={mode}
          Key_Code={header.KKKK0000 ? header.KKKK0000 : ""}
          AcceRght={AcceRght}
          StteSign={StteSign}
          onClickBack={ClickBackList}
          add={actionAdd}
          dup={actionDup}
          save={actionSave}
          // cancel={actionCancel}
          delete={actionDelete}
          disableDel={disableDel}
          lock={actionLock}
          // unlock={actionUnlock}

          // backup
          // actionProgress={actionProgress}
          // actionProcedure={actionProcedure}
          // showPopupProcedure={showPopupProcedure}
          // showPopupProgress={showPopupProgress}
          // closePopupProgress={closePopupProgress}
          // closePopupProcedure={closePopupProcedure}

          // Quy trinh xet duyet
          disableLock={disableLock}
          approvalProcess={approvalProcess}
          actionReviewProcess={actionReviewProcess}
          closeReviewProcess={closeReviewProcess}
          showReviewProcess={showReviewProcess}
          disableReview={disableReview}
          // Qua trinh xet duyet
          reviewProcess={reviewProcess}
          actionApprovalProcess={actionApprovalProcess}
          closeApprovalProcess={closeApprovalProcess}
          showApprovalProcess={showApprovalProcess}
          disableApproval={disableApproval}
        />

        {/* Noi dung phan Header */}
        <div className="flex md:flex-row flex-col">
          <div className="w-full md:flex-row flex-col content-header">
            <div
              className={`lg:ml-2 ml-0 lg:mr-2 mr-0 lg:p-5 p-0 bg-white border-solid lg:border-[1px] border-0 lg:mb-0 mb-2 border-borderBase hover:border-blue-700 ${appColors.stackColor}`}
            >
              {/* Tieu de  */}
              <TitleHeader
                TitlePage={PageInfo.TitlePage}
                MainCode={header?.MAINCODE}
                keycode={props.keycode}
                StteName={header?.STTENAME}
              />

              {/* Noi dung Header */}
              <TabStrip
                selected={tabSelected}
                onSelect={(e) => {
                  setTabSelected(e.selected);
                }}
                className="Tab-flex"
              >
                <TabStripTab
                  title={getLabelValue(116, "Thông tin chung")}
                  contentClassName="full-width-ems"
                >
                  <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-full col-start-1 md:col-start-1 md:col-span-4">
                      {/* So chung tu & Ngay lap */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
                        {/*Số chứng từ */}
                        <FieldEditMaskText
                          title={getLabelValue(117, "Số chứng từ")}
                          id="MAINCODE"
                          name="MAINCODE"
                          style={{ borderColor: "grey" }}
                          value={header?.MAINCODE}
                          readonly={true}
                          className={appColors.inputColor}
                          size="small"
                        />

                        {/* Ngày lập chứng từ  */}
                        <FieldEditDatePicker
                          title={getLabelValue(27, "Ngày tạo")}
                          value={
                            header?.MAINDATE
                              ? new Date(header?.MAINDATE)
                              : new Date()
                          }
                          format={"dd/MM/yyyy"}
                          disabled={!permissions}
                          onChange={(e) =>
                            setHeader({
                              ...header,
                              MAINDATE: moment(new Date(e.value)).format(
                                "YYYY-MM-DD"
                              ),
                            })
                          }
                        />
                      </div>

                      {/* Lý do xin phép */}
                      <div className="mb-3">
                        <FieldEditInput
                          title={getLabelValue(null, "Lý do xin phép")}
                          id={"MEXLNNTE"}
                          defaultValue={header?.MEXLNNTE}
                          onChange={(event) =>
                            setHeader({ ...header, MEXLNNTE: event.value })
                          }
                          value={header?.MEXLNNTE}
                          disabled={props.mode == "ADD" ? false : !permissions}
                        />
                      </div>
                    </div>
                    <div className="col-span-full col-start-1 md:col-start-5 md:col-span-4">
                      {/* Tên nhân viên  */}
                      <div className="mb-3">
                        <FieldEditCombobox
                          title={getLabelValue(null, "Tên nhân viên")}
                          id={"ITEMNAME"}
                          data={lstEmployee}
                          value={
                            header?.ITEMCODE || header?.EMPLCODE
                              ? lstEmployee.find(
                                  (item) =>
                                    item.ITEMCODE ==
                                    (header?.EMPLCODE || header?.ITEMCODE)
                                )
                              : ""
                          }
                          textField="ITEMNAME"
                          dataItemKey="ITEMCODE"
                          disabled={true}
                        />
                      </div>

                      {/* Chuc danh & Bo phan */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
                        {/* Chuc danh */}
                        <FieldEditMaskText
                          id="JOB_CODE"
                          name="JOB_CODE"
                          title={getLabelValue(null, "Chức danh")}
                          style={{ borderColor: "grey" }}
                          value={jobName}
                          defaultValue={jobName}
                          readonly={true}
                          className={appColors.inputColor}
                          size="small"
                        />

                        {/* Bo phan */}
                        <FieldEditMaskText
                          id="DPTMCODE"
                          name="DPTMCODE"
                          title={getLabelValue(null, "Bộ phận")}
                          style={{ borderColor: "grey" }}
                          value={dptmName}
                          defaultValue={dptmName}
                          readonly={true}
                          className={appColors.inputColor}
                          size="small"
                        />
                      </div>
                    </div>
                    <div className="col-span-full col-start-1 md:col-start-9 md:col-span-4">
                      {/* Tong ngay nghi & Loai ca */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 mb-3">
                        {/* Tong ngay nghi */}
                        <FieldEditMaskText
                          id="SUMLEAV"
                          name="SUMLEAV"
                          title={getLabelValue(235, "Tổng ngày nghỉ")}
                          style={{ borderColor: "grey" }}
                          value={
                            header.SUMLEAV != null ? header?.SUMLEAV + "" : ""
                          }
                          readonly={true}
                          className={appColors.inputColor}
                          size="small"
                        />

                        {/* Loai ca */}
                        {/* <FieldEditMaskText
                          id="SHIFTCODE"
                          name="SHIFTCODE"
                          title={getLabelValue(236, "Loại ca")}
                          style={{ borderColor: "grey" }}
                          value={shifName}
                          readonly={true}
                          className={appColors.inputColor}
                          size="small"
                        /> */}
                      </div>
                    </div>
                  </div>
                </TabStripTab>
              </TabStrip>
            </div>
          </div>
        </div>
      </div>

      {/* Chi tiet */}
      <div
        id="detail"
        className="lg:m-2 m-0 mt-4 bg-blue-50 border-solid border-[1px] border-borderBase hover:border-blue-700"
      >
        {header.DETAIL && (
          <AskPermissionEditGrid
            permissions={permissions}
            items={header.DETAIL}
            itemChangeField={itemChangeField}
            enterRemove={enterRemove}
          />
        )}

        {/* Nut Them dong Detail */}
        <div className="p-3">
          {permissions && (
            <button
              type="button"
              disabled={!permissions}
              className="outline outline-offset-2 outline-1 hover:outline-2 rounded-sm pr-2 pl-2 text-sm"
              onClick={addNewRow}
            >
              {getLabelValue(73, "Thêm dòng")}
            </button>
          )}
        </div>
      </div>

      {/* Thong bao */}
      {openNotify && (
        <DialogSystem item={contentNotify} cancelNotify={CancelNotifyHandler} />
      )}

      {/* Thong bao Delete */}
      {dialogDelete && (
        <DialogDelete
          acptDelete={acptDelete}
          setAcptDelete={setAcptDelete}
          dialogDelete={dialogDelete}
          setDialogDelete={setDialogDelete}
          onCancelDelete={CancelDeleteHandler}
          MainCode={header?.MAINCODE}
        />
      )}
    </>
  );
};

export default AskPermissionEditMain;
