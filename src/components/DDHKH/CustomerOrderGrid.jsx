import { Grid, GridColumn } from "@progress/kendo-react-grid";
import React, { useEffect } from "react";
import { useStateContext } from "../../context/ContextProvider";

import { TextArea } from "@progress/kendo-react-inputs";
import { useSelector } from "react-redux";
import {
  CellButton,
  cellQtty,
  cellQUOM,
  cellSortSale,
  cellOrgnCode,
  cellPrdcCode,
} from "../../components";

const CustomerOrderGrid = ({ items, itemChanged, enterRemove }) => {
  const { getLabelValue } = useStateContext();

  const lstProvince = useSelector((state) => state.common.lstProvince);
  const lstProduct = useSelector((state) => state.common.lstProduct);
  const cellNoteText = (props) => {
    const { dataItem, field } = props;
    return (
      <td>
        <TextArea></TextArea>
      </td>
    );
  };

  const cellPRDCNAME = (props) => {
    const { dataItem, field } = props;
    return <td>{dataItem[field]}</td>;
  };

  const cellAction = (props) => {
    return <CellButton {...props} enterRemove={enterRemove}></CellButton>;
  };

  const footerCellNumber = (props) => {
    const field = props.field || "";
    const totalQtty = items?.reduce((acc, current) => acc + current[field], 0);
    return (
      <td className="numberic-right">
        {new Intl.NumberFormat().format(totalQtty).replaceAll(".", ",")}
      </td>
    );
  };

  useEffect(() => {}, [items?.length]);
  return (
    <Grid data={items} onItemChange={itemChanged}>
      <GridColumn
        title={getLabelValue(null, "Mã sản phẩm")}
        field="PRDCCODE"
        width={"200"}
        cell={cellPrdcCode}
      />
      <GridColumn
        title={getLabelValue(null, "Tên sản phẩm")}
        field="PRDCNAME"
        width={"200"}
        cell={cellPRDCNAME}
      />
      <GridColumn
        title={getLabelValue(null, "Nguồn sản phẩm")}
        field="ORGNCODE"
        width={"200"}
        cell={cellOrgnCode}
      />
      <GridColumn
        title={getLabelValue(null, "Phân loại sản phẩm")}
        field="SORTCODE"
        width={"200"}
        cell={cellSortSale}
      />
      <GridColumn
        title={getLabelValue(null, "Đơn vị tính")}
        field="QUOMCODE"
        width={"150"}
        cell={cellQUOM}
      />
      <GridColumn
        title={getLabelValue(64, "Số lượng")}
        field="QUOMQTTY"
        width={"150"}
        format="{0:n}"
        cell={cellQtty}
        footerCell={footerCellNumber}
      />
      <GridColumn
        title={getLabelValue(66, "Đơn giá")}
        field="CRSLPRCE"
        width={"150"}
        cell={cellQtty}
        footerCell={footerCellNumber}
      />
      <GridColumn
        title={getLabelValue(67, "Chiết khấu")}
        field="DISCRATE"
        width={"150"}
        cell={cellQtty}
      />
      <GridColumn
        title={getLabelValue(null, "Tiền giảm CK")}
        field="DCPRCRAM"
        width={"150"}
        format="{0:n}"
        footerCell={footerCellNumber}
      />

      <GridColumn
        title={getLabelValue(null, "Giá sau CK")}
        field="PRCECRAM"
        width={"150"}
        format="{0:n}"
        footerCell={footerCellNumber}
      />
      <GridColumn
        title={getLabelValue(69, "Thành tiền")}
        field="MNEYCRAM"
        width={"150"}
        format="{0:n}"
        footerCell={footerCellNumber}
      />
      <GridColumn
        title={getLabelValue(null, "Tiền CK(VNĐ)")}
        field="DCPRAMNT"
        width={"150"}
        format="{0:n}"
        footerCell={footerCellNumber}
      />

      <GridColumn
        title={getLabelValue(null, "Chi chú")}
        field="NOTETEXT_DT"
        width={"150"}
        cell={cellNoteText}
      />
      <GridColumn
        title={getLabelValue(null, "Chức năng")}
        field=""
        width={"150"}
        cell={cellAction}
      />
    </Grid>
  );
};

export default CustomerOrderGrid;
