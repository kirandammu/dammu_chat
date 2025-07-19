import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/chatbox/ChatContainer";
import Navbar from "../components/Navbar";
import { useChatContext } from "../context/ChatContext";
import { FaRegMessage } from "react-icons/fa6";


const HomePage = () => {
  const { selectedUser } = useChatContext();

  return (<>
    <Navbar/>
    <div className="h-screen bg-base-200 bg-pink-100 ">
      <div className="flex items-center justify-center pt-20 px-4 ">
        <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]">
          <div className="flex h-full rounded-lg overflow-hidden border border-black">
            <Sidebar />

            {!selectedUser ? 
            
            (
              <div className="w-full flex flex-1 flex-col items-center justify-center p-16  bg-white">
                    <div className="max-w-md text-center space-y-6">
                      <h2  className="text-2xl flex gap-x-4 items-center font-bold"><FaRegMessage className='w-6 h-6' /> Welcome to DAMMU CHAT APP!</h2>
                      <p className="text-base-content/60">Select a conversation from the sidebar to start chatting </p>
                    </div>
                  </div>
            ): <ChatContainer />}
          </div>
        </div>
      </div>
    </div></>
  );
};
export default HomePage;
