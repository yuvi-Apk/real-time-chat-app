import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaApple, FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate =useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  // form data validations functions

  const validateForm = () => {
    if (!formData.email) {
      toast.error("Please enter your email");
      return false;
    }

    if (!formData.password) {
      toast.error("Please enter your password");
      return false;
    }

    return true;
  };

  // handle submit function

  const handleSubmit = async(e) => {
    e.preventDefault();
    // console.log(formData);

    if (validateForm()) {
    const success= await  login(formData);
    if(success){
    navigate("/");

    }
    }

  };
  return (
    <div
      className="min-h-screen
  "
    >
      {/* for the back button  */}

      <div className="text-left mt-5! ml-5! border-1 border-gray-500 p-1! rounded-lg w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] md:grid place-items-center">
        <IoChevronBackOutline className="text-4xl text-gray-500 " />
      </div>
      {/* this division contains the sign up styles */}
      <div className="  w-[17.3rem] h-auto p-2.5! rounded-lg shadow-lg space-y-3! m-auto! md:w-[25rem] lg:w-[30rem] ">
        {/* upper text  */}
        <div className="text-left text-3xl font-bold">
          <h2>Welcome Back!, Glad to see you, Again !</h2>
        </div>

        {/* this fiv for the form  */}
        <div className="text-left">
          <form onSubmit={handleSubmit}>
            <input
              style={{ marginBottom: "2rem",marginTop:"1rem" }}
              className="border-2 border-gray-300 rounded-lg p-1.5! w-full"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              autoComplete="off"
              required
            />

            <input
              style={{ marginBottom: "2rem" }}
              className="border-2 border-gray-300 rounded-lg p-1.5! w-full"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) => {
                {
                  setFormData({ ...formData, password: e.target.value });
                }
              }}
              autoComplete="off"
              required
            />

            {/* code for the submit button  */}

            <button
              className="botton-bg-color text-white p-1.5! rounded-lg w-full"
              type="submit"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <span className="loading loading-dots loading-xl "></span>
              ) : (
                <span className="text-2xl"> Log In</span>
              )}
            </button>
          </form>
        </div>

        {/* google sign in logo and the facebook sign in logo */}
        <div className="mt-5! ">
          {/* this div for the direct to the login page */}
          <div   className="inline text-center mb-4!">
            <Link to={"/signup"}>
            <h3 style={{marginBottom:"1rem"}}>--- Create An Account ! ---</h3>
             
            </Link>
          </div>

          {/* this div for the google and facebook logo */}
          <div className="flex justify-between  text-4xl mt-2.5!">
            <Link to={"/login"}>
              <button className="border-2 bore py-1! px-2.5! border-gray-500">
                <FcGoogle />
              </button>
            </Link>

            <Link to={"/login"}>
              <button className="border-2 bore py-1! px-2.5! border-gray-500">
                <FaFacebookF />
              </button>
            </Link>

            <Link to={"/login"}>
              <button className="border-2 bore py-1! px-2.5! border-gray-500">
                <FaApple />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
