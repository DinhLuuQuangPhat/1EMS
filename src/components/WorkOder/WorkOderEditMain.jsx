import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { v4 } from "uuid";
import moment from "moment/moment";
import { apiUrl, baseUrl } from "../../constants";

import {
    getDetailTTCVI,
    deleteTTCVI,
    postTTCVI,
    updateTTCVI,
    lockTTCVI,
    resetTTCVI,
} from "../../actions/ttcvi";

import { getApprovalProcess, getReviewProcess } from "../../actions/document";

import {
    ActionHeader,
    TitleHeader,
    FieldEditMaskText,
    FieldEditInput,
    DialogSystem,
    DialogDelete,
} from "../";

import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

const WorkOderEditMain = (props) => {
    const [tabSelected, setTabSelected] = useState(0);
    const [mode, setMode] = useState(props.mode);
    useEffect(() => {
        props.keycode === undefined ? setMode("ADD") : setMode(props.mode);
    }, [props.keycode]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getLabelValue, appColors, userData } = useStateContext();

    const PageInfo = {
        TitlePage: getLabelValue(null, "Thứ Tự Công Việc"),
        UrlLink: "/work-oder/",
        UrlLinkNew: "/work-oder/new",
        DcmnCode: "inpWorkOder",
    };

    // Chi tiet loai hinh cong viec
    const DetailTTCVI = useSelector((state) => state.TTCVI.detailInvc); // state.TTCVI, cái TTCVI dựa vào TTCVI trong combineReducers của reducers/index.js
    const [AcceRght, setAcceRght] = useState(0);
    const [StteSign, setStteSign] = useState(0);
    // Cho phep sua du lieu hay khong
    const [permissions, setPermissions] = useState(true);

    // Khoi tao ct
    const initHeader = {
        COMPCODE: "",
        WKODCODE: 0,
        WKODNAME: "",
    };
    const [header, setHeader] = useState(initHeader);
    useEffect(() => {
        if (DetailTTCVI) {
            setHeader(DetailTTCVI !== undefined ? DetailTTCVI : initHeader);
            DetailTTCVI.STTESIGN <= 0 ? setPermissions(true) : setPermissions(false);
            setAcceRght(DetailTTCVI.ACCERGHT);
            setStteSign(DetailTTCVI.STTESIGN);
        }

        if (!DetailTTCVI) {
            setHeader(initHeader);
            setAcceRght(1);
            setStteSign(0);
            setPermissions(true);
        }

        setDataReviewProcess("");
        setDataApprovalProcess("");
    }, [DetailTTCVI]);


    // su kien Action Bar
    const ClickBackList = () => {
        navigate(PageInfo.UrlLink);
    };
    const actionAdd = () => {
        navigate(PageInfo.UrlLinkNew);
        setHeader(initHeader);
        setAcceRght(1);
        setStteSign(0);
        setPermissions(true);
        setMode("ADD");
    };
    const actionDup = () => {
        setHeader({
            ...header,
            STTESIGN: 0,
            STTENAME: "",
            KKKK0000: "",
        });
        setAcceRght(1);
        setStteSign(0);
        setPermissions(true);
        setMode("DUP");
    };
    const actionSave = () => {
        if (header.WKODNAME === "" || header.WKODNAME === null) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng nhập tên thứ tự công việc",
            });
            return;
        }
        else {
            var postJson = {
                DCMNCODE: PageInfo.DcmnCode,
                HEADER: [header],
            };
            if (header.KKKK0000) {
                // update
                dispatch(updateTTCVI(postJson));
            } else {
                // Post
                dispatch(postTTCVI(postJson));
            }
        }
    };

    const [openNotify, setOpenNotify] = useState(false);
    const [contentNotify, setContentNotify] = useState({});
    const CancelNotifyHandler = () => {
        setOpenNotify(false);
        setContentNotify({ type: -1 });
    };

    const [dialogDelete, setDialogDelete] = useState(false);
    const [acptDelete, setAcptDelete] = useState(false);
    const [disableDel, setDisableDel] = useState(false);
    const actionDelete = () => {
        setDialogDelete(true);
    };
    const CancelDeleteHandler = () => {
        setDialogDelete(false);
        setAcptDelete(false);
    };


    useEffect(() => {
        if (acptDelete) {
            setDisableDel(true);

            const body = {
                DCMNCODE: PageInfo.DcmnCode,
                KEY_CODE: header.KKKK0000,
            };
            dispatch(deleteTTCVI(body));

            // Disable nut khi nhan thao tac
            setTimeout(() => {
                setDisableDel(false);
            }, 2000);
        }
        setDialogDelete(false);
    }, [acptDelete]);

    const [disableLock, setDisableLock] = useState(false);
    const actionLock = () => {
        setDisableLock(true);

        const body = {
            DCMNCODE: PageInfo.DcmnCode,
            KEY_CODE: header.KKKK0000,
        };
        dispatch(lockTTCVI(body));

        // Disable nut khi nhan thao tac
        setTimeout(() => {
            setDisableLock(false);
        }, 2000);
    };

    // Code xy ly khi Post ct
    const postResult = useSelector((state) => state.TTCVI.postResult);
    useEffect(() => {
        if (postResult) {
            alert(postResult.RETNMSSG);

            if (postResult.RETNCODE) {
                if (postResult.RETNDATA !== null) {
                    dispatch(getDetailTTCVI(postResult.RETNDATA[0].KKKK0000));
                    setMode("EDIT");
                } else {
                    dispatch(resetTTCVI());
                    dispatch(getDetailTTCVI());
                    navigate(PageInfo.UrlLink);
                }
            }
            dispatch(resetTTCVI());
        }
    }, [postResult]);

    // Quy trinh xet duyet
    const [disableReview, setDisableReview] = useState(false);
    const reviewProcess = useSelector((state) => state.document.reviewProcess);
    const [dataReviewProcess, setDataReviewProcess] = useState();
    useEffect(() => {
        setDataReviewProcess(reviewProcess);
    }, [reviewProcess]);
    const [showReviewProcess, setShowReviewProcess] = useState(false);
    const actionReviewProcess = () => {
        const body = {
            DCMNCODE: "dmsDcmnVchr",
            PARA_001: PageInfo.DcmnCode,
            PARA_002: header.KKKK0000,
            PARA_003: JSON.parse(localStorage.getItem("userData")).EMPLCODE,
            PARA_004: "{{0107}}",
        };
        dispatch(getReviewProcess(body));
        if (showReviewProcess) {
            setShowReviewProcess(false);
        } else {
            // dispatch(getReviewProcess(body));
            setShowApprovalProcess(false);
            setShowReviewProcess(true);
            setDisableReview(true);
        }
    };
    const closeReviewProcess = () => {
        setShowReviewProcess(false);
        setDisableReview(false);
    };
    // Qua trinh xet duyet
    const [disableApproval, setDisableApproval] = useState(false);
    const approvalProcess = useSelector(
        (state) => state.document.approvalProcess
    );
    const [dataApprovalProcess, setDataApprovalProcess] = useState();
    const [showApprovalProcess, setShowApprovalProcess] = useState(false);
    useEffect(() => {
        setDataApprovalProcess(approvalProcess);
    }, [approvalProcess]);
    const actionApprovalProcess = () => {
        const body = {
            DCMNCODE: PageInfo.DcmnCode,
            KEY_CODE: header.KKKK0000,
        };
        dispatch(getApprovalProcess(body));
        if (showApprovalProcess) {
            setShowApprovalProcess(false);
        } else {
            // dispatch(getApprovalProcess(body));
            setShowApprovalProcess(true);
            setShowReviewProcess(false);
            setDisableApproval(true);
        }
    };
    const closeApprovalProcess = () => {
        setShowApprovalProcess(false);
        setDisableApproval(false);
    };
    return (
        <>
            <ActionHeader
                mode={mode}
                Key_Code={header.KKKK0000 ? header.KKKK0000 : ""}
                AcceRght={AcceRght}
                StteSign={StteSign}
                onClickBack={ClickBackList}
                add={actionAdd}
                dup={actionDup}
                save={actionSave}
                delete={actionDelete}
                disableDel={disableDel}
                lock={actionLock}
                disableLock={disableLock}
                // Quy trinh xet duyet
                reviewProcess={dataReviewProcess}
                actionReviewProcess={actionReviewProcess}
                closeReviewProcess={closeReviewProcess}
                showReviewProcess={showReviewProcess}
                disableReview={disableReview}
                // Qua trinh xet duyet
                approvalProcess={dataApprovalProcess}
                actionApprovalProcess={actionApprovalProcess}
                closeApprovalProcess={closeApprovalProcess}
                showApprovalProcess={showApprovalProcess}
                disableApproval={disableApproval}
            />

            {/* Phan Header */}
            <div className="flex md:flex-row flex-col content-center-ems">
                <div className="w-full md:flex-row flex-col content-header">
                    <div
                        className={`lg:ml-2 ml-0 lg:mr-2 mr-0 lg:p-5 p-0 bg-white border-solid lg:border-[1px] border-0 lg:mb-0 mb-2 border-borderBase hover:border-blue-700 ${appColors.stackColor}`}
                    >
                        <TitleHeader
                            TitlePage={PageInfo.TitlePage}
                            MainCode={header?.MAINCODE}
                            StteName={header?.STTENAME}
                        />

                        {/* Noi dung Header */}
                        <TabStrip
                            selected={tabSelected}
                            onSelect={(e) => {
                                setTabSelected(e.selected);
                            }}
                            className="Tab-flex"
                        >
                            <TabStripTab title={getLabelValue(116, "Thông tin chung")}>
                                <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <div className=" mb-3">
                                            {/* So chung tu */}
                                            <FieldEditMaskText
                                                id="WKODCODE"
                                                name="WKODCODE"
                                                title={getLabelValue(null, "Mã số thứ tự công việc")}
                                                value={header.WKODCODE ? header.WKODCODE.toString() : ""}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="mb-3">
                                            {/* Ten thu tu cong viec */}
                                            <FieldEditInput
                                                title={getLabelValue(null, "Tên thứ tự công việc")}
                                                id={"WKODNAME"}
                                                defaultValue={header?.WKODNAME}
                                                value={header?.WKODNAME}
                                                onChange={(event) =>
                                                    setHeader({
                                                        ...header,
                                                        WKODNAME: event.value,
                                                    })
                                                }
                                                disabled={!permissions}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabStripTab>
                        </TabStrip>
                    </div>
                </div>
            </div>


            {/* Xử lý Hậu kiểm khi khóa ct */}
            {openNotify && (
                <DialogSystem item={contentNotify} cancelNotify={CancelNotifyHandler} />
            )}

            {dialogDelete && (
                <DialogDelete
                    acptDelete={acptDelete}
                    setAcptDelete={setAcptDelete}
                    dialogDelete={dialogDelete}
                    setDialogDelete={setDialogDelete}
                    onCancelDelete={CancelDeleteHandler}
                    MainCode={header?.MAINCODE}
                />
            )}
        </>
    )
}

export default WorkOderEditMain;
