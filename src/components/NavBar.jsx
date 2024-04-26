import React, { useContext } from "react";

import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { getTotalCartItems, signout } = useContext(AuthContext);

  return (
    <div className="flex justify-around items-center px-4 shadow-md">
      <div className="flex items-center gap-3">
        <img src="/assets/logo.png" className="h-20 w-28" />
      </div>
      <ul className="flex items-center list-none gap-x-14 text-green-800 font-semibold text-lg">
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "flex flex-col items-center cursor-pointer border-b-2 border-b-red-600"
              : "flex flex-col items-center cursor-pointer";
          }}
          to="/shop/home"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "flex flex-col items-center cursor-pointer border-b-2 border-b-red-600"
              : "flex flex-col items-center cursor-pointer";
          }}
          to="/shop/vegetables"
        >
          Vegetables
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "flex flex-col items-center cursor-pointer border-b-2 border-b-red-600"
              : "flex flex-col items-center cursor-pointer";
          }}
          to="/shop/fruits"
        >
          Fruits
        </NavLink>
        <NavLink
          className={({ isActive }) => {
            return isActive
              ? "flex flex-col items-center cursor-pointer border-b-2 border-b-red-600"
              : "flex flex-col items-center cursor-pointer";
          }}
          to="/shop/machines"
        >
          Machines
        </NavLink>
      </ul>
      <div className="flex items-center gap-11 relative">
        <div
          onClick={() => signout()}
          className="p-3 border-2 bg-gray-800 rounded-2xl font-semibold cursor-pointer text-white hover:bg-gray-900"
        >
          Logout
        </div>
        <Link to="/shop/cart">
          <img src="/assets/cart.png" className="h-6 w-auto" />
        </Link>
        <div className="w-5 h-5 flex justify-center items-center -mt-6 ml-[140px] rounded-full text-white text-sm bg-red-600 absolute">
          {getTotalCartItems()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
