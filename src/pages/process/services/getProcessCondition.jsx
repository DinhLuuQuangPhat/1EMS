import {useEffect, useState} from "react";
import api from "../../../api";
import {ProcessAPI} from "./api";

export default function getProcessCondition(autoLoad) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if(autoLoad){
      getConditions();
    }
  }, [autoLoad]);

  const getConditions = () => {
    const request = {
      "LISTLIST":
        [
          {"LISTCODE": "Enum_apvCmprOprt"},
        ]
    }

    api(localStorage.getItem("usertoken"))
      .post(ProcessAPI.getCategories, request)
      .then((res) => {
        const records = res.data.RETNDATA;

        const conditions = records.filter((rc) => {
          return rc.LISTCODE === "Enum_apvCmprOprt"
        });

        setData(conditions);
      })
      .catch((err) => {
        setError(err);
      });
  };

  return {
    getConditions: getConditions, data: data, error: error,
  }
}

export const success = {
  "RETNCODE": true,
  "RETNDATE": "2023-09-30T17:38:02.298132+07:00",
  "RETNMSSG": "Đọc dữ liệu thành công",
  "RETNDATA": [
    {
      "KEY_CODE": "Enum_apvObjcType3",
      "LISTCODE": "Enum_apvObjcType",
      "ITEM_KEY": "3",
      "ITEMCODE": "3",
      "ITEMNAME": "Người cụ thẻ",
      "ITEMSRCH": "3 - Người cụ thẻ",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "0"
    },
    {
      "KEY_CODE": "Enum_apvObjcType1",
      "LISTCODE": "Enum_apvObjcType",
      "ITEM_KEY": "1",
      "ITEMCODE": "1",
      "ITEMNAME": "Chức danh ",
      "ITEMSRCH": "1 - Chức danh ",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "1"
    },
    {
      "KEY_CODE": "Enum_apvObjcType2",
      "LISTCODE": "Enum_apvObjcType",
      "ITEM_KEY": "2",
      "ITEMCODE": "2",
      "ITEMNAME": "Chức vụ",
      "ITEMSRCH": "2 - Chức vụ",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "2"
    },
    {
      "KEY_CODE": "lstPosition000001",
      "LISTCODE": "lstPosition",
      "ITEM_KEY": "000001",
      "ITEMCODE": "000001",
      "ITEMNAME": "Tổng Giám Đốc",
      "ITEMSRCH": "000001 - Tổng Giám Đốc",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "000001"
    },
    {
      "KEY_CODE": "lstPosition000002",
      "LISTCODE": "lstPosition",
      "ITEM_KEY": "000002",
      "ITEMCODE": "000002",
      "ITEMNAME": "Giám Đốc",
      "ITEMSRCH": "000002 - Giám Đốc",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "000002"
    },
    {
      "KEY_CODE": "lstPosition000003",
      "LISTCODE": "lstPosition",
      "ITEM_KEY": "000003",
      "ITEMCODE": "000003",
      "ITEMNAME": "Kế Toán Trưởng",
      "ITEMSRCH": "000003 - Kế Toán Trưởng",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "000003"
    },
    {
      "KEY_CODE": "lstPosition000004",
      "LISTCODE": "lstPosition",
      "ITEM_KEY": "000004",
      "ITEMCODE": "000004",
      "ITEMNAME": "Trưởng Phòng",
      "ITEMSRCH": "000004 - Trưởng Phòng",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "000004"
    },
    {
      "KEY_CODE": "lstPosition000005",
      "LISTCODE": "lstPosition",
      "ITEM_KEY": "000005",
      "ITEMCODE": "000005",
      "ITEMNAME": "Quản lý sản xuất",
      "ITEMSRCH": "000005 - Quản lý sản xuất",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "000005"
    },
    {
      "KEY_CODE": "lstPosition000006",
      "LISTCODE": "lstPosition",
      "ITEM_KEY": "000006",
      "ITEMCODE": "000006",
      "ITEMNAME": "Nhân viên",
      "ITEMSRCH": "000006 - Nhân viên",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "000006"
    },
    {
      "KEY_CODE": "lstPosition000007",
      "LISTCODE": "lstPosition",
      "ITEM_KEY": "000007",
      "ITEMCODE": "000007",
      "ITEMNAME": "Tổ trưởng",
      "ITEMSRCH": "000007 - Tổ trưởng",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "000007"
    },
    {
      "KEY_CODE": "lstPosition000008",
      "LISTCODE": "lstPosition",
      "ITEM_KEY": "000008",
      "ITEMCODE": "000008",
      "ITEMNAME": "Công nhân",
      "ITEMSRCH": "000008 - Công nhân",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "000008"
    },
    {
      "KEY_CODE": "lstPosition000009",
      "LISTCODE": "lstPosition",
      "ITEM_KEY": "000009",
      "ITEMCODE": "000009",
      "ITEMNAME": "Kiểm soát",
      "ITEMSRCH": "000009 - Kiểm soát",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "000009"
    },
    {
      "KEY_CODE": "lstJob000020",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000020",
      "ITEMCODE": "000020",
      "ITEMNAME": "Bảo vệ",
      "ITEMSRCH": "000020 - Bảo vệ",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "B?o v?"
    },
    {
      "KEY_CODE": "lstJob000028",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000028",
      "ITEMCODE": "000028",
      "ITEMNAME": "Bảo vệ sản xuất",
      "ITEMSRCH": "000028 - Bảo vệ sản xuất",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "B?o v? s?n xu?t"
    },
    {
      "KEY_CODE": "lstJob000017",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000017",
      "ITEMCODE": "000017",
      "ITEMNAME": "Công nhân",
      "ITEMSRCH": "000017 - Công nhân",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Công nhân"
    },
    {
      "KEY_CODE": "lstJob000027",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000027",
      "ITEMCODE": "000027",
      "ITEMNAME": "Công nhân sản xuất nhà máy",
      "ITEMSRCH": "000027 - Công nhân sản xuất nhà máy",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Công nhân s?n xu?t n"
    },
    {
      "KEY_CODE": "lstJob000018",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000018",
      "ITEMCODE": "000018",
      "ITEMNAME": "Công nhân tạp vụ",
      "ITEMSRCH": "000018 - Công nhân tạp vụ",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Công nhân t?p v?"
    },
    {
      "KEY_CODE": "lstJob000002",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000002",
      "ITEMCODE": "000002",
      "ITEMNAME": "Giám đốc kinh doanh",
      "ITEMSRCH": "000002 - Giám đốc kinh doanh",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Gia´m dô´c kinh doan"
    },
    {
      "KEY_CODE": "lstJob000003",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000003",
      "ITEMCODE": "000003",
      "ITEMNAME": "Giám đốc sản xuất",
      "ITEMSRCH": "000003 - Giám đốc sản xuất",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Gia´m dô´c s?n xu?t"
    },
    {
      "KEY_CODE": "lstJob000001",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000001",
      "ITEMCODE": "000001",
      "ITEMNAME": "Giám đốc",
      "ITEMSRCH": "000001 - Giám đốc",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Giám d?c"
    },
    {
      "KEY_CODE": "lstJob000031",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000031",
      "ITEMCODE": "000031",
      "ITEMNAME": "Kế toán công nợ",
      "ITEMSRCH": "000031 - Kế toán công nợ",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "K? toán công n?"
    },
    {
      "KEY_CODE": "lstJob000026",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000026",
      "ITEMCODE": "000026",
      "ITEMNAME": "Kế toán tổng hợp",
      "ITEMSRCH": "000026 - Kế toán tổng hợp",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "K? toán t?ng h?p"
    },
    {
      "KEY_CODE": "lstJob000005",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000005",
      "ITEMCODE": "000005",
      "ITEMNAME": "Kế toán trưởng",
      "ITEMSRCH": "000005 - Kế toán trưởng",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "K? toán tru?ng"
    },
    {
      "KEY_CODE": "lstJob000016",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000016",
      "ITEMCODE": "000016",
      "ITEMNAME": "KCS",
      "ITEMSRCH": "000016 - KCS",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "KCS"
    },
    {
      "KEY_CODE": "lstJob000004",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000004",
      "ITEMCODE": "000004",
      "ITEMNAME": "Kiểm soát",
      "ITEMSRCH": "000004 - Kiểm soát",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Ki?m soát"
    },
    {
      "KEY_CODE": "lstJob000024",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000024",
      "ITEMCODE": "000024",
      "ITEMNAME": "Nhân viên bảo trì",
      "ITEMSRCH": "000024 - Nhân viên bảo trì",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên b?o trì"
    },
    {
      "KEY_CODE": "lstJob000009",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000009",
      "ITEMCODE": "000009",
      "ITEMNAME": "Nhân viên giám sát sản xuất",
      "ITEMSRCH": "000009 - Nhân viên giám sát sản xuất",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên giám sát s"
    },
    {
      "KEY_CODE": "lstJob0165",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "0165",
      "ITEMCODE": "0165",
      "ITEMNAME": "Nhân viên giao hàng",
      "ITEMSRCH": "0165 - Nhân viên giao hàng",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên giao hàng"
    },
    {
      "KEY_CODE": "lstJob000015",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000015",
      "ITEMCODE": "000015",
      "ITEMNAME": "Nhân viên giao nhận",
      "ITEMSRCH": "000015 - Nhân viên giao nhận",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên giao nh?n"
    },
    {
      "KEY_CODE": "lstJob000010",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000010",
      "ITEMCODE": "000010",
      "ITEMNAME": "Nhân viên HCNS",
      "ITEMSRCH": "000010 - Nhân viên HCNS",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên HCNS"
    },
    {
      "KEY_CODE": "lstJob000023",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000023",
      "ITEMCODE": "000023",
      "ITEMNAME": "Nhân viên kỹ thuật",
      "ITEMSRCH": "000023 - Nhân viên kỹ thuật",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên k? thu?t"
    },
    {
      "KEY_CODE": "lstJob000011",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000011",
      "ITEMCODE": "000011",
      "ITEMNAME": "Nhân viên kế toán",
      "ITEMSRCH": "000011 - Nhân viên kế toán",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên k? toán"
    },
    {
      "KEY_CODE": "lstJob000012",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000012",
      "ITEMCODE": "000012",
      "ITEMNAME": "Nhân viên kinh doanh",
      "ITEMSRCH": "000012 - Nhân viên kinh doanh",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên kinh doanh"
    },
    {
      "KEY_CODE": "lstJob000014",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000014",
      "ITEMCODE": "000014",
      "ITEMNAME": "Nhân viên Marketing",
      "ITEMSRCH": "000014 - Nhân viên Marketing",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên Marketing"
    },
    {
      "KEY_CODE": "lstJob000013",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000013",
      "ITEMCODE": "000013",
      "ITEMNAME": "Nhân viên thiết kế",
      "ITEMSRCH": "000013 - Nhân viên thiết kế",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên thi?t k?"
    },
    {
      "KEY_CODE": "lstJob000025",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000025",
      "ITEMCODE": "000025",
      "ITEMNAME": "Nhân viên xe nâng",
      "ITEMSRCH": "000025 - Nhân viên xe nâng",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên xe nâng"
    },
    {
      "KEY_CODE": "lstJob000022",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000022",
      "ITEMCODE": "000022",
      "ITEMNAME": "Nhân viên XNK",
      "ITEMSRCH": "000022 - Nhân viên XNK",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Nhân viên XNK"
    },
    {
      "KEY_CODE": "lstJob000021",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000021",
      "ITEMCODE": "000021",
      "ITEMNAME": "Quản lý bán hàng",
      "ITEMSRCH": "000021 - Quản lý bán hàng",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Qu?n lý bán hàng"
    },
    {
      "KEY_CODE": "lstJob0166",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "0166",
      "ITEMCODE": "0166",
      "ITEMNAME": "Quản lý shop Online",
      "ITEMSRCH": "0166 - Quản lý shop Online",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Qu?n lý shop Online"
    },
    {
      "KEY_CODE": "lstJob000029",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000029",
      "ITEMCODE": "000029",
      "ITEMNAME": "Tạp vụ sản xuất",
      "ITEMSRCH": "000029 - Tạp vụ sản xuất",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "T?p v? s?n xu?t"
    },
    {
      "KEY_CODE": "lstJob000019",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000019",
      "ITEMCODE": "000019",
      "ITEMNAME": "Tài xế",
      "ITEMSRCH": "000019 - Tài xế",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Tài x?"
    },
    {
      "KEY_CODE": "lstJob000030",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000030",
      "ITEMCODE": "000030",
      "ITEMNAME": "Thủ quỹ",
      "ITEMSRCH": "000030 - Thủ quỹ",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Th? qu?"
    },
    {
      "KEY_CODE": "lstJob000007",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000007",
      "ITEMCODE": "000007",
      "ITEMNAME": "Trưởng phòng XNK",
      "ITEMSRCH": "000007 - Trưởng phòng XNK",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Tru?ng phòng XNK"
    },
    {
      "KEY_CODE": "lstJob000008",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000008",
      "ITEMCODE": "000008",
      "ITEMNAME": "Trưởng CN1",
      "ITEMSRCH": "000008 - Trưởng CN1",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Truo?ng CN1"
    },
    {
      "KEY_CODE": "lstJob000006",
      "LISTCODE": "lstJob",
      "ITEM_KEY": "000006",
      "ITEMCODE": "000006",
      "ITEMNAME": "Trưởng phòng Kinh doanh",
      "ITEMSRCH": "000006 - Trưởng phòng Kinh doanh",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "Truo?ng pho`ng Kinh "
    },
    {
      "KEY_CODE": "Enum_apvRoleAprv1",
      "LISTCODE": "Enum_apvRoleAprv",
      "ITEM_KEY": "1",
      "ITEMCODE": "1",
      "ITEMNAME": "Trình ký",
      "ITEMSRCH": "1 - Trình ký",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "1"
    },
    {
      "KEY_CODE": "Enum_apvRoleAprv2",
      "LISTCODE": "Enum_apvRoleAprv",
      "ITEM_KEY": "2",
      "ITEMCODE": "2",
      "ITEMNAME": "Phê duyệt",
      "ITEMSRCH": "2 - Phê duyệt",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "2"
    },
    {
      "KEY_CODE": "Enum_apvRoleAprv3",
      "LISTCODE": "Enum_apvRoleAprv",
      "ITEM_KEY": "3",
      "ITEMCODE": "3",
      "ITEMNAME": "Thực hiện",
      "ITEMSRCH": "3 - Thực hiện",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "3"
    },
    {
      "KEY_CODE": "Enum_apvSendMail1",
      "LISTCODE": "Enum_apvSendMail",
      "ITEM_KEY": "1",
      "ITEMCODE": "1",
      "ITEMNAME": "Người trình ký (apvSgst)",
      "ITEMSRCH": "1 - Người trình ký (apvSgst)",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "1"
    },
    {
      "KEY_CODE": "Enum_apvSendMail2",
      "LISTCODE": "Enum_apvSendMail",
      "ITEM_KEY": "2",
      "ITEMCODE": "2",
      "ITEMNAME": "Người đã duỵệt bước trước (apvPrev)",
      "ITEMSRCH": "2 - Người đã duỵệt bước trước (apvPrev)",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "2"
    },
    {
      "KEY_CODE": "Enum_apvSendMail4",
      "LISTCODE": "Enum_apvSendMail",
      "ITEM_KEY": "4",
      "ITEMCODE": "4",
      "ITEMNAME": "Người sẽ duỵệt bước tiếp (apvNext)",
      "ITEMSRCH": "4 - Người sẽ duỵệt bước tiếp (apvNext)",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "3"
    },
    {
      "KEY_CODE": "Enum_apvSendMail8",
      "LISTCODE": "Enum_apvSendMail",
      "ITEM_KEY": "8",
      "ITEMCODE": "8",
      "ITEMNAME": "Tất cả người tham gia xét duyệt (apv_All)",
      "ITEMSRCH": "8 - Tất cả người tham gia xét duyệt (apv_All)",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "4"
    },
    {
      "KEY_CODE": "Enum_apvSendMail16",
      "LISTCODE": "Enum_apvSendMail",
      "ITEM_KEY": "16",
      "ITEMCODE": "16",
      "ITEMNAME": "Gởi qua mail",
      "ITEMSRCH": "16 - Gởi qua mail",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "5"
    },
    {
      "KEY_CODE": "Enum_apvSendMail32",
      "LISTCODE": "Enum_apvSendMail",
      "ITEM_KEY": "32",
      "ITEMCODE": "32",
      "ITEMNAME": "Gởi qua Notify",
      "ITEMSRCH": "32 - Gởi qua Notify",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "6"
    },
    {
      "KEY_CODE": "Enum_apvSendMail64",
      "LISTCODE": "Enum_apvSendMail",
      "ITEM_KEY": "64",
      "ITEMCODE": "64",
      "ITEMNAME": "Gởi qua Telegram",
      "ITEMSRCH": "64 - Gởi qua Telegram",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "7"
    },
    {
      "KEY_CODE": "Enum_apvSendMail128",
      "LISTCODE": "Enum_apvSendMail",
      "ITEM_KEY": "128",
      "ITEMCODE": "128",
      "ITEMNAME": "Gởi qua Zalo",
      "ITEMSRCH": "128 - Gởi qua Zalo",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "8"
    },
    {
      "KEY_CODE": "Enum_apvTimeTypeD",
      "LISTCODE": "Enum_apvTimeType",
      "ITEM_KEY": "D",
      "ITEMCODE": "D",
      "ITEMNAME": "Ngày",
      "ITEMSRCH": "D - Ngày",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "1"
    },
    {
      "KEY_CODE": "Enum_apvTimeTypeH",
      "LISTCODE": "Enum_apvTimeType",
      "ITEM_KEY": "H",
      "ITEMCODE": "H",
      "ITEMNAME": "Giờ",
      "ITEMSRCH": "H - Giờ",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "2"
    },
    {
      "KEY_CODE": "Enum_apvTimeTypeM",
      "LISTCODE": "Enum_apvTimeType",
      "ITEM_KEY": "M",
      "ITEMCODE": "M",
      "ITEMNAME": "Phút",
      "ITEMSRCH": "M - Phút",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "3"
    },
    {
      "KEY_CODE": "Enum_apvTimeTypeS",
      "LISTCODE": "Enum_apvTimeType",
      "ITEM_KEY": "S",
      "ITEMCODE": "S",
      "ITEMNAME": "Giây",
      "ITEMSRCH": "S - Giây",
      "ITEMATTR": "",
      "ITEMTREE": "",
      "ITEMODER": "4"
    },
    {
      "KEY_CODE": "lstDcmnPrcs001",
      "LISTCODE": "lstDcmnPrcs",
      "ITEM_KEY": "001",
      "ITEMCODE": "001",
      "ITEMNAME": "Trình ký",
      "ITEMSRCH": "001 - Trình ký",
      "ITEMATTR": "",
      "ITEMTREE": "001",
      "ITEMODER": "001"
    },
    {
      "KEY_CODE": "lstDcmnPrcs002",
      "LISTCODE": "lstDcmnPrcs",
      "ITEM_KEY": "002",
      "ITEMCODE": "002",
      "ITEMNAME": "Đồng ý duyệt",
      "ITEMSRCH": "002 - Đồng ý duyệt",
      "ITEMATTR": "",
      "ITEMTREE": "002",
      "ITEMODER": "002"
    },
    {
      "KEY_CODE": "lstDcmnPrcs003",
      "LISTCODE": "lstDcmnPrcs",
      "ITEM_KEY": "003",
      "ITEMCODE": "003",
      "ITEMNAME": "Yêu cầu bổ sung",
      "ITEMSRCH": "003 - Yêu cầu bổ sung",
      "ITEMATTR": "",
      "ITEMTREE": "003",
      "ITEMODER": "003"
    },
    {
      "KEY_CODE": "lstDcmnPrcs004",
      "LISTCODE": "lstDcmnPrcs",
      "ITEM_KEY": "004",
      "ITEMCODE": "004",
      "ITEMNAME": "Hủy bỏ chứng từ",
      "ITEMSRCH": "004 - Hủy bỏ chứng từ",
      "ITEMATTR": "",
      "ITEMTREE": "004",
      "ITEMODER": "004"
    },
    {
      "KEY_CODE": "lstDcmnPrcs005",
      "LISTCODE": "lstDcmnPrcs",
      "ITEM_KEY": "005",
      "ITEMCODE": "005",
      "ITEMNAME": "Tham khảo ý kiến",
      "ITEMSRCH": "005 - Tham khảo ý kiến",
      "ITEMATTR": "",
      "ITEMTREE": "005",
      "ITEMODER": "005"
    },
    {
      "KEY_CODE": "lstDcmnPrcs006",
      "LISTCODE": "lstDcmnPrcs",
      "ITEM_KEY": "006",
      "ITEMCODE": "006",
      "ITEMNAME": "Thực hiện",
      "ITEMSRCH": "006 - Thực hiện",
      "ITEMATTR": "",
      "ITEMTREE": "006",
      "ITEMODER": "006"
    },
    {
      "KEY_CODE": "lstDcmnPrcs007",
      "LISTCODE": "lstDcmnPrcs",
      "ITEM_KEY": "007",
      "ITEMCODE": "007",
      "ITEMNAME": "Thay người duyệt",
      "ITEMSRCH": "007 - Thay người duyệt",
      "ITEMATTR": "",
      "ITEMTREE": "007",
      "ITEMODER": "007"
    },
    {
      "KEY_CODE": "lstDcmnPrcs008",
      "LISTCODE": "lstDcmnPrcs",
      "ITEM_KEY": "008",
      "ITEMCODE": "008",
      "ITEMNAME": "Kiểm tra",
      "ITEMSRCH": "008 - Kiểm tra",
      "ITEMATTR": "",
      "ITEMTREE": "008",
      "ITEMODER": "008"
    },
    {
      "KEY_CODE": "lstDcmnPrcs009",
      "LISTCODE": "lstDcmnPrcs",
      "ITEM_KEY": "009",
      "ITEMCODE": "009",
      "ITEMNAME": "Phân công",
      "ITEMSRCH": "009 - Phân công",
      "ITEMATTR": "",
      "ITEMTREE": "009",
      "ITEMODER": "009"
    }
  ]
}