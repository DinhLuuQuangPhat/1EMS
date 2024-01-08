import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { v4 } from "uuid";
import moment from "moment/moment";
import {
  AiOutlineFilePdf,
  AiOutlineFileExcel,
  AiOutlineFileWord,
  AiOutlineFileImage,
  AiOutlineFileText,
} from "react-icons/ai";

import {
  getDetailHDBHD,
  deleteHDBHD,
  postHDBHD,
  updateHDBHD,
  lockHDBHD,
  resetHDBHD,
} from "../../actions/hdbhd";
import {
  getLstDistrict,
  getLstWard,
  getLstProductAll,
} from "../../actions/common";
import { getApprovalProcess, getReviewProcess } from "../../actions/document";

import {
  TitleHeader,
  TitleAmnt,
  WrapperTabStrip,
  FieldEditCombobox,
  FieldEditDropdown,
  FieldEditNumberic,
  FieldEditInput,
  FieldEditMaskText,
  FieldEditDatePicker,
  FieldEditAmnt,
  ActionHeader,
} from "../../components";
import DialogNotify from "./DialogNotify";
import RetailBillEditGrid from "./RetailBillEditGrid";
import EditForm from "./EditForm";

import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { MaskedTextBox, TextArea, Switch } from "@progress/kendo-react-inputs";
import { Label } from "@progress/kendo-react-labels";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";

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

const RetailBillEditMain = (props) => {
  const [tabSelected, setTabSelected] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getLabelValue, appColors } = useStateContext();

  const PageInfo = {
    TitlePage: getLabelValue(134, "Biên nhận bán hàng"),
    TitleAmount: getLabelValue(49, "Tạm tính"),
    UrlLink: "/retail-bill/",
    UrlLinkNew: "/retail-bill/new",
    DcmnCode: "HDBHD",
  };

  // Chi tiet chung tu
  const DetailHDBHD = useSelector((state) => state.hdbhd.detailInvc);
  const [AcceRght, setAcceRght] = useState(0);
  const [StteSign, setStteSign] = useState(0);
  // Cho phep sua du lieu hay khong
  const [permissions, setPermissions] = useState(false);

  // Khoi tao ct
  const initHeader = {
    COMPCODE: "",
    LCTNCODE: "",
    MAINCODE: "",
    MAINDATE: "",
    DCMNCODE: "HDBHD",
    DCMNDATA: 2,
    SALEMEAN: 1, // 1.Xuất hóa đơn trước xuất kho sau; 2.Xuất kho trước xuất hóa đơn sau
    CUSTCODEDCMNSBCD: "001", // Ban hang
    PRDCTYPE: "001",
    ODERCODE: "",
    IVTRCODE: "",
    WRHSCODE: "",
    CNTRCODE: "",
    SHOPCODE: "",
    EMPLCODE: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
    CUSTCODE: "",
    CUSTNAME: "",
    CUSTPHNE: "",
    CUSTCITY: "",
    CUSTDIST: "",
    CUSTWARD: "",
    CUSTSTRT: "",
    CUSTNUMB: "",
    CUSTADDR: "",

    INVCCODE: "",
    INVCDATE: "",
    INVCSIGN: "",
    INVCTEMP: "",

    VAT_CUST: "",
    VAT_ADDR: "",
    VAT_CODE: "",

    DLVRCODE: "",
    DLVRDATE: "",
    DLVRCITY: "",
    DLVRDIST: "",
    DLVRWARD: "",
    DLVRSTRT: "",
    DLVRNUMB: "",
    DLVRADDR: "",

    RLTNOBJC: "",
    RLTN_TEL: "",

    CUOMCODE: "VND",
    CUOMRATE: 1,

    VAT_RATE: 0,
    VAT_CRAM: 0,
    VAT_AMNT: 0,

    DCNTRATE: 0,
    DCNTCRAM: 0,
    DCNTAMNT: 0,

    RDTNRATE: 0,
    RDTNCRAM: 0,
    RDTNAMNT: 0,

    CMNSRATE: 0,
    CMNSCRAM: 0,
    CMNSAMNT: 0,

    DLVRRATE: 0,
    DLVRCRAM: 0,
    DLVRAMNT: 0,

    SMMNCRAM: 0,
    SMMNAMNT: 0,
    SMCRAM_V: 0,
    SMAMNT_V: 0,

    SUM_CRAM: 0,
    SUM_AMNT: 0,
    PYMNCRAM: 0,
    PYMNAMNT: 0,

    PYMNCODE: 0,
    PYMNPERD: "",
    PAY_MTHD: 0,

    MEXLNNTE: "",

    COSTTYPE: 0,
    COSTCODE: "",
    CHNLCODE: "",
    SCHDCODE: "",

    SRC_DATA: 3,
    CLSEOUPT: 0,
    LINKINVC: "",
    CLSEDCMN: 0,

    CONTCODE: "",
    CONTDATE: "",
    DATATYPE: 0,

    DETAIL: [],
    STTESIGN: 0,
    STTENAME: "",
    KKKK0000: "",
    ACCERIGHT: 0,
  };
  const [header, setHeader] = useState(initHeader);
  useEffect(() => {
    if (props.keycode !== undefined) {
      if (DetailHDBHD) {
        setHeader(DetailHDBHD !== undefined ? DetailHDBHD : initHeader);

        var fileList = DetailHDBHD.DCMNFILE;
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

        DetailHDBHD.STTESIGN <= 0
          ? setPermissions(true)
          : setPermissions(false);
        setAcceRght(DetailHDBHD.ACCERGHT);
        setStteSign(DetailHDBHD.STTESIGN);
      }
    }

    if (props.keycode !== undefined) {
      setAcceRght(1);
      setStteSign(0);
      setPermissions(true);
    }
  }, [DetailHDBHD]);

  // list code
  const lstCustomer = useSelector((state) => state.common.lstCustomer);
  const lstWareHouse = useSelector((state) => state.common.lstWareHouse);
  const lstCounter = useSelector((state) => state.common.lstCounter);
  const lstCUOM = useSelector((state) => state.common.lstCUOM);
  const lstProvince = useSelector((state) => state.common.lstProvince);

  const lstPayMthd = useSelector((state) => state.common.lstPayMthd);
  const lstDistrict = useSelector((state) => state.common.lstDistrict);
  const lstWard = useSelector((state) => state.common.lstWard);
  const lstVATRate = useSelector((state) => state.common.lstVATRate);
  // end list code

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

  useEffect(() => {
    dispatch(getLstDistrict(header.DLVRCITY));
    // dispatch(getLstWard(header.DLVRDIST));
  }, [dispatch, header.DLVRCITY]);
  useEffect(() => {
    dispatch(getLstWard(header.DLVRDIST));
    // dispatch(getLstWard(header.DLVRDIST));
  }, [dispatch, header.DLVRDIST]);

  useEffect(() => {
    dispatch(getLstProductAll());
  }, [dispatch]);

  /*
  const [actions, setActions] = useState(
    props.mode === "ADD"
      ? {
          procedure: false, // Quy trình
          progress: false, // Quá trình
          add: false, // Thêm mới
          dup: false, // Nhân bản
          save: true, // Lưu
          lock: true, // Khóa
          delete: false, // Xóa
        }
      : {
          procedure: true,
          progress: false,
          add: true,
          dup: true,
          save: false,
          lock: false,
          delete: false,
        }
  );
  
  useEffect(() => {
    setPermissions(header !== undefined ? header.STTESIGN === 0 : true);
    if (header && header.MAINCODE !== "") {
      if (header.STTESIGN > 0) {
        // Chứng từ đã khóa
        setActions({
          procedure: true,
          progress: true,
          add: true,
          dup: true,
          save: false,
          lock: false,
          delete: false,
        });
      } else {
        setActions({
          procedure: true,
          progress: false,
          add: true,
          dup: true,
          save: true,
          lock: true,
          delete: true,
        });
      }
    }
  }, [header]);
  */

  let DcmnView;
  if (localStorage.getItem("DcmnView")) {
    var DcmnView_DATA = JSON.parse(localStorage.getItem("DcmnView"));
    DcmnView = DcmnView_DATA.find(
      (item) => item.DCMNCODE === PageInfo.DcmnCode
    ).GRP_VIEW;
  }
  let UserName;
  if (localStorage.getItem("userData")) {
    var UserName_DATA = JSON.parse(localStorage.getItem("userData"));
    UserName = UserName_DATA.EMPLNAME;
  }

  // su kien Action Bar
  const ClickBackList = () => {
    navigate(PageInfo.UrlLink);
  };
  const actionAdd = () => {
    navigate(UrlLinkNew);
  };
  const actionDup = () => {
    setHeader({
      ...header,
      STTESIGN: 0,
      STTENAME: "",
      MAINCODE: "",
      MAINDATE: "",
      KKKK0000: "",
      DCMNFILE: [],
    });
    setAcceRght(1);
    setStteSign(0);
    setFiles([]);
  };
  const actionSave = () => {
    // Xu ly cac loai tien quy doi
    // Cap nhat tien Quy doi ben duoi Detail
    const CUOMRate = header.CUOMRATE;
    header.DETAIL.forEach((item) => {
      item.PRDCPRCE = CUOMRate * item.PRDCCRPR;
      item.DCPRAMNT = CUOMRate * item.DCPRCRAM;
      item.MNEYAMNT = CUOMRate * item.MNEYCRAM;
      item.PRCEAMNT = CUOMRate * item.PRCECRAM;
    });

    // Cap nhat tien Master
    let newSmMnAmnt = header.SMMNCRAM * CUOMRate;
    let newDcntAmnt = header.DCNTCRAM * CUOMRate;
    let newSmAmnt_V = header.SMCRAM_V * CUOMRate;
    let newVAT_Amnt = header.VAT_CRAM * CUOMRate;
    let newDlvrAmnt = header.DLVRCRAM * CUOMRate;
    let newSum_Amnt = header.SUM_CRAM * CUOMRate;
    setHeader({
      ...header,
      SMMNAMNT: newSmMnAmnt,
      DCNTAMNT: newDcntAmnt,
      SMAMNT_V: newSmAmnt_V,
      VAT_AMNT: newVAT_Amnt,
      DLVRAMNT: newDlvrAmnt,
      SUM_AMNT: newSum_Amnt,
    });

    // Hau kiem trc khi post
    if (
      (header.CUOMCODE === "VND" && header.CUOMRATE !== 1) ||
      (header.CUOMCODE !== "VND" && header.CUOMRATE === 1)
    ) {
      setOpenNotify(true);
      setContentNotify({
        type: 1,
        content: { CUOMCODE: header.CUOMCODE, CUOMRATE: header.CUOMRATE },
      });
      return;
    } else {
      var postJson = {
        DCMNCODE: PageInfo.DcmnCode,
        HEADER: [header],
      };

      if (header.KKKK0000) {
        // update
        dispatch(updateHDBHD(postJson));
      } else {
        // Post
        dispatch(postHDBHD(postJson));
      }
    }
  };
  const actionCancel = () => {
    alert("abc");
  };
  const actionLock = () => {
    // Xu ly cac loai tien quy doi
    // Cap nhat tien Quy doi ben duoi Detail
    const CUOMRate = header.CUOMRATE;
    header.DETAIL.forEach((item) => {
      item.PRDCPRCE = CUOMRate * item.PRDCCRPR;
      item.DCPRAMNT = CUOMRate * item.DCPRCRAM;
      item.MNEYAMNT = CUOMRate * item.MNEYCRAM;
      item.PRCEAMNT = CUOMRate * item.PRCECRAM;
    });

    // Cap nhat tien Master
    let newSmMnAmnt = header.SMMNCRAM * CUOMRate;
    let newDcntAmnt = header.DCNTCRAM * CUOMRate;
    let newSmAmnt_V = header.SMCRAM_V * CUOMRate;
    let newVAT_Amnt = header.VAT_CRAM * CUOMRate;
    let newDlvrAmnt = header.DLVRCRAM * CUOMRate;
    let newSum_Amnt = header.SUM_CRAM * CUOMRate;
    setHeader({
      ...header,
      SMMNAMNT: newSmMnAmnt,
      DCNTAMNT: newDcntAmnt,
      SMAMNT_V: newSmAmnt_V,
      VAT_AMNT: newVAT_Amnt,
      DLVRAMNT: newDlvrAmnt,
      SUM_AMNT: newSum_Amnt,
    });

    if (
      (header.CUOMCODE === "VND" && header.CUOMRATE !== 1) ||
      (header.CUOMCODE !== "VND" && header.CUOMRATE === 1)
    ) {
      setOpenNotify(true);
      setContentNotify({
        type: 1,
        content: { CUOMCODE: header.CUOMCODE, CUOMRATE: header.CUOMRATE },
      });
      return;
    } else {
      const body = {
        DCMNCODE: PageInfo.DcmnCode,
        KEY_CODE: header.KKKK0000,
      };
      dispatch(lockHDBHD(body));
    }
  };
  const actionUnlock = () => {
    alert("abc");
  };
  const [openNotify, setOpenNotify] = useState(false);
  const [contentNotify, setContentNotify] = useState({});
  const CancelNotifyHandler = () => {
    setOpenNotify(false);
  };
  const actionDelete = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(deleteHDBHD(body));
  };

  // Code xy ly khi Post ct
  const postResult = useSelector((state) => state.PHTAM.postResult);
  useEffect(() => {
    if (postResult) {
      if (postResult.RETNCODE) {
        deleteFiles();
        if (files.length > 0) {
          doPostFile(postResult.RETNDATA[0].KKKK0000);
        }
        dispatch(getDetailHDBHD(postResult.RETNDATA[0].KKKK0000));
      }
      alert(postResult.RETNMSSG);
      dispatch(resetHDBHD());
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
    }
  };
  const closeReviewProcess = () => {
    setShowReviewProcess(false);
  };
  // Qua trinh xet duyet
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
    }
  };
  const closeApprovalProcess = () => {
    setShowApprovalProcess(false);
  };

  // event change
  const MainDateChgeHandler = (event) => {
    setHeader({
      ...header,
      MAINDATE: moment(event.value).format("YYYY-MM-DD"),
    });
  };
  const CustChgeHandler = (event) => {
    setHeader({
      ...header,
      CUSTCODE: event.value.CUSTCODE,
      CUSTNAME: event.value.CUSTNAME,
      CUSTADDR: event.value.CUSTADDR,
      CUSTPHNE: event.value.TEL_NUMB,
    });
  };
  const MExlnNteChgeHandler = (event) => {
    setHeader({
      ...header,
      MEXLNNTE: event.value,
    });
  };
  const CUOMChgeHandler = (event) => {
    setHeader({
      ...header,
      CUOMCODE: event.value.ITEMCODE,
    });
  };
  const CUOMRateChgeHandler = (event) => {
    // Xu ly cac loai tien quy doi
    // Cap nhat tien Quy doi ben duoi Detail
    let CUOMRate = event.value;
    header.DETAIL.forEach((item) => {
      item.PRDCPRCE = CUOMRate * item.PRDCCRPR;
      item.DCPRAMNT = CUOMRate * item.DCPRCRAM;
      item.MNEYAMNT = CUOMRate * item.MNEYCRAM;
      item.PRCEAMNT = CUOMRate * item.PRCECRAM;
    });

    // Cap nhat tien Master
    let newSmMnAmnt = header.SMMNCRAM * CUOMRate;
    let newDcntAmnt = header.DCNTCRAM * CUOMRate;
    let newSmAmnt_V = header.SMCRAM_V * CUOMRate;
    let newVAT_Amnt = header.VAT_CRAM * CUOMRate;
    let newDlvrAmnt = header.DLVRCRAM * CUOMRate;
    let newSum_Amnt = header.SUM_CRAM * CUOMRate;
    setHeader({
      ...header,
      CUOMRATE: event.value,
      SMMNAMNT: newSmMnAmnt,
      DCNTAMNT: newDcntAmnt,
      SMAMNT_V: newSmAmnt_V,
      VAT_AMNT: newVAT_Amnt,
      DLVRAMNT: newDlvrAmnt,
      SUM_AMNT: newSum_Amnt,
    });

    // setHeader({
    //   ...header,
    //   CUOMRATE: event.value,
    // });
  };
  const WrHsChgeHandler = (event) => {
    setHeader({
      ...header,
      WRHSCODE: event.value.ITEMCODE,
    });
  };
  const CntrChgeHandler = (event) => {
    setHeader({
      ...header,
      CNTRCODE: event.value.ITEMCODE,
    });
  };
  const PayMthdChgeHandler = (event) => {
    setHeader({
      ...header,
      PAY_MTHD: parseInt(event.value.ITEMCODE),
    });
  };
  const RltnObjcChgeHandler = (event) => {
    setHeader({
      ...header,
      RLTNOBJC: event.value,
    });
  };
  const RltnTelChgeHandler = (event) => {
    setHeader({
      ...header,
      RLTN_TEL: event.value,
    });
  };
  const [locationInfo, setLocationInfo] = useState({
    PrvnName: "",
    DistName: "",
    WardName: "",
  });
  const PrvnChgeHandler = (event) => {
    if (event.value !== null) {
      dispatch(getLstDistrict(event.value.ITEMCODE));

      setHeader({
        ...header,
        DLVRCITY: event.value.ITEMCODE,
      });
      setLocationInfo({ ...locationInfo, PrvnName: event.value.ITEMNAME });
    } else {
      setHeader({
        ...header,
        DLVRCITY: "",
        DLVRDIST: "",
        DLVRWARD: "",
      });
      setLocationInfo({
        ...locationInfo,
        PrvnName: "",
        DistName: "",
        WardName: "",
      });
    }
  };
  const DistChgeHandler = (event) => {
    if (event.value !== null) {
      dispatch(getLstWard(event.value.ITEMCODE));

      setHeader({
        ...header,
        DLVRDIST: event.value.ITEMCODE,
      });
      setLocationInfo({ ...locationInfo, DistName: event.value.ITEMNAME });
    } else {
      setHeader({
        ...header,
        DLVRDIST: "",
        DLVRWARD: "",
      });
      setLocationInfo({
        ...locationInfo,
        DistName: "",
        WardName: "",
      });
      setLocationInfo({ ...locationInfo, DistName: "", WardName: "" });
    }
  };
  const WardChgeHandler = (event) => {
    if (event.value !== null) {
      setHeader({
        ...header,
        DLVRWARD: event.value.ITEMCODE,
      });
      setLocationInfo({ ...locationInfo, WardName: event.value.ITEMNAME });
    } else {
      setHeader({
        ...header,
        DLVRWARD: "",
      });
      setLocationInfo({
        ...locationInfo,
        WardName: "",
      });
      setLocationInfo({ ...locationInfo, WardName: "" });
    }
  };
  const DlvrNumbChgeHandler = (event) => {
    setHeader({
      ...header,
      DLVRNUMB: event.value,
    });
  };

  useEffect(() => {
    let DlvrAddr = "";
    if (header.DLVRNUMB !== "") {
      DlvrAddr = DlvrAddr + header.DLVRNUMB;
    }
    if (locationInfo.WardName !== "") {
      DlvrAddr = DlvrAddr + ", " + locationInfo.WardName;
    }
    if (locationInfo.DistName !== "") {
      DlvrAddr = DlvrAddr + ", " + locationInfo.DistName;
    }
    if (locationInfo.PrvnName !== "") {
      DlvrAddr = DlvrAddr + ", " + locationInfo.PrvnName;
    }

    setHeader({
      ...header,
      DLVRADDR: DlvrAddr,
    });
  }, [header.DLVRCITY, header.DLVRDIST, header.DLVRWARD, header.DLVRNUMB]);

  const [VAT_Check, setVAT_Check] = useState(false);
  const SwitchVATChgeHandler = (event) => {
    setVAT_Check(event.target.value);
  };
  const VATCustChgeHandler = (event) => {
    setHeader({
      ...header,
      VAT_CUST: event.value,
    });
  };
  const VATAddrChgeHandler = (event) => {
    setHeader({
      ...header,
      VAT_ADDR: event.value,
    });
  };
  const VATCodeChgeHandler = (event) => {
    setHeader({
      ...header,
      VAT_CODE: event.value,
    });
  };
  const InvcTempChgeHandler = (event) => {
    setHeader({
      ...header,
      INVCTEMP: event.value,
    });
  };
  const InvcSignChgeHandler = (event) => {
    setHeader({
      ...header,
      INVCSIGN: event.value,
    });
  };
  const InvcCodeChgeHandler = (event) => {
    setHeader({
      ...header,
      INVCCODE: event.value,
    });
  };
  const InvcDateChgeHandler = (event) => {
    setHeader({
      ...header,
      INVCDATE: moment(event.value).format("YYYY-MM-DD"),
    });
  };

  // Them moi Detail
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState({});
  const editItemHandler = (item) => {
    setOpenForm(true);
    setEditItem({
      ...item,
    });
  };
  // Xoa 1 dong Detail
  const removeItemHandler = (item) => {
    var newData = header.DETAIL.filter(
      (detail) => detail.KKKK0001 !== item.KKKK0001
    );

    let newSmMnCram = 0; // tong tien hang Master
    newSmMnCram = newData.reduce((accumulator, object) => {
      return accumulator + object.MNEYCRAM;
    }, 0);

    setHeader({
      ...header,
      DETAIL: newData,
      SMMNCRAM: newSmMnCram,
      SMCRAM_V: newSmMnCram,
    });
  };

  // Them moi hoac Sua 1 dong trong Detail
  const handleSubmit = (e) => {
    let newData = [];

    // them moi
    if (Array.isArray(e.PRDCCODE)) {
      var event = e.PRDCCODE.map((item) => {
        return {
          COMPCODE: JSON.parse(localStorage.getItem("company")).COMPCODE,
          LCTNCODE: JSON.parse(localStorage.getItem("userData")).LCTNCODE,
          MAINCODE: header.MAINCODE,
          MAINDATE: header.MAINDATE,
          PRDCCODE: item.ITEMCODE,
          PRDCNAME: item.ITEMNAME,
          QUOMCODE: 0,
          ORGNCODE: 1,
          SORTCODE: 1,
          BTCHCODE: "",
          PRDCCRPR: 1,
          PRCECRAM: 1,
          PRDCQTTY: 1,
          DISCRATE: 0,
          DCPRCRAM: 0,
          MNEYCRAM: 1,
          PRDCPRCE: 1,
          PRCEAMNT: 1,
          DCPRAMNT: 0,
          MNEYAMNT: 1,
          MEXLNNTE_DT: "",
          KKKK0001: item.ITEMCODE + 1 + 1,
        };
      });

      var ListData = [];
      event.forEach((itemB) => {
        // ktra phan tu trong mang them moi co bi trung PrdcCode trong Detail khong
        const checkExist = header.DETAIL.some(
          (itemA) => itemA.PRDCCODE === itemB.PRDCCODE
        );

        if (!checkExist) {
          ListData.push(itemB);
        }
      });

      newData = [...header.DETAIL, ...ListData];
      setHeader({ ...header, DETAIL: newData });
    } // edit
    else {
      var event = {
        ...e,
        PRDCCODE: e.PRDCCODE.ITEMCODE,
        PRDCNAME: e.PRDCCODE.ITEMNAME,
      };

      if (
        header.DETAIL.find((x) => x.PRDCCODE == event.PRDCCODE) === undefined // ktra KHONG co trung ma trong Detail
      ) {
        newData = header.DETAIL.map((item) => {
          if (event.KKKK0001 === item.KKKK0001) {
            item = {
              ...event,
            };
          }
          return item;
        });
      } else {
        newData = [...header.DETAIL];
      }
    }

    setHeader({ ...header, DETAIL: newData });
    setOpenForm(false);
  };
  const handleCancelEdit = () => {
    setOpenForm(false);
  };

  // Su kien Item Change trong luoi DETAIL
  const ItemChgeHandler = (item) => {
    let newData = [];

    let newDcPrCram = 0; // tien chiet khau Detail
    let newPrceCram = 0; // Don gia sau Chiet khau Detail
    let newMneyCram = 0; // Tien hang sau Chiet khau Detail
    let newSmMnCram = 0; // tong tien hang Master

    let field = item.field;
    item.dataItem[field] = item.value;

    // Xu ly data doi voi cac danh sach chon duoi Detail
    if (field === "SORTCODE") {
      let newSortSale = parseInt(item.value.ITEMCODE);

      item.dataItem[field] = newSortSale;
    }
    if (field === "QUOMCODE") {
      let newQUOMCode = parseInt(item.value.ITEMCODE);

      item.dataItem[field] = newQUOMCode;
    }

    // Cap nhat lai cac cot tien duoi Detail
    if (field === "PRDCQTTY" || field === "DISCRATE" || field === "PRDCCRPR") {
      // update lại cot tien chiet khau
      newDcPrCram = Math.round(
        (item.dataItem.PRDCCRPR * item.dataItem.DISCRATE) / 100
      );
      // update lai don gia sau Chiet khau
      newPrceCram = item.dataItem.PRDCCRPR - newDcPrCram;
      // update lại cot Thanh tien sau chiet khau
      newMneyCram =
        item.dataItem.PRDCQTTY * (item.dataItem.PRDCCRPR - newDcPrCram);

      item.dataItem.DCPRCRAM = newDcPrCram;
      item.dataItem.PRCECRAM = newPrceCram;
      item.dataItem.MNEYCRAM = newMneyCram;
    }

    // update lại cot Thanh tien sau chiet khau
    if (field === "DCPRCRAM") {
      newDcPrCram = item.value;
      newPrceCram = item.dataItem.PRDCCRPR - newDcPrCram;
      newMneyCram =
        item.dataItem.PRDCQTTY * (item.dataItem.PRDCCRPR - newDcPrCram);

      item.dataItem.DCPRCRAM = newDcPrCram;
      item.dataItem.PRCECRAM = newPrceCram;
      item.dataItem.MNEYCRAM = newMneyCram;
    }

    // update lại Detail khi co thay doi
    newData = header.DETAIL.map((element) => {
      if (item.dataItem.PRDCCODE === item.PRDCCODE) {
        element = {
          ...item.dataItem,
        };
      }
      return element;
    });

    newSmMnCram = newData.reduce((accumulator, object) => {
      return accumulator + object.MNEYCRAM;
    }, 0);

    setHeader({
      ...header,
      DETAIL: newData,
      SMMNCRAM: newSmMnCram,
      SMCRAM_V: newSmMnCram,
    });
  };
  const DcntRateChgeHandler = (event) => {
    let DcntRate = event.value;

    let DcntCram =
      DcntRate > 0 ? Math.round((DcntRate * header.SMMNCRAM) / 100) : 0;
    let SmCram_V = DcntCram > 0 ? header.SMMNCRAM - DcntCram : header.SMMNCRAM;

    let VATCram =
      header.VAT_RATE > 0 ? Math.round((header.VAT_RATE * SmCram_V) / 100) : 0;

    let Sum_Cram = header.SMMNCRAM - DcntCram + VATCram + header.DLVRCRAM;

    setHeader({
      ...header,
      DCNTRATE: DcntRate,
      DCNTCRAM: DcntCram,
      SMCRAM_V: SmCram_V,
      VAT_CRAM: VATCram,
      SUM_CRAM: Sum_Cram,
    });
  };
  const VATRateChgeHandler = (event) => {
    let VATRate = new Intl.NumberFormat().format(event.value.ITEMCODE);
    let VATCram = Math.round((VATRate * header.SMCRAM_V) / 100);
    let Sum_Cram =
      header.SMMNCRAM - header.DCNTCRAM + VATCram + header.DLVRCRAM;

    setHeader({
      ...header,
      VAT_RATE: VATRate,
      VAT_CRAM: VATCram,
      SUM_CRAM: Sum_Cram,
    });
  };
  const DlvrCramChgeHandler = (event) => {
    let DlvrCram = event.value;
    let Sum_Cram = header.SMCRAM_V + header.VAT_CRAM + DlvrCram;

    setHeader({
      ...header,
      DLVRCRAM: DlvrCram,
      SUM_CRAM: Sum_Cram,
    });
  };
  const DcntCramChgeHandler = (event) => {
    let DcntCram = event.value;
    let SmCram_V = header.SMMNCRAM - DcntCram;
    let VATRate = header.VAT_RATE;
    let VATCram = Math.round((VATRate * SmCram_V) / 100);

    let Sum_Cram = SmCram_V + VATCram + header.DLVRCRAM;

    setHeader({
      ...header,
      DCNTCRAM: DcntCram,
      SMCRAM_V: SmCram_V,
      VAT_CRAM: VATCram,
      SUM_CRAM: Sum_Cram,
    });
  };

  useEffect(() => {
    let DcntRate = header.DCNTRATE;
    let VATRate = header.VAT_RATE;
    let SmMnCram = header.SMMNCRAM; //Tong tien hang

    let DcntCram = Math.round((DcntRate * SmMnCram) / 100);
    let SmCram_V = header.SMMNCRAM - DcntCram;
    let VATCram = Math.round((VATRate * SmCram_V) / 100);

    let Sum_Cram = SmMnCram - DcntCram + VATCram + header.DLVRCRAM;

    setHeader({
      ...header,
      DCNTCRAM: DcntCram,
      SMCRAM_V: SmCram_V,
      VAT_CRAM: VATCram,
      SUM_CRAM: Sum_Cram,
    });
  }, [header.SMMNCRAM]);

  return (
    <>
      {/* Master */}
      <div id={PageInfo.DcmnCode} className="p-2 content-header-detail">
        {/* Chức năng */}
        <ActionHeader
          mode={props.mode}
          AcceRght={AcceRght}
          StteSign={StteSign}
          onClickBack={ClickBackList}
          add={actionAdd}
          dup={actionDup}
          save={actionSave}
          // cancel={actionCancel}
          delete={actionDelete}
          lock={actionLock}
          // unlock={actionUnlock}

          // Quy trinh xet duyet
          approvalProcess={approvalProcess}
          actionReviewProcess={actionReviewProcess}
          closeReviewProcess={closeReviewProcess}
          showReviewProcess={showReviewProcess}
          // Qua trinh xet duyet
          reviewProcess={reviewProcess}
          actionApprovalProcess={actionApprovalProcess}
          closeApprovalProcess={closeApprovalProcess}
          showApprovalProcess={showApprovalProcess}
        />

        {/* Header va Amount */}
        <div className="flex md:flex-row flex-col">
          {/* Noi dung phan Header */}
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
                <TabStripTab title={getLabelValue(116, "Thông tin chung")}>
                  <WrapperTabStrip DcmnCode={PageInfo.DcmnCode}>
                    <div className="lg:w-1/3 w-full">
                      <div className="wrapper-item">
                        <div className="flex justify-between mb-3">
                          {/* Ma don hang */}
                          <div className="mr-1 lg:w-3/6 w-full">
                            <Label className="text-sm text-gray-500">
                              {getLabelValue(117, "Số chứng từ")}
                            </Label>
                            <MaskedTextBox
                              id="MAINCODE"
                              name="MAINCODE"
                              style={{ borderColor: "grey" }}
                              value={header?.MAINCODE}
                              readonly={true}
                              className={appColors.inputColor}
                              size="small"
                            />
                          </div>

                          {/* Ngay tao */}
                          <div className="ml-1 lg:w-3/6 w-full">
                            <Label className="text-sm text-gray-500">
                              {"Ngày đề nghị"}
                            </Label>
                            <DatePicker
                              format="dd/MM/yyyy"
                              // weekNumber={true}
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
                              // value={new Date(header?.MAINDATE)}
                              disabled={!permissions}
                              className={appColors.inputColor}
                              size="small"
                              onChange={MainDateChgeHandler}
                            />
                          </div>
                        </div>

                        {/* Khach hang */}
                        <div className="mb-3">
                          <FieldEditCombobox
                            title={getLabelValue(29, "Mã khách hàng")}
                            id={"CUSTCODE"}
                            data={lstCustomer}
                            // defaultValue={
                            //   header !== undefined
                            //     ? lstCustomer.find(
                            //         (item) => item.ITEMCODE === header.CUSTCODE
                            //       )
                            //     : {}
                            // }
                            value={
                              header !== undefined
                                ? lstCustomer.find(
                                    (item) => item.CUSTCODE === header.CUSTCODE
                                  )
                                : {}
                            }
                            textField="CUSTNAME"
                            dataItemKey="CUSTCODE"
                            onChange={CustChgeHandler}
                            disabled={!permissions}
                          />
                        </div>

                        {/* So dien thoai Khach hang */}
                        <div className="mb-3 text-black">
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(89, "Điện thoại")}
                          </Label>
                          <MaskedTextBox
                            value={header.CUSTPHNE ? header.CUSTPHNE : ""}
                            className={appColors.inputColor}
                            readonly={true}
                          />
                        </div>

                        {/*Dia chi Khach hang */}
                        <div className="mb-3 text-black">
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(31, "Địa chỉ")}
                          </Label>
                          <TextArea
                            type="text"
                            value={header.CUSTADDR ? header.CUSTADDR : ""}
                            // onChange={CustAddrChgeHandler}
                            rows={2}
                            size="small"
                            autoSize="false"
                            readOnly={true}
                          />
                        </div>

                        {/*Noi dung don hang */}
                        <div className="mb-3 text-black">
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(90, "Nội dung đơn hàng")}
                          </Label>
                          <TextArea
                            type="text"
                            value={header.MEXLNNTE ? header.MEXLNNTE : ""}
                            onChange={MExlnNteChgeHandler}
                            rows={2}
                            size="small"
                            autoSize="false"
                            readOnly={!permissions}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-1/3 w-full">
                      <div className="wrapper-item">
                        <div className="flex justify-between mb-3">
                          {/* DVTT */}
                          <div className="mr-1 lg:w-3/6 w-full">
                            <FieldEditDropdown
                              title={getLabelValue(87, "ĐV Tiền tệ")}
                              id={"CUOMCODE"}
                              data={lstCUOM}
                              value={
                                header !== undefined
                                  ? lstCUOM.find(
                                      (item) =>
                                        item.ITEMCODE === header.CUOMCODE
                                    )
                                  : {}
                              }
                              style={{ width: "180px" }}
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onChange={CUOMChgeHandler}
                              disabled={!permissions}
                            />
                          </div>

                          {/* Ty gia */}
                          <div className="ml-1 lg:w-3/6 w-full">
                            <FieldEditNumberic
                              title={getLabelValue(88, "Tỷ giá")}
                              id={"CUOMRATE"}
                              value={header.CUOMRATE ? header.CUOMRATE : 1}
                              onChange={CUOMRateChgeHandler}
                              format="n4"
                              disabled={!permissions}
                            />
                          </div>
                        </div>

                        {/* NV bán hang */}
                        <div className="mb-3 text-black">
                          <Label className="text-sm" style={{ color: "grey" }}>
                            {getLabelValue(99, "NV bán hàng")}
                          </Label>
                          <MaskedTextBox
                            value={UserName}
                            className={appColors.inputColor}
                            readonly={true}
                          />
                        </div>

                        {/* Kho ban */}
                        <div className="mb-3 text-black">
                          <FieldEditDropdown
                            title={getLabelValue(119, "Kho xuất")}
                            id={"WRHSCODE"}
                            data={lstWareHouse}
                            value={
                              header !== undefined
                                ? lstWareHouse.find(
                                    (item) => item.ITEMCODE === header.WRHSCODE
                                  )
                                : {}
                            }
                            textField="ITEMNAME"
                            dataItemKey="ITEMCODE"
                            onChange={WrHsChgeHandler}
                            disabled={!permissions}
                          />
                        </div>

                        {/* Ngan quy */}
                        <div className="mb-3 text-black">
                          <FieldEditDropdown
                            title={getLabelValue(120, "Quầy bán")}
                            id={"CNTRCODE"}
                            data={lstCounter}
                            value={
                              header !== undefined
                                ? lstCounter.find(
                                    (item) => item.ITEMCODE === header.CNTRCODE
                                  )
                                : {}
                            }
                            textField="ITEMNAME"
                            dataItemKey="ITEMCODE"
                            onChange={CntrChgeHandler}
                            disabled={!permissions}
                          />
                        </div>

                        {/* Phuong thuc thanh toan */}
                        <div className="mb-3 text-black">
                          <FieldEditDropdown
                            title={getLabelValue(37, "Phương thức thanh toán")}
                            id={"PAY_MTHD"}
                            data={lstPayMthd}
                            value={
                              header !== undefined
                                ? lstPayMthd.find(
                                    (item) =>
                                      item.ITEMCODE ===
                                      header.PAY_MTHD.toString()
                                  )
                                : {}
                            }
                            textField="ITEMNAME"
                            dataItemKey="ITEMCODE"
                            onChange={PayMthdChgeHandler}
                            disabled={!permissions}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-1/3 w-full">
                      <div className="wrapper-item">
                        {/* Mau so HD */}
                        <div className="mb-3 text-black">
                          {permissions && (
                            <FieldEditInput
                              title={getLabelValue(125, "Mẫu số HĐ")}
                              id={"INVCTEMP"}
                              defaultValue={header?.INVCTEMP}
                              onChange={InvcTempChgeHandler}
                              value={header?.INVCTEMP}
                            />
                          )}
                          {!permissions && (
                            <FieldEditMaskText
                              title={getLabelValue(125, "Mẫu số HĐ")}
                              id={"INVCTEMP"}
                              value={header?.INVCTEMP}
                            />
                          )}
                        </div>

                        {/* Ky hieu HD */}
                        <div className="mb-3 text-black">
                          {permissions && (
                            <FieldEditInput
                              title={getLabelValue(126, "Ký hiệu HĐ")}
                              id={"INVCSIGN"}
                              defaultValue={header?.INVCSIGN}
                              onChange={InvcSignChgeHandler}
                              value={header?.INVCSIGN}
                            />
                          )}
                          {!permissions && (
                            <FieldEditMaskText
                              title={getLabelValue(126, "Ký hiệu HĐ")}
                              id={"INVCSIGN"}
                              value={header?.INVCSIGN}
                            />
                          )}
                        </div>

                        {/* So Hoa don */}
                        <div className="mb-3 text-black">
                          {permissions && (
                            <FieldEditInput
                              title={getLabelValue(124, "Số HĐ")}
                              id={"INVCCODE"}
                              defaultValue={header?.INVCCODE}
                              onChange={InvcCodeChgeHandler}
                              value={header?.INVCCODE}
                            />
                          )}
                          {!permissions && (
                            <FieldEditMaskText
                              title={getLabelValue(124, "Số HĐ")}
                              id={"INVCCODE"}
                              value={header?.INVCCODE}
                            />
                          )}
                        </div>

                        {/* Ngay Hoa don */}
                        <div className="mb-3 text-black">
                          <FieldEditDatePicker
                            title={getLabelValue(127, "Ngày HĐ")}
                            defaultValue={
                              header?.INVCDATE
                                ? new Date(header.INVCDATE)
                                : new Date()
                            }
                            value={
                              header?.INVCDATE
                                ? new Date(header.INVCDATE)
                                : new Date()
                            }
                            disabled={!permissions}
                            onChange={InvcDateChgeHandler}
                          />
                        </div>
                      </div>
                    </div>
                  </WrapperTabStrip>
                </TabStripTab>
                <TabStripTab title={getLabelValue(106, "Thông tin giao hàng")}>
                  <WrapperTabStrip DcmnCode={PageInfo.DcmnCode}>
                    <div className="lg:w-1/3 w-full">
                      <div className="wrapper-item">
                        {/* Nguoi nhan hang && So dien thoai nhan hang*/}
                        <div className="flex justify-between mb-3">
                          {/* Nguoi nhan hang */}
                          <div className="mr-1 lg:w-3/6 w-full">
                            {permissions && (
                              <FieldEditInput
                                title={getLabelValue(45, "Người nhận hàng")}
                                id={"RLTNOBJC"}
                                defaultValue={header?.RLTNOBJC}
                                onChange={RltnObjcChgeHandler}
                              />
                            )}
                            {!permissions && (
                              <FieldEditMaskText
                                title={getLabelValue(45, "Người nhận hàng")}
                                id={"RLTNOBJC"}
                                value={header?.RLTNOBJC}
                              />
                            )}
                          </div>

                          {/* So dien thoai nhan hang */}
                          <div className="ml-1 lg:w-3/6 w-full">
                            {permissions && (
                              <FieldEditInput
                                title={getLabelValue(
                                  46,
                                  "Số điện thoại nhận hàng"
                                )}
                                id={"RLTN_TEL"}
                                defaultValue={header?.RLTN_TEL}
                                onChange={RltnTelChgeHandler}
                              />
                            )}
                            {!permissions && (
                              <FieldEditMaskText
                                title={getLabelValue(
                                  46,
                                  "Số điện thoại nhận hàng"
                                )}
                                id={"RLTN_TEL"}
                                value={header?.RLTN_TEL}
                              />
                            )}
                          </div>
                        </div>

                        {/* Tinh/ Thanh pho &&  Huyen/ Quan*/}
                        <div className="flex justify-between mb-3">
                          {/* Tinh/ Thanh pho */}
                          <div className="ml-1 lg:w-3/6 w-full">
                            <FieldEditCombobox
                              title={getLabelValue(95, "Thành phố/ Tỉnh")}
                              id={"DLVRCITY"}
                              data={lstProvince}
                              defaultValue={
                                header !== undefined
                                  ? lstProvince.find(
                                      (item) =>
                                        item.ITEMCODE === header.DLVRCITY
                                    )
                                  : {}
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onChange={PrvnChgeHandler}
                              disabled={!permissions}
                            />
                          </div>
                          {/* Huyen/ Quan */}
                          <div className="ml-1 lg:w-3/6 w-full">
                            <FieldEditCombobox
                              title={getLabelValue(96, "Quận/ Huyện")}
                              id={"DLVRDIST"}
                              data={lstDistrict}
                              value={
                                header !== undefined
                                  ? lstDistrict.find(
                                      (item) =>
                                        item.ITEMCODE === header.DLVRDIST
                                    ) !== undefined
                                    ? lstDistrict.find(
                                        (item) =>
                                          item.ITEMCODE === header.DLVRDIST
                                      )
                                    : null
                                  : {}
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onChange={DistChgeHandler}
                              disabled={
                                permissions === true
                                  ? header?.DLVRCITY === ""
                                    ? true
                                    : false
                                  : !permissions
                              }
                            />
                          </div>
                        </div>

                        {/* Xa / Phuong && So nha*/}
                        <div className="flex justify-between mb-3">
                          {/* Xa / Phuong */}
                          <div className="ml-1 lg:w-3/6 w-full">
                            <FieldEditCombobox
                              title={getLabelValue(97, "Phường/ Xã")}
                              id={"DLVRWARD"}
                              data={lstWard}
                              value={
                                header !== undefined
                                  ? lstWard.find(
                                      (item) =>
                                        item.ITEMCODE === header.DLVRWARD
                                    ) !== undefined
                                    ? lstWard.find(
                                        (item) =>
                                          item.ITEMCODE === header.DLVRWARD
                                      )
                                    : null
                                  : {}
                              }
                              textField="ITEMNAME"
                              dataItemKey="ITEMCODE"
                              onChange={WardChgeHandler}
                              disabled={
                                permissions === true
                                  ? header?.DLVRDIST === ""
                                    ? true
                                    : false
                                  : !permissions
                              }
                            />
                          </div>

                          {/* So nha */}
                          <div className="ml-1 lg:w-3/6 w-full">
                            {permissions && (
                              <FieldEditInput
                                title={getLabelValue(129, "Số nhà + đường")}
                                id={"DLVRNUMB"}
                                defaultValue={header?.DLVRNUMB}
                                onChange={DlvrNumbChgeHandler}
                              />
                            )}
                            {!permissions && (
                              <FieldEditMaskText
                                title={getLabelValue(129, "Số nhà + đường")}
                                id={"DLVRNUMB"}
                                value={header?.DLVRNUMB}
                              />
                            )}
                          </div>
                        </div>

                        {/* Dia diem nhan */}
                        <div className="mb-3 text-black">
                          <FieldEditMaskText
                            title={getLabelValue(94, "Địa điểm nhận")}
                            id={"DLVRADDR"}
                            value={header?.DLVRADDR}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="lg:w-1/3 w-full">
                      <div className="wrapper-item">
                        <div className="flex justify-between mb-3">
                          {/* Xuat hoa don */}
                          <div className="ml-1 lg:w-3/6 w-full">
                            {permissions && (
                              <>
                                <Label
                                  className="text-sm"
                                  style={{ color: "grey" }}
                                >
                                  {getLabelValue(91, "Xuất hóa đơn")}
                                </Label>{" "}
                                {"     "}
                                <Switch
                                  defaultChecked={false}
                                  onChange={SwitchVATChgeHandler}
                                  size="small"
                                  onLabel={""}
                                  offLabel={""}
                                />
                              </>
                            )}
                          </div>
                        </div>

                        {/* Ten Khach hang tren VAT */}
                        <div className="mb-3 text-black">
                          {permissions && VAT_Check && (
                            <FieldEditInput
                              title={getLabelValue(122, "Khách hàng nhận VAT")}
                              id={"VAT_CUST"}
                              defaultValue={header?.VAT_CUST}
                              onChange={VATCustChgeHandler}
                            />
                          )}
                          {permissions && !VAT_Check && (
                            <FieldEditMaskText
                              title={getLabelValue(122, "Khách hàng nhận VAT")}
                              id={"VAT_CUST"}
                              value={header?.VAT_CUST}
                            />
                          )}
                          {!permissions && (
                            <FieldEditMaskText
                              title={getLabelValue(122, "Khách hàng nhận VAT")}
                              id={"VAT_CUST"}
                              value={header?.VAT_CUST}
                            />
                          )}
                        </div>

                        {/* Dia chi Khach hang tren VAT */}
                        <div className="mb-3 text-black">
                          {permissions && VAT_Check && (
                            <FieldEditInput
                              title={getLabelValue(123, "Địa chỉ VAT")}
                              id={"VAT_ADDR"}
                              defaultValue={header?.VAT_ADDR}
                              onChange={VATAddrChgeHandler}
                            />
                          )}
                          {permissions && !VAT_Check && (
                            <FieldEditMaskText
                              title={getLabelValue(123, "Địa chỉ VAT")}
                              id={"VAT_ADDR"}
                              value={header?.VAT_ADDR}
                            />
                          )}
                          {!permissions && (
                            <FieldEditMaskText
                              title={getLabelValue(123, "Địa chỉ VAT")}
                              id={"VAT_ADDR"}
                              value={header?.VAT_ADDR}
                            />
                          )}
                        </div>

                        {/* Ma so thue */}
                        <div className="mb-3 text-black">
                          {permissions && VAT_Check && (
                            <FieldEditInput
                              title={getLabelValue(30, "Mã số thuế")}
                              id={"VAT_CODE"}
                              defaultValue={header?.VAT_CODE}
                              onChange={VATCodeChgeHandler}
                            />
                          )}
                          {permissions && !VAT_Check && (
                            <FieldEditMaskText
                              title={getLabelValue(30, "Mã số thuế")}
                              id={"VAT_CODE"}
                              value={header?.VAT_CODE}
                            />
                          )}
                          {!permissions && (
                            <FieldEditMaskText
                              title={getLabelValue(30, "Mã số thuế")}
                              id={"VAT_CODE"}
                              value={header?.VAT_CODE}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </WrapperTabStrip>
                </TabStripTab>
              </TabStrip>
            </div>
          </div>

          {/* Xu ly lien quan tien bac tren Header */}
          <TitleAmnt title={PageInfo.TitleAmount}>
            {/* Tien hang */}
            <FieldEditAmnt
              title={getLabelValue(98, "Tiền hàng:")}
              id="SMMNCRAM"
              name="SMMNCRAM"
              className={`text-number ${appColors.inputColor}`}
              disabled={true}
              value={header?.SMMNCRAM}
            />

            {/* Ty le Chiet khau */}
            <FieldEditAmnt
              title={getLabelValue(51, "% chiết khấu:")}
              id="DCNTRATE"
              name="DCNTRATE"
              className={`text-number ${appColors.inputColor}`}
              value={header?.DCNTRATE}
              onChange={DcntRateChgeHandler}
              disabled={!permissions}
            />

            {/* Tien Chiet khau */}
            <FieldEditAmnt
              title={getLabelValue(52, "Tiền chiết khấu:")}
              id="DCNTCRAM"
              name="DCNTCRAM"
              className={`text-number ${appColors.inputColor}`}
              value={header?.DCNTCRAM}
              onChange={DcntCramChgeHandler}
              disabled={!permissions}
            />

            {/* Tien tinh thue */}
            <FieldEditAmnt
              title={getLabelValue(135, "Tiền tính thuế:")}
              id="SMCRAM_V"
              name="SMCRAM_V"
              className={`text-number ${appColors.inputColor}`}
              value={header?.SMCRAM_V}
              disabled={!permissions}
            />

            {/* Thue suat */}
            <div className="flex items-center mb-2">
              <p className="text-sm text-gray-500 w-full">
                {getLabelValue(54, "Thuế xuất:")}
              </p>
              <DropDownList
                id="VAT_RATE"
                name="VAT_RATE"
                style={{ borderColor: "grey", textAlign: "right" }}
                data={lstVATRate}
                value={
                  header?.VAT_RATE !== undefined
                    ? lstVATRate.find(
                        (item) => item.ITEMCODE === header.VAT_RATE.toString()
                      )
                    : {}
                }
                textField="ITEMNAME"
                dataItemKey="ITEMCODE"
                onChange={VATRateChgeHandler}
                disabled={!permissions}
                className={`text-number ${appColors.inputColor}`}
              />
            </div>

            {/* Tien thue */}
            <FieldEditAmnt
              title={getLabelValue(55, "Tiền thuế:")}
              id="VAT_CRAM"
              name="VAT_CRAM"
              className={`text-number ${appColors.inputColor}`}
              value={header?.VAT_CRAM}
              disabled={!permissions}
            />

            {/* Phi giao hang */}
            <FieldEditAmnt
              title={getLabelValue(136, "Phí giao hàng:")}
              id="DLVRCRAM"
              name="DLVRCRAM"
              className={`text-number ${appColors.inputColor}`}
              value={header?.DLVRCRAM}
              onChange={DlvrCramChgeHandler}
              disabled={!permissions}
            />

            {/* Tong tien */}
            <FieldEditAmnt
              title={getLabelValue(56, "Tổng tiền:")}
              id="SUM_CRAM"
              name="SUM_CRAM"
              className={`text-number ${appColors.inputColor}`}
              value={header?.SUM_CRAM}
              disabled={!permissions}
            />
          </TitleAmnt>
        </div>
      </div>

      {/* Chi tiet */}
      <div
        id="detail"
        className="lg:m-2 m-0 mt-4 bg-blue-50 border-solid border-[1px] border-borderBase hover:border-blue-700"
      >
        {/* View Grid man hinh to */}
        <div className="hidden lg:block md:block">
          {header.DETAIL && (
            <RetailBillEditGrid
              items={header.DETAIL}
              onRemoveItem={removeItemHandler}
              onEditItem={editItemHandler}
              onItemChge={ItemChgeHandler}
            />
          )}
        </div>

        {/* Dialog them moi hoac sua san pham */}
        {openForm && (
          <EditForm
            cancelEdit={handleCancelEdit}
            onSubmit={handleSubmit}
            item={editItem}
            DcmnView={DcmnView}
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
                  KKKK0001: "",
                })
              }
            >
              {getLabelValue(73, "Thêm dòng")}
            </button>
          )}
          <div></div>
        </div>
      </div>

      {/* Xử lý Hậu kiểm khi khóa ct */}
      {openNotify && (
        <DialogNotify item={contentNotify} cancelNotify={CancelNotifyHandler} />
      )}
    </>
  );
};

export default RetailBillEditMain;
