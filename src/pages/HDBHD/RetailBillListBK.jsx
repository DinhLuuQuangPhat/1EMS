import React from "react";
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { NavLink, Navigate, useNavigate, Link } from "react-router-dom";
import { NavLink, useNavigate } from "react-router-dom";
import api from "../../api";
import { apiUrl } from "../../constants";
import moment from "moment";
// import { OrderDetailHeader, MainButton, CommandList } from "../../components";
import { MainButton, CommandList } from "../../components";
// import { filterBy, process } from "@progress/kendo-data-query";
import { filterBy } from "@progress/kendo-data-query";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Popup } from "@progress/kendo-react-popup";
import { v4 } from "uuid";
import {
  Grid,
  GridColumn,
  getSelectedState,
  getSelectedStateFromKeyDown,
} from "@progress/kendo-react-grid";
import { getter } from "@progress/kendo-react-common";
import { DatePicker } from "@progress/kendo-react-dateinputs";
import { useStateContext } from "../../context/ContextProvider";

// import Flatpickr from "react-flatpickr";
// import "flatpickr/dist/themes/dark.css";
import {
  FcTodoList,
  FcGenealogy,
  // FcFullTrash, FcUnlock
} from "react-icons/fc";
import {
  // MdAddCircle,
  MdAddCircleOutline,
  MdContentCopy,
  MdLockOutline,
  MdOutlineDelete,
  MdOutlineSave,
  MdChecklist,
  MdSchema,
} from "react-icons/md";
import {
  FcLeft,
  // ,FcRight
} from "react-icons/fc";
import { deleteHDBHD, getListHDBHD, lockHDBHD } from "../../actions/hdbhd";

import { cellViewDate } from "../../components";

const RetailBillListBK = () => {
  const {
    setNotificationsAutoClose,
    getLabelValue,
    userData,
    setDisableLocation,
    beginDateList,
    setBeginDateList,
    endDateList,
    setEndDateList,
  } = useStateContext();

  const navigate = useNavigate();

  const TitlePage = getLabelValue(134, "Biên nhận bán hàng");

  const dispatch = useDispatch();
  const listHDBHD = useSelector((state) => state.hdbhd.listHDBHD);
  const [lstChungTu, setLstChungTu] = useState([]);
  // Dieu kien Filter data Grid
  const initialFilter = {
    logic: "and",
    filters: [
      {
        field: "MAINCODE",
        operator: "contains",
        value: "0",
      },
    ],
  };
  const [filter, setFilter] = useState(initialFilter);
  const [CountChungTu, setCountChungTu] = useState(0);

  useEffect(() => {
    if (listHDBHD && listHDBHD.length > 0) {
      setLstChungTu(listHDBHD);
      setCountChungTu(listHDBHD.length);
      setNotificationsAutoClose("Tải dữ liệu thành công");
    }
  }, [listHDBHD]);

  const postResult = useSelector((state) => state.hdbhd.postResult);
  useEffect(() => {
    if (postResult) {
      if (postResult.RETNCODE) {
        setNotificationsAutoClose(postResult.RETNMSSG);
        loadDataHDBHD();
      } else {
        setNotificationsAutoClose("Thất bại");
      }
    }
  }, [postResult]);

  const [listVisiable, setListVisiable] = useState(true);

  const [order, setOrder] = useState({ maincode: "", keycode: "" });

  useEffect(() => {
    loadDataHDBHD();
  }, [userData]);

  useEffect(() => {
    if (listVisiable) {
      loadDataHDBHD();
      setDisableLocation(false);
      setStaticFunctions({
        ...staticFunctions,
        showAdd: true,
        showDuplicate: false,
        showProduce: false,
        showProgress: false,
      });
    } else {
      if (
        order !== undefined &&
        order.keycode !== undefined &&
        order.keycode !== ""
      ) {
        setStaticFunctions({
          ...staticFunctions,
          showAdd: true,
          showDuplicate: true,
          showProduce: true,
          showProgress: true,
        });
      }
    }
  }, [listVisiable]);

  const loadDataHDBHD = () => {
    const body = {
      DCMNCODE: "HDBHD",
      STTESIGN: "7",
      // BEG_DATE: moment(dateFrom).format("YYYY-MM-DD"),
      // END_DATE: moment(dateTo).format("YYYY-MM-DD"),

      BEG_DATE: moment(beginDateList).format("YYYY-MM-DD"),
      END_DATE: moment(endDateList).format("YYYY-MM-DD"),
    };

    dispatch(getListHDBHD(body));
  };

  const selectionModes = [
    {
      value: "single",
      label: "Single selection mode",
    },
    {
      value: "multiple",
      label: "Multiple selection mode",
    },
  ];
  const [selectionMode, setSelectionMode] = React.useState(
    selectionModes[1].value
  );

  // const onItemDoubleClick = (e) => {
  //   navigate("/retail-bill/" + e.dataItem.KKKK0000);
  // };
  const DATA_ITEM_KEY = "MAINCODE";
  const SELECTED_FIELD = "selected";
  const idGetter = getter(DATA_ITEM_KEY);
  const [selectedState, setSelectedState] = React.useState({});
  const onSelectionChange = (event) => {
    const newSelectedState = getSelectedState({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
  };
  const onKeyDown = (event) => {
    const newSelectedState = getSelectedStateFromKeyDown({
      event,
      selectedState: selectedState,
      dataItemKey: DATA_ITEM_KEY,
    });
    setSelectedState(newSelectedState);
  };
  const onSuccess = () => {
    setListVisiable(true);
    loadDataHDBHD();
  };

  // Thuc thi tac vu
  const lockClick = (dataItem) => {
    const body = {
      DCMNCODE: "HDBHD",
      KEY_CODE: dataItem.KKKK0000,
    };
    dispatch(lockHDBHD(body));
  };
  // const editClick = (dataItem) => {
  //   setOrder({
  //     ...order,
  //     maincode: dataItem.MAINCODE,
  //     keycode: dataItem.KKKK0000,
  //   });
  //   setListVisiable(false);
  // };
  const deleteClick = (dataItem) => {
    const body = {
      DCMNCODE: "PHDNC",
      KEY_CODE: dataItem.KKKK0000,
    };
    dispatch(deleteHDBHD(body));
  };
  const CommandCell = (props) => (
    <CommandList {...props} lockClick={lockClick} deleteClick={deleteClick} />
  );

  const childRef = useRef();
  const listFunctions = [
    {
      text: getLabelValue(78, "Lưu"),
      id: "save",
      icon: <MdOutlineSave className="text-blue-600" />,
    },
    {
      text: getLabelValue(78, "Lưu"),
      id: "save",
      icon: <MdOutlineSave className="text-blue-600" />,
    },
    {
      text: getLabelValue(79, "Trình ký"),
      id: "lock",
      icon: <MdLockOutline className="text-blue-600" />,
    },
    {
      text: getLabelValue(80, "Xóa"),
      id: "delete",
      icon: <MdOutlineDelete className="text-red-600" />,
      customClass: "text-red-600",
    },
  ];
  const listStaticFunctions = [
    {
      text: "Quy trình",
      id: "procedure",
      icon: <FcGenealogy />,
      isShow: false,
    },
    {
      text: "Quá trình",
      id: "progress",
      icon: <FcTodoList />,
      isShow: false,
    },
    {
      text: getLabelValue(14, "Thêm mới"),
      id: "add",
      icon: <MdAddCircleOutline className="text-primary" />,
      isShow: false,
    },
    {
      text: "Nhân bản",
      id: "dup",
      icon: <MdContentCopy className="text-primary" />,
      isShow: false,
    },
  ];

  const [staticFunctions, setStaticFunctions] = useState({
    showProduce: false, //
    showProgress: false,
    showAdd: true, // Thêm mới
    showDuplicate: false, // Nhân đôi
  });

  // nut Functions
  const [mainFucntions, setMainFucntions] = useState(
    order.keycode
      ? [
          {
            text: getLabelValue(78, "Lưu"),
            id: "save",
            icon: <MdOutlineSave className="text-blue-600 hover:text-white" />,
            className: "SaveItem",
          },
          {
            text: getLabelValue(78, "Lưu"),
            id: "save",
            icon: <MdOutlineSave className="text-blue-600 hover:text-white" />,
            className: "SaveItem",
          },
          {
            text: getLabelValue(79, "Trình ký"),
            id: "lock",
            icon: <MdLockOutline className="text-blue-600 hover:text-white" />,
            className: "LockItem",
          },
          {
            text: getLabelValue(80, "Xóa"),
            id: "delete",
            icon: <MdOutlineDelete className="text-red-600 hover:text-white" />,
            // customClass: "text-red-600",
            className: "DeltItem",
          },
        ]
      : [
          {
            text: getLabelValue(78, "Lưu"),
            id: "save",
            icon: <MdOutlineSave className="text-blue-600 hover:text-white" />,
            className: "SaveItem",
          },
          {
            text: getLabelValue(79, "Trình ký"),
            id: "lock",
            icon: <MdLockOutline className="text-blue-600 hover:text-white" />,
            className: "LockItem",
          },
        ]
  );
  const [mainFunction, setMainFunction] = useState(mainFucntions[0]);
  const [permissions, setPermissions] = useState(true);
  // const updateMainFunction = (functions) => {
  //   // console.log("updateMainFunction is called = " + functions);
  //   setMainFucntions(functions);
  // };
  const anchorProcedure = useRef(null);
  const anchorProgress = useRef(null);
  const [reviewProgress, setReviewProgress] = useState([]);
  const [showPopupProcedure, setShowPopupProcedure] = useState(false);
  const [showPopupProgress, setShowPopupProgress] = useState(false);
  const [popupType, setPopupType] = useState(0);
  const [popupTitle, setPopupTitle] = useState(
    getLabelValue(86, "Quá trình phê duyệt")
  );
  const viewProcedure = () => {
    if (showPopupProcedure) {
      setShowPopupProcedure(false);
    }
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.progessStep.value, {
        DCMNCODE: "HDBHD",
        KEY_CODE: order.keycode,
      })
      .then((res) => {
        var data = res.data;
        if (data.RETNCODE) {
          setPopupType(1);
          setPopupTitle(getLabelValue(85, "Quy trình phê duyệt"));
          setShowPopupProcedure(true);
          setReviewProgress(data.RETNDATA != undefined ? data.RETNDATA : []);
        } else {
          alert(JSON.stringify(res.data));
        }
      })
      .catch((err) => console.log(err));
  };
  const viewProgress = () => {
    if (showPopupProgress) {
      setShowPopupProgress(false);
    }
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.reviewStep.value, {
        DCMNCODE: "dmsAprvVchr",
        PARA_001: "HDBHD",
        PARA_002: order.keycode,
        PARA_003: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
      })
      .then((res) => {
        var data = res.data;
        if (data.RETNCODE) {
          setPopupType(0);
          setPopupTitle(getLabelValue(86, "Quá trình phê duyệt"));
          setShowPopupProgress(true);
          setReviewProgress(
            data.RETNDATA[0] != undefined ? data.RETNDATA[0].DETAIL : []
          );
        } else {
        }
      })
      .catch((err) => console.log(err));
  };
  document.body.addEventListener("click", (e) => {
    setShowPopupProcedure(false);
    setShowPopupProgress(false);
  });

  const onMainFunctionClick = (id) => {
    childRef.current.functionClick(mainFucntions.find((x) => x.id === id));
  };
  return (
    <>
      <div className="p-3 flex justify-between items-center">
        {/* Dau mui ten, Tieu de, nut Xet duyet */}
        <div className="order-first flex items-center">
          {/* Dau mui ten , event Click vao hien thi danh sach Luoi */}

          {/* tam reo lai 2023-08-28 */}
          {/* {listVisiable ? (
            <button
              className="text-base mr-2"
              onClick={() => {
                setListVisiable(false);
              }}
            >
              <FcRight />
            </button>
          ) : (
            <button
              className="text-base mr-2"
              onClick={() => {
                setListVisiable(true);
              }}
            >
              <FcLeft />
            </button>
          )} */}

          <button
            className="text-base mr-2"
            onClick={() => {
              setListVisiable(true);
            }}
          >
            <FcLeft />
          </button>

          {/* Tieu de page */}
          <div id="title">
            <h2 className="text-lg font-semibold">
              {getLabelValue(134, "Biên nhận bán hàng")}
            </h2>
          </div>

          {/* Nut Quy trinh xet duyet, Qua trinh xet duyet */}
          <div id="view-button" className="flex items-center">
            {!listVisiable &&
              staticFunctions &&
              staticFunctions.showProduce && (
                <div ref={anchorProcedure} id="procedure">
                  <MainButton
                    title="Quy trình"
                    icon={<MdSchema />}
                    customClick={() => viewProcedure()}
                  />
                  <Popup
                    anchor={anchorProcedure.current}
                    show={showPopupProcedure}
                    popupClass={"popup-content"}
                    animate={false}
                  >
                    <div>
                      {reviewProgress != null && reviewProgress.length > 0 ? (
                        <div className="p-3 bg-[#fff8f0]">
                          <span className="text-md font-semibold text-secondary w-full text-center">
                            {popupTitle}
                          </span>
                          {reviewProgress.map((item) => (
                            <div key={v4()}>
                              {popupType === 0 ? (
                                <div>
                                  <div className="text-black font-semibold">
                                    {item.PRCSAPRV} {". "} {item.EMPCNAME}
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-black">
                                      Ngày: {item.PRCSDATE}
                                    </div>
                                    <div className="text-black">
                                      {item.PRCSNAME}
                                    </div>
                                    <div className="text-black">
                                      {item.PRCSNOTE}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="ml-3">
                                  <div className="text-black">
                                    {item.PRCSODER}. {item.EMPLNAME} {" - "}
                                    <span className="text-primary">
                                      {item.FLOWNAME}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 bg-[#fff8f0]">
                          <span className="text-md font-semibold text-secondary w-full text-center">
                            {popupTitle}
                          </span>
                          <div>
                            <span className="text-sm text-red-600 italic">
                              Không có thông tin
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Popup>
                </div>
              )}
            {!listVisiable &&
              !permissions &&
              order.keycode &&
              staticFunctions &&
              staticFunctions.showProduce && (
                <div ref={anchorProgress} id="progress">
                  <MainButton
                    title="Quá trình"
                    icon={<MdChecklist />}
                    customClick={() => viewProgress()}
                  />
                  <Popup
                    anchor={anchorProgress.current}
                    show={showPopupProgress}
                    popupClass={"popup-content"}
                    animate={false}
                  >
                    <div>
                      {reviewProgress != null && reviewProgress.length > 0 ? (
                        <div className="p-3 bg-[#fff8f0]">
                          <span className="text-md font-semibold text-secondary w-full text-center">
                            {popupTitle}
                          </span>
                          {reviewProgress.map((item) => (
                            <div key={v4()}>
                              {popupType === 0 ? (
                                <div>
                                  <div className="text-black font-semibold">
                                    {item.PRCSAPRV} {". "} {item.EMPCNAME}
                                  </div>
                                  <div className="ml-3">
                                    <div className="text-black">
                                      Ngày: {item.PRCSDATE}
                                    </div>
                                    <div className="text-black">
                                      {item.PRCSNAME}
                                    </div>
                                    <div className="text-black">
                                      {item.PRCSNOTE}
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                <div className="ml-3">
                                  <div className="text-black">
                                    {item.PRCSODER}. {item.EMPLNAME} {" - "}
                                    <span className="text-primary">
                                      {item.FLOWNAME}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 bg-[#fff8f0]">
                          <span className="text-md font-semibold text-secondary w-full text-center">
                            {popupTitle}
                          </span>
                          <div>
                            <span className="text-sm text-red-600 italic">
                              Không có thông tin
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Popup>
                </div>
              )}
          </div>
        </div>

        {/* Nut function Them, Nhan doi, Luu, Trinh ky, Khoa*/}
        <div id="action-button" className="flex order-last items-center">
          {/* Them moi */}
          {staticFunctions && staticFunctions.showAdd && (
            <MainButton
              title={getLabelValue(14, "Thêm mới")}
              icon={<MdAddCircleOutline />}
              customClick={() => {
                navigate("/retail-bill/new");
              }}
              className="AddItem"
            />
          )}

          {/* Nhan ban */}
          {!listVisiable &&
            staticFunctions &&
            staticFunctions.showDuplicate && (
              <MainButton
                title="Nhân bản"
                customClick={() => {
                  setStaticFunctions({
                    ...staticFunctions,
                    showAdd: false,
                    showDuplicate: false,
                    showProduce: false,
                    showProgress: false,
                  });
                  childRef.current.getAlert();
                }}
                icon={<MdContentCopy />}
                className="dupItem"
              />
            )}

          {/* 3 nut Luu, Trinh ky, Xoa */}
          {!listVisiable &&
            permissions &&
            mainFucntions &&
            mainFucntions.map((item) => (
              <MainButton
                title={item.text}
                key={item.id}
                icon={item.icon}
                customClass={item.customClass}
                customClick={() => {
                  onMainFunctionClick(item.id);
                }}
                className={item.className}
              />
            ))}
        </div>

        {/* Nut function khi xuong view Mobile */}
        <div className="hover:border-blue-700 ">
          {!listVisiable && permissions && (
            <div className="flex items-center">
              <div className="w-[150px]">
                <DropDownList
                  data={mainFucntions}
                  textField="text"
                  dataItemKey="id"
                  defaultValue={mainFunction}
                  onChange={(e) => setMainFunction(e.target.value)}
                  disabled={!permissions}
                />
              </div>
              <button
                disabled={!permissions}
                className=" bg-primary text-white pt-1 pb-1 pl-3 pr-3 rounded-md text-sm ml-3 w-[100px]"
                type="button"
                onClick={() => childRef.current.functionClick(mainFunction)}
              >
                {getLabelValue(81, "Thực hiện")}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Filter ngay - thang, Loc */}
      {listVisiable ? (
        <div>
          {/* Filter ngay thang */}
          <div className="w-full lg:flex bg-blue-200 p-3">
            <div className="flex">
              <div className="flex items-center">
                <div className="w-fit text-xs">
                  {getLabelValue(15, "Từ ngày:")}
                </div>
                <div className="lg:ml-3">
                  {/* <DatePicker
                      format="dd/MM/yyyy"
                      defaultValue={initDateFrom}
                      onChange={(e) => setdateFrom(e.value)}
                    /> */}
                  <DatePicker
                    format="dd/MM/yyyy"
                    value={beginDateList}
                    onChange={(e) => setBeginDateList(e.value)}
                  />
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-fit text-xs lg:ml-3">
                  {getLabelValue(16, "đến ngày:")}
                </div>
                <div className="lg:ml-3">
                  {/* <DatePicker
                      format="dd/MM/yyyy"
                      defaultValue={initDateTo}
                      onChange={(e) => setdateTo(e.value)}
                    /> */}
                  <DatePicker
                    format="dd/MM/yyyy"
                    value={endDateList}
                    onChange={(e) => setEndDateList(e.value)}
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              className="rounded-md bg-green-500 text-white pl-5 pr-5 ml-5 items-center w-32 m-3 p-[0.15rem] text-sm"
              onClick={loadDataHDBHD}
            >
              {getLabelValue(17, "Lọc")}
            </button>
            <div className="flex items-center ml-10">
              <div className="w-fit text-xs">
                {getLabelValue(18, "Tổng số chứng từ:")}
              </div>
              <div className="ml-3 text-red-700 text-xs font-semibold">
                {CountChungTu}
              </div>
            </div>
          </div>

          {/* Danh sach list chung tu */}
          <Grid
            style={{
              height: "700px",
            }}
            // onRowDoubleClick={onItemDoubleClick}
            data={filterBy(lstChungTu, filter)}
            dataItemKey={DATA_ITEM_KEY}
            selectedField={SELECTED_FIELD}
            selectable={{
              enabled: true,
              cell: false,
              mode: selectionMode,
            }}
            navigatable={true}
            onSelectionChange={onSelectionChange}
            onKeyDown={onKeyDown}
            filterable={true}
            filter={filter}
            onFilterChange={(e) => setFilter(e.filter)}
          >
            <GridColumn
              field="MAINCODE"
              title={getLabelValue(117, "Số chứng từ")}
              width="150px"
              cell={cellMainCode}
            />
            <GridColumn
              field="MAINDATE"
              title={getLabelValue(118, "Ngày chứng từ")}
              width="200px"
              filter="date"
              cell={cellViewDate}
            />
            <GridColumn
              field="NOTETEXT"
              title={getLabelValue(21, "Nội dung")}
            />
            <GridColumn
              field="STTENAME"
              title={getLabelValue(22, "Trạng thái")}
              width="200px"
            />
            <GridColumn
              cell={CommandCell}
              width="200px"
              filterable={false}
              title={getLabelValue(23, "Tác vụ")}
            />
          </Grid>
        </div>
      ) : (
        <div>
          <p>Không có chứng từ</p>
        </div>
      )}
    </>
  );
};

export default RetailBillListBK;
