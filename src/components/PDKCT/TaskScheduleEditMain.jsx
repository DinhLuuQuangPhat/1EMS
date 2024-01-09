import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { Label } from "@progress/kendo-react-labels";
import { Checkbox } from "@progress/kendo-react-inputs";
import { useStateContext } from "../../context/ContextProvider";
import EditForm from "./EditForm";
import { v4 } from "uuid";
import {
  AiOutlineFilePdf,
  AiOutlineFileExcel,
  AiOutlineFileWord,
  AiOutlineFileImage,
  AiOutlineFileText,
  AiFillFileImage,
} from "react-icons/ai";
import moment from "moment/moment";
import {
  deletePDKCT,
  getDetailPDKCT,
  lockPDKCT,
  postPDKCT,
  resetPDKCT,
  updatePDKCT,
} from "../../actions/pdkct";
import { getApprovalProcess, getReviewProcess } from "../../actions/document";
import {
  deleteFileService,
  deleteService,
  editDetailsAfterPost,
  editService,
  lockService,
  postFileService,
  removeService,
  submitService,
} from "./Service";
import {
  TitleHeader,
  FieldEditDatePicker,
  ActionHeader,
  FieldEditMultiSelect,
  DialogSystem,
  FieldEditNumberic,
  FieldEditTextArea,
  FieldEditMaskText,
  DialogDelete,
  FieldEditCheckBox,
} from "../";
import BusinessRegistrationEditGrid from "./TaskScheduleEditGrid";

const getFileIcon = (fileType) => {
  switch (fileType) {
    case "pdf": {
      return <AiOutlineFilePdf />;
    }
    case "xls": {
      return <AiOutlineFileExcel />;
    }
    case "xlsx": {
      return <AiOutlineFileExcel />;
    }
    case "doc": {
      return <AiOutlineFileWord />;
    }
    case "docx": {
      return <AiOutlineFileWord />;
    }
    case "png": {
      return <AiFillFileImage />;
    }
    case "jpg": {
      return <AiOutlineFileImage />;
    }
    case "jpeg": {
      return <AiOutlineFileImage />;
    }
    default: {
      return <AiOutlineFileText />;
    }
  }
};

const TaskScheduleEditMain = (props) => {
  const [tabSelected, setTabSelected] = useState(0);
  const [mode, setMode] = useState(props.mode);
  useEffect(() => {
    props.keycode === undefined ? setMode("ADD") : setMode(props.mode);
  }, [props.keycode]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getLabelValue, appColors, userData } = useStateContext();

  const PageInfo = {
    TitlePage: getLabelValue(187, "Phiếu đăng ký công tác"),
    UrlLink: "/task-schedule/",
    UrlLinkNew: "/task-schedule/new",
    DcmnCode: "PDKCT",
  };
  const CompInfo = JSON.parse(localStorage.getItem("company"));

  // load chi tiet chung tu
  const detailDocument = useSelector((state) => state.PDKCT.detail);
  const [AcceRght, setAcceRght] = useState(0);
  const [StteSign, setStteSign] = useState(0);
  // Cho phep sua du lieu hay khong
  const [permissions, setPermissions] = useState(false);

  // Khoi tao ct
  const initHeader = {
    COMPCODE: CompInfo.COMPCODE,
    LCTNCODE: userData.LCTNCODE,
    MAINCODE: "",
    MAINDATE: moment(new Date()).format("YYYY/MM/DD"),
    EMPLCODE: userData.EMPLCODE,
    EMPLNAME: userData.EMPLNAME,
    SRVCRQST: "",
    BEG_DATE: moment(new Date()).format("YYYY-MM-DD"),
    END_DATE: moment(new Date()).format("YYYY-MM-DD"),
    MCNTNTEXT: "",
    WORK_DAY: 0.0,
    PSTNCODE: "",
    DDDD: "PDKCT",
    ACCERGHT: 0,
    STTESIGN: 0,
    STTENAME: "",
    KKKK0000: "",
    DETAIL: [],
  };
  const [header, setHeader] = useState(initHeader);
  useEffect(() => {
    if (props.keycode !== undefined) {
      if (detailDocument) {
        setHeader(detailDocument);
        var fileList = detailDocument.DCMNFILE;
        if (fileList && fileList.length > 0) {
          setFiles([]);
          fileList.map((file) => {
            if (file.FILENAME) {
              const icon = getFileIcon(file.FILETYPE);
              setFiles((dcmnFiles) => [
                ...dcmnFiles,
                {
                  id: v4(),
                  FILENAME: file.FILENAME,
                  FILEPATH: file.FILE_URL,
                  FILETYPE: file.FILETYPE,
                  ICON: icon,
                  DATA: null,
                  FILECODE: file.FILECODE,
                  DCMNCODE: file.DCMNCODE,
                  KEY_CODE: file.KEY_CODE,
                },
              ]);
            }
          });
        }

        detailDocument.STTESIGN <= 0
          ? setPermissions(true)
          : setPermissions(false);
        setAcceRght(detailDocument.ACCERGHT);
        setStteSign(detailDocument.STTESIGN);

        // Quyen chinh sua duoi Detail
        if (detailDocument.DETAIL && detailDocument.DETAIL.length > 0) {
          const Detail_New = detailDocument.DETAIL.map((element) => ({
            ...element,
            permission: false,
          }));

          setHeader((header) => ({
            ...header,
            DETAIL: Detail_New,
          }));
        }
      }
    }

    if (props.keycode === undefined) {
      setHeader(initHeader);
      setAcceRght(1);
      setStteSign(0);
      setPermissions(true);
    }
  }, [detailDocument]);

  // dach sach listcode
  const lstSrvcRequest = useSelector((state) => state.common.lstSrvcRequest);

  // su kien Action
  const ClickBackList = () => {
    navigate(PageInfo.UrlLink);
  };
  const actionAdd = () => {
    navigate(PageInfo.UrlLinkNew);
    setHeader(initHeader);
    setAcceRght(1);
    setStteSign(0);
    setPermissions(true);
    // setFiles([]);
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
      DCMNFILE: [],
    });
    setAcceRght(1);
    setStteSign(0);
    // setFiles([]);
    setMode("DUP");
  };
  const actionSave = () => {
    var modDetails = editDetailsAfterPost(header.DETAIL);
    header.DETAIL = modDetails;

    if (header.DETAIL.length === 0) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng Thêm chi tiết ngày công tác",
      });
      return;
    } else if (
      moment(header.BEG_DATE).format("YYYY-MM-DD") >
      moment(header.END_DATE).format("YYYY-MM-DD")
    ) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Từ ngày phải NHỎ hơn hay BẰNG Đến ngày",
      });
      return;
    } else if (header.MCNTNTEXT == "") {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng Nhập nội dung công tác",
      });
      return;
    } else {
      var postJson = {
        DCMNCODE: PageInfo.DcmnCode,
        HEADER: [header],
      };

      if (header.KKKK0000) {
        // update
        dispatch(updatePDKCT(postJson));
      } else {
        // Post
        dispatch(postPDKCT(postJson));
      }
    }
  };
  const actionCancel = () => {
    alert("abc");
  };
  const actionDelete = () => {
    setDialogDelete(true);
  };
  const [dialogDelete, setDialogDelete] = useState(false);
  const [acptDelete, setAcptDelete] = useState(false);
  const [disableDel, setDisableDel] = useState(false);
  const CancelDeleteHandler = () => {
    setDialogDelete(false);
    setAcptDelete(false);
  };
  useEffect(() => {
    if (acptDelete) {
      const body = {
        DCMNCODE: PageInfo.DcmnCode,
        KEY_CODE: header.KKKK0000,
      };
      dispatch(deletePDKCT(body));

      // Disable nut khi nhan thao tac
      setDisableDel(true);
      setTimeout(() => {
        setDisableDel(false);
      }, 2000);
    }
    setDialogDelete(false);
  }, [acptDelete]);

  const [disableLock, setDisableLock] = useState(false);
  const actionLock = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(lockPDKCT(body));

    // Disable nut khi nhan thao tac
    setDisableLock(true);
    setTimeout(() => {
      setDisableLock(false);
    }, 2000);
  };

  // Code xy ly khi Post ct
  const postResult = useSelector((state) => state.PDKCT.postResult);
  useEffect(() => {
    if (postResult) {
      alert(postResult.RETNMSSG);

      if (postResult.RETNCODE) {
        // deleteFiles();
        if (postResult.RETNDATA !== null) {
          // if (files.length > 0) {
          //   doPostFile(postResult.RETNDATA[0].KKKK0000);
          // }
          dispatch(getDetailPDKCT(postResult.RETNDATA[0].KKKK0000));
          setMode("EDIT");
        } else {
          dispatch(resetPDKCT());
          dispatch(getDetailPDKCT());
          navigate(PageInfo.UrlLink);
        }
      }
      dispatch(resetPDKCT());
    }
  }, [postResult]);
  const deleteFiles = () => {
    if (removeFiles.length > 0) {
      deleteFileService(removeFiles, setRemoveFiles);
    }
  };
  const doPostFile = (keycode) => {
    postFileService(PageInfo.DcmnCode, keycode, files);
  };

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

  // Xu ly file đinh kem
  const [files, setFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);
  const onFileRemove = (fileItem) => {
    setRemoveFiles([...removeFiles, fileItem]);
    setFiles((prevState) =>
      prevState.filter((item) => item.id !== fileItem.id)
    );
  };
  const onFileSelected = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const fileType = file.name
        .split(".")
      [file.name.split(".").length - 1].toLowerCase();

      const icon = getFileIcon(fileType);
      //const icon = ExcelIcon
      setFiles((dcmnFiles) => [
        ...dcmnFiles,
        {
          id: v4(),
          FILENAME: file.name,
          FILEPATH: file.path,
          FILETYPE: fileType,
          ICON: icon,
          DATA: file,
        },
      ]);
    }
    e.preventDefault();
  };

  // Thao tac Detail
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState({});
  const editItemHandler = (item) => {
    editService(item, setEditItem, setOpenForm);
  };
  const removeItemHandler = (item) => {
    removeService(item, header, setHeader);
  };
  const handleSubmit = (e) => {
    submitService(e, userData, header, setHeader, setOpenForm);
  };
  const handleCancelEdit = () => {
    setOpenForm(false);
  };

  const [openNotify, setOpenNotify] = useState(false);
  const [contentNotify, setContentNotify] = useState({});
  const CancelNotifyHandler = () => {
    setOpenNotify(false);
  };
  //////////////////////////////////////

  var DcmnView;
  if (localStorage.getItem("DcmnView")) {
    var DcmnView_DATA = JSON.parse(localStorage.getItem("DcmnView"));
    var dcmnFind = DcmnView_DATA.find(
      (item) => item.DCMNCODE === PageInfo.DcmnCode
    );
    DcmnView = dcmnFind != undefined ? dcmnFind.GRP_VIEW : [];
  }
  return (
    <div>
      <div id="general" className="p-2">
        {/* Chức năng */}
        <ActionHeader
          mode={mode}
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
          disableLock={disableLock}
          // unlock={actionUnlock}

          // Quy trinh xet duyet
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

        {/* Phan Master */}
        <div className="flex md:flex-row flex-col content-center-ems">
          <div className="w-full md:flex-row flex-col">
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

              <TabStrip
                selected={tabSelected}
                onSelect={(e) => {
                  setTabSelected(e.selected);
                }}
                className="Tab-flex"
              >
                <TabStripTab title={"Thông tin chung"}>
                  <div className="grid gap-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                        {/* So chung tu */}
                        <FieldEditMaskText
                          id="MAINCODE"
                          name="MAINCODE"
                          title={getLabelValue(117, "Số chứng từ")}
                          value={header?.MAINCODE}
                          defaultValue={header?.MAINCODE}
                        />
                        {/* Ngay tao */}
                        <FieldEditDatePicker
                          id="MAINDATE"
                          name="MAINDATE"
                          title={getLabelValue(27, "Ngày tạo")}
                          format={"dd/MM/yyyy"}
                          value={new Date(header?.MAINDATE)}
                          defaultValue={new Date(header?.MAINDATE)}
                          disabled={true}
                        />
                      </div>
                      {/* Ten nhan vien */}
                      <FieldEditMaskText
                        id="EMPLNAME"
                        name="EMPLNAME"
                        title={getLabelValue(null, "Tên nhân viên")}
                        value={userData.EMPLNAME}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                        {/* Tu ngay */}
                        <FieldEditDatePicker
                          title={getLabelValue(15, "Từ ngày:")}
                          value={
                            header?.BEG_DATE
                              ? new Date(header?.BEG_DATE)
                              : new Date()
                          }
                          format={"dd/MM/yyyy"}
                          disabled={!permissions}
                          onChange={(e) =>
                            setHeader({
                              ...header,
                              BEG_DATE: moment(e.value).format("YYYY/MM/DD"),
                            })
                          }
                        />

                        {/* Đến ngày */}
                        <FieldEditDatePicker
                          title={getLabelValue(16, "Đến ngày:")}
                          value={
                            header?.END_DATE
                              ? new Date(header?.END_DATE)
                              : new Date()
                          }
                          format={"dd/MM/yyyy"}
                          disabled={!permissions}
                          onChange={(e) =>
                            setHeader({
                              ...header,
                              END_DATE: moment(e.value).format("YYYY/MM/DD"),
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {/* Noi dung cong tac */}
                      <FieldEditTextArea
                        id="MCNTNTEXT"
                        name="MCNTNTEXT"
                        row={8}
                        title={getLabelValue(255, "Nội dung công tác")}
                        placeholder={getLabelValue(255, "Nội dung công tác")}
                        value={header?.MCNTNTEXT}
                        defaultValue={header?.MCNTNTEXT}
                        onChange={(e) =>
                          setHeader({ ...header, MCNTNTEXT: e.value })
                        }
                      />
                      <div className="grid">
                        <Label className="text-sm text-gray-500">Yêu cầu dịch vụ</Label>
                        {lstSrvcRequest && Array.isArray(lstSrvcRequest) ? (
                          lstSrvcRequest.map((item) => {
                            return (
                              <span>
                                <input type="checkbox"
                                  className="k-checkbox k-checkbox-sm k-rounded-md"
                                  value={item.ITEMCODE}
                                  onChange={(e) => {
                                    const { value, checked } = e.target;
                                    if (checked) {
                                      setHeader((prevHeader) => ({
                                        ...prevHeader,
                                        SRVCRQST: [...prevHeader.SRVCRQST, value]
                                      }));
                                    } else {
                                      setHeader((prevHeader) => ({
                                        ...prevHeader,
                                        SRVCRQST: prevHeader.SRVCRQST.filter((item) => item !== value)
                                      }));
                                    }
                                  }}
                                />
                                <label className="k-checkbox-label">{item.ITEMNAME}</label>
                              </span>
                            );
                          })
                        ) : ("Không có dữ liệu"
                        )}

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
        <div className="hidden lg:block md:block">
          {header.DETAIL && (
            <BusinessRegistrationEditGrid
              items={header.DETAIL}
              onRemoveItem={removeItemHandler}
              onEditItem={editItemHandler}
              permissions={permissions}
            />
          )}
        </div>

        {/* Nut Them dong Detail */}
        <div className="p-3">
          {permissions && (
            <button
              type="button"
              disabled={!permissions}
              className={`outline outline-offset-2 outline-1 hover:outline-2 rounded-sm pr-2 pl-2 text-sm`}
              onClick={() =>
                editItemHandler({
                  KKKK0001:
                    header.DETAIL.length > 0
                      ? // ? parseInt(header.DETAIL[header.DETAIL.length - 1]) + 1
                      parseInt(header.DETAIL.length)
                      : 1,
                  FRLVDATE: new Date(),
                  TOLVDATE: new Date(),
                  EMPLCODE: userData.EMPLCODE,
                  // MAINCODE: "",
                  MAINCODE: header.MAINCODE !== "" ? header.MAINCODE : "",
                  SUMLVDT: 0.0,
                  TIMEAFTR: "",
                  TIMEEVEN: "",
                  TIMEMORN: "",
                  WORKPLAC: "",
                  WORKTYPE: "",
                })
              }
            >
              {getLabelValue(73, "Thêm dòng")}
            </button>
          )}
          <div></div>
        </div>
      </div>

      {/* Dialog chinh sua Detail */}
      {
        openForm && (
          <EditForm
            cancelEdit={handleCancelEdit}
            onSubmit={handleSubmit}
            item={editItem}
            DcmnView={DcmnView}
          />
        )
      }

      {/* Thong bao */}
      {
        openNotify && (
          <DialogSystem item={contentNotify} cancelNotify={CancelNotifyHandler} />
        )
      }

      {/* Popup xac nhan xoa */}
      {
        dialogDelete && (
          <DialogDelete
            acptDelete={acptDelete}
            setAcptDelete={setAcptDelete}
            dialogDelete={dialogDelete}
            setDialogDelete={setDialogDelete}
            onCancelDelete={CancelDeleteHandler}
            MainCode={header?.MAINCODE}
          />
        )
      }
    </div >
  );
};

export default TaskScheduleEditMain;
