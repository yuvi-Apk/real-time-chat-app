import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skeleton/MessageSkeleton";

const ChatContainer = () => {
  const { users, messages, isMessagesLoading, getMessages, selectedUser } =
    useChatStore();

  useEffect(()=>{
    getMessages(selectedUser._id)
  },[selectedUser._id,getMessages])

  // Error handling
  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader users={users} />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader users={users} />
      <p>Messages.....</p>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
