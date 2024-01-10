import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { v4 } from "uuid";
import moment from "moment/moment";
import { apiUrl, baseUrl } from "../../constants";

import {
    getDetailDSCH,
    deleteDSCH,
    postDSCH,
    updateDSCH,
    lockDSCH,
    resetDSCH,
} from "../../actions/dsch";

import { getApprovalProcess, getReviewProcess } from "../../actions/document";

import {
    ActionHeader,
    TitleHeader,
    FieldEditDropdown,
    FieldEditNumberic,
    FieldEditMaskText,
    FieldEditTextArea,
    DialogSystem,
    DialogDelete,
} from "..";

import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

const DSCHEditMain = (props) => {
    const [tabSelected, setTabSelected] = useState(0);
    const [mode, setMode] = useState(props.mode);
    useEffect(() => {
        props.keycode === undefined ? setMode("ADD") : setMode(props.mode);
    }, [props.keycode]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getLabelValue, appColors, userData } = useStateContext();

    const PageInfo = {
        TitlePage: getLabelValue(null, "Danh Sách Câu Hỏi"),
        UrlLink: "/list-question/",
        UrlLinkNew: "/list-question/new",
        DcmnCode: "inpCkLsCntn",
    };

    // Chi tiet loai hinh cong viec
    const DetailDSCH = useSelector((state) => state.DSCH.detailInvc); // state.DSCH, cái DSCH dựa vào DSCH trong combineReducers của reducers/index.js
    const [AcceRght, setAcceRght] = useState(0);
    const [StteSign, setStteSign] = useState(0);
    // Cho phep sua du lieu hay khong
    const [permissions, setPermissions] = useState(true);

    // Khoi tao ct
    const initHeader = {
        COMPCODE: "",
        CHCKCODE: "",
        GRP_CODE: "",
        CHCKNAME: "",
        CHCKDESC: "",
        INPTNUMB: 0,
        CHCKOPTN: 0,
    };
    const [header, setHeader] = useState(initHeader);
    useEffect(() => {
        if (DetailDSCH) {
            setHeader(DetailDSCH !== undefined ? DetailDSCH : initHeader);
            DetailDSCH.STTESIGN <= 0 ? setPermissions(true) : setPermissions(false);
            setAcceRght(DetailDSCH.ACCERGHT);
            setStteSign(DetailDSCH.STTESIGN);
        }

        if (!DetailDSCH) {
            setHeader(initHeader);
            setAcceRght(1);
            setStteSign(0);
            setPermissions(true);
        }

        setDataReviewProcess("");
        setDataApprovalProcess("");
    }, [DetailDSCH]);


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
        if (header.GRP_CODE === "" || header.GRP_CODE === null) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng chọn mã nhóm câu hỏi",
            });
            return;
        }
        else if (header.CHCKNAME === "" || header.CHCKNAME === null) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng nhập tên của checkList",
            });
            return;
        }
        else if (header.CHCKDESC === "" || header.CHCKDESC === null) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng nhập mô tả hướng dẫn của checkList",
            });
            return;
        }
        else if (header.INPTNUMB < 0) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng nhập số lần được báo cáo tối đa",
            });
            return;
        }
        else if (header.CHCKOPTN < 0) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng chọn tùy chọn của checkList",
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
                dispatch(updateDSCH(postJson));
            } else {
                // Post
                dispatch(postDSCH(postJson));
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

    const ChckOptnChgeHandler = (e) => {
        if (header.CHCKOPTN !== e.value.CHCKOPTN) {
            setHeader({
                ...header,
                CHCKOPTN: e.value.CHCKOPTN,
            });
        } else {
            setHeader({
                ...header,
                CHCKOPTN: e.value.CHCKOPTN,
            });
        }
    };
    const Grp_CodeChgeHandler = (e) => {
        if (header.GRP_CODE !== e.value.GRP_CODE) {
            setHeader({
                ...header,
                GRP_CODE: e.value.GRP_CODE,
            });
        } else {
            setHeader({
                ...header,
                GRP_CODE: e.value.GRP_CODE,
            });
        }
    };

    useEffect(() => {
        if (acptDelete) {
            setDisableDel(true);

            const body = {
                DCMNCODE: PageInfo.DcmnCode,
                KEY_CODE: header.KKKK0000,
            };
            dispatch(deleteDSCH(body));

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
        dispatch(lockDSCH(body));

        // Disable nut khi nhan thao tac
        setTimeout(() => {
            setDisableLock(false);
        }, 2000);
    };

    // Code xy ly khi Post ct
    const postResult = useSelector((state) => state.DSCH.postResult);
    useEffect(() => {
        if (postResult) {
            alert(postResult.RETNMSSG);

            if (postResult.RETNCODE) {
                if (postResult.RETNDATA !== null) {
                    dispatch(getDetailDSCH(postResult.RETNDATA[0].KKKK0000));
                    setMode("EDIT");
                } else {
                    dispatch(resetDSCH());
                    dispatch(getDetailDSCH());
                    navigate(PageInfo.UrlLink);
                }
            }
            dispatch(resetDSCH());
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
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="w-full">
                                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-3">
                                            {/* So chung tu */}
                                            <FieldEditMaskText
                                                id="CHCKCODE"
                                                name="CHCKCODE"
                                                title={getLabelValue(null, "Mã số checkList")}
                                                value={header?.CHCKCODE}
                                            />
                                            {/* Ma so nhom cau hoi */}
                                            <FieldEditDropdown
                                                title={getLabelValue(null, "Mã số nhóm câu hỏi")}
                                                id={"GRP_CODE"}
                                                data={[]}
                                                defaultValue={{}}
                                                value={{}}
                                                textField="{}"
                                                dataItemKey="{}"
                                                onChange={Grp_CodeChgeHandler}
                                                disabled={!permissions}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            {/* Ten cua checkList */}
                                            <FieldEditTextArea
                                                title={getLabelValue(null, "Tên của checkList")}
                                                id={"CHCKNAME"}
                                                value={header?.CHCKNAME}
                                                defaultValue={header?.CHCKNAME}
                                                onChange={(e) => {
                                                    setHeader({ ...header, CHCKNAME: e.value });
                                                }}
                                                disabled={!permissions}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-3">
                                            {/* So lan duoc bao cao toi da */}
                                            <FieldEditNumberic
                                                title={getLabelValue(null, "Số lần được báo cáo tối đa")}
                                                id={"INPTNUMB"}
                                                value={header.INPTNUMB ? header.INPTNUMB : 0}
                                                // format="n2"
                                                onChange={(e) => {
                                                    setHeader({
                                                        ...header,
                                                        INPTNUMB: e.value,
                                                    });
                                                }}
                                                disabled={!permissions}
                                            />
                                            {/* Ti le de tinh hieu qua cong viec */}
                                            <FieldEditDropdown
                                                title={getLabelValue(null, "Tùy chọn của checkList")}
                                                id={"CHCKOPTN"}
                                                data={[]}
                                                defaultValue={{}}
                                                value={{}}
                                                textField="{}"
                                                dataItemKey="{}"
                                                onChange={ChckOptnChgeHandler}
                                                disabled={!permissions}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            {/* Mo ta huong dan cua checkList */}
                                            <FieldEditTextArea
                                                title={getLabelValue(null, "Mô tả hướng dẫn của checkList")}
                                                id={"CHCKDESC"}
                                                value={header?.CHCKDESC}
                                                defaultValue={header?.CHCKDESC}
                                                onChange={(e) => {
                                                    setHeader({ ...header, CHCKDESC: e.value });
                                                }}
                                                disabled={!permissions}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </TabStripTab>
                            {mode === 'ADD' ?
                                <TabStripTab title={getLabelValue(null, "Chi tiết")}>
                                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                                        <div className="w-full">
                                            <div className="mb-3">
                                                {/* Ma so checkList */}
                                                <FieldEditMaskText
                                                    id="CHCKCODE"
                                                    name="CHCKCODE"
                                                    title={getLabelValue(null, "Mã số checkList")}
                                                    value={header?.CHCKCODE}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="mb-3">
                                                {/* Ma so cau hoi */}
                                                <FieldEditMaskText
                                                    id="QUESCODE"
                                                    name="QUESCODE"
                                                    title={getLabelValue(null, "Mã số câu hỏi")}
                                                    value={header?.QUESCODE}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </TabStripTab>
                                : []
                            }
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

export default DSCHEditMain;
