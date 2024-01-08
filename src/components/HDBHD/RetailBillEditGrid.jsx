import React from "react";

import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { useStateContext } from "../../context/ContextProvider";

import {
  cellPrdcName,
  cellQUOM,
  cellSortSale,
  CellButton,
  cellQtty,
} from "../../components";

const RetailBillEditGrid = ({
  items,
  onRemoveItem,
  onEditItem,
  onItemChge,
}) => {
  const { getLabelValue } = useStateContext();

  const enterEdit = (item) => {
    onEditItem(item);
  };
  const enterRemove = (item) => {
    onRemoveItem(item);
  };
  const MyEditCommandCell = (props) => (
    <CellButton {...props} enterEdit={enterEdit} enterRemove={enterRemove} />
  );

  const FooterTotalQtty = (props) => {
    const field = props.field || "";
    const totalQtty = items.reduce((acc, current) => acc + current[field], 0);
    return (
      <td className='numberic-right'>
        {new Intl.NumberFormat().format(totalQtty).replaceAll(".", ",")}
      </td>
    );
  };

  const FooterTotalDcPr = (props) => {
    const field = props.field || "";
    const totalDcPr = items.reduce((acc, current) => acc + current[field], 0);
    return (
      <td className='numberic-right'>
        {new Intl.NumberFormat().format(totalDcPr).replaceAll(".", ",")}
      </td>
    );
  };

  const FooterTotalMney = (props) => {
    const field = props.field || "";
    const totalMney = items.reduce((acc, current) => acc + current[field], 0);
    return (
      <td className='numberic-right'>
        {new Intl.NumberFormat().format(totalMney).replaceAll(".", ",")}
      </td>
    );
  };

  const ItemChgeHandler = (item) => {
    onItemChge(item);
  };

  return (
    <Grid data={items} onItemChange={ItemChgeHandler} dataItemKey={"KKKK0001"}>
      <GridColumn
        field='PRDCCODE'
        title={getLabelValue(131, "Mã sản phẩm")}
        width='130'
      />
      <GridColumn
        field='PRDCNAME'
        title={getLabelValue(132, "Tên sản phẩm")}
        width='400'
        cell={cellPrdcName}
      />
      <GridColumn
        field='SORTCODE'
        title={getLabelValue(133, "Thuộc tính")}
        width='400'
        cell={cellSortSale}
      />
      <GridColumn
        field='QUOMCODE'
        title={getLabelValue(65, "ĐVT")}
        width='150'
        cell={cellQUOM}
      />
      <GridColumn
        field='PRDCQTTY'
        title={getLabelValue(64, "Số lượng")}
        width='130'
        format='{0:n}'
        cell={cellQtty}
        footerCell={FooterTotalQtty}
      />
      <GridColumn
        field='PRDCCRPR'
        title={getLabelValue(66, "Đơn giá")}
        format='{0:n}'
        width='100'
      />
      <GridColumn
        field='DISCRATE'
        title={getLabelValue(67, "Chiết khấu")}
        width='130'
        cell={cellQtty}
      />
      <GridColumn
        field='DCPRCRAM'
        title={getLabelValue(68, "Tiền chiết khấu")}
        width='150'
        format='{0:n}'
        cell={cellQtty}
        footerCell={FooterTotalDcPr}
      />
      <GridColumn
        field='MNEYCRAM'
        title={getLabelValue(69, "Thành tiền")}
        width='180'
        format='{0:n}'
        cell={cellQtty}
        footerCell={FooterTotalMney}
      />
      <GridColumn
        cell={MyEditCommandCell}
        title={getLabelValue(70, "Chức năng")}
        width='100'
      />
    </Grid>
  );
};

export default RetailBillEditGrid;
