import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SidebarSkeleton from "./skeleton/SidebarSkeleton";
import { FaUsers, FaUser } from "react-icons/fa";
import UserViewOnHome from "./UserViewOnHome";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUserLoading } =
    useChatStore();

  const onlineUsers = [];

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full w-20 sm:w-52 md:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="border-b border-base-300 w-full p-3! sm:p-5! ">
        <div className="flex items-center justify-center gap-2 text-2xl">
          <FaUsers className="size-6" />
          <span className="font-medium hidden sm:block">Contacts</span>
        </div>

        {/* TOdo: online filter toggle  */}
      </div>

      {/* listes of user display componenets */}
      <div className="overflow-y-auto w-full py-3">

        <UserViewOnHome users={users} />
        
      </div>
    </aside>
  );
};

export default Sidebar;
