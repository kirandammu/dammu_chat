// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5000" : "";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate()
  const [typing, setTyping] = useState(false)
  const [isTyping, setIsTyping] = useState(false)

  const signup = async (data) => {
    setIsSigningUp(true);
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      setAuthUser(res.data);
      toast.success("Account created successfully");
    connectSocket(res.data); 
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsSigningUp(false);
    }
  };

  const login = async (data) => {
    setIsLoggingIn(true);
    try {
      const res = await axiosInstance.post("/auth/login", data);
      setAuthUser(res.data);
      toast.success("Logged in successfully");
    connectSocket(res.data); 
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      setAuthUser(null);
      toast.success("Logged out successfully");
      disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const updateProfile = async (data) => {
    setIsUpdatingProfile(true);
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      setAuthUser(res.data);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile:", error);
      toast.error(error.response.data.message);
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const checkAuth = async () => {
  try {
    const res = await axiosInstance.get("/auth/check");
    setAuthUser(res.data);
    connectSocket(res.data); 
  } catch (error) {
    console.log("Error in checkAuth:", error);
    setAuthUser(null);
  } finally {
    setIsCheckingAuth(false);
  }
};

  const connectSocket = (authUser)=>{
    if(!authUser || socket?.connected) return
    const newSocket = io(BASE_URL, {query:{userId:authUser._id,}, withCredentials: true })
    newSocket.connect()
    setSocket(newSocket)

    newSocket.on("connect", () => {
    // console.log("Socket connected:", newSocket.id);
    });
    
    newSocket.on("getOnlineUsers", (userIds)=>{
      // console.log("Received online users:", userIds);
     setOnlineUsers(userIds)
    })
    newSocket.on("connect_error", (err) => {
    console.error(" Socket connection error:", err.message);
    });
    newSocket.on("typing", ()=>setIsTyping(true))
    newSocket.on("stop typing", ()=>setIsTyping(true))
  }
  const disconnectSocket = () => {
  if (socket?.connected) socket.disconnect();
}

  useEffect(() => {
    checkAuth();

  }, []);

  return (
    <AuthContext.Provider
      value={{ authUser, isSigningUp, isLoggingIn, isUpdatingProfile, isCheckingAuth, onlineUsers, socket,
        navigate, checkAuth, signup, login, logout, updateProfile, connectSocket, disconnectSocket,
      }}
      > {children} </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
    return useContext(AuthContext)};
