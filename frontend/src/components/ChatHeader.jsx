import React from "react";
import { RiCloseLine } from "react-icons/ri";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = ({ users }) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className=" w-full">
      <div className="border-b border-base-300 w-full  flex justify-between">
        {/* profile pic and other content start here */}
        <div className="w-40 h-[3rem] sm:h-[4.4rem] text-2xl relative ">
          {/* 1st div for the profile images  */}
          <div className="border-0 rounded-full w-[3rem] sm:w-[4rem]  absolute left-0 m-0.5! h-full p-0.5! grid place-items-center">
            <div className="relative">
              <img
                className="border rounded-full p-0.5! bg-amber-50"
                src={selectedUser.profilepic || "/yuvi.jpeg"}
                alt="profile picture of the friends"
              />

              <span className="size-2 rounded-full absolute bg-green-500 top-1 right-1 shadow-2xl"></span>
            </div>
          </div>
          {/* 2nd div for the other content to dispaly  */}
          <div className=" w-[5rem] absolute right-0 h-full hidden sm:block space-y-1.5!">
            <div className="text-sm text-center mt-1.5! h-1/2 sm:text-2xl text-nowrap px-2!">
              {selectedUser.fullName}
            </div>
            {/* created at div  */}
            <div className="flex justify-between text-sm text-base-content px-2! align-baseline text-nowrap h-1/2 space-x-6!">
              <div>Created At:</div>
              {/* {onlineUsers.includes(selectedUser._id) ? "Online " : "Offline"} */}
              <div>{new Date(selectedUser.createdAt).toLocaleString()}</div>
            </div>
          </div>
        </div>

        {/* profile pic and other content ends here */}

        {/* delete icon */}

        <div
          className=" text-4xl md:text-5xl md:p-3! grid place-content-center"
          onClick={() => setSelectedUser(null)}
        >
          <RiCloseLine />
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
