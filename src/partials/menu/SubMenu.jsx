import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { AiOutlineDown, AiOutlineRight } from "react-icons/ai";

const SubMenu = ({ data }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [click, setClick] = useState(false);

  function handleSubMenuToggle() {
    setIsSubMenuOpen(!isSubMenuOpen);
    setClick(!click);
  }

  return (
    <li className="my-px" key={data.PRCSCODE}>
      <button
        className={
          "flex flex-row items-center h-8 px-2 rounded-lg hover:bg-[#ff9f3e] hover:text-white w-full transition-colors duration-100 " +
          (click ? "bg-[#ff9f3e] text-white" : "text-gray-600 ")
        }
        onClick={handleSubMenuToggle}
      >
        {data.PRCSPARA.REF_LINK !== null && data.PRCSPARA.REF_LINK ? (
          <>
            <NavLink
              end
              to={data.PRCSPARA.REF_LINK}
              className={({ isActive }) =>
                "inline-flex text-xs text-left h-4 pt-2 pb-6 pl-2 -mx-2 fixBgMenu hover:text-white hover:bg-[#ff9f3e] bg-white rounded-lg " +
                (isActive ? "text-[#ff9f3e] font-bold " : "text-gray-600")
              }
            >
              {data.PRCSNAME}
            </NavLink>
            {data.SUB_MENU ? (
              isSubMenuOpen ? (
                <span className=" flex items-center justify-center text-md font-bold h-4 rounded-full ml-auto">
                  <AiOutlineDown />
                </span>
              ) : (
                <span className="flex items-center justify-center text-md font-bold h-4 rounded-full ml-auto">
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
                <span className="flex items-center justify-center text-md font-bold h-4 rounded-full ml-auto">
                  <AiOutlineDown />
                </span>
              ) : (
                <span className="flex items-center justify-center text-md  font-bold h-4 rounded-full ml-auto">
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
        </ul>
      )}
    </li>
  );
};

export default SubMenu;
