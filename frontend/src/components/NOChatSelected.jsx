import React from "react";
import { LuBotMessageSquare } from "react-icons/lu";
import { useAuthStore } from "../store/useAuthStore";

const NOChatSelected = () => {
  const {authUser} =useAuthStore();
  return (
    <div className=" w-full flex justify-center items-center flex-col">
      <div className="bg-base-300 text-6xl p-4! rounded-3xl animate-bounce">
        <LuBotMessageSquare />
      </div>
      <h3 className="mt-3.5! text-5xl">Welcome Again ! </h3>
      <h2 className="text-2xl">{authUser.fullName}</h2> 
      <p className="mt-4!">Starts Builds Your Relationship !</p>
    </div>
  );
};

export default NOChatSelected;
