import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF, FaApple } from "react-icons/fa";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const SignUpPage = () => {

  const navigate =useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    conPass: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  //password validation function

  const passwordValidation = (password) => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      setPasswordError("Password must be at least 8 characters long.");
    } else if (!hasUpperCase) {
      setPasswordError("Password must include at least one uppercase letter.");
    } else if (!hasLowerCase) {
      setPasswordError("Password must include at least one lowercase letter.");
    } else if (!hasNumber) {
      setPasswordError("Password must include at least one number.");
    } else if (!hasSpecialChar) {
      setPasswordError("Password must include at least one special character.");
    } else {
      setPasswordError("");
    }
  };


  // form data validations functions

  const validateForm = () => {
    if (formData.password !== formData.conPass) {
      toast.error("Passwords do not match");
    }
    if (formData.password.length < 6) {
      toast.error("Password should be atleast 6 characters long");
    }
    if (!formData.fullName.trim() || !formData.email.trim()) {
      toast.error("Please fill all the fields");
    }
    return true;
  };


  // handle submit function

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(formData);

    if (validateForm()) {
     const success = signup(formData);

     if(success){
      navigate("/login")
     }
    }
 
  };

  //main display contents

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
          <h2>Hey !, Coom Soon Let's Chat !</h2>
        </div>

        {/* this fiv for the form  */}
        <div className="text-left">
          <form onSubmit={handleSubmit}>
            <input
              className=" border-2  border-gray-300 rounded-lg p-1.5! w-full "
              style={{ marginBottom: "1rem", marginTop: "1rem" }}
              type="text"
              id="username"
              placeholder="Username"
              name="fullName"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              required
              autoComplete="off"
            />

            <input
              style={{ marginBottom: "1rem" }}
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
              style={{ marginBottom: "1rem" }}
              className="border-2 border-gray-300 rounded-lg p-1.5! w-full"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) => {
                {
                  setFormData({ ...formData, password: e.target.value }),
                    passwordValidation(e.target.value);
                }
              }}
              autoComplete="off"
              required
            />

    {/* code for the showing errorr  */}
            {passwordError && (
              <div className="text-red-400 text-sm mb-4! inline-block">{passwordError}</div>
            )}

            <input
              style={{ marginBottom: "1rem" }}
              className="border-2 border-gray-300 rounded-lg p-1.5! w-full"
              type="password"
              placeholder="Confirm Password"
              value={formData.conPass}
              onChange={(e) =>
                setFormData({ ...formData, conPass: e.target.value })
              }
              autoComplete="off"
              required
            />

            {/* code for the submit button  */}

            <button
              className="botton-bg-color text-white p-1.5! rounded-lg w-full"
              type="submit"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <span className="loading loading-dots loading-xl "></span>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* google sign in logo and the facebook sign in logo */}
        <div className="mt-5! ">
          {/* this div for the direct to the login page */}
          <div className="inline text-center mb-2.5!">
            <h3>----------Or Login With----------</h3>
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

export default SignUpPage;
