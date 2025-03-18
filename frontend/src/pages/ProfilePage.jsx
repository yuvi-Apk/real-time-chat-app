import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { IoChevronBackOutline } from "react-icons/io5";
import { FaCameraRetro } from "react-icons/fa";

const ProfilePage = () => {
  // const {selectedImage ,setSelectedImage} =useState(null);
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();

  

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      await updateProfile({ profilepic: base64Image });
    };
    reader.readAsDataURL(file);
  };

  if(!authUser) return (
    <div className="text-4xl flex justify-center items-center h-screen">
    <span className="loading loading-spinner text-error text-9xl"></span>
    </div>
  );

  return (
    <div className="h-screen mt-20 py-2! px-1!">
      <div className="">
        <div className="text-center text-3xl flex ">
          <IoChevronBackOutline className="text-center text-gray-400" />{" "}
          <h2 className="mx-auto!">Edit Profile</h2>{" "}
        </div>

        {/* profile update sections start */}
        <div className="border bg-white p-0.5! border-gray-300 rounded-[50%] size-40 m-4! mx-auto! relative">
          {/* this is the profile picture */}
          <img
            src={authUser.profilepic || "/yuvi.jpeg"}
            alt={`Profile picture of the user`}
            className="rounded-full object-cover size-fit"
          />
          {/* this is for the uploading image  */}
          <label
            id="Avatar-upload"
            className={`absolute bottom-0 right-0 hover:scale-105 p-2 rounded-full bg-gray-200 cursor-pointer transition-all duration-200 ${
              isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
            }`}
          >
            <div className="p-2! border bg-black rounded-full text-white">
              <FaCameraRetro className="text-3xl text-gray-200 size-6" />
            </div>
            <input
              type="file"
              name="profilepic"
              id="Avatar-upload"
              className=" hidden
            "
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
      </div>
      {/* profile update sections ends */}
      <p className="text-center pt-3!">
        {isUpdatingProfile
          ? "Uploading ..."
          : "Click the camera icon to upload your photo !"}
      </p>

      {/* form starts */}
      <div className="p-4! space-y-2! sm:text-center">

        <div className="space-y-1!">
          <h3 className="text-2xl"> Full Name :</h3>

          <p className="text-1xl text-gray-400 pl-4! border  inline-block p-1! pr-2! rounded-2xl  md:px-11! w-72 sm:w-1/3">{authUser.fullName || "YUBARAJ MAHANTA"}</p>
        </div>

        <div className="space-y-1!">
          <h3 className="text-2xl"> E-mail :</h3>

          <p className="text-1xl text-gray-400 pl-4! border  inline-block p-1! pr-2! rounded-2xl  md:px-11! w-72 sm:w-1/3">{authUser.email ||"Yu@gmail.com"}</p>
        </div>


      </div>

      {/* forms ends  */}

      <div className="space-y-2! p-4! sm:text-center w-72 sm:mx-auto! sm:w-96">
        <h2 className="text-2xl ">Account Information :</h2>
        <div className="flex justify-between"><span>Account Status</span> <span>Active</span> </div>
        <div className="flex justify-between"><span>Account Status</span> <span>Active</span> </div>
      </div>
    </div>
  );
};

export default ProfilePage;
