import {createContext, useContext, useEffect, useState} from "react";
import getProcessCategories from "../services/getProcessCategories";

export const ProcessConditionType = {
  WORKNAME: "WORKNAME",
  ROLEAPRV: "ROLEAPRV",

  PSJBTYPE: "PSJBTYPE",
  PSJBCODE: "PSJBCODE",

  PRCSCODE: "PRCSCODE",
  PRCSLIST: "PRCSLIST",

  SENDMAIL: "SENDMAIL",
  DLAYTYPE: "DLAYTYPE",
}
const ProcessStepCategory = createContext({
  ROLEAPRV: [],

  PSJBTYPE: [],
  PSJBCODE: [],
  PSJBCODE_DMC: [],

  PRCSCODE: [],
  PRCSLIST: [],

  SENDMAIL: [],
  DLAYTYPE: [],

  POSITIONS: [],
  EMPLOYEES: [],
});

export const ProcessStepCategoryProvider = ({children}) => {
  const {getCategories, data} = getProcessCategories();

  const [ROLEAPRV, setROLEAPRV] = useState([]);

  const [PSJBTYPE, setPSJBTYPE] = useState([]);
  const [PSJBCODE, setPSJBCODE] = useState([]);
  const [PSJBCODE_DMC, setPSJBCODE_DMC] = useState([]);

  const [PRCSCODE, setPRCSCODE] = useState([]);
  const [PRCSLIST, setPRCSLIST] = useState([]);

  const [SENDMAIL, setSENDMAIL] = useState([]);
  const [DLAYTYPE, setDLAYTYPE] = useState([]);

  const [POSITIONS, setPOSITIONS] = useState([]);
  const [EMPLOYEES, setEMPLOYEES] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (data) {
      setROLEAPRV(data.ROLEAPRV.map((dt) => {
        return {id: dt.ITEMCODE, text: dt.ITEMNAME }
      }));

      setPSJBTYPE(data.PSJBTYPE.map((dt) => {
        return {id: dt.ITEMCODE, text: dt.ITEMNAME }
      }));

      setPSJBCODE(data.PSJBCODE.map((dt) => {
        return {id: dt.ITEMCODE, text: dt.ITEMNAME }
      }));

      setPSJBCODE_DMC(data.PSJBCODE_DMC.map((dt) => {
        return {id: dt.ITEMCODE, text: dt.ITEMNAME }
      }));

      setPRCSCODE(data.PRCSCODE.map((dt) => {
        return {id: dt.ITEMCODE, text: dt.ITEMNAME  }
      }));

      setPRCSLIST(data.PRCSLIST.map((dt) => {
        return {id: dt.ITEMCODE, text: dt.ITEMNAME }
      }));

      setSENDMAIL(data.SENDMAIL.map((dt) => {
        return {id: dt.ITEMCODE, text: dt.ITEMNAME }
      }));

      setDLAYTYPE(data.DLAYTYPE.map((dt) => {
        return {id: dt.ITEMCODE, text: dt.ITEMNAME }
      }));

      setPOSITIONS(data.POSITIONS.map((dt) => {
        return {id: dt.ITEMCODE, text: dt.ITEMNAME }
      }));

      setEMPLOYEES(data.EMPLOYEES.map((dt) => {
        return {id: dt.ITEMCODE, text: dt.ITEMNAME }
      }));
    }
  }, [data]);

  return (
    <ProcessStepCategory.Provider
      value={{
        ROLEAPRV: ROLEAPRV,

        PSJBTYPE: PSJBTYPE,
        PSJBCODE: PSJBCODE,
        PSJBCODE_DMC: PSJBCODE_DMC,

        PRCSCODE: PRCSCODE,
        PRCSLIST: PRCSLIST,

        SENDMAIL: SENDMAIL,
        DLAYTYPE: DLAYTYPE,

        POSITIONS: POSITIONS,
        EMPLOYEES: EMPLOYEES
      }}>
      {children}
    </ProcessStepCategory.Provider>
  )
}

export const useProcessStepCategory = () => {
  const context = useContext(ProcessStepCategory);
  if (!context) {
    throw new Error('useProcessStepCategory must be used within a ProcessStepCategoryProvider');
  }
  return context;
};

export const value = {
  "ROLEAPRV": [{"id": "1", "text": "Trình ký"}, {"id": "2", "text": "Phê duyệt"}, {"id": "3", "text": "Thực hiện"}],
  "PSJBTYPE": [{"id": "3", "text": "Người cụ thẻ"}, {"id": "1", "text": "Chức danh "}, {"id": "2", "text": "Chức vụ"}],
  "PSJBCODE": [{"id": "000020", "text": "Bảo vệ"}, {"id": "000028", "text": "Bảo vệ sản xuất"}, {
    "id": "000017",
    "text": "Công nhân"
  }, {"id": "000027", "text": "Công nhân sản xuất nhà máy"}, {
    "id": "000018",
    "text": "Công nhân tạp vụ"
  }, {"id": "000002", "text": "Giám đốc kinh doanh"}, {
    "id": "000003",
    "text": "Giám đốc sản xuất"
  }, {"id": "000001", "text": "Giám đốc"}, {"id": "000031", "text": "Kế toán công nợ"}, {
    "id": "000026",
    "text": "Kế toán tổng hợp"
  }, {"id": "000005", "text": "Kế toán trưởng"}, {"id": "000016", "text": "KCS"}, {
    "id": "000004",
    "text": "Kiểm soát"
  }, {"id": "000024", "text": "Nhân viên bảo trì"}, {
    "id": "000009",
    "text": "Nhân viên giám sát sản xuất"
  }, {"id": "0165", "text": "Nhân viên giao hàng"}, {"id": "000015", "text": "Nhân viên giao nhận"}, {
    "id": "000010",
    "text": "Nhân viên HCNS"
  }, {"id": "000023", "text": "Nhân viên kỹ thuật"}, {"id": "000011", "text": "Nhân viên kế toán"}, {
    "id": "000012",
    "text": "Nhân viên kinh doanh"
  }, {"id": "000014", "text": "Nhân viên Marketing"}, {"id": "000013", "text": "Nhân viên thiết kế"}, {
    "id": "000025",
    "text": "Nhân viên xe nâng"
  }, {"id": "000022", "text": "Nhân viên XNK"}, {"id": "000021", "text": "Quản lý bán hàng"}, {
    "id": "0166",
    "text": "Quản lý shop Online"
  }, {"id": "000029", "text": "Tạp vụ sản xuất"}, {"id": "000019", "text": "Tài xế"}, {
    "id": "000030",
    "text": "Thủ quỹ"
  }, {"id": "000007", "text": "Trưởng phòng XNK"}, {"id": "000008", "text": "Trưởng CN1"}, {
    "id": "000006",
    "text": "Trưởng phòng Kinh doanh"
  }],
  "PSJBCODE_DMC": [{"id": "001", "text": "Trình ký"}, {"id": "002", "text": "Đồng ý duyệt"}, {
    "id": "003",
    "text": "Yêu cầu bổ sung"
  }, {"id": "004", "text": "Hủy bỏ chứng từ"}, {"id": "005", "text": "Tham khảo ý kiến"}, {
    "id": "006",
    "text": "Thực hiện"
  }, {"id": "007", "text": "Thay người duyệt"}, {"id": "008", "text": "Kiểm tra"}, {"id": "009", "text": "Phân công"}],
  "PRCSCODE": [{"id": "001", "text": "Trình ký"}, {"id": "002", "text": "Đồng ý duyệt"}, {
    "id": "003",
    "text": "Yêu cầu bổ sung"
  }, {"id": "004", "text": "Hủy bỏ chứng từ"}, {"id": "005", "text": "Tham khảo ý kiến"}, {
    "id": "006",
    "text": "Thực hiện"
  }, {"id": "007", "text": "Thay người duyệt"}, {"id": "008", "text": "Kiểm tra"}, {"id": "009", "text": "Phân công"}],
  "PRCSLIST": [{"id": "001", "text": "Trình ký"}, {"id": "002", "text": "Đồng ý duyệt"}, {
    "id": "003",
    "text": "Yêu cầu bổ sung"
  }, {"id": "004", "text": "Hủy bỏ chứng từ"}, {"id": "005", "text": "Tham khảo ý kiến"}, {
    "id": "006",
    "text": "Thực hiện"
  }, {"id": "007", "text": "Thay người duyệt"}, {"id": "008", "text": "Kiểm tra"}, {"id": "009", "text": "Phân công"}],
  "SENDMAIL": [{"id": "1", "text": "Người trình ký (apvSgst)"}, {
    "id": "2",
    "text": "Người đã duỵệt bước trước (apvPrev)"
  }, {"id": "4", "text": "Người sẽ duỵệt bước tiếp (apvNext)"}, {
    "id": "8",
    "text": "Tất cả người tham gia xét duyệt (apv_All)"
  }, {"id": "16", "text": "Gởi qua mail"}, {"id": "32", "text": "Gởi qua Notify"}, {
    "id": "64",
    "text": "Gởi qua Telegram"
  }, {"id": "128", "text": "Gởi qua Zalo"}],
  "DLAYTYPE": [{"id": "D", "text": "Ngày"}, {"id": "H", "text": "Giờ"}, {"id": "M", "text": "Phút"}, {
    "id": "S",
    "text": "Giây"
  }]
}