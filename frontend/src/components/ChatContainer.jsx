import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import MessageSkeleton from "./skeleton/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { FaUserCircle } from "react-icons/fa";

const ChatContainer = () => {
  const { users, messages, isMessagesLoading, getMessages, selectedUser } =
    useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  console.log(messages)

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
      <div className="flex-1 overflow-y-auto space-y-4">
        {messages.map((message) => {
          return (
            <div
              key={message._id}
              className={`chat m-2! ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar ">
                <div className="size-10 rounded-full border ">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilepic || "/Avatar.png"
                        : selectedUser.profilepic || "/Avatar.png"
                    }
                    alt="user profile pic"
                  />
                </div>
              </div>

              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {new Date(message.createdAt).toLocaleTimeString()}
                </time>
              </div>

              <div className="chat-bubble flex flex-col gap-1">
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[200px] rounded-md mb-2 "
                  />
                )}
                {message.text && <p className="p-2!">{message.text}</p>}
              </div>
            </div>
          );
        })}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
