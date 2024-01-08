import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { v4 } from "uuid";
import moment from "moment/moment";
import { apiUrl, baseUrl } from "../../constants";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import {
  getDetailPHDNC,
  deletePHDNC,
  postPHDNC,
  lockPHDNC,
  updatePHDNC,
  resetPHDNC,
} from "../../actions/phdnc";
import { getLstAcctDcmn } from "../../actions/account";
import { getApprovalProcess, getReviewProcess } from "../../actions/document";
import {
  ActionHeader,
  TitleHeader,
  WrapperTabStrip,
  FieldEditInput,
  FieldEditDatePicker,
  FieldEditCombobox,
  FieldEditDropdown,
  FieldEditTextArea,
  FieldEditNumberic,
  FileItem,
  DialogSystem,
  FieldEditMaskText,
  DialogDelete,
} from "../";
import DialogSearch from "./DialogSearch";
import SpendSuggestEditGrid from "./SpendSuggestEditGrid";
import EditForm from "./EditForm";

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
import {
  AiOutlineFilePdf,
  AiOutlineFileExcel,
  AiOutlineFileWord,
  AiOutlineFileImage,
  AiOutlineFileText,
  AiFillFileImage,
} from "react-icons/ai";

const getMaxValue = (arrayInpt) => {
  let MaxValue = Math.max(...arrayInpt.map((o) => parseInt(o.BUSNCODE))) + 1;
  return MaxValue;
};

const SpendSuggestEditMain = (props) => {
  const [tabSelected, setTabSelected] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getLabelValue, appColors, userData, setNotificationsAutoClose } =
    useStateContext();

  const PageInfo = {
    DcmnCode: "PHDNC",
    UrlLinkNew: "/spnd-sgst/new",
    UrlLink: "/spnd-sgst/",
    TitlePage: getLabelValue(198, "Phiếu Đề nghị thanh toán"),
  };
  var DcmnView;
  if (localStorage.getItem("DcmnView")) {
    var DcmnView_DATA = JSON.parse(localStorage.getItem("DcmnView"));
    DcmnView = DcmnView_DATA.find(
      (item) => item.DCMNCODE === PageInfo.DcmnCode
    ).GRP_VIEW;
  }
  const LctnCodeUser = JSON.parse(localStorage.getItem("userData")).LCTNCODE;

  const [mode, setMode] = useState(props.mode);
  useEffect(() => {
    props.keycode === undefined ? setMode("ADD") : setMode(props.mode);
  }, [props.keycode]);

  // Chi tiet chung tu De nghi Thanh toan
  const DetailPHDNC = useSelector((state) => state.phdnc.detailInvc); // state.PHTAM, cái PHTAM dựa vào PHTAM trong combineReducers của reducers/index.js
  const [AcceRght, setAcceRght] = useState(0);
  const [StteSign, setStteSign] = useState(0);
  // Cho phep sua du lieu hay khong
  const [permissions, setPermissions] = useState(false);

  // Khoi tao ct
  const initHeader = {
    LCTNCODE: LctnCodeUser,
    MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
    MAINCODE: "",
    DCMNSBCD: "001",
    CUOMCODE: "VND",
    CUOMRATE: 1.0,
    OBJCTYPE: 0,
    OBJCTYPENAME: "",
    OBJCCODE: "",
    OBJCNAME: "",
    ADVNCODE: "",
    ADVNDATE: moment(new Date()).format("YYYY-MM-DD"),
    EMPLCODE: userData.EMPLCODE,
    SGSTCRAM: 0.0, // Tong tien de nghi duoi Detail
    SGSTAMNT: 0.0,
    RCPTCRAM: 0.0, // Tien tam ung
    RCPTAMNT: 0.0,
    SUM_CRAM: 0.0, // So tien chi
    SUM_AMNT: 0.0,
    ACOBCODE: "",
    MEXLNNTE: "",
    SCTNCODE: "",
    MLCTDESC: "",
    PYMNTYPE: 1,
    DDDD: "PHDNC",
    ACCERGHT: 0,
    STTESIGN: 0,
    STTENAME: "",
    KKKK0000: "",
    DETAIL: [],
  };
  const [header, setHeader] = useState(initHeader);
  useEffect(() => {
    if (DetailPHDNC) {
      setHeader(DetailPHDNC !== undefined ? DetailPHDNC : initHeader);

      var fileList = DetailPHDNC.DCMNFILE;
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

      DetailPHDNC.STTESIGN <= 0 ? setPermissions(true) : setPermissions(false);
      setAcceRght(DetailPHDNC.ACCERGHT);
      setStteSign(DetailPHDNC.STTESIGN);

      // if (DetailPHDNC.OBJCTYPE == 0) {
      //   setListObjectCode(lstEmployee);
      // }
      // if (DetailPHDNC.OBJCTYPE == 1) {
      //   setListObjectCode(lstSupplier_CurrCode);
      // }
      // if (DetailPHDNC.OBJCTYPE == 2) {
      //   setListObjectCode(lstCustomer_CurrCode);
      // }
      // if (DetailPHDNC.OBJCTYPE == 3) {
      //   setListObjectCode(lstCounter);
      // }
      // if (DetailPHDNC.OBJCTYPE == 4) {
      //   setListObjectCode(lstBankAccount);
      // }

      // Quyen chinh sua duoi Detail
      if (DetailPHDNC.DETAIL && DetailPHDNC.DETAIL.length > 0) {
        const Detail_New = DetailPHDNC.DETAIL.map((element) => ({
          ...element,
          permission: false, // set FALSE cho tat ca Field KHONG Edit trong Grid

          // Field nay bo sung de hien thi ten o duoi Detail do Khong sua truc tiep tren dong
          DCMNCODE: DetailPHDNC.DDDD,
          DCMNSBCD: DetailPHDNC.DCMNSBCD,
          OBJCTYPE: DetailPHDNC.OBJCTYPE,
        }));

        setHeader((header) => ({
          ...header,
          DETAIL: Detail_New,
        }));
      }
    }

    if (!DetailPHDNC) {
      setHeader(initHeader);
      setAcceRght(1);
      setStteSign(0);
      setPermissions(true);
      setFiles([]);

      let ParaAcctDcmn =
        "'ACC', '" +
        PageInfo.DcmnCode +
        "', '" +
        header.DCMNSBCD +
        "', '" +
        moment(new Date()).format("YYYY-MM-DD") +
        "', '" +
        header.OBJCTYPE +
        "', '0'";
      dispatch(getLstAcctDcmn(ParaAcctDcmn));

      // Thay doi Danh sach Doi tuong
      // setListObjectCode(lstEmployee);
    }
  }, [DetailPHDNC]);
  // Disable nut Tim kiem ct Tạm ứng khi Không Chọn loại Hoàn ứng
  const [permitSrchAdvn, setPermitSrchAdvn] = useState(false);
  useEffect(() => {
    header.DCMNSBCD === "003" ||
    header.DCMNSBCD === "004" ||
    header.DCMNSBCD === "005"
      ? setPermitSrchAdvn(true)
      : setPermitSrchAdvn(false);
  }, [header.DCMNSBCD]);
  useEffect(() => {
    if (header.OBJCTYPE == 0) {
      setListObjectCode(lstEmployee);
    }
    if (header.OBJCTYPE == 1) {
      setListObjectCode(lstSupplier_CurrCode);
    }
    if (header.OBJCTYPE == 2) {
      setListObjectCode(lstCustomer_CurrCode);
    }
    if (header.OBJCTYPE == 3) {
      setListObjectCode(lstCounter);
    }
    if (header.OBJCTYPE == 4) {
      setListObjectCode(lstBankAccount);
    }
  }, [header.OBJCTYPE]);

  // dach sach listcode
  const lstObjcType = useSelector((state) => state.common.lstObjcType);
  const lstDcmn_Sub = useSelector((state) => state.common.lstDcmn_Sub);
  const lstmngSubDcmnSCTNC = useSelector(
    (state) => state.common.lstmngSubDcmnSCTNC
  );
  const lstCUOM = useSelector((state) => state.common.lstCUOM);
  const lstPymnType = useSelector((state) => state.common.lstPymnType);
  const lstEmployee = useSelector((state) => state.common.lstEmployee);
  const lstSupplier_CurrCode = useSelector(
    (state) => state.common.lstSupplier_CurrCode
  );
  const lstCustomer_CurrCode = useSelector(
    (state) => state.common.lstCustomer_CurrCode
  );
  const lstCounter = useSelector((state) => state.common.lstCounter);
  const lstBankAccount = useSelector((state) => state.common.lstBankAccount);
  const lstLocation = useSelector((state) => state.common.lstLocation);

  const [listObjectCode, setListObjectCode] = useState();

  // Action Chuc nang
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
      ADVNCODE: "",
      RCPTCRAM: 0,
    });
    setAcceRght(1);
    setStteSign(0);
    setPermissions(true);
    setFiles([]);
    setMode("DUP");
  };
  const actionSave = () => {
    // Kiem tra Loai chi tieu
    if (header.SCTNCODE === "" || header.SCTNCODE === null) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng chọn Loại chi tiêu",
      });
      return;
    }
    // Kiem tra Doi tuong
    else if (header.OBJCCODE === "" || header.OBJCCODE === null) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Vui lòng chọn Đối tượng",
      });
      return;
    }
    // Kiem tra dien giai tren Master
    else if (header.MEXLNNTE === "" || header.MEXLNNTE === null) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Bạn chưa nhập Lý do đề nghị",
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
    }
    // Kiem tra Loai de nghi Hoan ung
    else if (
      (header.DCMNSBCD === "003" ||
        header.DCMNSBCD === "004" ||
        header.DCMNSBCD === "005") &&
      header.ADVNCODE === ""
    ) {
      setOpenNotify(true);
      setContentNotify({
        error: "",
        type: "",
        content:
          "Vui lòng chọn chứng từ Tạm ứng do bạn đang chọn Đề nghị hoàn ứng",
      });
      return;
    }
    // Kiem tra Detail
    else if (header.DETAIL.length <= 0) {
      setOpenNotify(true);
      setContentNotify({
        type: "",
        content: "Bạn chưa nhập Chi tiết thanh toán",
      });
      return;
    } else {
      var postJson = {
        DCMNCODE: PageInfo.DcmnCode,
        HEADER: [header],
      };

      if (header.KKKK0000) {
        // update
        dispatch(updatePHDNC(postJson));
      } else {
        // Post
        dispatch(postPHDNC(postJson));
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
    dispatch(lockPHDNC(body));

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
      dispatch(deletePHDNC(body));

      // Disable nut khi nhan thao tac
      setTimeout(() => {
        setDisableDel(false);
      }, 2000);
    }
    setDialogDelete(false);
  }, [acptDelete]);

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

  // Code xy ly khi Post ct
  const postResult = useSelector((state) => state.phdnc.postResult);
  useEffect(() => {
    if (postResult) {
      alert(postResult.RETNMSSG); // Hien thong bao Khi nhan nut Luu

      if (postResult.RETNCODE) {
        deleteFiles();
        if (postResult.RETNDATA !== null) {
          if (files.length > 0) {
            doPostFile(postResult.RETNDATA[0].KKKK0000);
          }
          dispatch(getDetailPHDNC(postResult.RETNDATA[0].KKKK0000));
          setMode("EDIT");
        } else {
          dispatch(resetPHDNC());
          dispatch(getDetailPHDNC());
          navigate(PageInfo.UrlLink);
        }
      }
      dispatch(resetPHDNC());
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
      .then((response) => response.text())
      .then((result) => {})
      .catch((error) => console.log("error", error));
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

  // Su kien nhap Dup tim kiem chung tu tạm ung
  const [openSrch, setOpenSrch] = useState(false);
  const DoubleSrchHandler = () => {
    // if (
    //   header.DCMNSBCD === "003" ||
    //   header.DCMNSBCD === "004" ||
    //   header.DCMNSBCD === "005"
    // ) {
    //   if (header.OBJCCODE !== null && header.OBJCCODE !== "") {
    //     setOpenSrch(true);
    //     setOpenNotify(false);
    //   } else {
    //     setOpenSrch(false);
    //     setOpenNotify(true);
    //     setContentNotify({ type: "", content: "Chưa chọn Đối tượng" });
    //     return;
    //   }
    // }

    if (
      header.OBJCCODE !== null &&
      header.OBJCCODE !== "" &&
      header.STTESIGN <= 0
    ) {
      setOpenSrch(true);
      setOpenNotify(false);
    } else {
      setOpenSrch(false);
      setOpenNotify(true);
      setContentNotify({ type: "", content: "Chưa chọn Đối tượng" });
      return;
    }
  };
  const SubmitSrchAdvnHandler = (dataItem) => {
    setOpenSrch(false);
    setHeader({
      ...header,
      ADVNCODE: dataItem.MainCode,
      ADVNDATE: moment(dataItem.MainDate).format("YYYY-MM-DD"),
      RCPTCRAM: dataItem.RemnCrAm,
    });
  };
  const CancelSrchAdvnHandler = () => {
    setOpenSrch(false);
  };

  const [openNotify, setOpenNotify] = useState(false);
  const [contentNotify, setContentNotify] = useState({});
  const CancelNotifyHandler = () => {
    setOpenNotify(false);
  };

  // Load tk BusnCode
  useEffect(() => {
    if (header) {
      if (
        header.DCMNSBCD !== "" &&
        header.DCMNSBCD !== null &&
        header.OBJCTYPE >= 0
      ) {
        let ParaAcctDcmn =
          "'ACC', '" +
          PageInfo.DcmnCode +
          "', '" +
          header.DCMNSBCD +
          "', '" +
          moment(new Date()).format("YYYY-MM-DD") +
          "', '" +
          header.OBJCTYPE +
          "', '0'";

        dispatch(getLstAcctDcmn(ParaAcctDcmn));
      }
    }
  }, [header.DCMNSBCD, header.OBJCTYPE]);

  // Tinh lại tiền Sum_Cram tren Master
  useEffect(() => {
    let newRcptCram = header.RCPTCRAM;
    let newSgstCram = header.SGSTCRAM;
    let newSumCram = newSgstCram - newRcptCram;

    setHeader({ ...header, SUM_CRAM: newSumCram });
  }, [header.RCPTCRAM, header.SGSTCRAM]);

  // Them moi Detail
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState({});
  const editItemHandler = (item) => {
    setOpenForm(true);
    setEditItem({
      ...item,
    });
  };
  const removeItemHandler = (item) => {
    var newData = header.DETAIL.filter(
      (detail) => detail.KKKK0001 !== item.KKKK0001
    );

    let newSgstCram = 0; // tong tien de nghi tren Master
    newSgstCram = newData.reduce((accumulator, object) => {
      return accumulator + object.MNEYCRAM;
    }, 0);
    let newSumCram = newSgstCram - header.RCPTCRAM;

    setHeader({
      ...header,
      DETAIL: newData,
      SUM_CRAM: newSumCram,
      SGSTCRAM: newSgstCram,
    });
  };

  const CancelAddHandler = () => {
    setOpenForm(false);
  };
  const SubmitAddHandler = (data) => {
    var newData = [];
    if (
      header.DETAIL.find((x) => x.KKKK0001 === data.KKKK0001) === undefined // Them moi
    ) {
      newData = [...header.DETAIL, data];
    } else {
      // Cap nhat
      newData = header.DETAIL.map((item) => {
        if (data.KKKK0001 === item.KKKK0001) {
          item = {
            ...data,
          };
        }
        return item;
      });
    }

    // Tinh tong tien duoi Detail
    let newMneyCram = newData.reduce((accumulator, object) => {
      return accumulator + object.MNEYCRAM;
    }, 0);

    setHeader({ ...header, DETAIL: newData, SGSTCRAM: newMneyCram });
    setOpenForm(false);
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

      {/* Phan Header */}
      <div className="flex md:flex-row flex-col content-center-ems">
        <div className="w-full md:flex-row flex-col content-header">
          <div
            className={`lg:ml-2 ml-0 lg:mr-2 mr-0 lg:p-5 p-0 bg-white border-solid lg:border-[1px] border-0 lg:mb-0 mb-2 border-borderBase hover:border-blue-700 ${appColors.stackColor}`}
          >
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
              <TabStripTab title={getLabelValue(116, "Thông tin chung")}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      {/* So chung tu */}
                      <FieldEditMaskText
                        title={getLabelValue(117, "Số chứng từ")}
                        id="MAINCODE"
                        name="MAINCODE"
                        style={{ borderColor: "grey" }}
                        value={header?.MAINCODE}
                        defaultValue={header?.MAINCODE}
                        disabled={true}
                      />

                      {/* Ngay chung tu */}
                      <FieldEditDatePicker
                        title={getLabelValue(118, "Ngày chứng từ")}
                        format="dd/MM/yyyy"
                        defaultValue={new Date(header?.MAINDATE)}
                        value={new Date(header?.MAINDATE)}
                        disabled={!permissions}
                        onChange={(e) => {
                          setHeader({
                            ...header,
                            MAINDATE: moment(e.value).format("YYYY-MM-DD"),
                          });
                        }}
                      />
                    </div>

                    {/* Loai de nghi */}
                    <div className="mb-3">
                      <FieldEditCombobox
                        title={getLabelValue(200, "Loại đề nghị")}
                        id={"DCMNSBCD"}
                        data={lstDcmn_Sub}
                        defaultValue={
                          header !== undefined
                            ? lstDcmn_Sub.find(
                                (item) => item.ITEMCODE === header?.DCMNSBCD
                              )
                            : {}
                        }
                        value={
                          header !== undefined
                            ? lstDcmn_Sub.find(
                                (item) => item.ITEMCODE === header?.DCMNSBCD
                              )
                            : {}
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={(e) => {
                          // Xóa ct Đề nghị tam ưng khi khong chon Hoan ung
                          if (
                            e.value !== "003" ||
                            e.value !== "004" ||
                            e.value !== "005"
                          ) {
                            const newRcptCrame = header.RCPTCRAM;
                            const SgstCram = header.SGSTCRAM;
                            const newSumCram = SgstCram - newRcptCrame;

                            setHeader({
                              ...header,
                              ADVNCODE: "",
                              ADVNDATE: "1990-01-01",
                              RCPTCRAM: 0,
                              DCMNSBCD: e.target.value.ITEMCODE,
                              OBJCTYPE: parseInt(e.target.value.ITEMATTR),
                              OBJCCODE: null,
                              OBJCNAME: "",
                              SUM_CRAM: newSumCram,
                            });
                          } else {
                            setHeader({
                              ...header,
                              DCMNSBCD: e.target.value.ITEMCODE,
                              OBJCTYPE: parseInt(e.target.value.ITEMATTR),
                              OBJCCODE: null,
                              OBJCNAME: "",
                            });
                          }

                          // Thay doi Danh sach Doi tuong
                          if (e.target.value.ITEMATTR == 0) {
                            setListObjectCode(lstEmployee);
                          }
                          if (e.target.value.ITEMATTR == 1) {
                            setListObjectCode(lstSupplier_CurrCode);
                          }
                          if (e.target.value.ITEMATTR == 2) {
                            setListObjectCode(lstCustomer_CurrCode);
                          }
                          if (e.target.value.ITEMATTR == 3) {
                            setListObjectCode(lstCounter);
                          }
                          if (e.target.value.ITEMATTR == 4) {
                            setListObjectCode(lstBankAccount);
                          }
                        }}
                        disabled={!permissions}
                      />
                    </div>

                    {/* Loai chi tieu */}
                    <div className="mb-3">
                      <FieldEditCombobox
                        title={getLabelValue(202, "Loại chi tiêu")}
                        id={"SCTNCODE"}
                        data={lstmngSubDcmnSCTNC}
                        defaultValue={
                          header !== undefined
                            ? lstmngSubDcmnSCTNC.find(
                                (item) => item.ITEMCODE === header?.SCTNCODE
                              )
                            : {}
                        }
                        value={
                          header !== undefined
                            ? lstmngSubDcmnSCTNC.find(
                                (item) => item.ITEMCODE === header?.SCTNCODE
                              )
                            : {}
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={(e) => {
                          setHeader({
                            ...header,
                            SCTNCODE: e.target.value.ITEMCODE,
                          });
                        }}
                        disabled={!permissions}
                      />
                    </div>

                    {/* Lý do đề nghị */}
                    <div className="mb-3">
                      <FieldEditTextArea
                        title={getLabelValue(199, "Lý do đề nghị")}
                        id="MEXLNNTE"
                        name="MEXLNNTE"
                        rows={2}
                        value={header.MEXLNNTE}
                        disabled={!permissions}
                        onChange={(e) => {
                          setHeader({
                            ...header,
                            MEXLNNTE: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="w-full">
                    {/* Loại đối tượng */}
                    <div className="mb-3">
                      <FieldEditDropdown
                        title={getLabelValue(144, "Loại đối tượng")}
                        id={"OBJCTYPE"}
                        data={lstObjcType}
                        defaultValue={
                          header.OBJCTYPE !== ""
                            ? lstObjcType.find(
                                (item) =>
                                  parseInt(item.ITEMCODE) === header.OBJCTYPE
                              )
                            : {}
                        }
                        value={
                          header.OBJCTYPE !== ""
                            ? lstObjcType.find(
                                (item) =>
                                  parseInt(item.ITEMCODE) === header.OBJCTYPE
                              )
                            : {}
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={(e) => {
                          if (
                            header.OBJCTYPE !==
                            parseInt(e.target.value.ITEMCODE)
                          ) {
                            setHeader({
                              ...header,
                              OBJCTYPE: parseInt(e.target.value.ITEMCODE),
                              OBJCTYPENAME: e.target.value.ITEMNAME,
                              OBJCCODE: null,
                              OBJCNAME: "",
                            });
                          }

                          if (
                            header.OBJCTYPE == parseInt(e.target.value.ITEMCODE)
                          ) {
                            setHeader({
                              ...header,
                              OBJCTYPE: parseInt(e.target.value.ITEMCODE),
                              OBJCTYPENAME: e.target.value.ITEMNAME,
                            });
                          }
                        }}
                        disabled={!permissions}
                      />
                    </div>

                    {/* Đối tượng */}
                    <div className="mb-3">
                      <FieldEditCombobox
                        title={getLabelValue(143, "Đối tượng")}
                        id={"OBJCCODE"}
                        data={listObjectCode}
                        defaultValue={
                          listObjectCode &&
                          listObjectCode.length > 0 &&
                          header?.OBJCCODE !== "" &&
                          header?.OBJCCODE !== null
                            ? listObjectCode?.find(
                                (item) => item.ITEMCODE === header?.OBJCCODE
                              )
                            : "null"
                        }
                        value={
                          listObjectCode &&
                          listObjectCode.length > 0 &&
                          header?.OBJCCODE !== "" &&
                          header?.OBJCCODE !== null
                            ? listObjectCode.find(
                                (item) => item.ITEMCODE === header?.OBJCCODE
                              )
                            : "null"
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={(e) => {
                          if (e.target.value !== null) {
                            setHeader({
                              ...header,
                              OBJCCODE: e.target.value.ITEMCODE,
                              OBJCNAME: e.target.value.ITEMNAME,
                            });
                          } else {
                            setHeader({
                              ...header,
                              OBJCCODE: null,
                              OBJCNAME: "",
                            });
                          }
                        }}
                        disabled={!permissions}
                        filterable={true}
                      />
                    </div>

                    {/* Don vi Tien te & Ty gia & NV de nghi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      {/* Don vi tien te & Ty gia */}
                      <div className="w-full">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-0">
                          {/* Don vi tien te */}
                          <FieldEditDropdown
                            title={getLabelValue(87, "ĐV Tiền tệ")}
                            id={"CUOMCODE"}
                            data={lstCUOM}
                            defaultValue={
                              header !== undefined
                                ? lstCUOM.find(
                                    (item) => item.ITEMCODE === header?.CUOMCODE
                                  )
                                : {}
                            }
                            value={
                              header !== undefined
                                ? lstCUOM.find(
                                    (item) => item.ITEMCODE === header?.CUOMCODE
                                  )
                                : {}
                            }
                            style={{ width: "100%" }}
                            textField="ITEMNAME"
                            dataItemKey="ITEMCODE"
                            onChange={(e) => {
                              setHeader({
                                ...header,
                                CUOMCODE: e.value.ITEMCODE,
                              });
                            }}
                            disabled={!permissions}
                          />

                          {/* Ty gia */}
                          <FieldEditNumberic
                            title={getLabelValue(88, "Tỷ giá")}
                            id={"CUOMRATE"}
                            defaultValue={header?.CUOMRATE}
                            value={header?.CUOMRATE ? header?.CUOMRATE : 1}
                            onChange={(e) => {
                              setHeader({
                                ...header,
                                CUOMRATE: e.value,
                              });
                            }}
                            // format="n4"
                            disabled={!permissions}
                          />
                        </div>
                      </div>

                      {/* NV de nghi */}
                      <div className="mb-3">
                        <FieldEditCombobox
                          title={getLabelValue(203, "NV đề nghị")}
                          id={"OBJCCODE"}
                          data={lstEmployee}
                          defaultValue={
                            header?.EMPLCODE !== "" && header?.EMPLCODE !== null
                              ? lstEmployee.find(
                                  (item) => item.ITEMCODE === header?.EMPLCODE
                                )
                              : "null"
                          }
                          value={
                            header?.EMPLCODE !== "" && header?.EMPLCODE !== null
                              ? lstEmployee.find(
                                  (item) => item.ITEMCODE === header?.EMPLCODE
                                )
                              : "null"
                          }
                          textField="ITEMNAME"
                          dataItemKey="ITEMCODE"
                          onChange={(e) => {
                            if (e.target.value !== null) {
                              setHeader({
                                ...header,
                                EMPLCODE: e.target.value.ITEMCODE,
                              });
                            }
                          }}
                          disabled={!permissions}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="w-full">
                    {/* Phieu tam ung & Ngay tam ung */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      {/* Phieu tam ung */}
                      <FieldEditInput
                        title={getLabelValue(141, "Phiếu Đề nghị tạm ứng")}
                        id="ADVNCODE"
                        name="ADVNCODE"
                        style={{ borderColor: "grey" }}
                        value={header?.ADVNCODE}
                        defaultValue={header?.ADVNCODE}
                        disabled={!permissions || !permitSrchAdvn}
                        onDoubleClick={DoubleSrchHandler}
                        readOnly={true}
                      />

                      {/* Ngay tam ung */}
                      <FieldEditDatePicker
                        title={getLabelValue(212, "Ngày tạm ứng")}
                        id="ADVNDATE"
                        name="ADVNDATE"
                        format="dd/MM/yyyy"
                        defaultValue={new Date(header?.ADVNDATE)}
                        value={new Date(header?.ADVNDATE)}
                        disabled={true}
                      />
                    </div>

                    {/* So tien tam ung & So tien de nghi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      {/* Tien tam ung */}
                      <FieldEditNumberic
                        title={getLabelValue(146, "Tiền tạm ứng")}
                        disabled={true}
                        name="RCPTCRAM"
                        id="RCPTCRAM"
                        value={header?.RCPTCRAM}
                        defaultValue={header?.RCPTCRAM}
                      />

                      {/* So tien de nghi */}
                      <FieldEditNumberic
                        title={getLabelValue(213, "Số tiền đề nghị")}
                        disabled={true}
                        name="SGSTCRAM"
                        id="SGSTCRAM"
                        value={header?.SGSTCRAM}
                        defaultValue={header?.SGSTCRAM}
                      />
                    </div>

                    {/* So tien chi & Phuong thuc thanh toan */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                      {/* So tien chi */}
                      <FieldEditNumberic
                        title={getLabelValue(214, "Số tiền chi")}
                        disabled={true}
                        name="SUM_CRAM"
                        id="SUM_CRAM"
                        value={header?.SUM_CRAM}
                        defaultValue={header?.SUM_CRAM}
                      />

                      {/* Phuong thuc thanh toan */}
                      <FieldEditDropdown
                        title={getLabelValue(37, "Phương thức thanh toán")}
                        id="PYMNTYPE"
                        name="PYMNTYPE"
                        data={lstPymnType}
                        defaultValue={
                          header.PYMNTYPE !== ""
                            ? lstPymnType.find(
                                (item) =>
                                  parseInt(item.ITEMCODE) === header.PYMNTYPE
                              )
                            : {}
                        }
                        value={
                          header.PYMNTYPE !== ""
                            ? lstPymnType.find(
                                (item) =>
                                  parseInt(item.ITEMCODE) === header.PYMNTYPE
                              )
                            : {}
                        }
                        textField="ITEMNAME"
                        dataItemKey="ITEMCODE"
                        onChange={(e) => {
                          setHeader({
                            ...header,
                            PYMNTYPE: parseInt(e.target.value.ITEMCODE),
                          });
                        }}
                        disabled={!permissions}
                      />
                    </div>

                    {/* File đính kèm */}
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
              <TabStripTab
                title="Thông tin chung 2"
                contentClassName="full-width-ems"
              >
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-start-1 col-span-2">
                    {/* So chung tu */}
                    <FieldEditMaskText
                      title={getLabelValue(117, "Số chứng từ")}
                      id="MAINCODE"
                      name="MAINCODE"
                      style={{ borderColor: "grey" }}
                      value={header?.MAINCODE}
                      defaultValue={header?.MAINCODE}
                      disabled={true}
                    />
                  </div>

                  <div className="col-start-3 col-span-2">
                    {/* Ngay chung tu */}
                    <FieldEditDatePicker
                      title={getLabelValue(118, "Ngày chứng từ")}
                      format="dd/MM/yyyy"
                      defaultValue={new Date(header?.MAINDATE)}
                      value={new Date(header?.MAINDATE)}
                      disabled={!permissions}
                      onChange={(e) => {
                        setHeader({
                          ...header,
                          MAINDATE: moment(e.value).format("YYYY-MM-DD"),
                        });
                      }}
                    />
                  </div>

                  <div className="col-start-5 col-span-5">
                    {/* Chi nhanh */}
                    <FieldEditDropdown
                      title={getLabelValue(173, "Chi nhánh")}
                      id="LCTNCODE"
                      name="LCTNCODE"
                      style={{ borderColor: "grey" }}
                      value={
                        lstLocation &&
                        lstLocation.length > 0 &&
                        header?.LCTNCODE !== "" &&
                        header?.LCTNCODE !== null
                          ? lstLocation.find(
                              (item) => item.ITEMCODE === header?.LCTNCODE
                            )
                          : "null"
                      }
                      defaultValue={
                        lstLocation &&
                        lstLocation.length > 0 &&
                        header?.LCTNCODE !== "" &&
                        header?.LCTNCODE !== null
                          ? lstLocation.find(
                              (item) => item.ITEMCODE === header?.LCTNCODE
                            )
                          : "null"
                      }
                      disabled={true}
                      data={lstLocation}
                      textField="ITEMNAME"
                      dataItemKey="ITEMCODE"
                    />
                  </div>
                  <div className="col-start-10 col-span-3">
                    <FieldEditCombobox
                      title={getLabelValue(200, "Loại đề nghị")}
                      id={"DCMNSBCD"}
                      data={lstDcmn_Sub}
                      defaultValue={
                        header !== undefined
                          ? lstDcmn_Sub.find(
                              (item) => item.ITEMCODE === header?.DCMNSBCD
                            )
                          : {}
                      }
                      value={
                        header !== undefined
                          ? lstDcmn_Sub.find(
                              (item) => item.ITEMCODE === header?.DCMNSBCD
                            )
                          : {}
                      }
                      textField="ITEMNAME"
                      dataItemKey="ITEMCODE"
                      onChange={(e) => {
                        // Xóa ct Đề nghị tam ưng khi khong chon Hoan ung
                        if (
                          e.value !== "003" ||
                          e.value !== "004" ||
                          e.value !== "005"
                        ) {
                          const newRcptCrame = header.RCPTCRAM;
                          const SgstCram = header.SGSTCRAM;
                          const newSumCram = SgstCram - newRcptCrame;

                          setHeader({
                            ...header,
                            ADVNCODE: "",
                            ADVNDATE: "1990-01-01",
                            RCPTCRAM: 0,
                            DCMNSBCD: e.target.value.ITEMCODE,
                            OBJCTYPE: parseInt(e.target.value.ITEMATTR),
                            OBJCCODE: null,
                            OBJCNAME: "",
                            SUM_CRAM: newSumCram,
                          });
                        } else {
                          setHeader({
                            ...header,
                            DCMNSBCD: e.target.value.ITEMCODE,
                            OBJCTYPE: parseInt(e.target.value.ITEMATTR),
                            OBJCCODE: null,
                            OBJCNAME: "",
                          });
                        }

                        // Thay doi Danh sach Doi tuong
                        if (e.target.value.ITEMATTR == 0) {
                          setListObjectCode(lstEmployee);
                        }
                        if (e.target.value.ITEMATTR == 1) {
                          setListObjectCode(lstSupplier_CurrCode);
                        }
                        if (e.target.value.ITEMATTR == 2) {
                          setListObjectCode(lstCustomer_CurrCode);
                        }
                        if (e.target.value.ITEMATTR == 3) {
                          setListObjectCode(lstCounter);
                        }
                        if (e.target.value.ITEMATTR == 4) {
                          setListObjectCode(lstBankAccount);
                        }
                      }}
                      disabled={!permissions}
                    />
                  </div>
                </div>
              </TabStripTab>
            </TabStrip>
          </div>
        </div>
      </div>

      {/* Phan Detail */}
      <div>
        {header.DETAIL && (
          <SpendSuggestEditGrid
            items={header?.DETAIL}
            onRemoveItem={removeItemHandler}
            onEditItem={editItemHandler}
            permissions={permissions}
          />
        )}

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
                      ? getMaxValue(header.DETAIL)
                      : header.DETAIL.length,
                  DCMNCODE: PageInfo.DcmnCode,
                  DCMNSBCD: header.DCMNSBCD,
                  OBJCTYPE: header.OBJCTYPE,
                  BUSNCODE: String(
                    header.DETAIL.length > 0
                      ? getMaxValue(header.DETAIL)
                      : header.DETAIL.length
                  ).padStart(4, "0"),
                  RFRNDCMN: "",
                  RFRNCODE: "",
                  RFRNDATE: new Date(),
                  MNEYCRAM: 0.0,
                  COSTTYPE: 0,
                  COSTCODE: "",
                })
              }
            >
              {getLabelValue(73, "Thêm dòng")}
            </button>
          )}
        </div>
      </div>

      {/* Dialog tim ct Tam ung */}
      {openSrch && (
        <DialogSearch
          item={header}
          onSubmitSrch={SubmitSrchAdvnHandler}
          onCancel={CancelSrchAdvnHandler}
        />
      )}

      {/* Dialog hien thông bao */}
      {openNotify && (
        <DialogSystem item={contentNotify} cancelNotify={CancelNotifyHandler} />
      )}

      {/* Dialog them moi Detail */}
      {openForm && (
        <EditForm
          onCancelEdit={CancelAddHandler}
          onSubmit={SubmitAddHandler}
          item={editItem}
          DcmnView={DcmnView}
        />
      )}

      {/* Dialog khi Delete */}
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

export default SpendSuggestEditMain;
