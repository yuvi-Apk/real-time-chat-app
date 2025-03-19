import React, { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { RiCloseLine } from "react-icons/ri";
import { FaImages } from "react-icons/fa";
import { BiSend } from "react-icons/bi";
import toast from "react-hot-toast";

const MessageInput = () => {

  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file!");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!text.trim() && !imagePreview) return;

    try {

      await sendMessage({ text: text.trim(), image: imagePreview });

      console.log("fuck fuck")

      // Clear the form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.log("Failed to send message", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Image preview"
              className="size-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <RiCloseLine className="size-3" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <div className="border border-amber-700 rounded-lg w-full p-2 flex gap-2">
            <button
              className="text-2xl"
              onClick={() => fileInputRef.current?.click()}
              type="button"
            >
              <FaImages />
            </button>

            <input
              className="border"
              type="text"
              placeholder="Let's Chat"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />

            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleImageChange}
            />

            <button className="text-2xl" type="submit">
              <BiSend />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default MessageInput;