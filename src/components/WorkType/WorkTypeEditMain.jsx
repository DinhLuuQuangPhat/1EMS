import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";
import { useStateContext } from "../../context/ContextProvider";
import moment from "moment/moment";

import {
    getDetailLHCVI,
    deleteLHCVI,
    postLHCVI,
    updateLHCVI,
    lockLHCVI,
    resetLHCVI,
} from "../../actions/lhcvi";

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

const WorkTypeEditMain = (props) => {
    const [tabSelected, setTabSelected] = useState(0);
    const [mode, setMode] = useState(props.mode);
    useEffect(() => {
        props.keycode === undefined ? setMode("ADD") : setMode(props.mode);
    }, [props.keycode]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getLabelValue, appColors, userData } = useStateContext();

    const PageInfo = {
        TitlePage: getLabelValue(null, "Loại Hình Công Việc"),
        UrlLink: "/work-type/",
        UrlLinkNew: "/work-type/new",
        DcmnCode: "inpWorkType",
    };

    // Chi tiet loai hinh cong viec
    const DetailLHCVI = useSelector((state) => state.LHCVI.detailInvc); // state.LHCVI, cái LHCVI dựa vào LHCVI trong combineReducers của reducers/index.js
    const [AcceRght, setAcceRght] = useState(0);
    const [StteSign, setStteSign] = useState(0);
    // Cho phep sua du lieu hay khong
    const [permissions, setPermissions] = useState(true);

    // Khoi tao ct
    const initHeader = {
        COMPCODE: "",
        WKTPCODE: 0,
        WKTPNAME: "",
    };
    const [header, setHeader] = useState(initHeader);
    useEffect(() => {
        if (DetailLHCVI) {
            setHeader(DetailLHCVI !== undefined ? DetailLHCVI : initHeader);
            DetailLHCVI.STTESIGN <= 0 ? setPermissions(true) : setPermissions(false);
            setAcceRght(DetailLHCVI.ACCERGHT);
            setStteSign(DetailLHCVI.STTESIGN);
        }

        if (!DetailLHCVI) {
            setHeader(initHeader);
            setAcceRght(1);
            setStteSign(0);
            setPermissions(true);
        }

        setDataReviewProcess("");
        setDataApprovalProcess("");
    }, [DetailLHCVI]);


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
        if (header.WKTPNAME === "" || header.WKTPNAME === null) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng nhập tên loại công việc",
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
                dispatch(updateLHCVI(postJson));
            } else {
                // Post
                dispatch(postLHCVI(postJson));
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
            dispatch(deleteLHCVI(body));

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
        dispatch(lockLHCVI(body));

        // Disable nut khi nhan thao tac
        setTimeout(() => {
            setDisableLock(false);
        }, 2000);
    };

    // Code xy ly khi Post ct
    const postResult = useSelector((state) => state.LHCVI.postResult);
    useEffect(() => {
        if (postResult) {
            alert(postResult.RETNMSSG);

            if (postResult.RETNCODE) {
                if (postResult.RETNDATA !== null) {
                    dispatch(getDetailLHCVI(postResult.RETNDATA[0].KKKK0000));
                    setMode("EDIT");
                } else {
                    dispatch(resetLHCVI());
                    dispatch(getDetailLHCVI());
                    navigate(PageInfo.UrlLink);
                }
            }
            dispatch(resetLHCVI());
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
                                            {/* Ma so loai cong viec */}
                                            <FieldEditMaskText
                                                id="WKTPCODE"
                                                name="WKTPCODE"
                                                title={getLabelValue(null, "Mã số loại công việc")}
                                                value={header.WKTPCODE ? header.WKTPCODE.toString() : ""}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="mb-3">
                                            {/* Ten loai cong viec */}
                                            <FieldEditInput
                                                title={getLabelValue(null, "Tên loại công việc")}
                                                id={"WKTPNAME"}
                                                defaultValue={header?.WKTPNAME}
                                                value={header?.WKTPNAME}
                                                onChange={(event) =>
                                                    setHeader({
                                                        ...header,
                                                        WKTPNAME: event.value,
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

export default WorkTypeEditMain;
