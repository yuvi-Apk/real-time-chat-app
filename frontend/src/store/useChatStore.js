import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data });
    } catch (error) {
      console.log("Error fetching users", error);
      toast.error(error.response.data.message || "Error fetching users");
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      console.log("Error fetching messages", error);
      toast.error(error.response.data.message || "Error fetching messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async(messageData) =>{
    const {selectedUser,messages} =get();

    try {
      const res =await axiosInstance.post(`/message/send/${selectedUser._id}`,messageData)

      // console.log(`selected id ${selectedUser._id} message data ${messageData}`)

      set({messages:[...messages,res.data]})

      toast.success("message send succesfully")
      
    } catch (error) {
      toast.error(error.response?.data?.message)
      console.log("Error in send messages sections of the useChatStore",error)
    }

  },
  realTimeMessage: ()=>{
    const {selectedUser}=get()
    if(!selectedUser) return ;

    const socket =useAuthStore.getState().socket;


    

    socket.on("newMessage",(newMessage)=>{

      // this validation for the not showing to data of other user
      if(newMessage.senderId !== selectedUser._id) return;
      set({messages:[...get().messages,newMessage]})
    })
  },
  removeRealTimeMessage:()=>{
    const socket =useAuthStore.getState().socket;
    socket.off("newMessage")

  },


  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
