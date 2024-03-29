import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

import SidebarLinkGroup from "./SidebarLinkGroup";
import LogoEMS from "../images/logo_ems.png";
import MenuItem from "./menu/MenuItem";
import { v4 } from "uuid";
import { useStateContext } from "../context/ContextProvider";
import { useLocation } from "react-router-dom";
import MenuTitle from "./menu/MenuTitle";

import { HiChevronDown, HiChevronRight } from "react-icons/hi";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  /* BEGIN TEST */
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen(!open);
  };

  const MenuItem = ({ item }) => {
    const [open, setOpen] = useState(false);

    const toggleOpen = () => {
      setOpen(!open);
    };

    const hasSubmenu = item.SUB_MENU && item.SUB_MENU.length > 0;

    return (
      <li className="relative">
        <div className="flex items-center cursor-pointer" onClick={toggleOpen}>
          {hasSubmenu && (
            <span className="absolute left-0 top-1/2 transform -translate-y-1/2">
              {open ? (
                <HiChevronDown className="w-5 h-5" />
              ) : (
                <HiChevronRight className="w-5 h-5" />
              )}
            </span>
          )}
          <a
            href={item.MENUPARA}
            className="block py-2 pl-6 pr-4 hover:bg-gray-100 transition-colors duration-200"
          >
            {item.PRCSNAME}
          </a>
        </div>
        {hasSubmenu && (
          <ul
            className={`${
              open ? "block" : "hidden"
            } absolute top-full left-full w-full bg-white shadow rounded mt-1`}
          >
            {item.SUB_MENU.map((submenuItem) => (
              <MenuItem key={submenuItem.TREECODE} item={submenuItem} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  function Menu() {
    return (
      <ul>
        {appMenu.map((item) => (
          <MenuItem key={item.TREECODE} item={item} />
        ))}
      </ul>
    );
  }

  /* END TEST */

  const location = useLocation();
  const { pathname } = location;

  const { screenSize, appMenu } = useStateContext();
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      if (screenSize < 1200) setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded);
    if (sidebarExpanded) {
      document.querySelector("body").classList.add("sidebar-expanded");
    } else {
      document.querySelector("body").classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);
  const [currentColor, setCurrentColor] = useState("#03C9D7");
  return (
    <>
      {sidebarOpen && (
        <div>
          {/* Sidebar backdrop (mobile only) */}
          <div
            className={`fixed inset-0 bg-white bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
              sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            aria-hidden="true"
          ></div>

          {/* Sidebar */}
          <div
            id="sidebar"
            ref={sidebar}
            className={`flex flex-col absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 lg:w-20 lg:sidebar-expanded:!w-64 2xl:!w-64 shrink-0 bg-slate-800 p-4 transition-all duration-200 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-64"
            }`}
          >
            {/* Sidebar header */}
            <div className="flex justify-between mb-10 pr-3 sm:px-2">
              {/* Close button */}
              <button
                ref={trigger}
                className="lg:hidden text-slate-500 hover:text-slate-400"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                aria-controls="sidebar"
                aria-expanded={sidebarOpen}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="w-6 h-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
                </svg>
              </button>
              {/* Logo */}
              <NavLink end to="/" className="block">
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <defs>
                    <linearGradient
                      x1="28.538%"
                      y1="20.229%"
                      x2="100%"
                      y2="108.156%"
                      id="logo-a"
                    >
                      <stop stopColor="#A5B4FC" stopOpacity="0" offset="0%" />
                      <stop stopColor="#A5B4FC" offset="100%" />
                    </linearGradient>
                    <linearGradient
                      x1="88.638%"
                      y1="29.267%"
                      x2="22.42%"
                      y2="100%"
                      id="logo-b"
                    >
                      <stop stopColor="#38BDF8" stopOpacity="0" offset="0%" />
                      <stop stopColor="#38BDF8" offset="100%" />
                    </linearGradient>
                  </defs>
                  <rect fill="#6366F1" width="32" height="32" rx="16" />
                  <path
                    d="M18.277.16C26.035 1.267 32 7.938 32 16c0 8.837-7.163 16-16 16a15.937 15.937 0 01-10.426-3.863L18.277.161z"
                    fill="#4F46E5"
                  />
                  <path
                    d="M7.404 2.503l18.339 26.19A15.93 15.93 0 0116 32C7.163 32 0 24.837 0 16 0 10.327 2.952 5.344 7.404 2.503z"
                    fill="url(#logo-a)"
                  />
                  <path
                    d="M2.223 24.14L29.777 7.86A15.926 15.926 0 0132 16c0 8.837-7.163 16-16 16-5.864 0-10.991-3.154-13.777-7.86z"
                    fill="url(#logo-b)"
                  />
                </svg>
              </NavLink>
            </div>

            {/* Links */}
            <div className="space-y-8">
              {/* Pages group */}
              <div>
                <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
                  <span
                    className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6"
                    aria-hidden="true"
                  >
                    •••
                  </span>
                  <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                    Pages
                  </span>
                </h3>
                {/* Menu */}
                <ul className="mt-3">
                  {appMenu.map((item) => {
                    return <MenuTitle item={item} />;
                  })}

                  {/* Dashboard */}
                  <SidebarLinkGroup
                  // activecondition={
                  //   pathname === "/" || pathname.includes("dashboard")
                  // }
                  >
                    {(handleClick, open) => {
                      return (
                        <React.Fragment>
                          <a
                            href="#0"
                            // className={`block text-slate-200 truncate transition duration-150 uppercase ${
                            //   pathname === "/" || pathname.includes("dashboard")
                            //     ? "hover:text-slate-200"
                            //     : "hover:text-white"
                            // }`}
                            className="block text-slate-200 truncate transition duration-150 uppercase"
                            onClick={(e) => {
                              e.preventDefault();
                              sidebarExpanded
                                ? handleClick()
                                : setSidebarExpanded(true);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {/* Icon */}
                                <svg
                                  className="shrink-0 h-6 w-6"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    className={`fill-current ${
                                      pathname === "/" ||
                                      pathname.includes("dashboard")
                                        ? "text-indigo-500"
                                        : "text-slate-400"
                                    }`}
                                    d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
                                  />
                                  <path
                                    className={`fill-current ${
                                      pathname === "/" ||
                                      pathname.includes("dashboard")
                                        ? "text-indigo-600"
                                        : "text-slate-600"
                                    }`}
                                    d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
                                  />
                                  <path
                                    className={`fill-current ${
                                      pathname === "/" ||
                                      pathname.includes("dashboard")
                                        ? "text-indigo-200"
                                        : "text-slate-400"
                                    }`}
                                    d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
                                  />
                                </svg>
                                {/* End Icon */}
                                {/* Title */}
                                <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                  Dashboard
                                </span>
                                {/* End Title */}
                              </div>
                              {/* Icon */}
                              <div className="flex shrink-0 ml-2">
                                <svg
                                  className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${
                                    open && "rotate-180"
                                  }`}
                                  viewBox="0 0 12 12"
                                >
                                  <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                                </svg>
                              </div>
                              {/* End Icon */}
                            </div>
                          </a>
                          {/* Sub menu */}
                          <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
                            <ul className={`pl-9 mt-1 ${!open && "hidden"}`}>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/"
                                  className={({ isActive }) =>
                                    "block transition duration-150 truncate " +
                                    (isActive
                                      ? "text-indigo-500"
                                      : "text-slate-400 hover:text-slate-200")
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Main
                                  </span>
                                </NavLink>
                              </li>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/dashboard/analytics"
                                  className={({ isActive }) =>
                                    "block transition duration-150 truncate " +
                                    (isActive
                                      ? "text-indigo-500"
                                      : "text-slate-400 hover:text-slate-200")
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Analytics
                                  </span>
                                </NavLink>
                              </li>
                              <li className="mb-1 last:mb-0">
                                <NavLink
                                  end
                                  to="/dashboard/fintech"
                                  className={({ isActive }) =>
                                    "block transition duration-150 truncate " +
                                    (isActive
                                      ? "text-indigo-500"
                                      : "text-slate-400 hover:text-slate-200")
                                  }
                                >
                                  <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                                    Fintech
                                  </span>
                                </NavLink>
                              </li>
                            </ul>
                          </div>
                          {/* End Sub menu */}
                        </React.Fragment>
                      );
                    }}
                  </SidebarLinkGroup>

                  {/* Messages */}
                  <li
                    className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                      pathname.includes("messages") && "bg-slate-900"
                    }`}
                  >
                    <NavLink
                      end
                      to="/messages"
                      className={`block text-slate-200 truncate transition duration-150 ${
                        pathname.includes("messages")
                          ? "hover:text-slate-200"
                          : "hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="grow flex items-center">
                          <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                            <path
                              className={`fill-current ${
                                pathname.includes("messages")
                                  ? "text-indigo-500"
                                  : "text-slate-600"
                              }`}
                              d="M14.5 7c4.695 0 8.5 3.184 8.5 7.111 0 1.597-.638 3.067-1.7 4.253V23l-4.108-2.148a10 10 0 01-2.692.37c-4.695 0-8.5-3.184-8.5-7.11C6 10.183 9.805 7 14.5 7z"
                            />
                            <path
                              className={`fill-current ${
                                pathname.includes("messages")
                                  ? "text-indigo-300"
                                  : "text-slate-400"
                              }`}
                              d="M11 1C5.477 1 1 4.582 1 9c0 1.797.75 3.45 2 4.785V19l4.833-2.416C8.829 16.85 9.892 17 11 17c5.523 0 10-3.582 10-8s-4.477-8-10-8z"
                            />
                          </svg>
                          <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                            Messages
                          </span>
                        </div>
                        {/* Badge */}
                        <div className="flex flex-shrink-0 ml-2">
                          <span className="inline-flex items-center justify-center h-5 text-xs font-medium text-white bg-indigo-500 px-2 rounded">
                            4
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  </li>

                  {/* Inbox */}
                  <li
                    className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                      pathname.includes("inbox") && "bg-slate-900"
                    }`}
                  >
                    <NavLink
                      end
                      to="/inbox"
                      className={`block text-slate-200 truncate transition duration-150 ${
                        pathname.includes("inbox")
                          ? "hover:text-slate-200"
                          : "hover:text-white"
                      }`}
                    >
                      <div className="flex items-center">
                        <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
                          <path
                            className={`fill-current ${
                              pathname.includes("inbox")
                                ? "text-indigo-500"
                                : "text-slate-600"
                            }`}
                            d="M16 13v4H8v-4H0l3-9h18l3 9h-8Z"
                          />
                          <path
                            className={`fill-current ${
                              pathname.includes("inbox")
                                ? "text-indigo-300"
                                : "text-slate-400"
                            }`}
                            d="m23.72 12 .229.686A.984.984 0 0 1 24 13v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-8c0-.107.017-.213.051-.314L.28 12H8v4h8v-4H23.72ZM13 0v7h3l-4 5-4-5h3V0h2Z"
                          />
                        </svg>
                        <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                          Inbox
                        </span>
                      </div>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>

            {/* Expand / collapse button */}
            <div className="pt-3 hidden lg:inline-flex 2xl:hidden justify-end mt-auto">
              <div className="px-3 py-2">
                <button onClick={() => setSidebarExpanded(!sidebarExpanded)}>
                  <span className="sr-only">Expand / collapse sidebar</span>
                  <svg
                    className="w-6 h-6 fill-current sidebar-expanded:rotate-180"
                    viewBox="0 0 24 24"
                  >
                    <path
                      className="text-slate-400"
                      d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z"
                    />
                    <path className="text-slate-600" d="M3 23H1V1h2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Sidebar;
