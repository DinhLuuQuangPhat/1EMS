import React, { useEffect } from "react";

import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { useStateContext } from "../../context/ContextProvider";

import {
  cellViewDate,
  CellButton,
  cellViewMask,
  cellNumberic,
  cellViewBusnCd,
  cellViewSpndCd,
  cellViewCostTp,
  cellViewCostCd,
} from "../../components";

const SpendSuggestEditGrid = ({
  items,
  onRemoveItem,
  onEditItem,
  permissions,
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

  const FooterTotalMneyCram = (props) => {
    const field = props.field || "";
    const totalQtty = items.reduce((acc, current) => acc + current[field], 0);
    return (
      <td className='numberic-right'>
        {new Intl.NumberFormat().format(totalQtty)}
      </td>
    );
  };

  return (
    <Grid data={items} dataItemKey={"KKKK0001"}>
      <GridColumn
        field='BUSNCODE'
        title={getLabelValue(224, "Stt")}
        width='100'
        cell={cellViewMask}
      />
      <GridColumn
        field='RFRNDCMN'
        title={getLabelValue(223, "Nghiệp vụ liên quan")}
        width='250'
        cell={cellViewBusnCd}
      />
      <GridColumn
        field='SPNDCODE'
        title={getLabelValue(222, "Mã chi phí")}
        width='250'
        cell={cellViewSpndCd}
      />
      <GridColumn
        field='RFRNCODE'
        title={getLabelValue(221, "Số CT/ Hóa đơn")}
        width='130'
      />
      <GridColumn
        field='RFRNDATE'
        title={getLabelValue(220, "Ngày CT/Hóa đơn")}
        width='130'
        cell={cellViewDate}
      />
      <GridColumn
        field='MNEYCRAM'
        title={getLabelValue(174, "Số tiền")}
        width='150'
        cell={cellNumberic}
        footerCell={FooterTotalMneyCram}
      />
      <GridColumn
        field='MEXLNNTE_D'
        title={getLabelValue(219, "Nội dung thanh toán")}
        width='500'
      />
      <GridColumn
        field='COSTTYPE'
        title={getLabelValue(225, "Đối tượng chi phí 1")}
        width='150'
        cell={cellViewCostTp}
      />
      <GridColumn
        field='COSTCODE'
        title={getLabelValue(226, "Tên đối tượng chi phí 1")}
        width='300'
        cell={cellViewCostCd}
      />
      {permissions && (
        <GridColumn
          cell={MyEditCommandCell}
          title={getLabelValue(70, "Chức năng")}
          width='100'
        />
      )}
    </Grid>
  );
};

export default SpendSuggestEditGrid;
