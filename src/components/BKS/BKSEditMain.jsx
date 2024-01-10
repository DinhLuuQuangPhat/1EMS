import React, { useEffect, useState, useRef } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../../context/ContextProvider";
import { v4 } from "uuid";
import moment from "moment/moment";
import { apiUrl, baseUrl } from "../../constants";

import {
    getDetailBKS,
    deleteBKS,
    postBKS,
    updateBKS,
    lockBKS,
    resetBKS,
} from "../../actions/bks";

import { getApprovalProcess, getReviewProcess } from "../../actions/document";

import {
    AiOutlineFilePdf,
    AiOutlineFileExcel,
    AiOutlineFileWord,
    AiOutlineFileImage,
    AiOutlineFileText,
    AiFillFileImage,
} from "react-icons/ai";

import {
    ActionHeader,
    TitleHeader,
    FieldEditDropdown,
    FieldEditNumberic,
    FieldEditMaskText,
    FileItem,
    FieldEditTextArea,
    DialogSystem,
    DialogDelete,
} from "../";

import { TabStrip, TabStripTab } from "@progress/kendo-react-layout";

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

const AdvanceProposalEditMain = (props) => {
    const [tabSelected, setTabSelected] = useState(0);
    const [mode, setMode] = useState(props.mode);
    useEffect(() => {
        props.keycode === undefined ? setMode("ADD") : setMode(props.mode);
    }, [props.keycode]);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { getLabelValue, appColors, userData } = useStateContext();

    const PageInfo = {
        TitlePage: getLabelValue(null, "Bảng Khảo Sát"),
        UrlLink: "/list-content/",
        UrlLinkNew: "/list-content/new",
        DcmnCode: "inpCkLsQues",
    };

    // Chi tiet chung tu Tam ung
    const DetailBKS = useSelector((state) => state.BKS.detailInvc); // state.BKS, cái BKS dựa vào BKS trong combineReducers của reducers/index.js
    const [AcceRght, setAcceRght] = useState(0);
    const [StteSign, setStteSign] = useState(0);
    // Cho phep sua du lieu hay khong
    const [permissions, setPermissions] = useState(true);

    // Khoi tao ct
    const initHeader = {
        COMPCODE: "",
        DOMNCODE: "",
        GRP_CODE: "",
        QUESCODE: "",
        QUESNAME: "",
        LABLNAME: 0,
        QUESNOTE: "",
        QUESTYPE: 0,
        ANSWTEXT: "",
        ANSW_MIN: "",
        ANSW_MAX: "",
    };
    const [header, setHeader] = useState(initHeader);
    useEffect(() => {
        if (DetailBKS) {
            setHeader(DetailBKS !== undefined ? DetailBKS : initHeader);
            setAnswType(DetailBKS.ANSWTYPE)
            var fileList = DetailBKS.FILELIST;
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

            DetailBKS.STTESIGN <= 0 ? setPermissions(true) : setPermissions(false);
            setAcceRght(DetailBKS.ACCERGHT);
            setStteSign(DetailBKS.STTESIGN);
        }

        if (!DetailBKS) {
            setHeader(initHeader);
            setAcceRght(1);
            setStteSign(0);
            setPermissions(true);
            setFiles([]);
        }

        setDataReviewProcess("");
        setDataApprovalProcess("");
    }, [DetailBKS]);

    // dach sach listcode


    // hien thi nhap van ban bo sung
    const [AnswType, setAnswType] = useState(0);
    const [AnswTypeText, setAnswTypeText] = useState("Không");
    useEffect(() => {
        if (AnswType == 1) {
            setAnswTypeText("Có")
        }
    })


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
        setFiles([]);
        setMode("ADD");
    };
    const actionDup = () => {
        setHeader({
            ...header,
            STTESIGN: 0,
            STTENAME: "",
            MAINCODE: "",
            MAINDATE: moment(new Date()).format("YYYY-MM-DD"),
            KKKK0000: "",
            FILELIST: [],
        });
        setAcceRght(1);
        setStteSign(0);
        setPermissions(true);
        setFiles([]);
        setMode("DUP");
    };
    const actionSave = () => {
        if (header.DOMNCODE === "" || header.DOMNCODE === null) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng chọn mã lãnh vực",
            });
            return;
        }
        else if (header.GRP_CODE === "" || header.GRP_CODE === null) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng chọn mã lãnh vực",
            });
            return;
        }
        else if (header.QUESNAME === "" || header.QUESNAME === null) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng nhập nội dung câu hỏi",
            });
            return;
        }
        else if (header.QUESNOTE === "" || header.QUESNOTE === null) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng nhập giải thích câu hỏi",
            });
            return;
        }
        else if (header.ANSWTEXT === "" || header.ANSWTEXT === null) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng nhập lời dẫn cho phần nhập trả lời",
            });
            return;
        }
        else if (header.ANSW_MIN < 0) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng nhập giá trị giữa Min",
            });
            return;
        }
        else if (header.ANSW_MAX < 0) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng nhập giá trị giữa Max",
            });
            return;
        }
        else if (header.QUESTYPE < 0) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng chọn hình thức câu hỏi",
            });
            return;
        }
        else if (header.LABLNAME < 0) {
            setOpenNotify(true);
            setContentNotify({
                type: "",
                content: "Vui lòng chọn mã nhãn tính chất công việc",
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
                dispatch(updateBKS(postJson));
            } else {
                // Post
                dispatch(postBKS(postJson));
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

    const DomnCodeChgeHandler = (e) => {
        if (header.DOMNCODE !== e.value.DOMNCODE) {
            setHeader({
                ...header,
                DOMNCODE: e.value.DOMNCODE,
            });
        } else {
            setHeader({
                ...header,
                DOMNCODE: e.value.DOMNCODE,
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

    const LablNameChgeHandler = (e) => {
        if (header.LABLNAME !== e.value.LABLNAME) {
            setHeader({
                ...header,
                LABLNAME: e.value.LABLNAME,
            });
        } else {
            setHeader({
                ...header,
                LABLNAME: e.value.LABLNAME,
            });
        }
    };

    const QuesTypeChgeHandler = (e) => {
        if (header.QUESTYPE !== e.value.QUESTYPE) {
            setHeader({
                ...header,
                QUESTYPE: e.value.QUESTYPE,
            });
        } else {
            setHeader({
                ...header,
                QUESTYPE: e.value.QUESTYPE,
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
            dispatch(deleteBKS(body));

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
        dispatch(lockBKS(body));

        // Disable nut khi nhan thao tac
        setTimeout(() => {
            setDisableLock(false);
        }, 2000);
    };

    // Code xy ly khi Post ct
    const postResult = useSelector((state) => state.BKS.postResult);
    useEffect(() => {
        if (postResult) {
            alert(postResult.RETNMSSG);

            if (postResult.RETNCODE) {
                deleteFiles();
                if (postResult.RETNDATA !== null) {
                    if (files.length > 0) {
                        doPostFile(postResult.RETNDATA[0].KKKK0000);
                    }
                    dispatch(getDetailBKS(postResult.RETNDATA[0].KKKK0000));
                    setMode("EDIT");
                } else {
                    dispatch(resetBKS());
                    dispatch(getDetailBKS());
                    navigate(PageInfo.UrlLink);
                }
            }
            dispatch(resetBKS());
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
            // .then((result) => {})
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    };

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

    // Event

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
    // console.log(header.ANSW_MIN)
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
                                <div className="grid grid-cols-1 lg:grid-cols-3 smd:grid-cols-2  gap-4">
                                    <div className="w-full">
                                        <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-3">
                                            {/* So chung tu */}
                                            <FieldEditMaskText
                                                id="QUESCODE"
                                                name="QUESCODE"
                                                title={getLabelValue(null, "Mã số câu hỏi")}
                                                value={header?.QUESCODE}
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
                                            {/* Noi dung cau hoi */}
                                            <FieldEditTextArea
                                                title={getLabelValue(null, "Nội dung câu hỏi")}
                                                id={"QUESNAME"}
                                                value={header?.QUESNAME}
                                                defaultValue={header?.QUESNAME}
                                                onChange={(e) => {
                                                    setHeader({ ...header, QUESNAME: e.value });
                                                }}
                                                disabled={!permissions}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="grid grid-cols-1 xs:grid-cols-9 gap-4 mb-3">
                                            <div className="xs:col-span-3">
                                                {/* Ma so lanh vuc */}
                                                <FieldEditDropdown
                                                    title={getLabelValue(null, "Mã số lãnh vực")}
                                                    id={"DOMNCODE"}
                                                    data={[]}
                                                    defaultValue={{}}
                                                    value={{}}
                                                    textField="{}"
                                                    dataItemKey="{}"
                                                    onChange={DomnCodeChgeHandler}
                                                    disabled={!permissions}
                                                />
                                            </div>
                                            <div className="xs:col-span-6">
                                                <div className="grid grid-cols-1 xs:grid-cols-2 gap-1">
                                                    {/* Gia tri giua Min */}
                                                    <FieldEditNumberic
                                                        title={getLabelValue(null, "Giá trị giữa Min")}
                                                        id={"ANSW_MIN"}
                                                        value={header.ANSW_MIN ? header.ANSW_MIN : 0}
                                                        format="n2"
                                                        onChange={(e) => {
                                                            setHeader({
                                                                ...header,
                                                                ANSW_MIN: e.value,
                                                            });
                                                        }}
                                                    />
                                                    {/* Gia tri giua Max */}
                                                    <FieldEditNumberic
                                                        title={getLabelValue(null, "Giá trị giữa Max")}
                                                        id={"ANSW_MAX"}
                                                        value={header.ANSW_MAX ? header.ANSW_MAX : 0}
                                                        format="n2"
                                                        onChange={(e) => {
                                                            setHeader({
                                                                ...header,
                                                                ANSW_MAX: e.value,
                                                            });
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            {/* Giai thich cau hoi */}
                                            <FieldEditTextArea
                                                title={getLabelValue(null, "Giải thích câu hỏi")}
                                                id={"QUESNOTE"}
                                                value={header?.QUESNOTE}
                                                defaultValue={header?.QUESNOTE}
                                                onChange={(e) => {
                                                    setHeader({ ...header, QUESNOTE: e.value });
                                                }}
                                                disabled={!permissions}
                                            />
                                        </div>
                                    </div>
                                    <div className="w-full">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                                            {/* Ti le de tinh hieu qua cong viec */}
                                            <FieldEditDropdown
                                                title={getLabelValue(null, "Hình thức câu hỏi")}
                                                id={"QUESTYPE"}
                                                data={[]}
                                                defaultValue={{}}
                                                value={{}}
                                                textField="{}"
                                                dataItemKey="{}"
                                                onChange={QuesTypeChgeHandler}
                                                disabled={!permissions}
                                            />
                                            {/* Nhan lien ket ten */}
                                            <FieldEditDropdown
                                                title={getLabelValue(null, "Nhãn liên kết tên")}
                                                id={"LABLNAME"}
                                                data={[]}
                                                defaultValue={{}}
                                                value={{}}
                                                textField="{}"
                                                dataItemKey="{}"
                                                onChange={LablNameChgeHandler}
                                                disabled={!permissions}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            {/* Loi dan cho phan nhap tra loi */}
                                            <FieldEditTextArea
                                                title={getLabelValue(null, "Lời dẫn cho phần nhập trả lời")}
                                                id={"ANSWTEXT"}
                                                value={header?.ANSWTEXT}
                                                defaultValue={header?.ANSWTEXT}
                                                onChange={(e) => {
                                                    setHeader({ ...header, ANSWTEXT: e.value });
                                                }}
                                                disabled={!permissions}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            {/* File dinh kem */}
                                            <div className="file-attach">
                                                <div className="flex mb-3">
                                                    <p className="w-full">
                                                        {getLabelValue(57, "File đính kèm")}
                                                    </p>
                                                    {permissions && (
                                                        <input
                                                            type="file"
                                                            multiple
                                                            className="text-sm cursor-pointer relative block w-32 h-full"
                                                            onChange={(e) => {
                                                                onFileSelected(e);
                                                                e.target.value == null;
                                                            }}
                                                            disabled={!permissions}
                                                        />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="fileattachment">
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
                                    </div>
                                </div>
                                <div >

                                </div>
                            </TabStripTab>
                            {mode === 'ADD' ?
                                <TabStripTab title={getLabelValue(null, "Chi tiết")}>
                                    <div className="grid grid-cols-1 smd:grid-cols-2 gap-4">
                                        <div className="w-full">
                                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-3">
                                                {/* Ma so cau hoi */}
                                                <FieldEditMaskText
                                                    id="QUESCODE"
                                                    name="QUESCODE"
                                                    title={getLabelValue(null, "Mã số câu hỏi")}
                                                    value={header?.QUESCODE}
                                                />
                                                {/* So thu tu */}
                                                <FieldEditMaskText
                                                    id="QUESODER"
                                                    name="QUESODER"
                                                    title={getLabelValue(null, "Số thứ tự")}
                                                    value={header?.QUESODER}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                {/* Gia tri tuong ung voi dong tra loi */}
                                                <FieldEditMaskText
                                                    title={getLabelValue(null, "Giá trị tương ứng với dòng trả lời")}
                                                    id="ANSWNUMB"
                                                    name="ANSWNUMB"
                                                    value={header?.ANSWNUMB}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full">
                                            <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 mb-3">
                                                {/* Co nhap van ban bo sung */}
                                                <FieldEditMaskText
                                                    title={getLabelValue(null, "Có nhập văn bản bổ sung ")}
                                                    id="ANSWTYPE"
                                                    name="ANSWTYPE"
                                                    value={AnswTypeText}
                                                />
                                                {/* Ket qua tra loi dung */}
                                                <FieldEditMaskText
                                                    title={getLabelValue(null, "Kết quả trả lời đúng")}
                                                    id="ANSWSELE"
                                                    name="ANSWSELE"
                                                    value={header?.ANSWSELE}
                                                />
                                            </div>
                                            <div className="mb-3">
                                                {/* Noi dung dong */}
                                                <FieldEditMaskText
                                                    title={getLabelValue(null, "Nội dung dòng")}
                                                    id="SUB_NAME"
                                                    name="SUB_NAME"
                                                    value={header?.SUB_NAME}
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
    );
};

export default AdvanceProposalEditMain;
