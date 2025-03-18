import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";

//show users in the side bar
export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const FilteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(FilteredUsers);
  } catch (error) {
    console.log("Error in getUserForSidebar controller : ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//functions for the view the previous message
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessage Controllers :", error.message);

    res.status(500).json({ Message: "Internal Server Error" });
  }
};

//functions to send messages

export const sendMessage=async(req,res)=>{
    try {
        const {text,image}=req.body;
        const{id:receiverId}=req.params;
        const senderId=req.user._id;

        let imageUrl;

        if(image){
            //Upload base64 image to cloudinary
            const uploadResponse =await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage =new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl,
        });

        await newMessage.save();

        //todo : realtime functionlity gores here =>socket.io

        res.status(201).json(newMessage);
        
    } catch (error) {
        console.log("Error in sendMessage Controllers :", error.message);

        res.status(500).json({ Message: "Internal Server Error" }); 
    }
}
