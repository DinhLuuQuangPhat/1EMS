import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailAPRVINVC,
  deleteAPRVINVC,
  postAPRVINVC,
  updateAPRVINVC,
  lockAPRVINVC,
  resetAPRVINVC,
} from "../../actions/aprvinvc";
import { getApprovalProcess, getReviewProcess } from "../../actions/document";
import { useStateContext } from "../../context/ContextProvider";
import { FileItem } from "../../components";
import {
  AiOutlineFilePdf,
  AiOutlineFileExcel,
  AiOutlineFileWord,
  AiOutlineFileImage,
  AiOutlineFileText,
  AiFillFileImage,
} from "react-icons/ai";
import { v4 } from "uuid";
import { ActionHeader } from "../";
import { apiUrl, baseUrl } from "../../constants";

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

const AprvInvcEditMain = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getLabelValue, appColors } = useStateContext();

  const PageInfo = {
    TitlePage: getLabelValue(169, "Tờ trình ký"),
    UrlLink: "/aprv-invc/",
    UrlLinkNew: "/aprv-invc/new",
    // DcmnCode: "inpDcmnVrch",
    DcmnCode: "INPDCMNVRCH",
  };

  // Chi tiet chung tu
  const DetailAprvInvc = useSelector((state) => state.aprvinvc.detailInvc);
  const [AcceRght, setAcceRght] = useState(0);
  const [StteSign, setStteSign] = useState(0);
  // Cho phep sua du lieu hay khong
  const [permissions, setPermissions] = useState(true);

  // Khoi tao ct
  const initHeader = {
    COMPCODE: JSON.parse(localStorage.getItem("company")).COMPCODE,
    LCTNCODE: JSON.parse(localStorage.getItem("userData")).LCTNCODE,
    DCMNCODE: "inpDcmnVrch",
    MAINCODE: "",
    MAINDATE: "2023-10-17T00:00:00+07:00",
    VLUENUMB: 0,
    CNTNTEXT: "",
    NOTETEXT: "",
    EMPLCODE: "",
    DDDD: "inpDcmnVrch",
    ACCERGHT: 0,
    STTESIGN: 0,
    STTENAME: "",
    KKKK0000: "PMC",
  };
  const [header, setHeader] = useState(initHeader);
  useEffect(() => {
    if (DetailAprvInvc) {
      setHeader(DetailAprvInvc !== undefined ? DetailAprvInvc : initHeader);

      var fileList = DetailAprvInvc.DCMNFILE;
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

      DetailAprvInvc.STTESIGN <= 0
        ? setPermissions(true)
        : setPermissions(false);
      setAcceRght(DetailAprvInvc.ACCERGHT);
      setStteSign(DetailAprvInvc.STTESIGN);
    }

    if (!DetailAprvInvc) {
      setAcceRght(0);
      setStteSign(0);
    }
  }, [DetailAprvInvc]);

  // data quy trinh xet duyet, qua trinh xet duyet
  const approvalProcess = useSelector(
    (state) => state.document.approvalProcess
  );
  const reviewProcess = useSelector((state) => state.document.reviewProcess);
  // Xu ly phan show Quy trinh xet duyet, Qua trinh xet duyet
  const [showPopupProcedure, setShowPopupProcedure] = useState(false);
  const [showPopupProgress, setShowPopupProgress] = useState(false);
  const actionProgress = () => {
    const body = {
      DCMNCODE: "dmsAprvVchr",
      PARA_001: PageInfo.DcmnCode,
      PARA_002: header.KKKK0000,
      PARA_003: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
    };
    if (showPopupProgress) {
      setShowPopupProgress(false);
    } else {
      dispatch(getReviewProcess(body));
      setShowPopupProcedure(false);
      setShowPopupProgress(true);
    }
  };
  const actionProcedure = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    if (showPopupProcedure) {
      setShowPopupProcedure(false);
    } else {
      dispatch(getApprovalProcess(body));
      setShowPopupProcedure(true);
      setShowPopupProgress(false);
    }
  };

  // Xu ly file đinh kem
  const [files, setFiles] = useState([]);
  const [removeFiles, setRemoveFiles] = useState([]);
  const onFileRemove = (fileItem) => {
    setRemoveFiles([...removeFiles, fileItem]);
    setFiles((prevState) =>
      prevState.filter((item) => item.id !== fileItem.id)
    );
  };
  const onFileSelected = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i];
      const fileType = file.name
        .split(".")
        [file.name.split(".").length - 1].toLowerCase();

      const icon = getFileIcon(fileType);
      setFiles((dcmnFiles) => [
        ...dcmnFiles,
        {
          id: v4(),
          FILENAME: file.name,
          FILEPATH: file.path,
          FILETYPE: fileType,
          ICON: icon,
          DATA: file,
        },
      ]);
    }
    e.preventDefault();
  };

  const [actions, setActions] = useState(
    props.mode === "ADD"
      ? {
          procedure: false, // Quy trình
          progress: false, // Quá trình
          add: false, // Thêm mới
          dup: false, // Nhân bản
          save: true, // Lưu
          lock: true, // Khóa
          delete: false, // Xóa
        }
      : {
          procedure: true,
          progress: false,
          add: true,
          dup: true,
          save: false,
          lock: false,
          delete: false,
        }
  );
  useEffect(() => {
    setPermissions(header !== undefined ? header.STTESIGN === 0 : true);
    if (header && header.MAINCODE !== "") {
      if (header.STTESIGN > 0) {
        // Chứng từ đã khóa
        setActions({
          procedure: true,
          progress: true,
          add: true,
          dup: true,
          save: false,
          lock: false,
          delete: false,
        });
      } else {
        setActions({
          procedure: true,
          progress: false,
          add: true,
          dup: true,
          save: true,
          lock: true,
          delete: true,
        });
      }
    }
  }, [header]);

  // su kien Action Bar
  const ClickBackList = () => {
    navigate(PageInfo.UrlLink);
  };
  const actionAdd = () => {
    navigate(UrlLinkNew);
  };
  const actionDup = () => {
    setHeader({
      ...header,
      STTESIGN: 0,
      STTENAME: "",
      MAINCODE: "",
      MAINDATE: "",
      KKKK0000: "",
      DCMNFILE: [],
    });
    setAcceRght(1);
    setStteSign(0);
    setFiles([]);
  };
  const actionSave = () => {
    var postJson = {
      DCMNCODE: PageInfo.DcmnCode,
      HEADER: [header],
    };

    if (header.KKKK0000) {
      // update
      dispatch(updateAPRVINVC(postJson));
    } else {
      // Post
      dispatch(postAPRVINVC(postJson));
    }
  };
  const actionCancel = () => {
    alert("abc");
  };
  const actionLock = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(lockAPRVINVC(body));
  };
  const [openNotify, setOpenNotify] = useState(false);
  const [contentNotify, setContentNotify] = useState({});
  const CancelNotifyHandler = () => {
    setOpenNotify(false);
  };
  const actionDelete = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      KEY_CODE: header.KKKK0000,
    };
    dispatch(deleteAPRVINVC(body));
  };

  // Code xy ly khi Post ct
  const postResult = useSelector((state) => state.aprvinvc.postResult);
  useEffect(() => {
    if (postResult) {
      if (postResult.RETNCODE) {
        deleteFiles();
        if (files.length > 0) {
          doPostFile(postResult.RETNDATA[0].KKKK0000);
        }
        // dispatch(getDetailAPRVINVC(postResult.RETNDATA[0].KKKK0000));
      }
      alert(postResult.RETNMSSG);
      dispatch(resetAPRVINVC());
      dispatch(getDetailAPRVINVC(postResult.RETNDATA[0].KKKK0000));
    }
  }, [postResult]);
  const deleteFiles = () => {
    if (removeFiles.length > 0) {
      removeFiles.map((item) => {
        if (item.KEY_CODE != null && item.FILECODE != null) {
          doPostDeleteFiles(item.DCMNCODE, item.KEY_CODE, item.FILECODE);
        }
      });
      setRemoveFiles([]);
    }
  };
  const doPostDeleteFiles = (dcmnCode, key, fileCode) => {
    var myHeaders = new Headers();
    myHeaders.append("TOKEN", localStorage.getItem("usertoken"));
    var formdata = new FormData();
    formdata.append("DCMNCODE", dcmnCode);
    formdata.append("KEY_CODE", key);
    formdata.append("FILECODE", fileCode);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(baseUrl + apiUrl.deleteFile.value, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  const doPostFile = (keycode) => {
    var myHeaders = new Headers();
    myHeaders.append("TOKEN", localStorage.getItem("usertoken"));
    var formdata = new FormData();
    formdata.append("DCMNCODE", PageInfo.DcmnCode);
    formdata.append("KEY_CODE", keycode);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };

    for (var i = 0; i < files.length; i++) {
      var file = files[i].DATA;
      if (file === null || file.name === null) {
        continue;
      }
      formdata.append("Files", file, file.name);
    }
    fetch(baseUrl + apiUrl.postFile.value, requestOptions)
      .then((response) => response.text())
      .then((result) => {})
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <ActionHeader
        mode={props.mode}
        AcceRght={AcceRght}
        StteSign={StteSign}
        onClickBack={ClickBackList}
        add={actionAdd}
        dup={actionDup}
        save={actionSave}
        cancel={actionCancel}
        delete={actionDelete}
        lock={actionLock}
        // unlock={actionUnlock}
        progress={actionProgress}
        procedure={actionProcedure}
        approvalProcedure={approvalProcess} // Quy trinh xet duyet
        approvalProgress={reviewProcess} // Qua trinh xet duyet
        showPopupProcedure={showPopupProcedure}
        showPopupProgress={showPopupProgress}
      />

      <div className="file-attach">
        <div className="flex mb-3">
          <p className="w-full">{getLabelValue(57, "File đính kèm")}</p>
          <input
            type="file"
            multiple
            className="text-sm cursor-pointer relative block w-full h-full"
            onChange={(e) => {
              onFileSelected(e);
              e.target.value == null;
            }}
            disabled={!permissions}
          />
        </div>
        <div>
          <div>
            {files &&
              files.length > 0 &&
              files.map((fileItem) => (
                <FileItem
                  key={fileItem.id}
                  fileItem={fileItem}
                  onFileRemove={onFileRemove}
                  disabled={permissions}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AprvInvcEditMain;
