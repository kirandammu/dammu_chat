import { useEffect, useState } from "react";
import { useChatContext } from "../context/ChatContext";
import { useAuthContext } from "../context/AuthContext";


const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser } = useChatContext();
  const [input, setInput] = useState('')
  const { onlineUsers } = useAuthContext();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  
      const filteredUsers = input ? users.filter((user)=>user.email.toLowerCase().includes(input.toLowerCase())):users

  return (
    <div className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col bg-black rounded-l transition-all duration-200">
      <div className='w-full py-1 p-2.5 my-3 rounded-2xl flex flex-col m-2 ' >
        <p className="py-1  font-semibold text-white">Search Email</p>
        <input placeholder='search here... ' onChange={(e)=>setInput(e.target.value)} type='text' className=' bg-gray-200 p-1.5 m-2 border rounded-md border-gray-500 outline-none' />
      </div>
      <div className="overflow-y-auto w-full py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-2 flex items-center gap-3 hover:bg-gray-900
              hover:bg-base-300 transition-colors
              ${selectedUser?._id === user._id ? " bg-gray-800 " : ""}
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 w-2.5 h-2.5 border-1 border-white bg-green-500 
                  rounded-full "
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium text-white">{user.fullName}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </div>
  );
};
export default Sidebar;
