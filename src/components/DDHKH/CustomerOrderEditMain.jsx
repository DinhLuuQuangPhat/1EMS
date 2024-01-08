import React, { useEffect, useState } from "react";
import NotifyDialog from "./NotifyDialog";
import { useStateContext } from "../../context/ContextProvider";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { useNavigate } from "react-router-dom";
import { Label } from "@progress/kendo-react-labels";
import { MaskedTextBox, NumericTextBox } from "@progress/kendo-react-inputs";
import { useDispatch, useSelector } from "react-redux";

import {
  FieldEditAmnt,
  TitleAmnt,
  FieldEditInput,
  FieldEditCombobox,
  FieldEditDatePicker,
  WrapperTabStrip,
  FieldCascadeCombobox,
  ActionHeader,
} from "../../components";

import moment from "moment/moment";
import CustomerOrderGrid from "./CustomerOrderGrid";
import { getLstDistrict, getLstWard } from "../../actions/common";
import {
  deleteDDHKH,
  lockDDHKH,
  postDDHKH,
  updateDDHKH,
} from "../../actions/ddhkh";
import EditForm from "./EditForm";
import { getApprovalProcess, getReviewProcess } from "../../actions/document";

const CustomerOrderEditMain = (props) => {
  const [tabSelected, setTabSelected] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { appColors, getLabelValue } = useStateContext();

  const PageInfo = {
    TitlePage: getLabelValue(24, "Đơn đặt hàng"),
    TitleAmount: getLabelValue(49, "Tạm tính"),
    UrlLink: "/order-end-user/",
    UrlLinkNew: "/order-end-user/new",
    DcmnCode: "DDHKH",
  };

  // Thông báo lỗi khi thao tac tren form
  const [visible, setVisible] = useState(false);
  const [stringNotify, setStringNotify] = useState(false);

  const detailDDHKH = useSelector((state) => state.ddhkh.detailInvc);
  const [AcceRght, setAcceRght] = useState(0);
  const [StteSign, setStteSign] = useState(0);
  const [permissions, setPermissions] = useState(true);

  //Khởi tạo
  const initHeader = {
    COMPCODE: JSON.parse(localStorage.getItem("company"))?.COMPCODE,
    LCTNCODE: JSON.parse(localStorage.getItem("userData"))?.LCTNCODE,
    ODERCODE: "",
    ODERDATE: moment(new Date()).format("YYYY-MM-DD"),
    CUSTCODE: "",
    MCUSTNME: "",
    CUSTADDR: "",
    CUOMCODE: "VND",
    CUOMRATE: 1,
    PYMNPERD: "D",
    PYMNNUMB: 1,
    DLVRTYPE: "",
    DLVRDATE: moment(new Date()).format("YYYY-MM-DD"),
    DLVRPLCE: "",
    EMPLCODE: JSON.parse(localStorage.getItem("userData"))?.EMPLCODE,
    NOTETEXT: "",
    CUST_TEL: "",
    TAX_CODE: "",
    //== Link ON/OFF: Xuất hoá đơn VAT
    VAT_RATE: 0,
    VAT_CRAM: 0.0,
    VAT_AMNT: 0.0,

    SUM_CRFR: 0.0,
    SUM_AMFR: 0.0,
    SUM_CRAM: 0.0,
    SUM_AMNT: 0.0,
    SMMNCRAM: 0.0,
    SMMNAMNT: 0.0,

    SMPRQTTY: 0.0,
    RCVREMPL: "",
    RCVR_TEL: "",
    DLVRMTHD: 0,
    DLVRHOUR: 0,
    DLVRADDR: "001",
    PAY_MTHD: 0,

    SRC_DATA: 3,
    USERLGIN: "",

    //== Link ON/OFF: Chiết khấu & Hoa hồng
    RDTNRATE: 0.0,
    RDTNCRAM: 0.0,
    RDTNAMNT: 0.0,
    CSCMRATE: 0.0, // hoa hong
    DCMNSBCD: "001",
    WRHSCODE: "",

    DLVRPRVN: "000",
    DLVRDIST: "",
    DLVRWARD: "",

    VAT_OUPT: 0,
    VAT_CUST: "",
    VAT_ADDR: "",
    DLVRNUMB: "",
    ACCERGHT: 0,
    STTESIGN: 0,
    STTENAME: "",
    DCMNCODE: "DDHKH",
    KKKK0000: "",
  };
  const [header, setHeader] = useState(initHeader);

  const [openCUOMRATE, setOpenCUOMRATE] = useState(true);
  const [openForm, setOpenForm] = useState(false);
  const [editItem, setEditItem] = useState({});
  const [openDistrict, setOpenDistrict] = useState(true);
  const [openWard, setOpenWard] = useState(true);

  // USE SELECTOR Lấy dữ liệu
  const lstCustomer = useSelector((state) => state.common.lstCustomer);
  const lstPymnPerd = useSelector((state) => state.common.lstPymnPerd);
  const lstPayMthd = useSelector((state) => state.common.lstPayMthd);
  const lstCUOM = useSelector((state) => state.common.lstCUOM);

  const lstProvince = useSelector((state) => state.common.lstProvince);
  const lstDistrict = useSelector((state) => state.common.lstDistrict);
  const lstWard = useSelector((state) => state.common.lstWard);

  const toggleDiaglog = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    if (detailDDHKH) {
      setHeader(detailDDHKH !== undefined ? detailDDHKH : initHeader);

      detailDDHKH.STTESIGN <= 0 ? setPermissions(true) : setPermissions(false);
      setAcceRght(detailDDHKH.ACCERGHT);
      setStteSign(detailDDHKH.STTESIGN);
    }

    if (!detailDDHKH) {
      setAcceRght(0);
      setStteSign(0);
    }
  }, [detailDDHKH]);

  // su kien Action Bar
  const ClickBackList = () => {
    navigate(PageInfo.UrlLink);
  };
  const actionAdd = () => {
    navigate(PageInfo.UrlLinkNew);
  };
  const actionDup = () => {
    setHeader({
      ...header,
      STTESIGN: 0,
      STTENAME: "",
      ODERCODE: "",
      ODERDATE: moment(new Date()).format("YYYY-MM-DD"),
      KKKK0000: "",
      DCMNFILE: [],
    });
    setAcceRght(1);
    setStteSign(0);
    setFiles([]);
  };
  const actionSave = () => {
    // Post
    //Validate khách hàng
    if (header.MCUSTNME == "") {
      setStringNotify("Không để tên khách hàng trống!");
      setVisible(true);
      return;
    }

    //Validat số điện thoại
    if (header.CUST_TEL == "") {
      setStringNotify("Không để số điện thoại trống!");
      setVisible(true);
      return;
    }

    //Validate só điện thoại theo định dạng
    if (!header.CUST_TEL.match("^0[0-9]{9}$")) {
      setStringNotify("Số điện thoại không đúng định dạng!");
      setVisible(true);
      return;
    }

    //Validate đơn vị tiền tệ
    if (header.CUOMCODE == "") {
      setStringNotify("Đơn vị tiền tệ không để trống!");
      setVisible(true);
      return;
    }

    //Validate tỉ giá
    if (header.CUOMRATE < 1) {
      setStringNotify("Tỉ giá không được bé hơn 1!");
      setVisible(true);
      return;
    }

    //Validate phương thức thanh toán
    if (header.PAY_MTHD == "") {
      setStringNotify("Phương thức thanh toán không để trống!");
      setVisible(true);
      return;
    }

    //Validate chu kì thanh toán
    if (header.PYMNPERD == "") {
      setStringNotify("Chu kì thanh toán không để trống!");
      setVisible(true);
      return;
    }

    //Validate thời hạn thanh toán
    if (header.PYMNNUMB == "") {
      setStringNotify("Thời hạn thanh toán không để trống!");
      setVisible(true);
      return;
    }
    //Validate người nhận hàng
    if (header.RCVREMPL == "") {
      setStringNotify("Người nhận hàng không để trống!");
      setVisible(true);
      return;
    }

    //Validate thành phố
    if (header.DLVRCITY == "") {
      setStringNotify("Không để trống thành phố nhận hàng!");
      setVisible(true);
      return;
    }

    //Validate quận
    if (header.DLVRDIST == "") {
      setStringNotify("Không để trống huyện/quận nhận hàng!");
      setVisible(true);
      return;
    }
    //Validate phường xã
    if (header.DLVRWARD == "") {
      setStringNotify("Không để trống phường/xã nhận hàng!");
      setVisible(true);
      return;
    }

    //Validate detail
    if (header.DETAIL.length == 0) {
      setStringNotify("Chưa có sản phẩm đặt hàng!");
      setVisible(true);
      return;
    }

    //Validate all detail
    for (let i = 0; i < header.DETAIL.length; i++) {
      if (header.DETAIL[i].PRDCCODE == "") {
        setStringNotify("Chưa chọn tên cho sản phẩm ở dòng " + (i + 1) + " !");
        setVisible(true);
        return;
      }
      if (header.DETAIL[i].ORGNCODE == "") {
        setStringNotify("Chưa chọn nguồn sản phẩm ở dòng " + (i + 1) + " !");
        setVisible(true);
        return;
      }
      if (header.DETAIL[i].SORTCODE == "") {
        setStringNotify(
          "Chưa chọn phân loại sản phẩm ở dòng " + (i + 1) + " !"
        );
        setVisible(true);
        return;
      }
      if (header.DETAIL[i].QUOMCODE == "") {
        setStringNotify(
          "Chưa chọn đơn vị tính cho sản phẩm ở dòng " + (i + 1) + " !"
        );
        setVisible(true);
        return;
      }
      if (header.DETAIL[i].QUOMQTTY == "") {
        setStringNotify(
          "Chưa chọn số lượng cho sản phẩm ở dòng " + (i + 1) + " !"
        );
        setVisible(true);
        return;
      }
      if (header.DETAIL[i].CRSLPRCE == "") {
        setStringNotify(
          "Chưa chọn đơn giá cho sản phẩm ở dòng " + (i + 1) + " !"
        );
        setVisible(true);
        return;
      }
    }
    const body = {
      DCMNCODE: "DDHKH",
      HEADER: [header],
    };
    if (header.KKKK0000 != null || header.KKKK0000 != "") {
      // update
      dispatch(updateDDHKH(body));
      setStringNotify("Cập nhật dữ liệu thành công!");
      setVisible(true);
    } else {
      try {
        dispatch(postDDHKH(body));
        setStringNotify("Thêm dữ liệu thành công!");
        setVisible(true);
        navigate("/order-end-user");
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  const actionCancel = () => {
    alert("abc");
  };
  const actionDelete = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(deleteDDHKH(body));
    navigate("/customer-order/");
  };
  const actionLock = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(lockDDHKH(body));
  };
  const actionUnlock = () => {
    alert("abc");
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

  //Thay đổi tên khách hàng
  const changeCust = (e) => {
    setHeader({
      ...header,
      CUSTCODE: e.value?.CUSTCODE,
      CUSTADDR: e.value?.CUSTADDR,
      MCUSTNME: e.value?.CUSTNAME,
      CUST_TEL: e.value?.TEL_NUMB,
    });
  };

  //Thay đổi số điện thoại
  const changeCUST_TEL = (e) => {
    setHeader({
      ...header,
      CUST_TEL: e.value,
    });
  };

  const changeNOTETEXT = (e) => {
    setHeader({
      ...header,
      NOTETEXT: e.value,
    });
  };

  const changeCUOMCODE = (e) => {
    if (e.value?.ITEMCODE == "VND" || e.value == null) {
      setOpenCUOMRATE(true);
      header.CUOMRATE = 1;
    } else {
      setOpenCUOMRATE(false);
    }
    header.CUOMCODE = e.value?.ITEMCODE;
    setHeader({ ...header });
  };

  const changeCUOMRATE = (e) => {
    header.SUM_AMNT = e.value * header.SMMNCRAM + header.VAT_CRAM * e.value;

    header.DETAIL = header.DETAIL.map((item) => {
      return {
        ...item,
        DCPRAMNT: ((item.DISCRATE * item.CRSLPRCE) / 100) * e.value,
      };
    });
    setHeader({
      ...header,
      CUOMRATE: e.value,
    });
  };

  const changeVAT_CRAM = (e) => {
    header.SUM_AMNT =
      header.CUOMRATE * header.SMMNCRAM + e.value * header.CUOMRATE;
    header.SUM_CRAM = header.SMMNCRAM + e.value;
    setHeader({
      ...header,
      VAT_CRAM: e.value,
    });
  };

  const changePAY_MTHD = (e) => {
    setHeader({
      ...header,
      PAY_MTHD: e.value?.ITEMCODE,
    });
  };

  const changeRCVREMPL = (e) => {
    setHeader({
      ...header,
      RCVREMPL: e.value,
    });
  };

  //Thay đổi thành phố
  const changeCity = (e) => {
    if (e.value == null) {
      setOpenWard(true);
      setOpenDistrict(true);
      setHeader({
        ...header,
        DLVRPLCE: header.DLVRADDR,
      });
    } else {
      setHeader({
        ...header,
        DLVRCITY: e.value?.ITEMCODE,
        DLVRDIST: "",
        DLVRPLCE:
          header.DLVRPLCE.lastIndexOf(",") > -1
            ? header.DLVRPLCE.substring(0, header.DLVRPLCE.indexOf(",")) +
              "," +
              e.value?.ITEMNAME
            : header.DLVRPLCE + "," + e.value?.ITEMNAME,
      });
      dispatch(getLstDistrict(e.value?.ITEMCODE));
      setOpenDistrict(false);
    }
  };

  //Thay đổi quận
  const changeDistrict = (e) => {
    if (e.value == null) {
      setOpenWard(true);
    } else {
      header.DLVRPLCE =
        header.DLVRADDR +
        "," +
        e.value?.ITEMNAME +
        header.DLVRPLCE.substring(header.DLVRPLCE.lastIndexOf(","));
      setHeader({
        ...header,
        DLVRDIST: e.value?.ITEMCODE,
        DLVRWARD: "",
        // DLVRPLCE: "," + e.value?.ITEMNAME + header.DLVRPLCE,
      });
      dispatch(getLstWard(e.value.ITEMCODE));
      setOpenWard(false);
    }
  };

  //Thay đổi phường xã
  const changeWARD = (e) => {
    header.DLVRPLCE =
      header.DLVRADDR +
      "," +
      e.value?.ITEMNAME +
      header.DLVRPLCE.substring(
        header.DLVRPLCE.lastIndexOf(",", header.DLVRPLCE.lastIndexOf(",") - 1)
      );
    setHeader({
      ...header,
      DLVRWARD: e.value?.ITEMCODE,
    });
  };

  //Thay đổi địa chỉ cụ thể
  const changeDLVRADDR = (e) => {
    (header.DLVRPLCE =
      e.value + header.DLVRPLCE.substring(header.DLVRPLCE.indexOf(","))),
      setHeader({
        ...header,
        DLVRADDR: e.value,
      });
  };

  //Thay đổi địa chỉ nhận
  const changeDLVRPLCE = () => {};

  //Thay đổi mã số thuế
  const changeTAX_CODE = (e) => {
    setHeader({
      ...header,
      TAX_CODE: e.value,
    });
  };

  //Thay đổi thời hạn thanh toán
  const changePYMNNUMB = (e) => {
    setHeader({
      ...header,
      PYMNNUMB: e.value,
    });
  };
  //Thay đổ chu kì thanh toán
  const changePYMNPERD = (e) => {
    setHeader({
      ...header,
      PYMNPERD: e.value?.ITEMCODE,
    });
  };

  //Thay đổi só thuế
  const changeVAT_RATE = (e) => {
    header.VAT_RATE = e.value;
    header.VAT_CRAM = (Number.parseInt(e.value) * header.SMMNCRAM) / 100;
    header.SMMNCRAM = caculatorSMMNCRAM();
    header.VAT_CRAM = (header.VAT_RATE * header.SMMNCRAM) / 100;
    header.SUM_AMNT =
      header.CUOMRATE * header.SMMNCRAM + header.VAT_CRAM * header.CUOMRATE;
    header.SUM_CRAM = header.SMMNCRAM + header.VAT_CRAM;
    setHeader({ ...header });
  };

  //Thay đổi giá trị grid
  const itemChanged = (item) => {
    //Mã sản phẩm
    if (item.field == "PRDCCODE") {
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).PRDCCODE = item.value?.ITEMCODE;
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).PRDCNAME = item.value?.ITEMNAME;
    }
    //Nguồn sản phẩm
    if (item.field == "ORGNCODE") {
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).ORGNCODE = item.value?.ITEMCODE;
    }

    //Phân loại sản phẩm
    if (item.field == "SORTCODE") {
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).SORTCODE = item.value?.ITEMCODE;
    }

    //Đơn vị tính
    if (item.field == "QUOMCODE") {
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).QUOMCODE = Number(item.value?.ITEMCODE);
    }

    // Số lượng
    if (item.field == "QUOMQTTY") {
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).QUOMQTTY = item.value;
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).PRDCQTTY = item.value;
      header.SMPRQTTY = header.DETAIL.reduce(
        (accumulator, currentValue) => accumulator + currentValue.PRDCQTTY,
        0
      );
    }

    //Đơn giá theo tiền tệ
    if (item.field == "CRSLPRCE") {
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).CRSLPRCE = item.value;
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).SALEPRCE = item.value;
    }

    //Thành tiền
    if (item.field == "MNEYCRAM") {
    }

    //Chiết khấu
    if (item.field == "DISCRATE") {
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).DISCRATE = item.value;
    }

    //Tiền giảm CK
    if (item.field == "DCPRCRAM") {
    }

    //Diễn giải
    if (item.field == "NOTETEXT_DT") {
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      ).NOTETEXT_DT = item.value;
    }

    header.DETAIL.find(
      (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
    ).DCPRCRAM = caculatorDCPRCRAM(
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      )
    );

    //
    header.DETAIL.find(
      (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
    ).PRCECRAM = cacualtorPRCECRAM(
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      )
    );

    //Thành tiền
    header.DETAIL.find(
      (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
    ).MNEYCRAM = caculatorMNEYCRAM(
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      )
    );

    //Tiền chiết khấu (VND)
    header.DETAIL.find(
      (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
    ).DCPRAMNT = caculatorDCPRAMNT(
      header.DETAIL.find(
        (itemFind) => itemFind.PRDCCODE == item.dataItem.PRDCCODE
      )
    );

    header.SMMNCRAM = caculatorSMMNCRAM();
    header.VAT_CRAM = (header.VAT_RATE * header.SMMNCRAM) / 100;
    header.SUM_AMNT =
      header.CUOMRATE * header.SMMNCRAM + header.VAT_CRAM * header.CUOMRATE;
    header.SUM_CRAM = header.SMMNCRAM + header.VAT_CRAM;
    setHeader({ ...header });
  };

  //Thêm detail
  const handleCancelEdit = () => {
    setOpenForm(false);
  };

  const handleSubmit = (e) => {
    let newData = [];

    // them moi
    if (Array.isArray(e.PRDCCODE)) {
      var event = e.PRDCCODE.map((item) => {
        return {
          PRDCCODE: item.ITEMCODE,
          PRDCNAME: item.ITEMNAME,
          ORGNCODE: "",
          SORTCODE: "",
          QUOMCODE: 0,
          QUOMQTTY: 0,
          CRSLPRCE: 0,
          MNEYCRAM: 0,
          DISCRATE: 0,
          DCPRCRAM: 0,
          NOTETEXT_DT: "",
          PRDCQTTY: 0,
          SALEPRCE: 0,
          MNEYAMNT: 0,
          DCPRAMNT: 0,
          RDTNRATE: 0,
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

  const enterRemove = (dataItem) => {
    setHeader({
      ...header,
      DETAIL: header.DETAIL.filter((item) => item.INDEX != dataItem.INDEX),
    });
  };

  const editItemHandler = (item) => {
    setOpenForm(true);
    setEditItem({
      ...item,
    });
  };

  //Tính giảm giá chiết khấu
  const caculatorDCPRCRAM = (detail) => {
    return (detail.DISCRATE * detail.CRSLPRCE) / 100;
  };

  //Tính giá sau chiết khấu
  const cacualtorPRCECRAM = (detail) => {
    return detail.CRSLPRCE - (detail.DISCRATE * detail.CRSLPRCE) / 100;
  };

  // tính tiền su chiết khấu
  const caculatorMNEYCRAM = (detail) => {
    return (
      (detail.CRSLPRCE - (detail.DISCRATE * detail.CRSLPRCE) / 100) *
      detail.QUOMQTTY
    );
  };

  //TÍnh tiền CK
  const caculatorDCPRAMNT = (detail) => {
    return ((detail.DISCRATE * detail.CRSLPRCE) / 100) * header.CUOMRATE;
  };

  //Tính tiền hàng
  const caculatorSMMNCRAM = () => {
    return header.DETAIL?.reduce((acc, currValue) => {
      return acc + currValue.MNEYCRAM;
    }, 0);
  };

  return (
    <>
      {/* thông báo  */}
      {visible && (
        <NotifyDialog
          stringNotify={stringNotify}
          toggleDialog={toggleDiaglog}
        />
      )}

      <div className="p-5">
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

        <div className="grid grid-cols-[3fr_1fr]">
          {/* Noi dung phan Header */}
          <div className="w-full md:flex-row flex-col content-header">
            <div
              className={`lg:ml-2 ml-0 lg:mr-2 mr-0 lg:p-5 p-0 bg-white border-solid lg:border-[1px] border-0 lg:mb-0 mb-2 border-borderBase hover:border-blue-700 ${appColors.stackColor}`}
            >
              <h3 className="block mb-1 text-xl font-light">
                {PageInfo.TitlePage}: {header.ODERCODE ? header.ODERCODE : ""}
              </h3>
              <h4 className="text-red-600 font-semibold underline mb-3 cursor-pointer text-sm italic">
                {header.STTENAME ? header.STTENAME : ""}
              </h4>
              {/* Noi dung Header */}
              <TabStrip
                selected={tabSelected}
                onSelect={(e) => {
                  setTabSelected(e.selected);
                }}
                className="Tab-flex"
              >
                {/* thông tin đơn hàng  */}
                <TabStripTab title={getLabelValue(105, "Thông tin đơn hàng")}>
                  <WrapperTabStrip DcmnCode={PageInfo.DcmnCode}>
                    {/* Tổng thể tab  */}
                    <div className="p-5 grid grid-cols-2  gap-x-7">
                      {/* Field edit  */}
                      <div className="flex flex-col gap-y-4">
                        {/* Chi nhánh */}
                        <div className="w-full">
                          <Label className="text-sm text-gray-500">
                            {getLabelValue(null, "Chi nhánh")}
                          </Label>
                          <MaskedTextBox
                            id="SHIFTCODE"
                            name="SHIFTCODE"
                            style={{ borderColor: "grey" }}
                            value={
                              JSON.parse(localStorage.getItem("company"))
                                .COMPNAME
                            }
                            readonly={true}
                            className={appColors.inputColor}
                            size="small"
                          />
                        </div>

                        {/* Tên khách hàng  */}
                        <div className="w-full">
                          <FieldEditCombobox
                            title={getLabelValue(92, "Tên khách hàng")}
                            id={"CUSTCODE"}
                            data={lstCustomer}
                            value={
                              header.CUSTCODE
                                ? lstCustomer.find(
                                    (item) => item.CUSTCODE == header.CUSTCODE
                                  )
                                : ""
                            }
                            onChange={changeCust}
                            textField="CUSTNAME"
                            dataItemKey="CUSTCODE"
                            disabled={false}
                          />
                        </div>

                        {/* Địa chỉ  */}
                        <div className="w-full">
                          <Label className="text-sm text-gray-500">
                            {getLabelValue(null, "Địa chỉ")}
                          </Label>
                          <MaskedTextBox
                            id="SHIFTCODE"
                            name="SHIFTCODE"
                            style={{ borderColor: "grey" }}
                            value={header?.CUSTADDR}
                            readonly={true}
                            className={appColors.inputColor}
                            size="small"
                          />
                        </div>

                        {/* Điện thoại  */}
                        <div className="w-full">
                          <FieldEditInput
                            title={getLabelValue(89, "Người nhận")}
                            id={"CUST_TEL"}
                            defaultValue={header?.CUST_TEL}
                            onChange={changeCUST_TEL}
                            value={header?.CUST_TEL}
                            disabled={false}
                          />
                        </div>
                        {/*Nội dung đơn hàng  */}
                        <div className="w-full">
                          <FieldEditInput
                            title={getLabelValue(21, "Nội dung")}
                            id={"MEXLNNTE"}
                            defaultValue={header?.NOTETEXT}
                            onChange={changeNOTETEXT}
                            value={header?.NOTETEXT}
                            disabled={false}
                          />
                        </div>
                      </div>
                      {/* Dữ liệu cột 2 */}
                      <div className="flex flex-col gap-y-4">
                        <div className="grid grid-cols-2  gap-x-3">
                          {/*Mã đơn hàng  */}
                          <div className="w-full">
                            <Label className="text-sm text-gray-500">
                              {getLabelValue(19, "Mã đơn hàng")}
                            </Label>
                            <MaskedTextBox
                              id="SHIFTCODE"
                              name="SHIFTCODE"
                              style={{ borderColor: "grey" }}
                              value={header?.ODERCODE}
                              readonly={true}
                              className={appColors.inputColor}
                              size="small"
                            />
                          </div>

                          {/* Ngày lập  */}
                          <div className="w-full">
                            <FieldEditDatePicker
                              title={getLabelValue(null, "Ngày đơn hàng")}
                              value={
                                header?.ODERDATE
                                  ? new Date(header?.ODERDATE)
                                  : new Date()
                              }
                              disabled={false}
                              // onChange={MainDateChgeHandler}
                            />
                          </div>
                        </div>
                        {/* Phương thức thanh toán */}
                        <FieldEditCombobox
                          title={getLabelValue(37, "Phương thức thanh toán")}
                          id={"PAY_MTHD"}
                          data={lstPayMthd}
                          value={lstPayMthd.find(
                            (item) => item.ITEMCODE == header?.PAY_MTHD
                          )}
                          onChange={changePAY_MTHD}
                          textField="ITEMNAME"
                          dataItemKey="ITEMCODE"
                          disabled={false}
                        />
                        {/* Chu kì thanh toán  */}
                        <FieldEditCombobox
                          title={getLabelValue(null, "Chu kì thanh toán")}
                          id={"PAY_MTHD"}
                          data={lstPymnPerd}
                          value={lstPymnPerd.find(
                            (item) => item.ITEMCODE == header?.PYMNPERD
                          )}
                          onChange={changePYMNPERD}
                          textField="ITEMNAME"
                          dataItemKey="ITEMCODE"
                          disabled={false}
                        />
                        {/* Thời hạn thanh toán  */}
                        <div className="w-full">
                          <FieldEditAmnt
                            title={getLabelValue(null, "Thời hạn thanh toán")}
                            id="DCNTRATE"
                            name="DCNTRATE"
                            className={`text-number ${appColors.inputColor}`}
                            value={header.PYMNNUMB}
                            onChange={changePYMNNUMB}
                            disabled={false}
                          />
                        </div>
                      </div>

                      {/* Dữ liệu cột 3 */}
                      <div className="flex flex-col gap-y-4"></div>
                    </div>
                  </WrapperTabStrip>
                </TabStripTab>

                {/* THÔNG TIN GIAO HÀNG TAB*/}

                <TabStripTab title={getLabelValue(106, "Thông tin giao hàng")}>
                  <WrapperTabStrip DcmnCode={PageInfo.DcmnCode}>
                    {/* Tổng thể tab  */}
                    <div className="p-5 grid grid-cols-2  gap-x-7 w-full">
                      {/* Field edit  */}
                      <div className="flex flex-col gap-y-4">
                        {/* Người nhận */}
                        <div className="w-full">
                          <FieldEditInput
                            title={getLabelValue(45, "Người nhận")}
                            id={"RCVREMPL"}
                            defaultValue={header?.RCVREMPL}
                            onChange={changeRCVREMPL}
                            value={header?.RCVREMPL}
                            disabled={false}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-x-3">
                          {/* Tỉnh/ thành phố */}
                          <FieldCascadeCombobox
                            title={getLabelValue(95, "Tỉnh/Thành phố")}
                            id={"DLVRCITY"}
                            data={lstProvince}
                            value={
                              header.DLVRCITY
                                ? lstProvince.find(
                                    (item) => item.ITEMCODE == header.DLVRCITY
                                  )
                                : ""
                            }
                            textField="ITEMNAME"
                            dataItemKey="ITEMCODE"
                            onComboboxChange={changeCity}
                            disabled={false}
                          />
                          {/* Quận/huyện*/}
                          <FieldCascadeCombobox
                            title={getLabelValue(96, "Quận/Huyện")}
                            id={"DISTRICT"}
                            data={lstDistrict}
                            value={
                              header?.DLVRDIST
                                ? lstDistrict.find(
                                    (item) => item.ITEMCODE == header.DLVRDIST
                                  )
                                : ""
                            }
                            textField="ITEMNAME"
                            dataItemKey="ITEMCODE"
                            onComboboxChange={changeDistrict}
                            disabled={openDistrict}
                          />
                        </div>

                        <div className="w-full grid grid-cols-2 gap-x-3">
                          {/* Phường / xã */}
                          <FieldCascadeCombobox
                            title={getLabelValue(97, "Phường/Xã")}
                            id={"WARD"}
                            data={lstWard}
                            value={
                              header?.DLVRWARD
                                ? lstWard.find(
                                    (item) => item.ITEMCODE == header.DLVRWARD
                                  )
                                : ""
                            }
                            textField="ITEMNAME"
                            onComboboxChange={changeWARD}
                            dataItemKey="ITEMCODE"
                            disabled={openWard}
                          />

                          {/* Địa chỉ cụ thể  */}
                          <div className="w-full">
                            <FieldEditInput
                              title={getLabelValue(93, "Địa chỉ cụ thể")}
                              id={"MEXLNNTE"}
                              defaultValue={header?.DLVRADDR}
                              onChange={changeDLVRADDR}
                              value={header?.DLVRADDR}
                              disabled={false}
                            />
                          </div>
                        </div>
                        {/* Địa chỉ nhận  */}
                        <div className="w-full">
                          <FieldEditInput
                            title={getLabelValue(94, "Địa điểm nhận")}
                            id={"MEXLNNTE"}
                            defaultValue={header?.DLVRPLCE}
                            onChange={changeDLVRPLCE}
                            value={header?.DLVRPLCE}
                            disabled={true}
                          />
                        </div>
                      </div>

                      {/* Dữ liệu cột 2 */}
                      <div className="flex flex-col gap-y-4">
                        {/*Tên khách hàng  */}
                        <div className="w-full">
                          <FieldEditInput
                            title={getLabelValue(92, "Tên khách hàng")}
                            id={"DLVRPLCE"}
                            defaultValue={header?.MCUSTNME}
                            onChange={""}
                            value={header?.MCUSTNME}
                            disabled={true}
                          />
                        </div>
                        {/*Địa chỉ  */}
                        <div className="w-full">
                          <FieldEditInput
                            title={getLabelValue(31, "Địa chỉ")}
                            id={"DLVRPLCE"}
                            defaultValue={header?.CUSTADDR}
                            onChange={""}
                            value={header?.CUSTADDR}
                            disabled={true}
                          />
                        </div>

                        {/*Mã số thuế  */}
                        <div className="w-full">
                          <FieldEditInput
                            title={getLabelValue(30, "Mã số thuế")}
                            id={"DLVRPLCE"}
                            defaultValue={header?.TAX_CODE}
                            onChange={changeTAX_CODE}
                            value={header?.TAX_CODE}
                            disabled={false}
                          />
                        </div>
                      </div>

                      {/* Dữ liệu cột 3 */}
                      <div className="flex flex-col gap-y-4"></div>
                    </div>
                  </WrapperTabStrip>
                </TabStripTab>
              </TabStrip>
            </div>
          </div>
          {/* Xu ly lien quan tien bac tren Header */}
          <TitleAmnt title={PageInfo.TitleAmount}>
            <div className="grid gap-y-3">
              {/* Tiền tệ */}
              <div className="grid grid-cols-2 items-end gap-x-3">
                {/* Loại tiền  */}
                <FieldEditCombobox
                  title={getLabelValue(87, "Loại tiền")}
                  id={"CUSTCODE"}
                  data={lstCUOM}
                  value={
                    header?.CUOMCODE
                      ? lstCUOM.find(
                          (item) => item.ITEMCODE == header?.CUOMCODE
                        )
                      : ""
                  }
                  onChange={changeCUOMCODE}
                  textField="ITEMNAME"
                  dataItemKey="ITEMCODE"
                  disabled={false}
                />

                {/* Tỉ giá  */}
                <NumericTextBox
                  onChange={changeCUOMRATE}
                  value={header?.CUOMRATE}
                  disabled={openCUOMRATE}
                  size="small"
                  step={1}
                  min={0}
                ></NumericTextBox>
              </div>
              {/* Tỷ giá  */}
              <div className="w-full grid grid-cols-2 gap-x-2 items-center justify-between">
                <FieldEditAmnt
                  title={getLabelValue(88, "Tỷ giá")}
                  id="VATE_RATE"
                  name="VATE_RATE"
                  className={`text-number ${appColors.inputColor}`}
                  value={header?.VAT_RATE}
                  onChange={changeVAT_RATE}
                  disabled={false}
                />
                <FieldEditAmnt
                  title={getLabelValue(55, "Tiền thuế")}
                  id="VAT_CRAM"
                  name="VAT_CRAM"
                  className={`text-number ${appColors.inputColor}`}
                  value={header?.VAT_CRAM}
                  onChange={changeVAT_CRAM}
                  disabled={true}
                />
              </div>
              {/* Tiền hàng  */}
              <div className="w-full">
                <FieldEditAmnt
                  title={getLabelValue(98, "Tiền hàng")}
                  id="SMMNCRAM"
                  name="SMMNCRAM"
                  className={`text-number ${appColors.inputColor}`}
                  value={header?.SMMNCRAM}
                  disabled={true}
                />
              </div>

              {/* Tổng tiền  */}
              <div className="w-full">
                <FieldEditAmnt
                  title={getLabelValue(56, "Tổng tiền")}
                  id="DCNTRATE"
                  name="DCNTRATE"
                  className={`text-number ${appColors.inputColor}`}
                  value={header.SUM_CRAM}
                  disabled={true}
                />
              </div>
              {/* Tổng tiền  (VNĐ) */}
              <div className="w-full">
                <FieldEditAmnt
                  title={getLabelValue(null, "Tổng tiền(VNĐ)")}
                  id="DCNTRATE"
                  name="DCNTRATE"
                  className={`text-number ${appColors.inputColor}`}
                  value={header?.SUM_AMNT}
                  disabled={true}
                />
              </div>
            </div>
          </TitleAmnt>
        </div>
      </div>

      {/* chi tiet */}
      <div
        id="detail"
        className="lg:m-2 m-0 mt-4 bg-blue-50 border-solid border-[1px] border-borderBase hover:border-blue-700"
      >
        {/* Dialog them moi hoac sua san pham */}
        {openForm && (
          <EditForm
            cancelEdit={handleCancelEdit}
            onSubmit={handleSubmit}
            item={editItem}
            DcmnView={PageInfo.DcmnCode}
          />
        )}
        <CustomerOrderGrid
          enterRemove={enterRemove}
          items={header.DETAIL}
          itemChanged={itemChanged}
        />

        {/* Nut Them dong Detail */}
        <div className="p-3">
          {true && (
            <button
              type="button"
              disabled={false}
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
    </>
  );
};

export default CustomerOrderEditMain;
