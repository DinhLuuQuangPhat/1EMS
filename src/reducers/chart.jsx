import {
  FETCH_BaseIndc,
  FETCH_DataObjc,
  FETCH_TimeDsbr,
  FETCH_DsbrType,
  FETCH_DispIndc,
  FETCH_DispTime,
  FETCH_Top_Type,
  FETCH_Col_Ctgr,
  FETCH_ChrtType,
  FETCH_Add_Data,
  FETCH_ObjcDetail,
  FETCH_TimeCode,
  FETCH_Time,
  ///
  FETCH_SetDashboard,
  FETCH_lstDashboard,
  FETCH_DETAIL_Dashboard,
  FETCH_lstElemType,
} from "../constants/actionTypes";

const ChartReducer = (
  state = {
    lstBaseIndc: [],
    lstDataObjc: [],
    lstTimeDsbr: [],
    lstDsbrType: [],
    lstDispIndc: [],
    lstDispTime: [],
    lstTop_Type: [],
    lstCol_Ctgr: [],
    lstChrtType: [],
    lstAdd_Data: [],
    lstDetlObjc: [],
    lstTimeCode: [],
    lstTime: [],

    postResult: undefined,
    lstDashboard: [],
    DetailDashboard: [],
    lstElemType: [],
  },
  action
) => {
  switch (action.type) {
    case FETCH_BaseIndc:
      return {
        ...state,
        lstBaseIndc:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_DataObjc:
      return {
        ...state,
        lstDataObjc:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_TimeDsbr:
      return {
        ...state,
        lstTimeDsbr:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_DsbrType:
      return {
        ...state,
        lstDsbrType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_DispIndc:
      return {
        ...state,
        lstDispIndc:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_DispTime:
      return {
        ...state,
        lstDispTime:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_Top_Type:
      return {
        ...state,
        lstTop_Type:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_Col_Ctgr:
      return {
        ...state,
        lstCol_Ctgr:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_ChrtType:
      return {
        ...state,
        lstChrtType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_Add_Data:
      return {
        ...state,
        lstAdd_Data:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_ObjcDetail:
      return {
        ...state,
        lstDetlObjc:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_TimeCode:
      return {
        ...state,
        lstTimeCode:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_Time:
      return {
        ...state,
        lstTime:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_SetDashboard:
      return { ...state, postResult: undefined };
    case FETCH_lstDashboard:
      return {
        ...state,
        lstDashboard:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };
    case FETCH_DETAIL_Dashboard:
      return {
        ...state,
        DetailDashboard:
          action.payload.data.RETNDATA[0] !== null
            ? action.payload.data.RETNDATA[0]
            : [],
      };
    case FETCH_lstElemType:
      return {
        ...state,
        lstElemType:
          action.payload.data.RETNDATA !== null
            ? action.payload.data.RETNDATA
            : [],
      };

    default:
      return state;
  }
};
export default ChartReducer;
