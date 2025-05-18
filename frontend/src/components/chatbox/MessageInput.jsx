import { useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { RxCrossCircled } from "react-icons/rx";
import toast from "react-hot-toast";
import { useChatContext } from "../../context/ChatContext";
import { useAuthContext } from "../../context/AuthContext";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatContext();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="p-4 w-full bg-white">
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-base-300
              flex items-center justify-center "
              type="button"
            ><RxCrossCircled className="text-white bg-black rounded-full" />

            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <input  type="text" className="w-full input border border-gray-500 p-1 rounded outline-none"
            placeholder="Type a message..."  value={text}  onChange={(e) => setText(e.target.value)}/>
          <input  type="file" accept="image/*" className="hidden"  ref={fileInputRef} onChange={handleImageChange}/>
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          > <FaImage className="w-9 h-9 text-black m-1" /></button>
        </div>
        <button
          type="submit"
          className="flex w-20 rounded bg-black text-white justify-center cursor-pointer p-1 items-center"
          disabled={!text.trim() && !imagePreview}
        > Send </button>
      </form>
    </div>
  );
};
export default MessageInput;
