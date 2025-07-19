import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import { TbLoader3 } from "react-icons/tb";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import Error from "./pages/Error";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthContext();

  useEffect(() => {
    checkAuth();
  }, []);

  if (isCheckingAuth && !authUser)
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <TbLoader3 className="text-5xl animate-spin" />
        <p className="font-semibold text-black text-xl animate-bounce"> Dammu Chat</p>

      </div>
    );

  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  );
};
export default App;
