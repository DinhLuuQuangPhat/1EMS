import React, { useState, useEffect } from "react";
import { ActionHeader, FilterHeader, GridList, DialogDelete } from "../";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
    deleteTTCVI,
    getListTTCVI,
    lockTTCVI,
    resetTTCVI,
} from "../../actions/ttcvi";

const WorkOderListMain = () => {
    const {
        setNotificationsAutoClose,
        getLabelValue,
        userData,
        setDisableLocation,
        beginDateList,
        endDateList,
    } = useStateContext();

    const PageInfo = {
        DcmnCode: "inpWorkOder",
        UrlLinkNew: "/work-oder/new",
        UrlLink: "/work-oder/",
        TitlePage: getLabelValue(141, "Thứ Tự Công Việc"), // Code 
    };

    const navigate = useNavigate();
    const actionAdd = () => {
        navigate(PageInfo.UrlLinkNew);
    };

    const dispatch = useDispatch();
    const listTTCVI = useSelector((state) => state.TTCVI.listMaster);

    const [lstChungTu, setLstChungTu] = useState([]);
    const [CountChungTu, setCountChungTu] = useState(0);

    useEffect(() => {
        if (listTTCVI && listTTCVI.length > 0) {
            setLstChungTu(listTTCVI);
            setCountChungTu(listTTCVI.length);
            setNotificationsAutoClose("Tải dữ liệu thành công");
        }
        if (listTTCVI && listTTCVI.length === 0) {
            setLstChungTu([]);
            setCountChungTu(0);
            setNotificationsAutoClose("Tải dữ liệu thành công");
        }
    }, [listTTCVI]);

    const loadListData = () => {
        const body = {
            DCMNCODE: PageInfo.DcmnCode,
            STTESIGN: 7,
            BEG_DATE: moment(beginDateList).format("YYYY-MM-DD"),
            END_DATE: moment(endDateList).format("YYYY-MM-DD"),
        };

        dispatch(getListTTCVI(body));
    };
    useEffect(() => {
        loadListData();
    }, [userData]);

    // Event Chuc nang
    const [disableLock, setDisableLock] = useState(false);
    const lockClick = (dataItem) => {
        setDisableLock(true);

        const body = {
            DCMNCODE: PageInfo.DcmnCode,
            KEY_CODE: dataItem.KKKK0000,
        };
        dispatch(lockTTCVI(body));

        // Disable nut khi nhan thao tac
        setTimeout(() => {
            setDisableLock(false);
        }, 2000);
    };
    // Hien Popup khi xoa
    const [dialogDelete, setDialogDelete] = useState(false);
    const [acptDelete, setAcptDelete] = useState(false);
    const [disableDel, setDisableDel] = useState(false);
    const [dataItem, setDataItem] = useState();
    const deleteClick = (dataItem) => {
        setDialogDelete(true);
        setDataItem(dataItem);
    };
    const CancelDeleteHandler = () => {
        setDialogDelete(false);
        setDataItem();
        setAcptDelete(false);
    };
    useEffect(() => {
        if (acptDelete) {
            setDisableDel(true);

            const body = {
                DCMNCODE: PageInfo.DcmnCode,
                KEY_CODE: dataItem.KKKK0000,
            };
            dispatch(deleteTTCVI(body));

            // Disable nut khi nhan thao tac
            setTimeout(() => {
                setDisableDel(false);
            }, 2000);
        }
        setDialogDelete(false);
    }, [acptDelete]);


    // Code xy ly khi Xóa, Khóa ct
    const postResult = useSelector((state) => state.TTCVI.postResult);
    useEffect(() => {
        if (postResult) {
            alert(postResult.RETNMSSG);

            if (postResult.RETNCODE) {
                if (postResult.RETNDATA !== null) {
                    loadListData();
                    dispatch(resetTTCVI());
                } else {
                    dispatch(resetTTCVI());
                }
                dispatch(resetTTCVI());
            }
            loadListData();
        }
    }, [postResult]);
    return (
        <>
            <ActionHeader
                mode={"LIST"}
                AcceRght={1}
                StteSign={0}
                add={actionAdd}
                TitlePage={PageInfo.TitlePage}
            />

            <div>
                <FilterHeader onClick={loadListData} CountChungTu={CountChungTu} />
                <GridList
                    DcmnCode={PageInfo.DcmnCode}
                    datalist={lstChungTu}
                    UrlLink={PageInfo.UrlLink}
                    lockClick={lockClick}
                    deleteClick={deleteClick}
                    disableLock={disableLock}
                    disableDel={disableDel}
                />
            </div>

            {dialogDelete && (
                <DialogDelete
                    acptDelete={acptDelete}
                    setAcptDelete={setAcptDelete}
                    dialogDelete={dialogDelete}
                    setDialogDelete={setDialogDelete}
                    onCancelDelete={CancelDeleteHandler}
                    MainCode={dataItem?.MAINCODE}
                />
            )}
        </>
    );
}
export default WorkOderListMain;