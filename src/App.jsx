import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "./charts/ChartjsConfig";
import "./css/style.css";
import "@progress/kendo-theme-default/dist/all.css";

// Import pages
import {
  CustomerOrderList, //  Don dat hang Khach hang
  CustomerOrderEdit,
  SpendSuggestList, // De nghi thanh toan
  SpendSuggestEdit,
  Login,
  ServiceContactsList, // Lien he cong vu
  ServiceContactsEdit,
  AdvanceProposalList, // De nghi tam ung
  AdvanceProposalEdit,
  AskPermissionList, // Don xin nghi phep
  AskPermissionEdit,
  TaskScheduleList, // Dang ky cong tac
  TaskScheduleEdit,
  SwitchShiftList, // Doi xin doi ca
  SwitchShiftEdit,
  RetailBillList, // Bien nhan ban hang
  RetailBillEdit,
  DcmnSrch, // Tim kiem cong van tai lieu
  AprvInvcList, // To trinh ky
  AprvInvcEdit,
  AprvDcmnList, // Danh sach ct Phe duyet
  AprvDcmnEdit, // Phe duyet ct
  Dashboard, // Man hinh CHART BI
  DashboardDrag,
  DashboardDM1,

  /////////////////
  DashboardArea,
  DashboardBar,
  DashboardDonut,
  DashboardPie,
  DashboardIndex,
  DashboardMultiType,
  DashboardLine,
} from "./pages";
import Logout from "./partials/Logout/Logout";
import Header from "./partials/Header";
import FooterLess from "./partials/footer/FooterLess";
import Sidebar from "./partials/Sidebar";

import { useStateContext } from "./context/ContextProvider";
import CreateProcessPage from "./pages/process/CreateProcessPage";
import GenerateDocumentPage from "./pages/document/GenerateDocumentPage";
import CreateDocumentTemplatePage from "./pages/document-template/CreateDocumentTemplatePage";
import routers from "./pages/entry/routers/routers";
import { EntryPage } from "./pages/entry/EntryPage";
import GetCompanyToken from "./comps/testing/step_one/GetCompanyToken";
import { GetTokenPage } from "./pages/entry/GetTokenPage";

import Test from "./pages/Test";

function App() {
  const [devMode, setDevMode] = useState(false);

  const { userData } = useStateContext();
  const { sidebarOpen, setSidebarOpen } = useStateContext();

  return (
    // <Router>
    //   {localStorage.getItem("userData") == null ? (
    //     <Login />
    //   ) : (
    //     <Routes>
    //       <Route path="/" element={<Dashboard />} />
    //       <Route path="/home" element={<Dashboard />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/logout" element={<Logout />} />
    //       <Route path="/order-customer" element={<OrderList />} />
    //     </Routes>
    //   )}
    // </Router>

    <Router>
      {localStorage.getItem("userData") == null ? (
        <Login />
      ) : (
        <div className="flex h-screen overflow-hidden">
          {/* Sidebar */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/* Content area */}
          {/* <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden rounded m-1 bg-white"> */}
          <div className="relative flex flex-col flex-1 overflow-hidden rounded m-1 bg-white">
            {/*  Site header */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="content-wrapper bg-white px-4 sm:px-2 overflow-y-auto overflow-x-hidden">
              <Routes>
                <Route path="/" element={<AprvDcmnList />} />
                {/* <===== TRANG HOMEEEEEE */}
                {/* <Route path="/home" element={<DashboardDM1 />} /> */}
                <Route path="/login" element={<Login />} />
                <Route path="/logout" element={<Logout />} />

                {/*  Đơn xin Nghỉ phép */}
                <Route path="/dcmn-leave" element={<AskPermissionList />} />
                <Route
                  path="/dcmn-leave/new"
                  element={<AskPermissionEdit mode={"ADD"} />}
                />
                <Route
                  path="/dcmn-leave/:id"
                  element={<AskPermissionEdit mode={"EDIT"} />}
                />

                {/* Dang ky cong tac */}
                <Route path="/task-schedule" element={<TaskScheduleList />} />
                <Route
                  path="/task-schedule/new"
                  element={<TaskScheduleEdit mode={"ADD"} />}
                />
                <Route
                  path="/task-schedule/:id"
                  element={<TaskScheduleEdit mode={"EDIT"} />}
                />

                {/* Đổi ca */}
                <Route path="/doi-ca" element={<SwitchShiftList />} />
                <Route
                  path="/doi-ca/new"
                  element={<SwitchShiftEdit mode={"ADD"} />}
                />
                <Route
                  path="/doi-ca/:id"
                  element={<SwitchShiftEdit mode={"EDIT"} />}
                />

                {/*  Liên hệ công vụ */}
                <Route path="/dcmn-work" element={<ServiceContactsList />} />
                <Route
                  path="/dcmn-work/new"
                  element={<ServiceContactsEdit mode={"ADD"} />}
                />
                <Route
                  path="/dcmn-work/:id"
                  element={<ServiceContactsEdit mode={"EDIT"} />}
                />

                {/*  Tạm ứng */}
                <Route path="/advn-invc" element={<AdvanceProposalList />} />
                <Route
                  path="/advn-invc/new"
                  element={<AdvanceProposalEdit mode={"ADD"} />}
                />
                <Route
                  path="/advn-invc/:id"
                  element={<AdvanceProposalEdit mode={"EDIT"} />}
                />

                {/*  Đề nghị thanh toán */}
                <Route path="/spnd-sgst" element={<SpendSuggestList />} />
                <Route
                  path="/spnd-sgst/new"
                  element={<SpendSuggestEdit mode={"ADD"} />}
                />
                <Route
                  path="/spnd-sgst/:id"
                  element={<SpendSuggestEdit mode={"EDIT"} />}
                />

                {/* Phe duyet chung tu */}
                <Route path="/aprv-dcmn" element={<AprvDcmnList />} />
                <Route
                  path="/aprv-dcmn/:id"
                  element={<AprvDcmnEdit mode={"EDIT"} />}
                />

                {/* Tìm kiếm công văn tài liệu */}
                <Route path="/dcmn-srch" element={<DcmnSrch />} />
                {/* Tờ trình ký */}
                <Route path="/aprv-invc" element={<AprvInvcList />} />
                <Route
                  path="/aprv-invc/new"
                  element={<AprvInvcEdit mode={"ADD"} />}
                />
                <Route
                  path="/aprv-invc/:id"
                  element={<AprvInvcEdit mode={"EDIT"} />}
                />

                {/* Don dat hang Khach hang */}
                <Route path="/order-end-user" element={<CustomerOrderList />} />
                <Route
                  path="/order-end-user/new"
                  element={<CustomerOrderEdit mode={"ADD"} />}
                />
                <Route
                  path="/order-end-user/:id"
                  element={<CustomerOrderEdit mode={"EDIT"} />}
                />

                {/* Bien nhan ban hang */}
                <Route path="/retail-bill" element={<RetailBillList />} />
                <Route
                  path="/retail-bill/new"
                  element={<RetailBillEdit mode={"ADD"} />}
                />
                <Route
                  path="/retail-bill/:id"
                  element={<RetailBillEdit mode={"EDIT"} />}
                />

                {/* <Route path={routers.index} element={<EntryPage />} />
                <Route
                  path={routers.document.create_template}
                  element={<CreateDocumentTemplatePage />}
                />
                <Route
                  path={routers.document.generate}
                  element={<GenerateDocumentPage />}
                />
                <Route
                  path={routers.process.create}
                  element={<CreateProcessPage />}
                /> */}

                <Route
                  path="/design-dcmn"
                  element={<CreateDocumentTemplatePage />}
                />
                <Route path="/create-dcmn" element={<GenerateDocumentPage />} />
                <Route path="/work-flow" element={<CreateProcessPage />} />

                {/* CHART DEMO */}
                <Route path="/chartarea" element={<DashboardArea />} />
                <Route path="/chartbar" element={<DashboardBar />} />
                <Route path="/chartdonut" element={<DashboardDonut />} />
                <Route path="/chartpie" element={<DashboardPie />} />
                <Route path="/chartpie" element={<DashboardPie />} />
                <Route path="/chartline" element={<DashboardLine />} />
                <Route path="/chartmulti" element={<DashboardMultiType />} />
                <Route path="/chartindex" element={<DashboardIndex />} />
              </Routes>
            </div>
            <FooterLess />
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
