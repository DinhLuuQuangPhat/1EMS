import React, { useEffect, useState } from "react";
import { getLstAprvDcmn } from "../../actions/document";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import moment from "moment";
import AprvDcmnListGrid from "./AprvDcmnListGrid";
import AprvFilter from "./AprvFilter";

const AprvDcmnListMain = () => {
  const {
    // beginDateList,
    // endDateList,
    getLabelValue,
    userData,
    setNotificationsAutoClose,
  } = useStateContext();
  const PageInfo = {
    DcmnCode: "dmsDcmnAprv",
    UrlLink: "/aprv-dcmn/",
    TitlePage: getLabelValue(170, "Phê duyệt chứng từ"),
  };
  const dispatch = useDispatch();
  const listPDCT = useSelector((state) => state.document.lstAprvDcmn);
  const [lstChungTu, setLstChungTu] = useState([]);
  const [lstAprvDcmnFilter, setLstAprvDcmnFilter] = useState([]);
  useEffect(() => {
    if (listPDCT.data && listPDCT.data.length > 0) {
      listPDCT.data.forEach((element) => {
        element.expanded = "true";
        if (element.DETAIL_1 && element.DETAIL_1.length) {
          element.DETAIL_1.forEach((detail1) => {
            detail1.expanded = "true";

            let DCMNCODE_Detail1 = detail1.DCMNCODE;
            if (detail1.DETAIL_2 && detail1.DETAIL_2.length > 0) {
              detail1.DETAIL_2.forEach((detail2) => {
                detail2.KEY_NEW = DCMNCODE_Detail1 + "-" + detail2.KEY_CODE;
              });
            }
          });
        }
      });

      setLstChungTu(listPDCT.data);
      setLstAprvDcmnFilter(listPDCT.data);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    }
  }, [listPDCT]);

  const loadListData = () => {
    const body = {
      DCMNCODE: PageInfo.DcmnCode,
      BEG_DATE: moment("1990-01-01").format("YYYY-MM-DD"),
      END_DATE: moment("1990-01-01").format("YYYY-MM-DD"),
      PARA_001: userData.EMPLCODE,
      PARA_002: "%",
    };
    dispatch(getLstAprvDcmn(body));
  };
  useEffect(() => {
    loadListData();
  }, [userData]);

  const AprvFilterHandler = (data) => {
    console.log("AprvFilterHandler", data);
    console.log("AprvFilterHandler lstChungTu", lstChungTu);

    let filteredData = [];

    if (data !== "%") {
      filteredData = lstChungTu.map((header) => {
        return {
          ACCERGHT: header.ACCERGHT,
          DCMNCODE: header.DCMNCODE,
          DCMNNAME: header.DCMNNAME,
          DDDD: header.DDDD,
          KKKK0000: header.KKKK0000,
          NUMBVCHR: header.NUMBVCHR,
          STTENAME: header.STTENAME,
          STTESIGN: header.STTESIGN,
          expanded: header.expanded,
          DETAIL_1: header.DETAIL_1.map((detail1) => {
            return {
              DCMNCODE: detail1.DCMNCODE,
              KKKK0001: detail1.KKKK0001,
              SCTNCODE: detail1.SCTNCODE,
              SCTNNAME: detail1.SCTNNAME,
              expanded: detail1.expanded,
              DETAIL_2: detail1.DETAIL_2.filter(
                (detail2) => detail2.SENDEMPL === data
              ),
            };
          }),
        };
      });
    }

    if (data === "%") {
      dispatch(getLstAprvDcmn(""));
      filteredData = lstChungTu.map((data) => data);
    }

    setLstAprvDcmnFilter(filteredData);
  };

  return (
    <>
      <div>
        {/* <FilterHeader onClick={loadListData} CountChungTu={CountChungTu} /> */}
        <AprvFilter onClick={AprvFilterHandler} DcmnAprv={PageInfo.DcmnCode} />
        <AprvDcmnListGrid
          datalist={lstAprvDcmnFilter}
          UrlLink={PageInfo.UrlLink}
        />
      </div>
    </>
  );
};

export default AprvDcmnListMain;
