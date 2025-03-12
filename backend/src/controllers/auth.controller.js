import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokens } from "../lib/utils.js";
import { json } from "express";
import cloudinary from "../lib/cloudinary.js";

//handel the sign up functions
export const signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    //error message 1
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required..." });
    }

    //error message 2
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password Must be  6 6 charactors" });
    }

    //error message 3(check the user already exits or not)
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "Email Already Exits" });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    //create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashPassword,
    });

    if (newUser) {
      //generate jwt token here
      generateTokens(newUser._id, res);

      //*save the user data in data base
      await newUser.save();

      // showing the user created succesfully
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilepic: newUser.profilepic,
      });
    } else {
      //error message 4
      res.status(400).json({ message: "Invaild User Data" });
    }
  } catch (error) {
    //Erroe message 5
    console.log("Error in Sign Up Controller", error.message);
    res.status(500).json({ message: "Internal Server Error.." });
  }
};

// handel the login functions
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //! find the user exits or not
    const user = await User.findOne({ email });

    //error message 1
    if (!user) {
      return res.status(400).json({ message: " Register Your Self" });
    }
    //! compare the password is correct or not
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    //error message 2
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: " Password Does'not Match.." });
    }

    generateTokens(user._id, res);

    // showing the user created succesfully
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilepic: user.profilepic,
    });
  } catch (error) {
    // error message 3

    console.log("Error in Login COntroller", error.message);
    res.status(500).json({ message: "Internal Server Error.." });
  }
};

//handels the logout functions
export const logout = (req, res) => {
  try {
    //logout message
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged Out Successfully" });
  } catch (error) {
    //error message 1
    console.log("Error in the Logout Controller", error.message);
    res.status(500).json({ message: "Internal Server Error.." });
  }
};

//handel the update profile picetures
export const updateProfile = async (req, res) => {
  try {
    const { profilepic } = req.body;
    const userId = req.user._id;

    if (!profilepic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilepic);
    const updatedUser = await User.findByIdAndUpdate(userId, {
      profilepic: uploadResponse.secure_url,
    },{new:true});

    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("Error in the profile pic controllers",error.message)
    res.status(500).json({message:"Internal Server Error"});
  }
};

//handel the auth checker
export const checkAuth=(req,res)=>{
  try {
res.status(200).json(req.user);
    
  } catch (error) {
    console.log("Error in the check auth controllers",error.message)
    res.status(500).json({message:"Internal Server Error"});
  }
}