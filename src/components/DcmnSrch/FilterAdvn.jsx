import React, { useEffect, useState, useLayoutEffect } from "react";
import { useStateContext } from "../../context/ContextProvider";
import { Button } from "@progress/kendo-react-buttons";
import { useDispatch, useSelector } from "react-redux";
import { getLstDcmnType, getLstDcmnPbls } from "../../actions/common";
import { DialogTree } from "..";
import { FieldEditInput, FieldEditMultiSelect } from "../";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";
import { xIcon } from "@progress/kendo-svg-icons";

function flattenTree(item) {
  return {
    text: item.ITEMNAME,
    expanded: true,
    items: item.ITEMS.map((subItem) => flattenTree(subItem)),
    ITEMCODE: item.ITEMCODE,
    ITEMTREE: item.ITEMTREE,
  };
}

function useWindowSize() {
  const [size, setSize] = useState(1024);
  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth > 1023) {
        setSize(1024 - 10);
      }
      if (window.innerWidth <= 1023) {
        setSize(900 - 10);
      }
      if (window.innerWidth <= 899) {
        setSize(768 - 10);
      }
      if (window.innerWidth <= 767) {
        setSize(600 - 10);
      }
      if (window.innerWidth <= 599) {
        setSize(480 - 10);
      }
      if (window.innerWidth <= 479) {
        setSize(375 - 10);
      }
      if (window.innerWidth <= 374) {
        setSize(320 - 10);
      }
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const FilterAdvn = (props) => {
  const widthResize = useWindowSize();
  const { getLabelValue } = useStateContext();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLstDcmnType());
    dispatch(getLstDcmnPbls());
  }, [dispatch]);
  const lstDcmnType = useSelector((state) => state.common.lstDcmnType);
  const lstDcmnPbls = useSelector((state) => state.common.lstDcmnPbls);
  const treeDcmnSet = useSelector((state) => state.common.treeDcmnSet);
  const [treeDcmnSetNew, setTreeDcmnSetNew] = useState();
  useEffect(() => {
    let newArray = treeDcmnSet.map((item) => flattenTree(item));
    setTreeDcmnSetNew(newArray);
  }, [treeDcmnSet]);

  const treeDcmnCabn = useSelector((state) => state.common.treeDcmnCabn);
  const lstDcmnCabn = useSelector((state) => state.common.lstDcmnCabn);
  const [treeDcmnCabnNew, setTreeDcmnCabnNew] = useState();
  useEffect(() => {
    let newArray = treeDcmnCabn.map((item) => flattenTree(item));
    setTreeDcmnCabnNew(newArray);
  }, [treeDcmnCabn]);

  const { onCancel, onSubmit, dataFilter, setDataFilter, ...other } = props;

  // Mo Dialog tim Bo ho so
  const [openSetCode, setOpenSetCode] = useState(false);
  const SetCodeDbleClickHandler = () => {
    setOpenSetCode(true);
  };
  const CancelEditSetHandler = () => {
    setOpenSetCode(false);
  };
  const SubmitEditSetHandler = (data) => {
    setOpenSetCode(false);

    if (data) {
      const { item } = data;
      const ITEMCODE = item.ITEMCODE;
      const ITEMNAME = item.text;
      const ITEMTREE = item.ITEMTREE;

      // CAB_ nghia la chon Ngan chua, Khong co CAB nghia la chon Bo ho so
      if (ITEMCODE.search("CAB_") === -1) {
        let newITEMTREE = ITEMTREE.replace(ITEMCODE, "");
        let lengthString = newITEMTREE.length;
        let newCabnCode = newITEMTREE.substring(lengthString - 10);

        const newCabnName = lstDcmnCabn.filter(
          (item) => item.ITEMCODE === newCabnCode
        );
        setDataFilter({
          ...dataFilter,
          Set_Code: ITEMCODE,
          CabnCode: newCabnCode,
          Set_Name: ITEMNAME,
          CabnName: newCabnName[0].ITEMNAME,
        });
      } else {
        setDataFilter({
          ...dataFilter,
          CabnCode: ITEMCODE,
          CabnName: ITEMNAME,
        });
      }
    }
  };

  // Mo Dialog tim Ngan tu ho so
  const [openCabinet, setOpenCabinet] = useState(false);
  const CabinClickHandler = () => {
    setOpenCabinet(true);
  };
  const CancelEditCabinHandler = () => {
    setOpenCabinet(false);
  };
  const SubmitEditCabinHandler = (data) => {
    setOpenCabinet(false);

    if (data) {
      const { item } = data;
      const ITEMCODE = item.ITEMCODE;
      const ITEMNAME = item.text;

      setDataFilter({
        ...dataFilter,
        Set_Code: "",
        CabnCode: ITEMCODE,
        CabnName: ITEMNAME,
      });
    }
  };

  // Event Handlers
  const DcTpChgeHandler = (event) => {
    var ListDcTp = [];
    if (event !== null && event.value.length > 0) {
      event.value.map((item) => ListDcTp.push(item.ITEMCODE));
    }
    setDataFilter({
      ...dataFilter,
      DcTpCode: ListDcTp.join(),
    });
  };
  const PblsChgeHandler = (event) => {
    var ListPbls = [];
    if (event !== null && event.value.length > 0) {
      event.value.map((item) => ListPbls.push(item.ITEMCODE));
    }
    setDataFilter({
      ...dataFilter,
      PblsCode: ListPbls.join(),
    });
  };
  const clearDataHandler = () => {
    setDataFilter({
      ...dataFilter,
      CntnBrif: "",
      CntnDcmn: "",
      Set_Code: "",
      CabnCode: "",
      DcTpCode: null,
      PblsCode: null,
      MainNumb: "",
      DcmnYear: "",
    });
  };

  return (
    <>
      <Dialog
        title={"Phiếu đề nghị thanh toán"}
        onClose={onCancel}
        minWidth={320}
        width={widthResize}
      >
        <div className="md:h-auto h-80 md:overflow-y-scroll">
          <div className="grid grid-rows-1 gap-0 md:grid-cols-2 md:gap-4">
            <div>
              {/* Ten Cong van */}
              <div className="mb-3 w-full">
                <FieldEditInput
                  title={getLabelValue(157, "Tên Công văn")}
                  id="CntnBrif"
                  name="CntnBrif"
                  defaultValue={dataFilter?.CntnBrif}
                  value={dataFilter?.CntnBrif}
                  onChange={(e) => {
                    // setAdvnFilter({ ...advnFilter, CntnBrif: e.value });

                    // test code
                    setDataFilter({ ...dataFilter, CntnBrif: e.value });
                  }}
                />
              </div>

              {/* Noi dung chi tiet */}
              <div className="mb-3 w-full">
                <FieldEditInput
                  title={getLabelValue(161, "Nội dung chi tiết")}
                  id="CntnDcmn"
                  name="CntnDcmn"
                  defaultValue={dataFilter?.CntnDcmn}
                  value={dataFilter?.CntnDcmn}
                  onChange={(e) => {
                    // setAdvnFilter({ ...advnFilter, CntnDcmn: e.value });

                    // test code
                    setDataFilter({ ...dataFilter, CntnDcmn: e.value });
                  }}
                />
              </div>

              {/* Ten bo tai lieu */}
              <div className="mb-3 w-full">
                <FieldEditInput
                  title={getLabelValue(165, "Tên bộ tài liệu")}
                  id="TreeViewSet"
                  name="TreeViewSet"
                  onDoubleClick={SetCodeDbleClickHandler}
                  readOnly={true}
                />
                <div className="flex">
                  <FieldEditInput
                    id="Set_Name"
                    name="Set_Name"
                    readOnly={true}
                    value={dataFilter?.Set_Name}
                  />
                  <Button
                    svgIcon={xIcon}
                    disabled={dataFilter?.CabnCode === "" ? true : false}
                    onClick={() => {
                      setDataFilter({
                        ...dataFilter,
                        Set_Code: "",
                        Set_Name: "",
                      });
                    }}
                  />
                </div>
              </div>

              {/* Loai Tai lieu trinh ky */}
              <div className="mb-3 w-full">
                <FieldEditMultiSelect
                  title={getLabelValue(162, "Loại Tài liệu trình ký")}
                  id="DcTpCode"
                  name="DcTpCode"
                  data={lstDcmnType}
                  textField={"ITEMNAME"}
                  dataItemKey={"ITEMCODE"}
                  defaultValue={
                    lstDcmnType
                      ? lstDcmnType.filter((item) =>
                          dataFilter?.DcTpCode?.split(",").includes(
                            item.ITEMCODE
                          )
                        )
                      : null
                  }
                  value={
                    lstDcmnType
                      ? lstDcmnType.filter((item) =>
                          dataFilter?.DcTpCode?.split(",").includes(
                            item.ITEMCODE
                          )
                        )
                      : null
                  }
                  onChange={DcTpChgeHandler}
                />
              </div>
            </div>

            <div>
              <div className="grid grid-rows-1 gap-0 md:grid-cols-2 md:gap-4">
                {/* So cong van */}
                <div className="mb-3 w-full">
                  <FieldEditInput
                    title={getLabelValue(158, "Số Công văn")}
                    id="MainNumb"
                    name="MainNumb"
                    defaultValue={dataFilter?.MainNumb}
                    value={dataFilter?.MainNumb}
                    onChange={(e) => {
                      // setAdvnFilter({ ...advnFilter, MainNumb: e.value });

                      // test code
                      setDataFilter({ ...dataFilter, MainNumb: e.value });
                    }}
                  />
                </div>

                {/* Nam phat hanh */}
                <div className="mb-3 w-full">
                  <FieldEditInput
                    title={getLabelValue(159, "Năm phát hành")}
                    id="DcmnYear"
                    name="DcmnYear"
                    defaultValue={dataFilter?.DcmnYear}
                    value={dataFilter?.DcmnYear}
                    onChange={(e) => {
                      // setAdvnFilter({ ...advnFilter, DcmnYear: e.value });

                      // test code
                      setDataFilter({ ...dataFilter, DcmnYear: e.value });
                    }}
                  />
                </div>
              </div>

              {/* Noi phat hanh  */}
              <div className="mb-3 w-full">
                <FieldEditMultiSelect
                  title={getLabelValue(160, "Nơi phát hành")}
                  id="PblsCode"
                  name="PblsCode"
                  data={lstDcmnPbls}
                  textField={"ITEMNAME"}
                  dataItemKey={"ITEMCODE"}
                  defaultValue={
                    lstDcmnPbls
                      ? lstDcmnPbls.filter((item) =>
                          dataFilter?.PblsCode?.split(",").includes(
                            item.ITEMCODE
                          )
                        )
                      : null
                  }
                  value={
                    lstDcmnPbls
                      ? lstDcmnPbls.filter((item) =>
                          dataFilter?.PblsCode?.split(",").includes(
                            item.ITEMCODE
                          )
                        )
                      : null
                  }
                  onChange={PblsChgeHandler}
                />
              </div>

              {/* Ngan tu chua tai lieu */}
              <div className="mb-3 w-full">
                <FieldEditInput
                  title={getLabelValue(166, "Ngăn tủ chứa tài liệu")}
                  id="TreeCabn"
                  name="TreeCabn"
                  onDoubleClick={CabinClickHandler}
                  readOnly={true}
                />
                <div className="flex">
                  <FieldEditInput
                    id="CabnName"
                    name="CabnName"
                    readOnly={true}
                    value={dataFilter?.CabnName}
                  />
                  <Button
                    svgIcon={xIcon}
                    disabled={dataFilter?.CabnCode === "" ? true : false}
                    onClick={() => {
                      setDataFilter({
                        ...dataFilter,
                        CabnCode: "",
                        CabnName: "",
                        Set_Code: "",
                        Set_Name: "",
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogActionsBar layout="center">
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            onClick={onSubmit}
          >
            {getLabelValue(154, "Tìm kiếm")}
          </button>
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            onClick={clearDataHandler}
          >
            {getLabelValue(164, "Nhập lại/ Chọn lại")}
          </button>
          <button
            className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
            onClick={onCancel}
          >
            {getLabelValue(77, "Hủy")}
          </button>
        </DialogActionsBar>
      </Dialog>

      {/* TreeView Bo tai lieu */}
      {openSetCode && (
        <DialogTree
          data={treeDcmnSetNew}
          onCanCel={CancelEditSetHandler}
          onSubmit={SubmitEditSetHandler}
          TitleDialog={"Chọn Bộ hồ sơ"}
        />
      )}

      {/* TreeView Tu/Ngan tai lieu */}
      {openCabinet && (
        <DialogTree
          data={treeDcmnCabnNew}
          onCanCel={CancelEditCabinHandler}
          onSubmit={SubmitEditCabinHandler}
          TitleDialog={"Chọn Tủ hồ sơ"}
        />
      )}
    </>
  );
};

export default FilterAdvn;
