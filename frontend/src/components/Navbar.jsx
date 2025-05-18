import { Link } from "react-router-dom";
import { FaRegMessage } from "react-icons/fa6";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, authUser } = useAuthContext();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 
    backdrop-blur-lg bg-base-100/80 bg-white">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 ">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <FaRegMessage className="w-6 h-6" />
              </div>
              <h1 className="text-lg font-bold">DAMMU CHAT</h1>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            

            {authUser && (
              <>
                <Link to={"/profile"} className='px-5 py-1 border-gray-950 border rounded '>
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button className="flex w-20 rounded bg-black text-white cursor-pointer justify-center p-1 items-center" onClick={logout}>
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Navbar;
