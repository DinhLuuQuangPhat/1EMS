import React, { useState, useEffect } from "react";
import { ActionHeader, FilterHeader, GridList, DialogDelete } from "../";
import { useStateContext } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {
    deleteLHCVI,
    getListLHCVI,
    lockLHCVI,
    resetLHCVI,
} from "../../actions/lhcvi";

const WorkTypeListMain = () => {
    const {
        setNotificationsAutoClose,
        getLabelValue,
        userData,
        setDisableLocation,
        beginDateList,
        endDateList,
    } = useStateContext();

    const PageInfo = {
        DcmnCode: "inpWorkType",
        UrlLinkNew: "/work-type/new",
        UrlLink: "/work-type/",
        TitlePage: getLabelValue(null, "Loại Hình Công Việc"), // Code 
    };

    const navigate = useNavigate();
    const actionAdd = () => {
        navigate(PageInfo.UrlLinkNew);
    };

    const dispatch = useDispatch();
    const listLHCVI = useSelector((state) => state.LHCVI.listMaster);

    const [lstChungTu, setLstChungTu] = useState([]);
    const [CountChungTu, setCountChungTu] = useState(0);

    useEffect(() => {
        if (listLHCVI && listLHCVI.length > 0) {
            setLstChungTu(listLHCVI);
            setCountChungTu(listLHCVI.length);
            setNotificationsAutoClose("Tải dữ liệu thành công");
        }
        if (listLHCVI && listLHCVI.length === 0) {
            setLstChungTu([]);
            setCountChungTu(0);
            setNotificationsAutoClose("Tải dữ liệu thành công");
        }
    }, [listLHCVI]);

    const loadListData = () => {
        const body = {
            DCMNCODE: PageInfo.DcmnCode,
            STTESIGN: 7,
            BEG_DATE: moment(beginDateList).format("YYYY-MM-DD"),
            END_DATE: moment(endDateList).format("YYYY-MM-DD"),
        };

        dispatch(getListLHCVI(body));
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
        dispatch(lockLHCVI(body));

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
            dispatch(deleteLHCVI(body));

            // Disable nut khi nhan thao tac
            setTimeout(() => {
                setDisableDel(false);
            }, 2000);
        }
        setDialogDelete(false);
    }, [acptDelete]);


    // Code xy ly khi Xóa, Khóa ct
    const postResult = useSelector((state) => state.LHCVI.postResult);
    useEffect(() => {
        if (postResult) {
            alert(postResult.RETNMSSG);

            if (postResult.RETNCODE) {
                if (postResult.RETNDATA !== null) {
                    loadListData();
                    dispatch(resetLHCVI());
                } else {
                    dispatch(resetLHCVI());
                }
                dispatch(resetLHCVI());
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

export default WorkTypeListMain;
