import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { Dialog } from "@progress/kendo-react-dialogs";
import {
  Form,
  Field,
  FormElement,
  FieldWrapper,
} from "@progress/kendo-react-form";
import { MultiSelect, ComboBox } from "@progress/kendo-react-dropdowns";
import { filterBy } from "@progress/kendo-data-query";
import { Error, Label } from "@progress/kendo-react-labels";
import { Button } from "@progress/kendo-react-buttons";
import { cancelIcon, saveIcon } from "@progress/kendo-svg-icons";

const EditForm = (props) => {
  const lstProductAll = useSelector((state) => state.common.lstProductAll);

  const { cancelEdit, onSubmit, item, ...other } = props;
  const { getLabelValue } = useStateContext();

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
          />
        </div>
      </div>
    );
  };
  const ComboboxField = (fieldRenderProps) => {
    const {
      validationMessage,
      visited,
      label,
      id,
      valid,
      data,
      textField,
      dataItemKey,
      value,
      defaultValue,
      ...others
    } = fieldRenderProps;

    const [dataComboSelect, setDataComboSelect] = useState(data.slice());
    const ComboboxFilter = (event) => {
      setDataComboSelect(filterBy(data.slice(), event.filter));
    };

    return (
      <div>
        <Label editorId={id} className="k-form-label">
          {label}
        </Label>
        <div className="k-form-field-wrap">
          <ComboBox
            {...others}
            autoClose={false}
            data={dataComboSelect}
            textField={textField}
            dataItemKey={dataItemKey}
            value={value}
            defaultValue={defaultValue}
            filterable={true}
            onFilterChange={ComboboxFilter}
          />
        </div>
      </div>
    );
  };

  return (
    <Form
      initialValues={item}
      onSubmit={onSubmit}
      render={(renderProps) => (
        <Dialog
          title={getLabelValue(74, "Thêm sản phẩm")}
          onClose={cancelEdit}
          width="800px"
          minWidth="800px"
        >
          <FormElement>
            <FieldWrapper>
              {item.KKKK0001 === "" && (
                <Field
                  id={"PRDCCODE"}
                  name={"PRDCCODE"} // Bat buoc phai co khi Submit se tra trong Object theo ten cua name
                  component={MultiSelectField}
                  label={getLabelValue(75, "Chọn sản phẩm")}
                  data={lstProductAll}
                  textField={"ITEMSRCH"}
                  dataItemKey={"ITEMCODE"}
                />
              )}
              {item.KKKK0001 !== "" && (
                <Field
                  id={"PRDCCODE"}
                  name={"PRDCCODE"}
                  component={ComboboxField}
                  label={getLabelValue(75, "Chọn sản phẩm")}
                  data={lstProductAll}
                  textField={"ITEMNAME"}
                  dataItemKey={"ITEMCODE"}
                  defaultValue={
                    item
                      ? lstProductAll.find((i) => i.ITEMCODE === item.PRDCCODE)
                      : {}
                  }
                />
              )}
            </FieldWrapper>
          </FormElement>

          <div className="flex items-center justify-end">
            <Button
              className="m-1 uppercase"
              type={"submit"}
              themeColor={"primary"}
              disabled={!renderProps.allowSubmit}
              onClick={renderProps.onSubmit}
              icon="save"
              svgIcon={saveIcon}
            >
              {getLabelValue(78, "Lưu")}
            </Button>
            <Button
              className="m-1 uppercase"
              onClick={cancelEdit}
              icon="cancel"
              svgIcon={cancelIcon}
            >
              {getLabelValue(77, "Hủy")}
            </Button>
          </div>
        </Dialog>
      )}
      {...other}
    />
  );
};

export default EditForm;
