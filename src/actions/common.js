import * as api from "../api/index.js";
import {
  FETCH_lstObjcType,
  FETCH_lstmngSubDcmn,
  FETCH_lstmngSubDcmnSCTNC,
  FETCH_lstAccObjcCode,
  FETCH_lstCUOM,
  FETCH_lstSpndSgDtTaxRaNm,
  FETCH_lstLoadAcctDcmn,
  FETCH_lstYesOrNo,
  FETCH_lstPayMthd,
  FETCH_appEmplList,
  FETCH_lstLocationType,
  FETCH_lstNation,
  FETCH_lstTimekeepingTypeCT,
  FETCH_lstPymnPerd,
  FETCH_lstProvince,
  FETCH_lstDistrict,
  FETCH_lstWard,
  FETCH_lstVATRate,
  FETCH_lstSrvcRequest,
  FETCH_lstAdvnType,
  FETCH_lstPymnType,
  FETCH_lstDcmn_Sub,
  FETCH_lstAcObManage,
  FETCH_app_DcmnList,
  FETCH_lstDepartment,
  FETCH_lstLocation,
  FETCH_lstLocationAll,
  FETCH_lstDcmnType,
  FETCH_lstDcmnPbls,
  FETCH_lstJob,
  FETCH_lstTimekeepingType,
  FETCH_lstDcmnSet,
  FETCH_lstDcmnCabn,
  FETCH_TreeDcmnSet,
  FETCH_TreeDcmnCabn,
  FETCH_lstDepartment_Employee,
  FETCH_lstDlvrMthd,
  FETCH_lstDlvrType,
  FETCH_lstDlvrAddr,

  /////////////////
  FETCH_lstEmployee,
  FETCH_lstEmployeeAll,
  FETCH_lstSupplier_CurrCode,
  FETCH_lstCustomer_CurrCode,
  FETCH_lstCustomer,
  FETCH_lstBankAccount,
  FETCH_lstCounter,

  /////////////////
  FETCH_lstQUOMPrdc,
  FETCH_lstQUOM,
  FETCH_lstSortSale,
  FETCH_lstProduct,
  FETCH_lstProductAll,
  FETCH_lstNVL,
  FETCH_lstCCDC,
  FETCH_lstOrgnCode,
  FETCH_lstWareHouse,
} from "../constants/actionTypes.js";

// Danh sách loại đối tượng thanh toán
export const getLstObjcType = () => async (dispatch) => {
  const body = { LISTCODE: "lstObjcType", CONDFLTR: "", VAR_VLUE: "" };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstObjcType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách loại đề nghị chi
export const getLstmngSubDcmn = () => async (dispatch) => {
  const body = {
    VAR_VLUE: "",
    CONDFLTR: "DcmnCode='PHDNC'",
    LISTCODE: "lstmngSub_Dcmn",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstmngSubDcmn, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách loại chi tiêu
export const getLstmngSubDcmnSCTNC = () => async (dispatch) => {
  const body = {
    CONDFLTR: "DcmnCode='SCTNC'",
    VAR_VLUE: "",
    LISTCODE: "lstmngSub_Dcmn",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstmngSubDcmnSCTNC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách đối tượng thanh toán
export const getLstAccObjcCode = (ObjcType) => async (dispatch) => {
  const body = {
    FUNCNAME: "spDtaLoadAccObjcCode_Srch_App",
    DTBSNAME: "Common",
    LCTNCODE: "{{0202}}",
    PARA_001: "'1990-01-01', '1990-01-01'," + parseInt(ObjcType) + ", ''",
  };
  try {
    const { data } = await api.fetchCommonFuncList(body);

    dispatch({ type: FETCH_lstAccObjcCode, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách loại tiền
export const getLstCUOM = () => async (dispatch) => {
  const body = { LISTCODE: "lstCUOM" };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstCUOM, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Tên thuế suất(%)
export const getLstSpndSgDtTaxRaNm = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstSpndSgDt_Tax_RaNm",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstSpndSgDtTaxRaNm, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Nghiệp vụ liên quan
export const getLstLoadAcctDcmn = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstLoadAcctDcmn",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstLoadAcctDcmn, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Loại hóa đơn
export const getLstYesOrNo = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstYesOrNo",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstYesOrNo, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Phương thức thanh toán
export const getLstPayMthd = () => async (dispatch) => {
  const body = {
    LISTCODE: "lst_inpCustOdMt_Pay_Mthd_2",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstPayMthd, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Nhân viên
export const getAppEmplList = (ObjecCode) => async (dispatch) => {
  const body = {
    DCMNCODE: "appEmplList",
    // PARACODE: "001",
    PARACODE: ObjecCode,
    DPTMCODE: "%",
    PSTNCODE: "%",
    JOB_CODE: "%",
    EMPLCODE: "%",
    PSTNTYPE: 0,
    JOB_TYPE: 0,
  };
  try {
    const { data } = await api.fetchCommonData(body);

    dispatch({ type: FETCH_appEmplList, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Loại công tác Nội địa|Quốc tế
export const getLstLocationType = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstLocationType",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstLocationType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Quốc gia
export const getLstNation = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstNation",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstNation, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh loại chấm công công tác
export const getLstTimekeepingTypeCT = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstTimekeepingTypeCT",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstTimekeepingTypeCT, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Kỳ thanh toan
export const getLstPymnPerd = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstTimeType",
    CONDFLTR: "DataCode in('D','M','Y')",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstPymnPerd, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Tinh / Thanh pho
export const getLstProvince = () => async (dispatch) => {
  const body = {
    VAR_VLUE: "",
    LISTCODE: "lstProvince",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstProvince, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sach Quan/ Huyen
export const getLstDistrict = (PrvnCode) => async (dispatch) => {
  let paraFltr = "PrvnCode='";
  if (PrvnCode !== null) {
    paraFltr = paraFltr + PrvnCode + "'";
  }

  const body = {
    LISTCODE: "lstDistrict",
    CONDFLTR: paraFltr,
  };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstDistrict, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sach Phuong/ Xa
export const getLstWard = (DistCode) => async (dispatch) => {
  let paraFltr = "DistCode='";
  if (DistCode !== null) {
    paraFltr = paraFltr + DistCode + "'";
  }
  const body = {
    LISTCODE: "lstWard",
    CONDFLTR: paraFltr,
  };

  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstWard, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Thuế suất
export const getLstVATRate = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstSpndSgDt_Tax_RaNm",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstVATRate, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Yêu cầu dịch vụ ở Phiếu đăng ký công tác
export const getLstSrvcRequest = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstServiceRequest",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstSrvcRequest, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
// Danh sách Loai tạm ứng
export const getLstAdvnType = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstmngAdvnType",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    const ConvertData = data.RETNDATA.map((item) => {
      return {
        KEY_CODE: item.KEY_CODE,
        LISTCODE: item.LISTCODE,
        ITEM_KEY: item.ITEM_KEY,
        ITEMCODE: item.ITEMCODE,
        ITEMNAME: item.ITEMNAME,
        ITEMSRCH: item.ITEMSRCH,
        ITEMATTR: item.ITEMATTR,
        ITEMTREE: item.ITEMTREE,
        ITEMODER: item.ITEMODER,
        OBJCTYPE: parseInt(item.ITEMCODE),
      };
    });

    dispatch({ type: FETCH_lstAdvnType, payload: { ConvertData } });
  } catch (error) {
    console.log(error.message);
  }
};
// Danh sách Phuong thuc thanh toan
export const getLstPymnType = (filterpara) => async (dispatch) => {
  const body = {
    LISTCODE: "lstPymnType",
    CONDFLTR: filterpara,
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstPymnType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
// Danh sách Dcmn_SubCode
export const getLstDcmn_Sub = (DcmnCode) => async (dispatch) => {
  let paraFltr = DcmnCode ? "UsedStte=1 AND DcmnCode='" + DcmnCode + "'" : "";

  const body = {
    LISTCODE: "lstmngSub_Dcmn",
    CONDFLTR: paraFltr,
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstDcmn_Sub, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
// Danh sách Dự án
export const getLstAcObManage = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstAcctObjectMngr",
    CONDFLTR: "UsedStte>0",
    LISTOPTN: 4,
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstAcObManage, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

export const getapp_DcmnList = () => async (dispatch) => {
  const body = {
    LISTCODE: "app_DcmnList",
    CONDFLTR: "(DcmnType & 1) = 1",
    LISTOPTN: 4,
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_app_DcmnList, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Bộ phận/ Phòng ban
export const getLstDepartment = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstDepartment",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstDepartment, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sach chi nhanh
export const getLstLocation = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstLocation",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstLocation, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};
// Danh sach chi nhanh
export const getLstLocationAll = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstLocation",
    ADD_CODE: "%",
    ADD_NAME: 62,
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstLocationAll, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sach Loai tai lieu trinh ky CVTL
export const getLstDcmnType = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstDcmnType",
    LISTOPTN: 4,
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstDcmnType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sach Noi phat hanh CVTL
export const getLstDcmnPbls = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstDcmnPbls",
    LISTOPTN: 4,
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstDcmnPbls, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

//Danh sách chức danh
export const getLstJob = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstJob",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    dispatch({ type: FETCH_lstJob, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách danh mục chấm công
export const getLstTimekeepingType = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstTimekeepingType",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    dispatch({ type: FETCH_lstTimekeepingType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách danh mục Bo ho so
export const getLstDcmnSet = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstDcmnSetList",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    dispatch({ type: FETCH_lstDcmnSet, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách danh mục Bo ho so
export const getLstDcmnCabn = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstDcmnCabn",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    dispatch({ type: FETCH_lstDcmnCabn, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

////////// TREE VIEW //////////
// Danh sách TreeView Bo ho so
export const getTreeDcmnSet = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstDcmnSetList",
    LISTOPTN: 16, // Dieu kien de hien thi TreeView
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_TreeDcmnSet, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách TreeView Tu/ Ngan ho so
export const getTreeDcmnCabn = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstDcmnCabn",
    LISTOPTN: 16, // Dieu kien de hien thi TreeView
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_TreeDcmnCabn, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách đối tượng thanh toán
export const getLstDepartment_Employee = (ObjcType) => async (dispatch) => {
  let para001 = "";
  para001 = para001 + "'" + ObjcType + "', '2', ''";

  const body = {
    FUNCNAME: "sp_lstDepartment_Employee_App",
    DTBSNAME: "Common",
    LCTNCODE: "{{0202}}",
    PARA_001: para001,
  };
  try {
    const { data } = await api.fetchCommonFuncList(body);

    dispatch({ type: FETCH_lstDepartment_Employee, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách phương thức giao hàng
export const getLstDlvrMthd = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstDlvrMthd",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    dispatch({ type: FETCH_lstDlvrMthd, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh mục phương thức vận chuyển
export const getLstDlvrType = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstDlvrType",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    dispatch({ type: FETCH_lstDlvrType, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

//Danh mục địa chỉ giao hàng
export const getLstDlvrAddr = () => async (dispatch) => {
  const body = {
    LISTCODE: "lst_inpDlvrAddr",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    dispatch({ type: FETCH_lstDlvrAddr, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////
// DOI TUONG THANH TOAN: Nhan vien - NCC - Khac hang - Ngan quy - Ngan hang
// Danh sach NV
export const getLstEmployee = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstEmployee_Tble",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    const newdata = data.RETNDATA.map((item) => {
      return {
        KEY_CODE: item.KEY_CODE,
        LISTCODE: item.LISTCODE,
        ITEM_KEY: item.KEY_CODE,
        ITEMCODE: item.ITEMCODE,
        ITEMNAME: item.ITEMNAME,
        ITEMSRCH: item.ITEMCODE + " - " + item.ITEMNAME,
        ITEMATTR: item.ITEMATTR,
        ITEMTREE: item.ITEMTREE,
        ITEMODER: item.ITEMODER,
      };
    });

    dispatch({ type: FETCH_lstEmployee, payload: { newdata } });
  } catch (error) {
    console.log(error.message);
  }
};
export const getLstEmployeeAll = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstEmployee_Tble",
    CONDFLTR: "",
    ADD_CODE: "%",
    ADD_NAME: 62,
  };
  try {
    const { data } = await api.fetchCommonList(body);

    const newdata = data.RETNDATA.map((item) => {
      return {
        KEY_CODE: item.KEY_CODE,
        LISTCODE: item.LISTCODE,
        ITEM_KEY: item.KEY_CODE,
        ITEMCODE: item.ITEMCODE,
        ITEMNAME: item.ITEMNAME,
        ITEMSRCH: item.ITEMCODE + " - " + item.ITEMNAME,
        ITEMATTR: item.ITEMATTR,
        ITEMTREE: item.ITEMTREE,
        ITEMODER: item.ITEMODER,
      };
    });

    dispatch({ type: FETCH_lstEmployeeAll, payload: { newdata } });
  } catch (error) {
    console.log(error.message);
  }
};

//Danh mục NCC
export const getLstSupplier_CurrCode = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstSupplier_CurrCode",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    dispatch({ type: FETCH_lstSupplier_CurrCode, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

//Danh mục Khach hang chinh thuc
export const getLstCustomer_CurrCode = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstCustomer_CurrCode",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    dispatch({ type: FETCH_lstCustomer_CurrCode, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Khách hàng
export const getLstCustomer = () => async (dispatch) => {
  const body = {
    DCMNCODE: "appCustList",
    EMPLCODE: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
    PARACODE: "001",
    KEY_WORD: "%",
  };
  try {
    const { data } = await api.fetchCommonData(body);

    dispatch({ type: FETCH_lstCustomer, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Ngân quỹ
export const getLstCounter = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstCounter",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstCounter, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Ngân hàng
export const getLstBankAccount = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstBankAccount",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstBankAccount, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////
// ListCode liên quan toi con hàng
// Danh sách DVT theo San pham
export const getLstQUOMPrdc = (PrdcCode) => async (dispatch) => {
  let paraFltr = "'" + PrdcCode + "'";
  const body = {
    LISTCODE: "lstQUOMRate",
    CONDFLTR: paraFltr,
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstQUOMPrdc, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách tat ca DVT
export const getLstQUOM = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstQUOM",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstQUOM, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách SortCode
export const getLstSortSale = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstSortSale",
    CONDFLTR: "UsedStte>0",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstSortSale, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách San pham
export const getLstProduct = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstProduct_CurrCode",
    CONDFLTR: "UsedStte>0 AND DcmnSbCd='001'",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstProduct, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Tat ca san pham
export const getLstProductAll = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstProduct_CurrCode",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstProductAll, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách NVL
export const getLstNVL = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstProduct_CurrCode",
    CONDFLTR: "UsedStte>0 AND DcmnSbCd='002'",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstNVL, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách CCDC
export const getLstCCDC = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstProduct_CurrCode",
    CONDFLTR: "UsedStte>0 AND DcmnSbCd='006'",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstCCDC, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

//Danh mục nguồn sản phẩm lstOrgnCode
export const getLstOrgnCode = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstOrgnCode",
    CONDFLTR: "",
  };
  try {
    const { data } = await api.fetchCommonList(body);
    dispatch({ type: FETCH_lstOrgnCode, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

// Danh sách Kho
export const getLstWareHouse = () => async (dispatch) => {
  const body = {
    LISTCODE: "lstWareHouse",
    CONDFLTR: "(LctnCode='%' OR LctnCode ='{{0202}}') AND WrhsType & 1 > 0",
  };
  try {
    const { data } = await api.fetchCommonList(body);

    dispatch({ type: FETCH_lstWareHouse, payload: { data } });
  } catch (error) {
    console.log(error.message);
  }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////
