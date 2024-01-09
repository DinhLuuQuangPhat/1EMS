import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { useStateContext } from "../../context/ContextProvider";
import {
  FieldEditCombobox,
  FileItem,
  FieldEditMultiSelect,
  FieldEditDatePicker,
  FieldEditTextArea,
  FieldEditMaskText,
  FieldEditInput,
  DialogDelete,
  DialogSystem,
} from "../";
import { v4 } from "uuid";
import moment from "moment/moment";
import {
  deleteLHCV,
  getDetailLHCV,
  lockLHCV,
  postLHCV,
  resetLHCV,
  updateLHCV,
} from "../../actions/lhcv";
import { apiUrl, baseUrl } from "../../constants";
import { getApprovalProcess, getReviewProcess } from "../../actions/document";

import {
  AiOutlineFilePdf,
  AiOutlineFileExcel,
  AiOutlineFileWord,
  AiOutlineFileImage,
  AiOutlineFileText,
  AiFillFileImage,
  AiFillFile,
} from "react-icons/ai";
import { ActionHeader, TitleHeader } from "../../components";

const userData = JSON.parse(localStorage.getItem("userData"));

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

const ServiceContactEditMain = (props) => {
  const [tabSelected, setTabSelected] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setDisableLocation, getLabelValue, appColors, userData } =
    useStateContext();

  const PageInfo = {
    TitlePage: getLabelValue(193, "Phiếu Liên hệ công vụ"),
    UrlLink: "/dcmn-work/",
    UrlLinkNew: "/dcmn-work/new",
    DcmnCode: "LHCV",
  };

  const CompInfo = JSON.parse(localStorage.getItem("company"));
  const [mode, setMode] = useState(props.mode);
  useEffect(() => {
    props.keycode === undefined ? setMode("ADD") : setMode(props.mode);
  }, [props.keycode]);

  const lienHeCongVu = useSelector((state) => state.LHCV.lienHeCongVu);
  const [AcceRght, setAcceRght] = useState(0);
  const [StteSign, setStteSign] = useState(0);
  // Cho phep sua du lieu hay khong
  const [permissions, setPermissions] = useState(false);

  const initHeader = {
    LCTNCODE: userData.LCTNCODE,
    MAINCODE: "",
    MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
    EMPLSEND: userData.EMPLCODE,
    EMPLRECV: "",
    EMPLREFR: "",
    DCMNSBCD: "001",
    MPURPNME: "",
    MCONTENT: "",
    FISHDATE: moment(new Date()).format("YYYY-MM-DD"),
    FISHPLCE: "",
    DCMNSBNAME: "",
    DDDD: PageInfo.DcmnCode,
    ACCERGHT: 1,
    STTESIGN: 0,
    STTENAME: "",
    KKKK0000: "",
    DCMNFILE: [],
  };
  const [header, setHeader] = useState(initHeader);

  useEffect(() => {
    if (lienHeCongVu) {
      setHeader(lienHeCongVu !== undefined ? lienHeCongVu : initHeader);

      var fileList = lienHeCongVu.DCMNFILE;
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

      lienHeCongVu.STTESIGN <= 0 ? setPermissions(true) : setPermissions(false);
      setAcceRght(lienHeCongVu.ACCERGHT);
      setStteSign(lienHeCongVu.STTESIGN);
    }

    if (!lienHeCongVu) {
      setHeader(initHeader);
      setAcceRght(1);
      setStteSign(0);
      setPermissions(true);
      setFiles([]);
    }
  }, [lienHeCongVu]);

  // Danh sach ListCode
  const lstDcmn_Sub = useSelector((state) => state.common.lstDcmn_Sub);
  const appEmplList = useSelector((state) => state.common.appEmplList);

  // Popup hien thong bao
  const [openNotify, setOpenNotify] = useState(false);
  const [contentNotify, setContentNotify] = useState({});
  const CancelNotifyHandler = () => {
    setOpenNotify(false);
    setContentNotify({ type: -1 });
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
    setFiles([]);
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
    setPermissions(true);
    setFiles([]);
    setMode("DUP");
  };
  const actionSave = () => {
    if (
      header.EMPLRECV == "" ||
      header.EMPLRECV == null ||
      header.EMPLRECV == undefined
    ) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng chọn Người nhận",
      });
      return;
    } else if (header.MPURPNME == "") {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng Nhập mục đích liên hệ",
      });
      return;
    } else if (header.MCONTENT == "") {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng Nhập mục đích liên hệ",
      });
      return;
    } else {
      var postJson = {
        DCMNCODE: PageInfo.DcmnCode,
        HEADER: [header],
      };

      if (header.KKKK0000) {
        // update
        dispatch(updateLHCV(postJson));
      } else {
        // Post
        dispatch(postLHCV(postJson));
      }
    }
  };

  const [disableLock, setDisableLock] = useState(false);
  const actionLock = () => {
    setDisableLock(true);

    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(lockLHCV(body));

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
      dispatch(deleteLHCV(body));

      // Disable nut khi nhan thao tac
      setTimeout(() => {
        setDisableDel(false);
      }, 2000);
    }
    setDialogDelete(false);
  }, [acptDelete]);

  // Code xy ly khi Post ct
  const postResult = useSelector((state) => state.LHCV.postResult);
  useEffect(() => {
    if (postResult) {
      console.log(postResult);

      alert(postResult.RETNMSSG);

      if (postResult.RETNCODE) {
        if (postResult.RETNDATA !== null) {
          deleteFiles();
          if (files.length > 0) {
            doPostFile(postResult.RETNDATA[0].KKKK0000);
          }
          dispatch(getDetailLHCV(postResult.RETNDATA[0].KKKK0000));
          setMode("EDIT");
        } else {
          dispatch(resetLHCV());
          dispatch(getDetailLHCV());
          navigate(PageInfo.UrlLink);
        }
      }

      dispatch(resetLHCV());
    }
  }, [postResult]);
  const deleteFiles = () => {
    if (removeFiles.length > 0) {
      removeFiles.map((item) => {
        if (item.KEY_CODE != null && item.FILECODE != null) {
          doPostDeleteFiles(item.DCMNCODE, item.KEY_CODE, item.FILECODE);
        }
      });
      setRemoveFiles([]);
    }
  };
  const doPostDeleteFiles = (dcmnCode, key, fileCode) => {
    var myHeaders = new Headers();
    myHeaders.append("TOKEN", localStorage.getItem("usertoken"));
    var formdata = new FormData();
    formdata.append("DCMNCODE", dcmnCode);
    formdata.append("KEY_CODE", key);
    formdata.append("FILECODE", fileCode);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(baseUrl + apiUrl.deleteFile.value, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const doPostFile = (keycode) => {
    var myHeaders = new Headers();
    myHeaders.append("TOKEN", localStorage.getItem("usertoken"));
    var formdata = new FormData();
    formdata.append("DCMNCODE", PageInfo.DcmnCode);
    formdata.append("KEY_CODE", keycode);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    for (var i = 0; i < files.length; i++) {
      var file = files[i].DATA;
      if (file === null || file.name === null) {
        continue;
      }
      formdata.append("Files", file, file.name);
    }
    fetch(baseUrl + apiUrl.postFile.value, requestOptions)
      // .then((response) => response.text())
      .then((response) => {
        response.text();

        if (response.status == 200) {
          if (header.KKKK0000 != "") {
            dispatch(getDetailPHDNC(header.KKKK0000));
          }
        }
      })
      .then((result) => { })
      .catch((error) => console.log("error", error));
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

  // Quy trinh xet duyet
  const reviewProcess = useSelector((state) => state.document.reviewProcess);
  const [showReviewProcess, setShowReviewProcess] = useState(false);
  const [disableReview, setDisableReview] = useState(false);
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
  const approvalProcess = useSelector(
    (state) => state.document.approvalProcess
  );
  const [showApprovalProcess, setShowApprovalProcess] = useState(false);
  const [disableApproval, setDisableApproval] = useState(false);
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
          Key_Code={header.KKKK0000 ? header.KKKK0000 : ""}
          AcceRght={AcceRght}
          StteSign={StteSign}
          onClickBack={ClickBackList}
          add={actionAdd}
          dup={actionDup}
          save={actionSave}
          delete={actionDelete}
          disableDel={disableDel}
          lock={actionLock}
          disableLock={disableLock}
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
                      {/* So chung tu & Ngay chung tu */}
                      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2">
                        {/* So chung tu */}
                        <FieldEditMaskText
                          id="MAINCODE"
                          name="MAINCODE"
                          title={getLabelValue(117, "Số chứng từ")}
                          value={header?.MAINCODE}
                        />
                        {/* Ngay chung tu */}
                        <FieldEditDatePicker
                          id="MAINDATE"
                          name="MAINDATE"
                          title={getLabelValue(118, "Ngày chứng từ")}
                          format="dd/MM/yyyy"
                          defaultValue={new Date(header?.MAINDATE)}
                          disabled={!permissions}
                          className={appColors.inputColor}
                          value={new Date(header?.MAINDATE)}
                          onChange={(e) =>
                            setHeader({
                              ...header,
                              MAINDATE: moment(e.target.value).format(
                                "YYYY-MM-DD"
                              ),
                            })
                          }
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Danh sach nguoi nhan */}
                      <FieldEditMultiSelect
                        title={"Danh sách người nhận"}
                        id={"EMPLRECV"}
                        data={appEmplList}
                        defaultValue={
                          header !== undefined
                            ? appEmplList.filter((item) =>
                              header?.EMPLRECV?.split(",").includes(
                                item.EMPLCODE
                              )
                            )
                            : []
                        }
                        textField="EMPLNAME"
                        dataItemKey="EMPLCODE"
                        onChange={(e) => {
                          var listEmpCode = [];
                          e.value.map((item) =>
                            listEmpCode.push(item.EMPLCODE)
                          );
                          setHeader({
                            ...header,
                            EMPLRECV: listEmpCode.join(),
                          });
                        }}
                        disabled={!permissions}
                      />
                      {/* Danh sach tham khao */}
                      <FieldEditMultiSelect
                        title={"Danh sách tham khảo"}
                        id={"EMPLREFR"}
                        data={appEmplList}
                        defaultValue={
                          header !== undefined
                            ? appEmplList.filter((item) =>
                              header?.EMPLREFR?.split(",").includes(
                                item.EMPLCODE
                              )
                            )
                            : []
                        }
                        textField="EMPLNAME"
                        dataItemKey="EMPLCODE"
                        onChange={(e) => {
                          var listEmpCode = [];
                          e.value.map((item) =>
                            listEmpCode.push(item.EMPLCODE)
                          );
                          setHeader({
                            ...header,
                            EMPLREFR: listEmpCode.join(),
                          });
                        }}
                        disabled={!permissions}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {/* Lanh vuc lien quan */}
                      <FieldEditCombobox
                        title={getLabelValue(194, "Lĩnh vực liên quan")}
                        id={"DCMNSBCD"}
                        data={lstDcmn_Sub}
                        defaultValue={
                          header !== undefined
                            ? lstDcmn_Sub.find(
                              (item) => item.ITEMCODE === header.DCMNSBCD
                            )
                            : {}
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={(e) => {
                          setHeader({
                            ...header,
                            DCMNSBCD: e.target.value.ITEMCODE,
                          });
                        }}
                        disabled={!permissions}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {/* Muc dich lien he */}
                      <FieldEditTextArea
                        title={getLabelValue(195, "Mục đích liên hệ")}
                        placeholder={getLabelValue(195, "Mục đích liên hệ")}
                        row={5}
                        defaultValue={header?.MPURPNME}
                        value={header.MPURPNME}
                        disabled={!permissions}
                        onChange={(e) => {
                          setHeader({
                            ...header,
                            MPURPNME: e.target.value,
                          });
                        }}
                      />
                      {/* Noi dung lien he */}
                      <FieldEditTextArea
                        title={getLabelValue(21, "Nội dung liên hệ")}
                        placeholder={getLabelValue(21, "Nội dung liên hệ")}
                        row={5}
                        defaultValue={header?.MCONTENT}
                        value={header?.MCONTENT}
                        disabled={!permissions}
                        onChange={(e) => {
                          setHeader({
                            ...header,
                            MCONTENT: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {/* Thoi gian hoan thanh */}
                      <FieldEditDatePicker
                        id="MAINDATE"
                        name="MAINDATE"
                        title={getLabelValue(118, "Thời gian hoàn thành")}
                        format="dd/MM/yyyy"
                        defaultValue={new Date(header?.MAINDATE)}
                        disabled={!permissions}
                        className={appColors.inputColor}
                        value={new Date(header?.MAINDATE)}
                        onChange={(e) =>
                          setHeader({
                            ...header,
                            MAINDATE: moment(e.target.value).format(
                              "YYYY-MM-DD"
                            ),
                          })
                        }
                      />
                      {/* Dia diem */}
                      <FieldEditInput
                        title={getLabelValue(null, "Địa điểm")}
                        placeholder={getLabelValue(null, "Địa điểm")}
                      />
                    </div>
                    {/* File dinh kem */}
                    <div>
                      <div className="file-attach">
                        <div className="mb-1">
                          <p className="w-full">
                            {getLabelValue(57, "File đính kèm")}
                          </p>
                          <div className="inline-flex relative border border-gray-300 h-7 w-full items-center k-rounded-md">
                            <button className="border-r border-gray-300 bg-[#f5f5f5] px-2 h-full" disabled>
                              <AiFillFile />
                            </button>
                            <div>
                              {permissions && (
                                <input
                                  type="file"
                                  multiple
                                  className="text-xs pl-2"
                                  onChange={(e) => {
                                    onFileSelected(e);
                                    e.target.value == null;
                                  }}
                                  disabled={!permissions}
                                />
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="w-full border border-gray-300 k-rounded-md h-20">
                          <div className="fileattachment">
                            {files &&
                              files.length > 0 &&
                              files.map((fileItem) => (
                                <FileItem
                                  key={fileItem.id}
                                  fileItem={fileItem}
                                  onFileRemove={onFileRemove}
                                  disabled={permissions}
                                />
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabStripTab>
              </TabStrip>
            </div>
          </div>
        </div>

        {/* Xử lý Hậu kiểm khi khóa ct */}
        {openNotify && (
          <DialogSystem
            item={contentNotify}
            cancelNotify={CancelNotifyHandler}
          />
        )}

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
      </div>
    </div>
  );
};

export default ServiceContactEditMain;
