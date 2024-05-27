// import React from 'react';
import { useNavigate } from "react-router-dom";
import { menu } from "./data";
import MenuItem from "./MenuItem";
import { HiOutlineArrowLeftOnRectangle } from "react-icons/hi2";

const Menu = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-5">
        {menu.map((item, index) => (
          <MenuItem
            key={index}
            catalog={item.catalog}
            listItems={item.listItems}
          />
        ))}
        <button
          onClick={logout}
          className="btn 2xl:min-h-[52px] 3xl:min-h-[64px] btn-ghost btn-block justify-start"
        >
          <HiOutlineArrowLeftOnRectangle className="xl:text-2xl 2xl:text-3xl 3xl:text-4xl" />

          <span className="xl:text-sm 2xl:text-base 3xl:text-lg capitalize">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
};

export default Menu;
