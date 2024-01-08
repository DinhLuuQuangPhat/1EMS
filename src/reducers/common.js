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
  FETCH_lstCounter,
  FETCH_lstWareHouse,
  FETCH_lstCustomer,
  FETCH_lstProvince,
  FETCH_lstDistrict,
  FETCH_lstWard,
  FETCH_lstEmployee,
  FETCH_lstEmployeeAll,
  FETCH_lstQUOMPrdc,
  FETCH_lstQUOM,
  FETCH_lstSortSale,
  FETCH_lstProduct,
  FETCH_lstProductAll,
  FETCH_lstNVL,
  FETCH_lstCCDC,
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
  FETCH_lstOrgnCode,
  FETCH_lstSupplier_CurrCode,
  FETCH_lstCustomer_CurrCode,
  FETCH_lstBankAccount,
} from "../constants/actionTypes";

const lstObjcTypeReducer = (
  state = {
    lstObjcType: [],
    lstmngSubDcmn: [],
    lstmngSubDcmnSCTNC: [],
    lstAccObjcCode: [],
    lstCUOM: [],
    lstSpndSgDtTaxRaNm: [],
    lstBusnSpend: [],
    lstLoadAcctDcmn: [],

    lstYesOrNo: [],
    lstPayMthd: [],
    appEmplList: [],
    lstLocationType: [],
    lstNation: [],

    lstPymnPerd: [],
    lstCounter: [],
    lstWareHouse: [],
    lstCustomer: [],
    lstProvince: [],
    lstDistrict: [],
    lstWard: [],
    lstEmployee: [],
    lstEmployeeAll: [],
    lstQUOMPrdc: [],
    lstQUOM: [],
    listSortSale: [],
    lstProduct: [],
    lstProductAll: [],
    lstNVL: [],
    lstCCDC: [],
    lstVATRate: [],

    lstSrvcRequest: [],
    lstAdvnType: [],
    lstPymnType: [],
    lstDcmn_Sub: [],
    lstAcObManage: [],

    app_DcmnList: [],
    lstDepartment: [],
    lstLocation: [],
    lstLocationAll: [],

    lstDcmnType: [],
    lstDcmnPbls: [],

    lstJob: [],
    lstTimekeepingType: [],

    lstDcmnSet: [],
    lstDcmnCabn: [],
    lstDepartment_Employee: [],

    treeDcmnSet: [],
    treeDcmnCabn: [],
    lstDlvrMthd: [],
    lstDlvrType: [],
    lstDlvrAddr: [],
    lstOrgnCode: [],
    lstAcctDcmnn: [],

    lstSupplier_CurrCode: [],
    lstCustomer_CurrCode: [],
    lstBankAccount: [],
  },
  action
) => {
  switch (action.type) {
    case FETCH_lstNation:
      return {
        ...state,
        lstNation:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstObjcType:
      return {
        ...state,
        lstObjcType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstmngSubDcmn:
      return {
        ...state,
        lstmngSubDcmn:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstmngSubDcmnSCTNC:
      return {
        ...state,
        lstmngSubDcmnSCTNC:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstAccObjcCode:
      return {
        ...state,
        lstAccObjcCode:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstCUOM:
      return {
        ...state,
        lstCUOM:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstSpndSgDtTaxRaNm:
      return {
        ...state,
        lstSpndSgDtTaxRaNm:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };

    case FETCH_lstLoadAcctDcmn:
      return {
        ...state,
        lstLoadAcctDcmn:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };

    case FETCH_lstYesOrNo:
      return {
        ...state,
        lstYesOrNo:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstPayMthd:
      return {
        ...state,
        lstPayMthd:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_appEmplList:
      return {
        ...state,
        appEmplList:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstLocationType:
      return {
        ...state,
        lstLocationType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstTimekeepingTypeCT:
      return {
        ...state,
        lstTimekeepingTypeCT:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstPymnPerd:
      return {
        ...state,
        lstPymnPerd:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstCounter:
      return {
        ...state,
        lstCounter:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstWareHouse:
      return {
        ...state,
        lstWareHouse:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstCustomer:
      return {
        ...state,
        lstCustomer:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstProvince:
      return {
        ...state,
        lstProvince:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstDistrict:
      return {
        ...state,
        lstDistrict:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstWard:
      return {
        ...state,
        lstWard:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstEmployee:
      return {
        ...state,
        lstEmployee:
          action.payload.newdata !== null ? action.payload.newdata : [],
      };
    case FETCH_lstEmployeeAll:
      return {
        ...state,
        lstEmployeeAll:
          action.payload.newdata !== null ? action.payload.newdata : [],
      };
    case FETCH_lstQUOMPrdc:
      return {
        ...state,
        lstQUOMPrdc:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstQUOM:
      return {
        ...state,
        listQUOM:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstSortSale:
      return {
        ...state,
        listSortSale:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstProduct:
      return {
        ...state,
        lstProduct:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstProductAll:
      return {
        ...state,
        lstProductAll:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstNVL:
      return {
        ...state,
        lstNVL:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstCCDC:
      return {
        ...state,
        lstCCDC:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstVATRate:
      return {
        ...state,
        lstVATRate:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };

    case FETCH_lstSrvcRequest:
      return {
        ...state,
        lstSrvcRequest:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstAdvnType:
      return {
        ...state,
        lstAdvnType:
          action.payload.ConvertData !== null ? action.payload.ConvertData : [],
      };
    case FETCH_lstPymnType:
      return {
        ...state,
        lstPymnType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstDcmn_Sub:
      return {
        ...state,
        lstDcmn_Sub:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstAcObManage:
      return {
        ...state,
        lstAcObManage:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_app_DcmnList:
      return {
        ...state,
        app_DcmnList:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstDepartment:
      return {
        ...state,
        lstDepartment:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstLocation:
      return {
        ...state,
        lstLocation:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstLocationAll:
      return {
        ...state,
        lstLocationAll:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };

    case FETCH_lstDcmnType:
      return {
        ...state,
        lstDcmnType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstDcmnPbls:
      return {
        ...state,
        lstDcmnPbls:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstJob:
      return {
        ...state,
        lstJob:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstTimekeepingType:
      return {
        ...state,
        lstTimekeepingType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstDcmnSet:
      return {
        ...state,
        lstDcmnSet:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstDcmnCabn:
      return {
        ...state,
        lstDcmnCabn:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };

    case FETCH_TreeDcmnSet:
      return {
        ...state,
        treeDcmnSet:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_TreeDcmnCabn:
      return {
        ...state,
        treeDcmnCabn:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstDepartment_Employee:
      return {
        ...state,
        lstDepartment_Employee:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstDlvrMthd:
      return {
        ...state,
        lstDlvrMthd:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstDlvrType:
      return {
        ...state,
        lstDlvrType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstDlvrAddr:
      return {
        ...state,
        lstDlvrAddr:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstOrgnCode:
      return {
        ...state,
        lstOrgnCode:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstSupplier_CurrCode:
      return {
        ...state,
        lstSupplier_CurrCode:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstCustomer_CurrCode:
      return {
        ...state,
        lstCustomer_CurrCode:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_lstBankAccount:
      return {
        ...state,
        lstBankAccount:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };

    default:
      return state;
  }
};
export default lstObjcTypeReducer;
