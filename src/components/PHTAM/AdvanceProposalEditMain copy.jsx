import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { v4 } from "uuid";
import moment from "moment/moment";
import { apiUrl, baseUrl } from "../../constants";

import {
  getDetailPHTAM,
  deletePHTAM,
  postPHTAM,
  updatePHTAM,
  lockPHTAM,
  resetPHTAM,
} from "../../actions/PHTAM";

import { getApprovalProcess, getReviewProcess } from "../../actions/document";
import { getLstAccObjcCode } from "../../actions/common";

import {
  AiOutlineFilePdf,
  AiOutlineFileExcel,
  AiOutlineFileWord,
  AiOutlineFileImage,
  AiOutlineFileText,
  AiFillFileImage,
} from "react-icons/ai";

import {
  ActionHeader,
  TitleHeader,
  FieldEditDatePicker,
  FieldEditCombobox,
  FieldEditDropdown,
  FieldEditNumberic,
  FieldEditMaskText,
  FileItem,
  FieldEditTextArea,
  DialogSystem,
  DialogDelete,
} from "../";

import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

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

const AdvanceProposalEditMain = (props) => {
  const [tabSelected, setTabSelected] = useState(0);
  const [mode, setMode] = useState(props.mode);
  useEffect(() => {
    props.keycode === undefined ? setMode("ADD") : setMode(props.mode);
  }, [props.keycode]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getLabelValue, appColors, userData } = useStateContext();

  const PageInfo = {
    TitlePage: getLabelValue(141, "Chứng từ tạm ứng"),
    UrlLink: "/advn-invc/",
    UrlLinkNew: "/advn-invc/new",
    DcmnCode: "PHTAM",
  };

  // Chi tiet chung tu Tam ung
  const DetailPHTAM = useSelector((state) => state.PHTAM.detailInvc); // state.PHTAM, cái PHTAM dựa vào PHTAM trong combineReducers của reducers/index.js
  const [AcceRght, setAcceRght] = useState(0);
  const [StteSign, setStteSign] = useState(0);
  // Cho phep sua du lieu hay khong
  const [permissions, setPermissions] = useState(true);

  // Khoi tao ct
  const initHeader = {
    OBJCTYPE: 1,
    OBJCCODE: null,
    EMPLCODE: userData.EMPLCODE,
    DPTMCODE: "",
    OBJCNAME: "",
    ADVNCRAM: 0,
    ADVNAMNT: 0,
    ACPTCRAM: 0,
    ACPTAMNT: 0,
    RCPTCRAM: 0,
    RCPTAMNT: 0,
    PAY_CRAM: 0,
    PAY_AMNT: 0,
    MEXLNNTE: "",
    MAINCODE: "",
    MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
    CUOMCODE: "VND",
    CUOMRATE: 1,

    GRP_TYPE: "00",
    PERDDATE: moment(new Date()).format("YYYY-MM-DD"),
    PYMNTYPE: 0,

    DCMNSBCD: "001",
    ACOBCODE: "",
    MACOBNME: "",
  };
  const [header, setHeader] = useState(initHeader);
  useEffect(() => {
    if (DetailPHTAM) {
      setHeader(DetailPHTAM !== undefined ? DetailPHTAM : initHeader);
      setDptmName(getDptmName(DetailPHTAM.EMPLCODE));

      var fileList = DetailPHTAM.DCMNFILE;
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

      DetailPHTAM.STTESIGN <= 0 ? setPermissions(true) : setPermissions(false);
      setAcceRght(DetailPHTAM.ACCERGHT);
      setStteSign(DetailPHTAM.STTESIGN);
    }

    if (!DetailPHTAM) {
      setHeader(initHeader);
      setAcceRght(1);
      setStteSign(0);
      setPermissions(true);
      setFiles([]);
      setDptmName(getDptmName(initHeader.EMPLCODE));
    }

    setDataReviewProcess("");
    setDataApprovalProcess("");
  }, [DetailPHTAM]);

  // dach sach listcode
  const lstAccObjcCode = useSelector((state) => state.common.lstAccObjcCode);
  const lstAdvnType = useSelector((state) => state.common.lstAdvnType);
  const lstCUOM = useSelector((state) => state.common.lstCUOM);
  const lstEmployee = useSelector((state) => state.common.lstEmployee);
  const lstPymnType = useSelector((state) => state.common.lstPymnType);
  const lstDcmn_Sub = useSelector((state) => state.common.lstDcmn_Sub);
  const lstAcObManage = useSelector((state) => state.common.lstAcObManage);
  const lstDepartment = useSelector((state) => state.common.lstDepartment);

  // Hien thi Bo phan phong ban
  const [DptmName, setDptmName] = useState("");
  const getDptmName = (EmplCode) => {
    let DptmName = "";
    let ArrayItemTree = [];

    if (
      EmplCode &&
      EmplCode !== "" &&
      EmplCode !== null &&
      EmplCode !== undefined
    ) {
      const ItemCode = lstEmployee
        ? lstEmployee.find((item) => item.ITEMCODE === EmplCode)
        : (DptmName = "");

      if (ItemCode !== undefined) {
        ArrayItemTree = ItemCode.ITEMTREE.split("@@@");
      } else {
        DptmName = "";
      }

      const DptmCode = ArrayItemTree ? ArrayItemTree[1] : (DptmName = "");
      const ItemObjc = DptmCode
        ? lstDepartment.find((item) => item.ITEMCODE === DptmCode)
        : (DptmName = "");
      DptmName = ItemObjc ? ItemObjc.ITEMNAME : (DptmName = "");
    } else {
      DptmName = "";
    }

    return DptmName;
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
    // Kiem tra Loai doi tuong
    if (header.OBJCTYPE < 0) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng chọn Loại đối tượng",
      });
      return;
    }
    // Kiem tra Doi tuong
    else if (
      header.OBJCCODE === "" ||
      header.OBJCCODE === null ||
      lstAccObjcCode.find((item) => item.ITEMCODE === header.OBJCCODE) ==
        undefined
    ) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng chọn Đối tượng",
      });
      return;
    }
    // Kiem tra Ty gia
    else if (header.CUOMRATE == null || header.CUOMRATE <= 0) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng nhập Tỷ giá",
      });
      return;
    }
    // Kiem tra DVTT va Ty gia
    else if (
      (header.CUOMCODE === "VND" && header.CUOMRATE !== 1) ||
      (header.CUOMCODE !== "VND" && header.CUOMRATE === 1)
    ) {
      setOpenNotify(true);
      setContentNotify({
        error: "CUOMCODE",
        type: 1,
        content: { CUOMCODE: header.CUOMCODE, CUOMRATE: header.CUOMRATE },
      });
      return;
    } // Kiem tra So tien tam ung
    else if (header.ADVNCRAM === 0) {
      setOpenNotify(true);
      setContentNotify({
        error: "",
        type: "",
        content: "Vui lòng nhập vào số tiền tạm ứng",
      });
      return;
    }
    // // Kiem tra Phuong thuc thanh toan (Opt)
    // else if (header.PYMNTYPE <= 0) {
    //   setOpenNotify(true);
    //   setContentNotify({
    //     type: "",
    //     content: "Vui lòng chọn Phương thức thanh toán",
    //   });
    //   return;
    // }
    else {
      var postJson = {
        DCMNCODE: PageInfo.DcmnCode,
        HEADER: [header],
      };
      if (header.KKKK0000) {
        // update
        dispatch(updatePHTAM(postJson));
      } else {
        // Post
        dispatch(postPHTAM(postJson));
      }
    }
  };
  // useEffect(() => {
  //   let CuomRate = header.CUOMRATE;
  //   let newAdvnAmnt = CuomRate * header.ADVNCRAM;

  //   setHeader({ ...header, ADVNAMNT: newAdvnAmnt });
  // }, [header.CUOMRATE, header.ADVNCRAM]);

  const [openNotify, setOpenNotify] = useState(false);
  const [contentNotify, setContentNotify] = useState({});
  const CancelNotifyHandler = () => {
    setOpenNotify(false);
    setContentNotify({ type: -1 });
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
      dispatch(deletePHTAM(body));

      // Disable nut khi nhan thao tac
      setTimeout(() => {
        setDisableDel(false);
      }, 2000);
    }
    setDialogDelete(false);
  }, [acptDelete]);

  const [disableLock, setDisableLock] = useState(false);
  const actionLock = () => {
    setDisableLock(true);

    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(lockPHTAM(body));

    // Disable nut khi nhan thao tac
    setTimeout(() => {
      setDisableLock(false);
    }, 2000);
  };

  // Code xy ly khi Post ct
  const postResult = useSelector((state) => state.PHTAM.postResult);
  useEffect(() => {
    if (postResult) {
      alert(postResult.RETNMSSG);

      if (postResult.RETNCODE) {
        deleteFiles();
        if (postResult.RETNDATA !== null) {
          if (files.length > 0) {
            doPostFile(postResult.RETNDATA[0].KKKK0000);
          }
          dispatch(getDetailPHTAM(postResult.RETNDATA[0].KKKK0000));
          setMode("EDIT");
        } else {
          dispatch(resetPHTAM());
          dispatch(getDetailPHTAM());
          navigate(PageInfo.UrlLink);
        }
      }
      dispatch(resetPHTAM());
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
      .then((result) => z(result))
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
      .then((response) => response.text())
      // .then((result) => {})
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  // Quy trinh xet duyet
  const [disableReview, setDisableReview] = useState(false);
  const reviewProcess = useSelector((state) => state.document.reviewProcess);
  const [dataReviewProcess, setDataReviewProcess] = useState();
  useEffect(() => {
    setDataReviewProcess(reviewProcess);
  }, [reviewProcess]);
  const [showReviewProcess, setShowReviewProcess] = useState(false);
  const actionReviewProcess = () => {
    const body = {
      DCMNCODE: "dmsDcmnVchr",
      PARA_001: PageInfo.DcmnCode,
      PARA_002: header.KKKK0000,
      PARA_003: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
      PARA_004: "{{0107}}",
    };
    dispatch(getReviewProcess(body));
    if (showReviewProcess) {
      setShowReviewProcess(false);
    } else {
      // dispatch(getReviewProcess(body));
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
  const [dataApprovalProcess, setDataApprovalProcess] = useState();
  const [showApprovalProcess, setShowApprovalProcess] = useState(false);
  useEffect(() => {
    setDataApprovalProcess(approvalProcess);
  }, [approvalProcess]);
  const actionApprovalProcess = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(getApprovalProcess(body));
    if (showApprovalProcess) {
      setShowApprovalProcess(false);
    } else {
      // dispatch(getApprovalProcess(body));
      setShowApprovalProcess(true);
      setShowReviewProcess(false);
      setDisableApproval(true);
    }
  };
  const closeApprovalProcess = () => {
    setShowApprovalProcess(false);
    setDisableApproval(false);
  };

  // Event
  const ObjcTypeChgeHandler = (event) => {
    setLoadingAccObjcList(true);

    // dispatch(getLstAccObjcCode(event.value.ITEMATTR));

    if (header.OBJCTYPE !== event.value.OBJCTYPE) {
      setHeader({
        ...header,
        OBJCCODE: null,
        OBJCTYPE: event.value.OBJCTYPE,
        GRP_TYPE: event.value.ITEMATTR,
      });
    } else {
      setHeader({
        ...header,
        OBJCTYPE: event.value.OBJCTYPE,
        GRP_TYPE: event.value.ITEMATTR,
      });
    }
  };
  const ObjcCodeChgeHandler = (event) => {
    if (event.value !== null) {
      setHeader({
        ...header,
        OBJCCODE: event.value.ITEMCODE,
        OBJCNAME: event.value.ITEMNAME,
      });
    } else {
      setHeader({
        ...header,
        OBJCCODE: null,
        OBJCNAME: "",
      });
    }
  };
  const [loadingAccObjcList, setLoadingAccObjcList] = useState(false);
  useEffect(() => {
    setLoadingAccObjcList(false);
  }, [lstAccObjcCode]);
  useEffect(() => {
    let objcTypeItem = -1;
    // if (lstAdvnType && DetailPHTAM && lstAdvnType.length > 0) {
    //   objcTypeItem = lstAdvnType.find(
    //     (item) => item.ITEM_KEY == DetailPHTAM.OBJCTYPE
    //   );
    //   if (objcTypeItem && objcTypeItem.ITEMATTR) {
    //     const ObjcType = parseInt(objcTypeItem.ITEMATTR);
    //     console.log("ObjcType", ObjcType);

    //     dispatch(getLstAccObjcCode(ObjcType));
    //   }
    // }

    if (lstAdvnType && header && lstAdvnType.length > 0) {
      objcTypeItem = lstAdvnType.find(
        (item) => item.ITEM_KEY == header.OBJCTYPE
      );

      if (objcTypeItem && objcTypeItem.ITEMATTR) {
        let ObjcType = parseInt(objcTypeItem.ITEMATTR);

        dispatch(getLstAccObjcCode(ObjcType));
      }
    }
  }, [lstAdvnType, header.OBJCTYPE]);

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

  return (
    <>
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
        reviewProcess={dataReviewProcess}
        actionReviewProcess={actionReviewProcess}
        closeReviewProcess={closeReviewProcess}
        showReviewProcess={showReviewProcess}
        disableReview={disableReview}
        // Qua trinh xet duyet
        approvalProcess={dataApprovalProcess}
        actionApprovalProcess={actionApprovalProcess}
        closeApprovalProcess={closeApprovalProcess}
        showApprovalProcess={showApprovalProcess}
        disableApproval={disableApproval}
      />

      {/* Phan Header */}
      <div className="flex md:flex-row flex-col content-center-ems">
        <div className="w-full md:flex-row flex-col content-header">
          <div
            className={`lg:ml-2 ml-0 lg:mr-2 mr-0 lg:p-5 p-0 bg-white border-solid lg:border-[1px] border-0 lg:mb-0 mb-2 border-borderBase hover:border-blue-700 ${appColors.stackColor}`}
          >
            <TitleHeader
              TitlePage={PageInfo.TitlePage}
              MainCode={header?.MAINCODE}
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
              <TabStripTab title={getLabelValue(116, "Thông tin chung")}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="w-full">
                    {/* So chung tu & Ngay chung tu */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
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
                        defaultValue={
                          header?.MAINDATE
                            ? new Date(header.MAINDATE)
                            : new Date()
                        }
                        value={
                          header?.MAINDATE
                            ? new Date(header.MAINDATE)
                            : new Date()
                        }
                        disabled={!permissions}
                        onChange={(e) =>
                          setHeader({
                            ...header,
                            MAINDATE: moment(e.value).format("YYYY-MM-DD"),
                          })
                        }
                      />
                    </div>

                    {/* Loai tam ung & Loai doi  tuong */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {/* Loai tam ung */}
                      <FieldEditDropdown
                        title={getLabelValue(142, "Loại tạm ứng")}
                        id={"DCMNSBCD"}
                        data={lstDcmn_Sub}
                        value={
                          header !== undefined
                            ? lstDcmn_Sub.find(
                                (item) => item.ITEMCODE === header?.DCMNSBCD
                              )
                            : {}
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={(event) =>
                          setHeader({
                            ...header,
                            DCMNSBCD: event.value.ITEMCODE,
                          })
                        }
                        disabled={!permissions}
                      />

                      {/* Loai doi tuong */}
                      <FieldEditDropdown
                        title={getLabelValue(144, "Loại đối tượng")}
                        id={"OBJCTYPE"}
                        data={lstAdvnType}
                        defaultValue={
                          header !== undefined
                            ? lstAdvnType.find(
                                (item) =>
                                  parseInt(item.ITEMCODE) == header?.OBJCTYPE
                              )
                            : {}
                        }
                        value={
                          header !== undefined
                            ? lstAdvnType.find(
                                (item) => item.OBJCTYPE == header?.OBJCTYPE
                              )
                            : {}
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={ObjcTypeChgeHandler}
                        disabled={!permissions}
                      />
                    </div>

                    {/* Doi tuong */}
                    <div className="mb-3">
                      <FieldEditCombobox
                        title={getLabelValue(143, "Đối tượng")}
                        id={"OBJCCODE"}
                        data={lstAccObjcCode}
                        defaultValue={
                          header !== undefined &&
                          header.OBJCCODE !== null &&
                          header.OBJCCODE !== ""
                            ? lstAccObjcCode.find(
                                (item) => item.ITEMCODE === header.OBJCCODE
                              )
                            : null
                        }
                        value={
                          header !== undefined && header.OBJCCODE !== null
                            ? lstAccObjcCode.find(
                                (item) => item.ITEMCODE === header.OBJCCODE
                              )
                            : null
                        }
                        textField="ITEMSRCH"
                        dataItemKey="ITEMCODE"
                        onChange={ObjcCodeChgeHandler}
                        filterable={true}
                        disabled={!permissions || loadingAccObjcList}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    {/* Don vi tien te & Ty gia & Tien tam ung */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      <div className="w-full">
                        {/* Don vi tien te & Ty gia */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                          {/* Don vi tien te */}
                          <FieldEditDropdown
                            title={getLabelValue(87, "ĐV Tiền tệ")}
                            id={"CUOMCODE"}
                            data={lstCUOM}
                            value={
                              header !== undefined
                                ? lstCUOM.find(
                                    (item) => item.ITEMCODE === header.CUOMCODE
                                  )
                                : {}
                            }
                            style={{ width: "100%" }}
                            textField="ITEMNAME"
                            dataItemKey="ITEMCODE"
                            onChange={(event) =>
                              setHeader({
                                ...header,
                                CUOMCODE: event.value.ITEMCODE,
                              })
                            }
                            disabled={!permissions}
                          />

                          {/* Ty gia */}
                          <FieldEditNumberic
                            title={getLabelValue(88, "Tỷ giá")}
                            id={"CUOMRATE"}
                            value={header.CUOMRATE ? header.CUOMRATE : 1}
                            onChange={(event) =>
                              setHeader({
                                ...header,
                                CUOMRATE: event.value,
                              })
                            }
                            // format="n4"
                            disabled={!permissions}
                          />
                        </div>
                      </div>

                      {/* Tien tam ung */}
                      <FieldEditNumberic
                        title={getLabelValue(146, "Tiền tạm ứng")}
                        id={"ADVNCRAM"}
                        value={header.ADVNCRAM ? header.ADVNCRAM : 0}
                        onChange={(event) =>
                          setHeader({
                            ...header,
                            ADVNCRAM: event.value,
                          })
                        }
                        // format="n4"
                        disabled={!permissions}
                      />
                    </div>

                    {/* So tien da nhan & So tien da thanh toan */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {/* Số tiền đã nhận */}
                      <FieldEditNumberic
                        title={getLabelValue(147, "Số tiền đã nhận")}
                        id={"RCPTCRAM"}
                        value={header.RCPTCRAM ? header.RCPTCRAM : 0}
                        // format="n4"
                        disabled={true}
                      />

                      {/* So tien da thanh toan */}
                      <FieldEditNumberic
                        title={getLabelValue(148, "Số tiền đã thanh toán")}
                        id={"RCPTCRAM"}
                        value={header.PAY_CRAM ? header.PAY_CRAM : 0}
                        // format="n4"
                        disabled={true}
                      />
                    </div>

                    {/* Ly do de nghi */}
                    <div className="mb-3">
                      <FieldEditTextArea
                        title={getLabelValue(199, "Lý do đề nghị")}
                        id={"MEXLNNTE"}
                        value={header?.MEXLNNTE}
                        defaultValue={header?.MEXLNNTE}
                        onChange={(e) => {
                          setHeader({ ...header, MEXLNNTE: e.value });
                        }}
                        disabled={!permissions}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    {/* NV lap phieu & Bo phan */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {/* NV lap phieu */}
                      <FieldEditDropdown
                        title={getLabelValue(149, "NV lập phiếu")}
                        id={"EMPLCODE"}
                        data={lstEmployee}
                        value={
                          header !== undefined
                            ? lstEmployee.find(
                                (item) => item.ITEMCODE === header?.EMPLCODE
                              )
                            : {}
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={(event) => {
                          setHeader({
                            ...header,
                            EMPLCODE: event.value.ITEMCODE,
                          });

                          setDptmName(getDptmName(event.value.ITEMCODE));
                        }}
                        disabled={!permissions}
                      />
                      {/* Bo phan */}
                      <FieldEditMaskText
                        title={getLabelValue(150, "Bộ phận")}
                        id={""}
                        value={DptmName}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                      {/* Phuong thuc thanh toan */}
                      <FieldEditDropdown
                        title={getLabelValue(37, "Phương thức thanh toán")}
                        id={"PYMNTYPE"}
                        data={lstPymnType}
                        value={
                          header !== undefined
                            ? lstPymnType.find(
                                (item) =>
                                  parseInt(item.ITEMCODE) === header?.PYMNTYPE
                              )
                            : {}
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={(event) =>
                          setHeader({
                            ...header,
                            PYMNTYPE: event.value.ITEMCODE,
                          })
                        }
                        disabled={!permissions}
                      />

                      {/* Du an */}
                      <FieldEditDropdown
                        title={getLabelValue(151, "Dự án")}
                        id={"ACOBCODE"}
                        data={lstAcObManage}
                        value={
                          header !== undefined
                            ? lstPymnType.find(
                                (item) => item.ITEMCODE === header?.ACOBCODE
                              )
                            : {}
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={(event) =>
                          setHeader({
                            ...header,
                            ACOBCODE: event.value.ITEMCODE,
                          })
                        }
                        disabled={!permissions}
                      />
                    </div>

                    {/* File dinh kem */}
                    <div className="mb-3">
                      <div className="file-attach">
                        <div className="flex mb-3">
                          <p className="w-full">
                            {getLabelValue(57, "File đính kèm")}
                          </p>
                          {permissions && (
                            <input
                              type="file"
                              multiple
                              className="text-sm cursor-pointer relative block w-32 h-full"
                              onChange={(e) => {
                                onFileSelected(e);
                                e.target.value == null;
                              }}
                              disabled={!permissions}
                            />
                          )}
                        </div>
                        <div>
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
                </div>
              </TabStripTab>
            </TabStrip>
          </div>
        </div>
      </div>

      {/* Xử lý Hậu kiểm khi khóa ct */}
      {openNotify && (
        <DialogSystem item={contentNotify} cancelNotify={CancelNotifyHandler} />
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
    </>
  );
};

export default AdvanceProposalEditMain;
