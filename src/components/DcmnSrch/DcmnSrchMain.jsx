import React, { useEffect, useState } from "react";
import FilterSmpl from "./FilterSmpl";
import moment from "moment";
import { getListDcmnCntn } from "../../actions/document";
import {
  getTreeDcmnSet,
  getTreeDcmnCabn,
  getLstDcmnCabn,
} from "../../actions/common";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { Grid, GridColumn, GridNoRecords } from "@progress/kendo-react-grid";

const DcmnSrchMain = () => {
  const dispatch = useDispatch();
  const lstDcmnCntn = useSelector((state) => state.document.lstDcmnCntn);
  const [listDcmnCntn, setListDcmnCntn] = useState();
  useEffect(() => {
    if (lstDcmnCntn && lstDcmnCntn.length > 0) {
      setListDcmnCntn(lstDcmnCntn);
    }
    if (lstDcmnCntn && lstDcmnCntn.length == 0) {
      setListDcmnCntn([]);
    }
  }, [lstDcmnCntn]);

  const initFilter = {
    CompCode: JSON.parse(localStorage.getItem("company")).COMPCODE,
    PrcsType: "2",
    LctnList: "",
    MainNumb: "",
    DcTpCode: "",
    CntnCode: "%",
    CntnBrif: "",
    CntnDcmn: "",
    Set_Code: "",
    Set_Name: "",
    CabnCode: "",
    CabnName: "",
    StorCabn: "",
    Beg_Date: moment(new Date()).format("YYYY-MM-DD"),
    End_Date: moment(new Date()).format("YYYY-MM-DD"),
    ChckTime: 0,
    All_Dcmn: 0,
    DcmnYear: "",
    PblsCode: "",
  };

  const { getLabelValue } = useStateContext();
  const Title = getLabelValue(156, "Tìm kiếm công văn tài liệu");

  const [dataFilter, setDataFilter] = useState(initFilter);

  useEffect(() => {
    dispatch(getListDcmnCntn(dataFilter));
    dispatch(getTreeDcmnSet());
    dispatch(getTreeDcmnCabn());
    dispatch(getLstDcmnCabn());
  }, [dispatch]);

  return (
    <div className="dcmn-srch">
      <h4 className="font-semibold text-xl pt-2 mb-2">{Title}</h4>
      <FilterSmpl dataFilter={dataFilter} setDataFilter={setDataFilter} />
      <Grid
        style={{
          height: "700px",
        }}
        data={listDcmnCntn}
      >
        <GridNoRecords>{getLabelValue(71, "Không có dữ liệu")}</GridNoRecords>
        <GridColumn
          field="DcTpName"
          title={getLabelValue(162, "Loại Tài liệu trình ký")}
          width="180px"
        />
        <GridColumn
          field="MainNumb"
          title={getLabelValue(158, "Số Công văn")}
          width="130px"
        />
        <GridColumn
          field="CntnDcmn"
          title={getLabelValue(161, "Nội dung chi tiết")}
          width="200px"
        />
        <GridColumn
          field="MPblsNme"
          title={getLabelValue(160, "Nơi phát hành")}
          width="200px"
        />
        <GridColumn
          field="LctnName"
          title={getLabelValue(173, "Chi nhánh")}
          width="200px"
        />
        <GridColumn
          field="CntnBrif"
          title={getLabelValue(157, "Tên Công văn")}
          width="180px"
        />
        <GridColumn
          field="Set_Name"
          title={getLabelValue(165, "Tên bộ tài liệu")}
          width="150px"
        />
        <GridColumn
          field="CabnName"
          title={getLabelValue(166, "Ngăn tủ chứa tài liệu")}
          width="180px"
        />
        <GridColumn field="CntnName" title="CntnName" width="200px" />
      </Grid>
    </div>
  );
};

export default DcmnSrchMain;
