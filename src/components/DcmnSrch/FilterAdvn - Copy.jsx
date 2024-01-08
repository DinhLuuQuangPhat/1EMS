import React, { useEffect, useState } from "react";

import { useStateContext } from "../../context/ContextProvider";

import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { Input, MaskedTextBox } from "@progress/kendo-react-inputs";
import { MultiSelect, DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";
import { Label } from "@progress/kendo-react-labels";

import { useDispatch, useSelector } from "react-redux";
import { getLstDcmnType, getLstDcmnPbls } from "../../actions/common";
import { DialogTree } from "..";

import { FileItem } from "..";

function flattenTree(item) {
  return {
    text: item.ITEMNAME,
    expanded: true,
    items: item.ITEMS.map((subItem) => flattenTree(subItem)),
    ITEMCODE: item.ITEMCODE,
    ITEMTREE: item.ITEMTREE,
  };
}

const FilterAdvn = (props) => {
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

  const { onCancel, onSubmit, ...other } = props;

  const InputField = (fieldRenderProps) => {
    const {
      validationMessage,
      visited,
      label,
      id,
      valid,
      className,
      value,
      ...others
    } = fieldRenderProps;

    return (
      <div>
        <Label editorId={id} className="k-form-label">
          {label}
        </Label>
        <div className="k-form-field-wrap">
          <Input {...others} value={value} />
        </div>
      </div>
    );
  };
  const MaskTextField = (fieldRenderProps) => {
    const {
      validationMessage,
      visited,
      label,
      id,
      valid,
      className,
      value,
      ...others
    } = fieldRenderProps;

    return (
      <div>
        <Label editorId={id} className="k-form-label">
          {label}
        </Label>
        <div className="k-form-field-wrap">
          <MaskedTextBox {...others} value={value} mask="0000" />
        </div>
      </div>
    );
  };
  const InputDoubleClickField = (fieldRenderProps) => {
    const {
      validationMessage,
      visited,
      label,
      id,
      valid,
      className,
      onDoubleClick,
      value,
      ...others
    } = fieldRenderProps;

    return (
      <div>
        <Label editorId={id} className="k-form-label">
          {label}
        </Label>
        <div className="k-form-field-wrap">
          {/* <input
            {...others}
            type="text"
            onDoubleClick={onDoubleClick}
            className="k-input k-input-md k-rounded-md k-input-solid"
            value={value}
          /> */}
          <Input onDoubleClick={onDoubleClick} {...others} />
        </div>
      </div>
    );
  };
  const MultiSelectField = (fieldRenderProps) => {
    const {
      validationMessage,
      visited,
      label,
      id,
      valid,
      data,
      textField,
      dataItemKey,
      ...others
    } = fieldRenderProps;

    const [dataMultiSelect, setDataMultiSelect] = useState(data.slice());
    const MultiFilter = (event) => {
      setDataMultiSelect(filterBy(data.slice(), event.filter));
    };

    return (
      <div>
        <Label editorId={id} className="k-form-label">
          {label}
        </Label>
        <div className="k-form-field-wrap">
          <MultiSelect
            {...others}
            autoClose={false}
            data={dataMultiSelect}
            textField={textField}
            dataItemKey={dataItemKey}
            filterable={true}
            onFilterChange={MultiFilter}
            size="small"
          />
        </div>
      </div>
    );
  };
  const DropdownField = (fieldRenderProps) => {
    const {
      validationMessage,
      visited,
      label,
      id,
      valid,
      data,
      textField,
      dataItemKey,
      ...others
    } = fieldRenderProps;

    return (
      <div>
        <Label editorId={id} className="k-form-label">
          {label}
        </Label>
        <div className="k-form-field-wrap">
          <DropDownList
            {...others}
            data={data}
            textField={textField}
            dataItemKey={dataItemKey}
            size="small"
          />
        </div>
      </div>
    );
  };

  const [vlueSetCode, setVlueSetCode] = useState();
  const [vlueSetName, setVlueSetName] = useState();
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

      if (ITEMCODE.search("CAB_") === -1) {
        setVlueSetName(ITEMNAME);
        setVlueSetCode(ITEMCODE);

        let newITEMTREE = ITEMTREE.replace(ITEMCODE, "");
        let lengthString = newITEMTREE.length;
        let newCabnCode = newITEMTREE.substring(lengthString - 10);
        setVlueCabnCode(newCabnCode);

        const newCabnName = lstDcmnCabn.filter(
          (item) => item.ITEMCODE === newCabnCode
        );
        setVlueCabnName(newCabnName[0].ITEMNAME);
      } else {
        setVlueCabnName(ITEMNAME);
        setVlueCabnCode(ITEMCODE);
        setVlueSetCode("");
        setVlueSetName("");
      }
    }
  };

  const [vlueCabnCode, setVlueCabnCode] = useState();
  const [vlueCabnName, setVlueCabnName] = useState();
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

      setVlueSetName("");
      setVlueSetCode("");
      setVlueCabnCode(ITEMCODE);
      setVlueCabnName(ITEMNAME);
    }
  };

  return (
    <>
      <div className="poup-bg"></div>
      <div className="advnfltr-content absolute left-2 file:top-8 bg-white w-[56.25rem] max-w-[225rem] z-[999] max-h-[90vh] h-96 overflow-y-auto border rounded border-gray-400 shadow p-3">
        <Form
          onSubmit={onSubmit}
          render={(formRenderProps) => (
            <FormElement>
              <div className="filter-wrapper">
                <div className="flex flex-row flex-wrap gap-x-8 gap-y-1">
                  {/* Ten Cong Van */}
                  <div className="basis-[45%] shrink-0 grow-0">
                    <FieldWrapper>
                      <Field
                        id={"CntnBrif"}
                        name={"CntnBrif"} // Bat buoc phai co khi Submit se tra trong Object theo ten cua name
                        component={InputField}
                        label={getLabelValue(157, "Tên Công văn")}
                      />
                    </FieldWrapper>
                  </div>

                  <div className="basis-[45%] shrink-0 grow-0">
                    <div className="flex flex-row gap-5">
                      {/* So Cong Van */}
                      <div className="basis-[45%] shrink-0 grow-0">
                        <FieldWrapper>
                          <Field
                            id={"MainNumb"}
                            name={"MainNumb"} // Bat buoc phai co khi Submit se tra trong Object theo ten cua name
                            component={InputField}
                            label={getLabelValue(158, "Số Công văn")}
                          />
                        </FieldWrapper>
                      </div>
                      {/* Nam phat hanh */}
                      <div className="basis-1/2 shrink-0 grow-0">
                        <FieldWrapper>
                          <Field
                            id={"DcmnYear"}
                            name={"DcmnYear"} // Bat buoc phai co khi Submit se tra trong Object theo ten cua name
                            component={MaskTextField}
                            label={getLabelValue(159, "Năm phát hành")}
                          />
                        </FieldWrapper>
                      </div>
                    </div>
                  </div>

                  {/* Noi dung chi tiet */}
                  <div className="basis-[45%] shrink-0 grow-0">
                    <FieldWrapper>
                      <Field
                        id={"CntnDcmn"}
                        name={"CntnDcmn"} // Bat buoc phai co khi Submit se tra trong Object theo ten cua name
                        component={InputField}
                        label={getLabelValue(161, "Nội dung chi tiết")}
                      />
                    </FieldWrapper>
                  </div>

                  {/* Noi phat hanh */}
                  <div className="basis-[45%] shrink-0 grow-0">
                    <FieldWrapper>
                      <Field
                        id={"PblsCode"}
                        name={"PblsCode"} // Bat buoc phai co khi Submit se tra trong Object theo ten cua name
                        component={MultiSelectField}
                        label={getLabelValue(160, "Nơi phát hành")}
                        data={lstDcmnPbls}
                        textField={"ITEMNAME"}
                        dataItemKey={"ITEMCODE"}
                      />
                    </FieldWrapper>
                  </div>

                  {/* Tên bộ tài liệu */}
                  <div className="basis-[45%] shrink-0 grow-0">
                    <FieldWrapper>
                      <Field
                        id={"TreeViewSet"}
                        name={"TreeViewSet"} // Bat buoc phai co khi Submit se tra trong Object theo ten cua name
                        component={InputDoubleClickField}
                        label={getLabelValue(165, "Tên bộ tài liệu")}
                        onDoubleClick={SetCodeDbleClickHandler}
                      />
                      <input
                        name={"Set_Name"}
                        type="text"
                        className="k-input k-input-md k-rounded-md k-input-solid"
                        value={vlueSetName}
                        readonly
                      />
                      <input
                        name={"Set_Code"}
                        type="text"
                        className="hidden"
                        value={vlueSetCode}
                        readonly
                      />
                    </FieldWrapper>
                  </div>

                  {/* Ngăn tủ chứa tài liệu */}
                  <div className="basis-[45%] shrink-0 grow-0">
                    <FieldWrapper>
                      <Field
                        id={"TreeCabn"}
                        name={"TreeCabn"} // Bat buoc phai co khi Submit se tra trong Object theo ten cua name
                        component={InputDoubleClickField}
                        label={getLabelValue(166, "Ngăn tủ chứa tài liệu")}
                        onDoubleClick={CabinClickHandler}
                      />
                      <input
                        name={"CabnName"}
                        type="text"
                        className="k-input k-input-md k-rounded-md k-input-solid"
                        value={vlueCabnName}
                        readonly
                      />
                      <input
                        name={"CabnCode"}
                        type="text"
                        className="hidden"
                        value={vlueCabnCode}
                        readonly
                      />
                    </FieldWrapper>
                  </div>

                  {/* Loai tai lieu trinh ky */}
                  <div className="basis-[45%] shrink-0 grow-0">
                    <FieldWrapper>
                      <Field
                        id={"DcTpCode"}
                        name={"DcTpCode"} // Bat buoc phai co khi Submit se tra trong Object theo ten cua name
                        component={MultiSelectField}
                        label={getLabelValue(162, "Loại Tài liệu trình ký")}
                        data={lstDcmnType}
                        textField={"ITEMNAME"}
                        dataItemKey={"ITEMCODE"}
                      />
                    </FieldWrapper>
                  </div>

                  {/* Phân loại công văn / Noi dung chinh */}
                  <div className="basis-[45%] shrink-0 grow-0">
                    <FieldWrapper>
                      <Field
                        id={"CntnCode"}
                        name={"CntnCode"} // Bat buoc phai co khi Submit se tra trong Object theo ten cua name
                        component={DropdownField}
                        label={getLabelValue(163, "Phân loại công văn")}
                        data={lstDcmnType}
                        textField={"ITEMNAME"}
                        dataItemKey={"ITEMCODE"}
                      />
                    </FieldWrapper>
                  </div>
                </div>
              </div>

              {/* Nut chuc nang */}
              <div className="k-form-buttons">
                <Button
                  className="m-1 uppercase"
                  type={"submit"}
                  themeColor={"primary"}
                  icon="save"
                  svgIcon={saveIcon}
                >
                  {getLabelValue(78, "Lưu")}
                </Button>

                <Button onClick={formRenderProps.onFormReset}>
                  {getLabelValue(164, "Nhập lại/ Chọn lại")}
                </Button>

                <Button
                  className="m-1 uppercase"
                  onClick={onCancel}
                  icon="cancel"
                  svgIcon={cancelIcon}
                >
                  {getLabelValue(77, "Hủy")}
                </Button>
              </div>
            </FormElement>
          )}
          {...other}
        />

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
      </div>
    </>
  );
};

export default FilterAdvn;
