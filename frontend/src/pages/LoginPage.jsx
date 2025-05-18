import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="fixed bg-black/30 justify-center top-0 right-0 left-0 bottom-0 flex items-center">
      <div className="flex flex-col bg-white rounded-2xl justify-center items-center p-10 w-88">
        {/* Logo */}
       <div className="text-center mb-5">
              <h1 className="text-2xl font-semibold text-black">Login</h1>
          </div>
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
           
            <div className="form-control flex flex-col">
              <span className="font-medium"> Email:</span>
              <input type="email"  className={'border border-gray-600 p-1 px-3 outline-none rounded'} placeholder="you@example.com"
                  value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}/>
            </div>
            <div className="form-control flex flex-col">
              <span className="font-medium"> Password:</span>
              <input type='password' className={'border border-gray-600 p-1 px-3 outline-none rounded'} placeholder="••••••••"
                  value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            </div>

            <button type="submit" className="btn btn-primary w-full cursor-pointer bg-black text-white rounded-md p-2" > Login</button>
          </form>
          <p className="text-center text-sm pt-3"> Don't have an account?{" "} <Link to="/signup" className="text-[red]"> Create account</Link></p>
        </div>
      </div>

     
  );
};
export default LoginPage;
