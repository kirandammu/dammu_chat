import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const SignUpPage = () => {

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  }

  return (
    <div className="fixed bg-black/30 justify-center top-0 right-0 left-0 bottom-0 flex items-center ">
      <div className="flex flex-col justify-center bg-white rounded-xl  items-center p-9 px-12 text-gray-800">
          {/* LOGO */}
          <div className="text-center mb-5">
              <h1 className="text-2xl font-semibold text-black">Create Account</h1>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control flex flex-col">
              <span className="font-medium"> Name:</span>
              <input type="text" className={'border border-gray-600 w-64 p-1 px-3 outline-none rounded'} placeholder="John Doe" 
              value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}/>
            </div>
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

            <button type="submit" className="w-full bg-black text-white cursor-pointer rounded-md p-2" >Create Account</button>
          </form>
          <p className="text-center text-sm pt-3"> Already have an account ?{' '}<Link to="/login" className="text-[red]">Sign in</Link></p>
      </div>
    </div>
  );
};
export default SignUpPage;
