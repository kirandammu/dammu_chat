// ChatContext.js
import React, { createContext, useContext, useState, useCallback } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../lib/axios';
import { useAuthContext } from './AuthContext';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { socket } = useAuthContext();

  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isUsersLoading, setIsUsersLoading] = useState(false);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);

  const getUsers = useCallback(async () => {
    setIsUsersLoading(true);
    try {
      const res = await axiosInstance.get('/messages/users');
      setUsers(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch users');
    } finally {
      setIsUsersLoading(false);
    }
  }, []);

  const getMessages = useCallback(async (userId) => {
    setIsMessagesLoading(true);
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      setMessages(res.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to fetch messages');
    } finally {
      setIsMessagesLoading(false);
    }
  }, []);

  const sendMessage = useCallback(async (messageData) => {
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      setMessages((prev) => [...prev, res.data]);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Message send failed');
    }
  }, [selectedUser]);

  const subscribeToMessages = useCallback(() => {
    if (!selectedUser || !socket) return;

    socket.on('newMessage', (newMessage) => {
      if (newMessage.senderId === selectedUser._id) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });
  }, [selectedUser, socket]);

  const unsubscribeFromMessages = useCallback(() => {
    if (socket) socket.off('newMessage');
  }, [socket]);

  return (
    <ChatContext.Provider
      value={{ messages, users, selectedUser, isUsersLoading, isMessagesLoading,
        getUsers, getMessages, sendMessage, subscribeToMessages, unsubscribeFromMessages, setSelectedUser,
      }} 
      > {children} </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);
