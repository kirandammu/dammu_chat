import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { useChatContext } from "../../context/ChatContext";
import { RxCrossCircled } from "react-icons/rx";


const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatContext();
  const { onlineUsers } = useAuthContext();
  const [time,setTime] = useState(0)

  

  useEffect(()=>{
    if(!selectedUser) return
    setTime(0)
    const interval = setInterval(()=>{
      setTime((rev)=>rev+1)
  },1000)
 return ()=>clearInterval(interval)
  },[selectedUser._id])

  return (
    <div className="p-2.5 border-b border-base-300 bg-white">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePic || "/avatar.png"} className="rounded-full " alt={selectedUser.fullName} />
              {onlineUsers.includes(selectedUser._id) && (
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 border-1 border-white bg-green-500 
                  rounded-full "
                />
              )}
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {/* {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"} */}
              {selectedUser.bio?selectedUser.bio:null}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <RxCrossCircled className="text-black  rounded-full w-6 h-6" />
        </button>
      </div>
      <div className="">Active time: {time}s</div>
    </div>
  );
};
export default ChatHeader;
