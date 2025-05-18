import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
import { formatMessageTime } from "../../lib/Time";
import {useChatContext} from '../../context/ChatContext'
import { useAuthContext } from "../../context/AuthContext";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatContext();
  const { authUser } = useAuthContext();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();


    return () => unsubscribeFromMessages();
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-gray-200">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <div key={message._id} className={`flex ${message.senderId === authUser._id ? "flex-row-reverse " : "flex-row"}`} ref={messageEndRef}>
            <div className="flex flex-col items-center">
              <div className="w-8">
                <img className="rounded-full w-7 h-7 border border-white"
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
              <div>
              <time className="text-[10px] opacity-50 mx-2">
                {formatMessageTime(message.createdAt)}
              </time>
              </div>
            </div>
            <div className=" ">
              {message.image && (
                <img
                  src={message.image}
                  onClick={()=>window.open(message.image)}
                  className="sm:max-w-[200px] rounded-md bg-white p-0 m-0 cursor-pointer"
                />
              )}
              {message.text && <p className={`inline-block my-2 px-3 p-1 mx-1 rounded-md ${message.senderId === authUser._id ? 'rounded-br-none  bg-[purple] text-white':'rounded-bl-none bg-black text-white'}`} >{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};
export default ChatContainer;
