import React, { useEffect, useState } from "react";
import { useStateContext } from "../../context/ContextProvider";

import { useDispatch, useSelector } from "react-redux";
import { getLstLocationAll } from "../../actions/common";
import FilterAdvn from "./FilterAdvn";

import {
  DatePicker,
  MultiViewCalendar,
} from "@progress/kendo-react-dateinputs";
import { DropDownList } from "@progress/kendo-react-dropdowns";
import { Input, Checkbox } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { Dialog, DialogActionsBar } from "@progress/kendo-react-dialogs";

import moment from "moment";
import { getListDcmnCntn } from "../../actions/document";

export const CustomCalendar = (props) => {
  return <MultiViewCalendar {...props} views={1} />;
};

const FilterSmpl = (props) => {
  const { dataFilter, setDataFilter } = props;

  const { getLabelValue } = useStateContext();

  const TitleFilter = getLabelValue(154, "Tìm kiếm");
  const TitleAdvnFilter = getLabelValue(155, "Tìm nâng cao");

  const dispatch = useDispatch();
  const lstLocationAll = useSelector((state) => state.common.lstLocationAll);
  useEffect(() => {
    dispatch(getLstLocationAll());
  }, [dispatch]);

  const initFilterSmpl = {
    ChckTime: 0, //0: Khong; 1: Co
    Beg_Date: moment(new Date()).format("YYYY-MM-DD"),
    End_Date: moment(new Date()).format("YYYY-MM-DD"),
    LctnList: "%",
    CntnBrif: "",
  };
  const [filterSmplData, setFilterSmplData] = useState(initFilterSmpl);

  // Event handlers
  // Check chon loc thoi gian
  const ChckFlterDateChange = (event) => {
    if (event.value) {
      setDataFilter({
        ...dataFilter,
        ChckTime: 1,
        Beg_Date: moment(beginDate).format("YYYY-MM-DD"),
        End_Date: moment(endDate).format("YYYY-MM-DD"),
      });
    } else {
      setFilterSmplData({
        ...filterSmplData,
        ChckTime: 0,
        Beg_Date: moment(new Date()).format("YYYY-MM-DD"),
        End_Date: moment(new Date()).format("YYYY-MM-DD"),
      });

      setAdvnFilter({
        ...advnFilter,
        ChckTime: 0,
        Beg_Date: moment(new Date()).format("YYYY-MM-DD"),
        End_Date: moment(new Date()).format("YYYY-MM-DD"),
      });

      // test code
      setDataFilter({
        ...dataFilter,
        ChckTime: 0,
        Beg_Date: moment(new Date()).format("YYYY-MM-DD"),
        End_Date: moment(new Date()).format("YYYY-MM-DD"),
      });
    }
  };

  const [beginDate, setBeginDate] = useState(new Date());
  const BeginDateChgeHandler = (event) => {
    setBeginDate(event.value);

    setDataFilter({
      ...dataFilter,
      Beg_Date: moment(event.value).format("YYYY-MM-DD"),
    });
  };

  const [endDate, setEndDate] = useState(new Date());
  const EndDateChgeHandler = (event) => {
    setEndDate(event.value);

    setDataFilter({
      ...dataFilter,
      End_Date: moment(event.value).format("YYYY-MM-DD"),
    });
  };

  const LocationChgeHandler = (event) => {
    setDataFilter({
      ...dataFilter,
      LctnList: event.value.ITEMCODE,
    });
  };

  const InptChgehandler = (event) => {
    setDataFilter({
      ...dataFilter,
      CntnBrif: event.value,
    });
  };

  // Tim kiem nhanh
  const ChckFlterSmplChange = () => {
    dispatch(getListDcmnCntn(dataFilter));
  };

  ////// Tim kiem nang cao //////
  const initAdvnFilter = {
    LctnList: "%",
    MainNumb: "",
    DcTpCode: "",
    CntnCode: "",
    CntnBrif: "",
    CntnDcmn: "",
    Set_Code: "",
    CabnCode: "",
    StorCabn: "",
    Beg_Date: moment(new Date()).format("YYYY-MM-DD"),
    End_Date: moment(new Date()).format("YYYY-MM-DD"),
    ChckTime: 0,
    All_Dcmn: 0,
    DcmnYear: "",
    PblsCode: "",
  };
  const [openAdvnSrch, setOpenAdvnSrch] = useState(false);
  const [advnFilter, setAdvnFilter] = useState(initAdvnFilter);
  const AdvnClickHandler = () => {
    setOpenAdvnSrch(!openAdvnSrch);
  };
  const CancelFlterAdvnHandler = () => {
    setOpenAdvnSrch(!openAdvnSrch);
  };
  const SubmitFlterAdvnHandler = () => {
    if (
      dataFilter.Beg_Date > dataFilter.Beg_Date &&
      dataFilter.ChckTime === 1
    ) {
      setOpenNotify(true);
      setOpenAdvnSrch(!openAdvnSrch);
      return;
    } else {
      dispatch(getListDcmnCntn(dataFilter));
      setOpenAdvnSrch(!openAdvnSrch);
    }
  };

  //Hien thong bao
  const [openNotify, setOpenNotify] = useState(false);
  const ConfirmDialog = () => {
    setOpenNotify(false);
  };
  const contentDialog = "Ngày bắt đầu LỚN HƠN ngày kết thúc";

  return (
    <div className='w-full filter relative mb-3'>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-12 col-start-1 md:col-span-6 lg:col-span-5 sm:col-span-6 ss:col-span-12'>
          {/* Loc theo ngay & ngay bat dau & Ngay ket thuc */}
          <div className='grid grid-cols-none sm:grid-cols-3 gap-4'>
            {/* Loc theo thoi gian */}
            <Checkbox
              value={dataFilter?.ChckTime}
              onChange={ChckFlterDateChange}
              label={getLabelValue(153, "Lọc theo thời gian")}
              size='small'
            />

            {/* Ngay bat dau */}
            <DatePicker
              calendar={CustomCalendar}
              format='dd/MM/yyyy'
              value={new Date(dataFilter?.Beg_Date)}
              onChange={BeginDateChgeHandler}
              size='small'
            />

            {/* Ngay ket thuc */}
            <DatePicker
              calendar={CustomCalendar}
              format='dd/MM/yyyy'
              value={new Date(dataFilter?.End_Date)}
              onChange={EndDateChgeHandler}
              size='small'
            />
          </div>
        </div>

        {/* Chi nhanh */}
        <div className='col-span-12 md:col-span-6 md:col-start-7 lg:col-start-6 lg:col-span-2 sm:col-start-7 sm:col-span-6 ss:col-span-12'>
          <DropDownList
            data={lstLocationAll}
            onChange={LocationChgeHandler}
            value={
              lstLocationAll
                ? lstLocationAll.find(
                    (item) => item.ITEMCODE === dataFilter?.LctnList
                  )
                : {}
            }
            textField='ITEMNAME'
            dataItemKey='ITEMCODE'
            size='small'
          />
        </div>

        {/* Input Tim kiem */}
        <div className='col-span-12 md:col-span-6 md:col-start-1 lg:col-start-8 lg:col-span-2 sm:col-start-1 sm:col-span-6 ss:col-span-12'>
          <Input value={dataFilter?.CntnBrif} onChange={InptChgehandler} />
        </div>

        {/* Nut Tim kiem */}
        <div className='col-span-12 md:col-span-6 md:col-start-7 lg:col-start-10 lg:col-span-3 sm:col-start-7 sm:col-span-6 ss:col-span-12'>
          <Button
            icon='search'
            size='small'
            // onClick={props.getFltrSmplData}
            onClick={ChckFlterSmplChange}
          >
            {TitleFilter}
          </Button>

          <Button icon='search' size='small' onClick={AdvnClickHandler}>
            {TitleAdvnFilter}
          </Button>
        </div>
      </div>

      <div className='relative'>
        {openAdvnSrch && (
          <FilterAdvn
            onCancel={CancelFlterAdvnHandler}
            onSubmit={SubmitFlterAdvnHandler}
            dataFilter={dataFilter}
            setDataFilter={setDataFilter}
          />
        )}
      </div>

      {openNotify && (
        <Dialog
          title={getLabelValue(83, "Thông báo")}
          onClose={ConfirmDialog}
          minWidth={300}
        >
          {contentDialog}
          <DialogActionsBar layout='center'>
            <button
              className='k-button k-button-md k-rounded-md k-button-solid k-button-solid-base'
              onClick={ConfirmDialog}
            >
              {getLabelValue(84, "Đóng")}
            </button>
          </DialogActionsBar>
        </Dialog>
      )}
    </div>
  );
};

export default FilterSmpl;
