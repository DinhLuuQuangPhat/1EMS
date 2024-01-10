import React, { useState } from "react";
import "./Menu.css";
import { NavLink } from "react-router-dom";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

import SubMenu from "./SubMenu";

const MenuTitle = ({ data }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [click, setClick] = useState(false);

  function handleSubMenuToggle() {
    setIsSubMenuOpen(!isSubMenuOpen);
    setClick(!click);
  }

  return (
    <ul className="flex flex-col w-full">
      <li className="my-px" key={data.PRCSCODE}>
        <button
          className={
            "flex flex-row items-center h-8 px-2 rounded-lg hover:bg-[#ff9f3e] hover:text-white font-bold w-full transition-colors duration-100 " +
            (click ? "bg-[#ff9f3e] text-white" : "text-gray-600 ")
          }
          onClick={handleSubMenuToggle}
        >
          {data.PRCSPARA.REF_LINK !== null && data.PRCSPARA.REF_LINK ? (
            <>
              <NavLink end to={data.PRCSPARA.REF_LINK}>
                {data.PRCSNAME}
              </NavLink>
              {data.SUB_MENU ? (
                isSubMenuOpen ? (
                  <span className="flex items-center justify-center text-xl font-extrabold h-6 rounded-full ml-auto ">
                    <AiOutlineDown />
                  </span>
                ) : (
                  <span className="flex items-center justify-center text-xl font-extrabold h-6 rounded-full ml-auto ">
                    <AiOutlineRight />
                  </span>
                )
              ) : (
                ""
              )}
            </>
          ) : (
            <>
              <span className="text-xs">{data.PRCSNAME}</span>
              {data.SUB_MENU ? (
                isSubMenuOpen ? (
                  <span className="flex items-center justify-center text-md font-extrabold h-6 rounded-full ml-auto ">
                    <AiOutlineDown />
                  </span>
                ) : (
                  <span className="flex items-center justify-center text-md font-extrabold h-6 rounded-full ml-auto ">
                    <AiOutlineRight />
                  </span>
                )
              ) : (
                ""
              )}
            </>
          )}
        </button>
        {isSubMenuOpen && data.SUB_MENU && (
          <ul className="ml-2">
            {data.SUB_MENU.map((item, index) => (
              // <SubMenu key={item.title} data={{ ...item }} />
              <SubMenu key={index} data={{ ...item }} />
            ))}
            {data.SUB_MENU.length > 1 && <hr className="my-2 border-1" />}
          </ul>
        )}
      </li>
    </ul>
  );
};

export default MenuTitle;
