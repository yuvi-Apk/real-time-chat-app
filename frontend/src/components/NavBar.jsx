import React from "react";
import { LuBotMessageSquare } from "react-icons/lu";
import { MdSettingsSuggest } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { FaUserCheck } from "react-icons/fa";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="py-3! px-4! w-full h-auto border-b-2 border-gray-700 md:mx-0 md:px-8 md:py-4">
      <div className="flex justify-between items-center text-3xl font-bold">
          <Link to={"/"}>
          <div className="flex items-center gap-0.5">
            <LuBotMessageSquare className="animate-bounce" /> <span className="text-2xl animate-pulse">Chat App</span>
          </div> 
          
          </Link>
  
        

        {authUser ? (
          <div className="flex gap-0.5 sm:gap-9 ">
            <Link to="/profile">
            <div className="flex items-center gap-0.5">
            <FaUserCheck /> <span className="hidden md:inline text-3xl font-light "> Profile</span>

            </div>
            </Link>

            <Link to="/setting">
              <div className="flex items-center gap-0.5">
              <MdSettingsSuggest /> <span className="hidden md:inline text-3xl font-light "> setting </span>

              </div>
            </Link>
                <div className="flex items-center gap-0.5" onClick={logout}>
                <IoIosLogOut  /> <span className="hidden md:inline text-3xl font-light "> Log Out</span>

                </div>
          </div>
        ) : (
          <div>
              <Link to="/setting" className="flex items-center gap-0.5">
              <MdSettingsSuggest className=" text-3xl font-light "/> <span className="hidden md:inline text-3xl font-light "> Setting</span>

              </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;