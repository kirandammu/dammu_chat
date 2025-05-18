import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { useAuthContext } from "../context/AuthContext";
import { IoIosCamera } from "react-icons/io";
import { RxCrossCircled } from "react-icons/rx";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile, navigate } = useAuthContext();
  const [selectedImg, setSelectedImg] = useState(authUser.profilePic);
  const [name, setName] = useState(authUser.fullName);
  const [bio, setBio] = useState(authUser.bio);
  
  const handleImageUpload = async (e) => {
    e.preventDefault();
    if(!selectedImg){
      await updateProfile({name, bio})
      navigate('/')
      return
    }

    const reader = new FileReader();

    reader.readAsDataURL(selectedImg);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image , name, bio})
      navigate('/')
    };
  };

  return (
    <div className="fixed bg-black/30 justify-center top-0 right-0 left-0 bottom-0 flex items-center">
      <div className="flex flex-col relative bg-white rounded-2xl justify-center items-center p-10 w-[600px]">
        <div className="text-center"><h1 className="text-2xl font-semibold ">{authUser?.email}</h1></div>
         <RxCrossCircled onClick={() =>  navigate('/')} className="text-black absolute cursor-pointer top-3 right-3 rounded-full w-6 h-6" />
        <div className="bg-base-300 rounded-xl p-6 space-y-8 flex justify-between">
          <div className="flex flex-col items-center gap-4">
          <div className="text-center">
            <p className="mt-2">Your profile information</p>
          </div>

            <div className="relative">
              <img
                src={selectedImg ?authUser.profilePic : "/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <IoIosCamera className="w-5 h-5 text-bold" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={(e)=>setSelectedImg(e.target.files[0])}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <IoPerson className="w-4 h-4 font-bold text-black" />
                Full Name
              </div>
              <p className="font-semibold uppercase mx-3 p-1">{authUser.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <MdOutlineMailOutline className="w-4 h-4 font-bold text-black" />
                Bio
              </div>
                <textarea value={bio} onChange={(e)=>setBio(e.target.value)}  placeholder='write your own bio ' className="w-60 p-1 text-gray-700 h-16 rounded border border-gray-300 outline-none"></textarea>
            </div>
            <div>
              <input type="button" onClick={handleImageUpload} value={isUpdatingProfile ? "Uploading...": "Update"} className="bg-black text-white font-bold w-full p-2 cursor-pointer rounded-md" />
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
};
export default ProfilePage;
