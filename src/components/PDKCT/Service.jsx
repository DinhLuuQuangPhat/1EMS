import * as api from "../../api/index";
import { apiUrl, baseUrl } from "../../constants";
import moment from "moment";
import { deletePDKCT, lockPDKCT } from "../../actions/pdkct";

export const editDetailsAfterPost = (details) => {
  var newDetails = [];

  details.map((detail) => {
    newDetails.push({
      ...detail,
      FRLVDATE: moment(detail.FRLVDATE).format("YYYY-MM-DD"),
      TOLVDATE: moment(detail.TOLVDATE).format("YYYY-MM-DD"),
      TIMEMORN: detail.TIMEMORN ? detail.TIMEMORN : "",
      TIMEEVEN: detail.TIMEEVEN ? detail.TIMEEVEN : "",
      TIMEAFTR: detail.TIMEAFTR ? detail.TIMEAFTR : "",
      WORKTYPE: detail.WORKTYPE,
      WORKPLAC: detail.WORKPLAC,
    });
  });
  return newDetails;
};

export const refreshSumLeav = (header, setHeader) => {
  var sum = 0.0;
  if (header.DETAIL != null && header.DETAIL.length > 0) {
    sum = header.DETAIL.reduce(
      (accumulator, currentValue) =>
        accumulator + caculatorSumtime(currentValue),
      0
    );
  }
  setHeader({ ...header, WORK_DAY: sum });
};

export const deleteService = (dcmncCode, header, dispatch) => {
  const body = {
    DCMNCODE: dcmncCode,
    KEY_CODE: header.KKKK0000,
  };
  dispatch(deletePDKCT(body));
};

export const lockService = (dcmncCode, header, dispatch) => {
  const body = {
    DCMNCODE: dcmncCode,
    KEY_CODE: header.KKKK0000,
  };
  dispatch(lockPDKCT(body));
};

export const postFileService = (dcmncCode, keycode, files, callbackFunc) => {
  var myHeaders = new Headers();
  myHeaders.append("TOKEN", localStorage.getItem("usertoken"));
  var formdata = new FormData();
  formdata.append("DCMNCODE", dcmncCode);
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
    .then((result) => {
      if (callbackFunc) {
        callbackFunc();
      }
    })
    .catch((error) => console.log("error", error));
};

export const deleteFileService = (removeFiles, setRemoveFiles) => {
  if (removeFiles.length > 0) {
    removeFiles.map((item) => {
      if (item.KEY_CODE != null && item.FILECODE != null) {
        doPostDeleteFiles(item.DCMNCODE, item.KEY_CODE, item.FILECODE);
      }
    });
    setRemoveFiles([]);
  }
};
export const doPostDeleteFiles = (dcmnCode, key, fileCode, callBackFunc) => {
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

  fetch(
    "Https://Api-Dev.firstems.com/Api/data/runApi_File?run_Code=DTA012",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => {
      if (callBackFunc) {
        callBackFunc();
      }
    })
    .catch((error) => console.log("error", error));
};

export const editService = (item, setEditItem, setOpenForm) => {
  setOpenForm(true);
  setEditItem({
    ...item,
    FRLVDATE: item.FRLVDATE !== "" ? new Date(item.FRLVDATE) : new Date(),
    TOLVDATE: item.TOLVDATE !== "" ? new Date(item.TOLVDATE) : new Date(),
  });
};

export const removeService = (item, header, setHeader) => {
  var newData = header.DETAIL.filter(
    (detail) => detail.KKKK0001 !== item.KKKK0001
  );
  var sum = 0.0;
  newData.map((item) => {
    sum += item.SUMLVDT;
  });
  setHeader({ ...header, DETAIL: newData, WORK_DAY: sum });
};

export const submitService = async (
  e,
  userData,
  header,
  setHeader,
  setOpenForm
) => {
  var body = {
    DCMNCODE: "apiGet_LvTm",
    PARA_001: userData.EMPLCODE,
    PARA_002: e.TIMEMORN != null ? e.TIMEMORN : "",
    PARA_003: e.TIMEAFTR != null ? e.TIMEAFTR : "",
    PARA_004: e.TIMEEVEN != null ? e.TIMEEVEN : "",
    BEG_DATE: moment(e.FRLVDATE).format("YYYY-MM-DD"),
    END_DATE: moment(e.TOLVDATE).format("YYYY-MM-DD"),
    LGGECODE: "{{0302}}",
  };

  // API tính ra số ngày nghỉ
  const { data } = await api.fetchCommonDcmn(body);
  var event = {
    EMPLCODE: e.EMPLCODE,
    FRLVDATE: moment(e.FRLVDATE).format("YYYY-MM-DD"),
    KKKK0001: e.KKKK0001,
    MAINCODE: e.MAINCODE,
    TIMEAFTR: e.TIMEAFTR,
    TIMEEVEN: e.TIMEEVEN,
    TIMEMORN: e.TIMEMORN,
    TOLVDATE: moment(e.TOLVDATE).format("YYYY-MM-DD"),
    WORKPLAC: e.WORKPLAC,
    WORKTYPE: e.WORKTYPE,

    RFRNDATE: moment(e.RFRNDATE).format("YYYY-MM-DD"),
    SUMLVDT: data.RETNDATA[0].NUMBLVTM,
    permission: false,
  };

  // Xu ly lai Detail
  var newData = [];
  if (header.DETAIL.find((x) => x.KKKK0001 === event.KKKK0001) === undefined) {
    newData = [...header.DETAIL, event];
  } else {
    newData = header.DETAIL.map((item) => {
      if (event.KKKK0001 === item.KKKK0001) {
        item = {
          ...event,
        };
      }
      return item;
    });
  }

  // Tinh tong ngay nghi tren Master
  var sum = 0.0;
  newData.map((item) => {
    sum += item.SUMLVDT;
  });

  setHeader({ ...header, DETAIL: newData, WORK_DAY: sum });

  setOpenForm(false);
};
