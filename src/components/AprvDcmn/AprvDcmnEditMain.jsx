import React, { useState, useEffect } from "react";
import {
  AiOutlineFilePdf,
  AiOutlineFileExcel,
  AiOutlineFileWord,
  AiOutlineFileImage,
  AiOutlineFileText,
} from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";
import { FileItem, FieldEditNumberic } from "../../components";
import { v4 } from "uuid";
import { Label } from "@progress/kendo-react-labels";
import { MaskedTextBox, TextArea } from "@progress/kendo-react-inputs";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Button } from "@progress/kendo-react-buttons";
import AprvDcmnProcessGrid from "./AprvDcmnProcessGrid";
import AprvDcmnProcedureGrid from "./AprvDcmnProcedureGrid";
import ApproveDcmn from "./ApproveDcmn";
import { ApproveDocument } from "../../actions/document";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { getLstAprvDcmn, resetAPRVDCMN } from "../../actions/document";
import { FcLeft } from "react-icons/fc";

const getFileIcon = (fileType) => {
  switch (fileType) {
    case "pdf": {
      return <AiOutlineFilePdf />;
    }
    case "xls": {
      return <AiOutlineFileExcel />;
    }
    case "xlsx": {
      return <AiOutlineFileExcel />;
    }
    case "doc": {
      return <AiOutlineFileWord />;
    }
    case "docx": {
      return <AiOutlineFileWord />;
    }
    case "png": {
      return <AiFillFileImage />;
    }
    case "jpg": {
      return <AiOutlineFileImage />;
    }
    case "jpeg": {
      return <AiOutlineFileImage />;
    }
    default: {
      return <AiOutlineFileText />;
    }
  }
};

const AprvDcmnEditMain = () => {
  const [tabSelected, setTabSelected] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { getLabelValue, appColors, setNotificationsAutoClose, userData } =
    useStateContext();
  const PageInfo = {
    DcmnCode: "dmsDcmnVchr",
    UrlLink: "/advn-invc/",
  };

  const lstLocation = useSelector((state) => state.common.lstLocation);

  const approvalProcess = useSelector(
    (state) => state.document.approvalProcess
  ); // qua trinh xet duyet
  const reviewProcess = useSelector((state) => state.document.reviewProcess); // quy trinh xet duyet

  const HeaderInit = {
    LCTNCODE: "",
    DCMNCODE: "",
    DCMNNAME: "",
    MAINDATE: new Date(),
    MAINCODE: "",
    LABLNAME: "",
    CURRVLUE: 0,
    DPSGNAME: "",
    EMSGNAME: "",
    SCTNNAME: "",
    UOM_NAME: "",
    DETAIL: [],
    DCMNFILE: [],
  };
  const [chiTietCT, setChiTietCT] = useState(HeaderInit);
  const [files, setFiles] = useState([]);
  useEffect(() => {
    if (reviewProcess.data[0]) {
      var fileList = reviewProcess.data[0].DCMNFILE;
      if (fileList && fileList.length > 0) {
        setFiles([]);
        fileList.map((file) => {
          if (file.FILENAME) {
            const icon = getFileIcon(file.FILETYPE);
            setFiles((dcmnFiles) => [
              ...dcmnFiles,
              {
                id: v4(),
                FILENAME: file.FILENAME,
                FILEPATH: file.FILE_URL,
                FILETYPE: file.FILETYPE,
                ICON: icon,
                DATA: null,
                FILECODE: file.FILECODE,
                DCMNCODE: file.DCMNCODE,
                KEY_CODE: file.KEY_CODE,
              },
            ]);
          }
        });
      }

      setChiTietCT(reviewProcess.data[0]);
    }
  }, [reviewProcess]);

  const [openApprove, setOpenApprove] = useState(false);
  const ApproveDcmnHandler = () => {
    setOpenApprove(true);
  };

  const SubmitAprvHandler = (event) => {
    setOpenApprove(false);
    let new_body = {
      LCTNCODE: event.LCTNCODE,
      DCMNCODE: event.DCMNCODE,
      KEY_CODE: event.KEY_CODE,
      PRCSEMPL: event.PRCSEMPL,
      PRCSCODE: event.PRCSCODE,
      NOTETEXT: event.NOTETEXT,
      ADD_EMPL: event.ADD_EMPL,
      // DPTMCODE: event.DPTMCODE,
    };

    console.log(new_body);

    dispatch(ApproveDocument(new_body));
  };
  const CancelAprvHandler = () => {
    setOpenApprove(false);
  };
  const postResult = useSelector((state) => state.document.postResult);
  useEffect(() => {
    if (postResult) {
      alert(postResult.RETNMSSG); // Hien thong bao Khi nhan nut Luu
      dispatch(resetAPRVDCMN());

      const body = {
        DCMNCODE: PageInfo.DcmnCode,
        BEG_DATE: moment("1990-01-01").format("YYYY-MM-DD"),
        END_DATE: moment("1990-01-01").format("YYYY-MM-DD"),
        PARA_001: userData.EMPLCODE,
        PARA_002: "%",
      };
      dispatch(getLstAprvDcmn(body));

      navigate("/aprv-dcmn");
    }
  }, [postResult]);

  return (
    <>
      <div id={PageInfo.DcmnCode} className="p-2 content-header-detail">
        <div className="flex mb-3">
          <button
            className="text-base mr-2"
            onClick={() => navigate(PageInfo.UrlLink)}
          >
            <FcLeft />
          </button>
          <span className="text-base">Về trang danh sách chờ duyệt</span>
        </div>

        <div className="w-full">
          {/* Header */}
          <div className="w-full">
            <div className="header-wrapper">
              <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                {/* Chi nhanh */}
                <div className="w-full">
                  <div>
                    <Label className="text-sm text-gray-500">
                      {getLabelValue(173, "Chi nhánh")}
                    </Label>
                    <DropDownList
                      id="LCTNCODE"
                      name="LCTNCODE"
                      style={{ borderColor: "grey" }}
                      value={
                        chiTietCT?.LCTNCODE
                          ? lstLocation.find(
                              (item) => item.ITEMCODE === chiTietCT.LCTNCODE
                            )
                          : {}
                      }
                      textField="ITEMNAME"
                      dataItemKey="ITEMCODE"
                      data={lstLocation}
                      className={appColors.inputColor}
                      size="small"
                      disabled={true}
                    />
                  </div>
                </div>

                {/* So chung tu & Ngay chung tu */}
                <div className="w-full">
                  <div className="flex justify-between mb-3">
                    {/* Số chứng từ */}

                    <div className="mr-1 lg:w-3/6 w-full">
                      <Label className="text-sm text-gray-500">
                        {getLabelValue(117, "Số chứng từ")}
                      </Label>
                      <MaskedTextBox
                        id="MAINCODE"
                        name="MAINCODE"
                        style={{ borderColor: "grey" }}
                        value={chiTietCT?.MAINCODE}
                        readonly={true}
                        className={appColors.inputColor}
                        size="small"
                      />
                    </div>

                    {/* Ngày chứng từ */}
                    <div className="ml-1 lg:w-3/6 w-full">
                      <Label className="text-sm text-gray-500">
                        {getLabelValue(118, "Ngày chứng từ")}
                      </Label>
                      <DatePicker
                        format="dd/MM/yyyy"
                        value={
                          chiTietCT?.MAINDATE
                            ? new Date(chiTietCT?.MAINDATE)
                            : new Date()
                        }
                        className={appColors.inputColor}
                        size="small"
                        disabled={true}
                      />
                    </div>
                  </div>
                </div>

                {/* NV trinh ky & Bo phan */}
                <div className="w-full">
                  <div className="flex justify-between mb-3">
                    {/* NV trình ký */}
                    <div className="mr-1 lg:w-3/6 w-full">
                      <Label className="text-sm text-gray-500">
                        {getLabelValue(172, "NV trình ký")}
                      </Label>
                      <MaskedTextBox
                        id="EMSGNAME"
                        name="EMSGNAME"
                        style={{ borderColor: "grey" }}
                        value={chiTietCT?.EMSGNAME}
                        readonly={true}
                        className={appColors.inputColor}
                        size="small"
                      />
                    </div>

                    {/* Bộ phận */}
                    <div className="ml-1 lg:w-3/6 w-full">
                      <Label className="text-sm text-gray-500">
                        {getLabelValue(150, "Bộ phận")}
                      </Label>
                      <MaskedTextBox
                        id="DPSGNAME"
                        name="DPSGNAME"
                        style={{ borderColor: "grey" }}
                        value={chiTietCT?.DPSGNAME}
                        readonly={true}
                        className={appColors.inputColor}
                        size="small"
                      />
                    </div>
                  </div>
                </div>

                {/* So tien & DVTT */}
                <div className="w-full">
                  <div className="flex justify-between mb-3">
                    {/* So tien */}
                    <div className="mr-1 lg:w-3/5 w-full">
                      <FieldEditNumberic
                        id="CURRVLUE"
                        name="CURRVLUE"
                        title={getLabelValue(174, "Số tiền")}
                        value={chiTietCT?.CURRVLUE}
                        readonly={true}
                        className={appColors.inputColor}
                      />
                    </div>

                    {/* DVTT */}
                    <div className="ml-1 lg:w-2/5 w-full">
                      <Label className="text-sm text-gray-500">
                        {getLabelValue(87, "ĐV Tiền tệ")}
                      </Label>
                      <MaskedTextBox
                        id="UOM_NAME"
                        name="UOM_NAME"
                        style={{ borderColor: "grey" }}
                        value={chiTietCT?.UOM_NAME}
                        readonly={true}
                        className={appColors.inputColor}
                        size="small"
                      />
                    </div>
                  </div>
                </div>

                {/* Ghi chu */}
                <div className="w-full">
                  <Label className="text-sm text-gray-500">
                    {getLabelValue(128, "Ghi chú")}
                  </Label>
                  <TextArea
                    id="NOTESGST"
                    name="NOTESGST"
                    value={chiTietCT?.NOTESGST}
                    readOnly={true}
                    rows={4}
                    size="small"
                    className={appColors.inputColor}
                    autoSize={false}
                  />
                </div>

                {/* nut XET DUYET */}
                <div className="w-full">
                  <Button
                    className="buttons-container-button"
                    iconClass="k-icon k-font-icon k-i-edit"
                    onClick={ApproveDcmnHandler}
                  >
                    {getLabelValue(180, "Xét duyệt")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <TabStrip
            selected={tabSelected}
            onSelect={(e) => {
              setTabSelected(e.selected);
            }}
            className="Tab-flex"
          >
            <TabStripTab title={getLabelValue(107, "Thông tin Đính kèm")}>
              <div className="ml-1 w-full">
                {/* File đính kèm */}
                <div className="file-attach">
                  <div className="flex mb-3">
                    <p className="w-full">
                      {getLabelValue(57, "File đính kèm")}
                    </p>
                  </div>
                  <div className="w-full">
                    {files &&
                      files.length > 0 &&
                      files.map((fileItem) => (
                        <FileItem
                          key={fileItem.id}
                          fileItem={fileItem}
                          disabled="false"
                        />
                      ))}
                  </div>
                </div>
              </div>
            </TabStripTab>
            <TabStripTab title={getLabelValue(171, "Thông tin phê duyệt")}>
              <AprvDcmnProcessGrid dataitems={approvalProcess?.data} />
              {reviewProcess && reviewProcess.data.length > 0 && (
                <AprvDcmnProcedureGrid
                  dataitems={reviewProcess?.data[0].DETAIL}
                />
              )}
            </TabStripTab>
          </TabStrip>

          {/* nut XET DUYET */}
          {openApprove && reviewProcess && reviewProcess.data.length > 0 && (
            <ApproveDcmn
              onSubmit={SubmitAprvHandler}
              onCancel={CancelAprvHandler}
              item={reviewProcess.data[0]}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AprvDcmnEditMain;
