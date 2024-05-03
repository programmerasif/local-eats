import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProviders/AuthProviders";
import profile from "../../assets/profileLogo.png";
import { Link } from "react-router-dom";

export const LogOut = ({ logOut }) => {
  const { user } = useContext(AuthContext);
  
  return (
    <div className="flex justify-center space-x-5 items-center">
      <button
        onClick={logOut}
        className="bg-[#3D83D9] hover:bg-white
         hover:text-[#3D83D9] hover:scale-90 duration-500 w-28 py-3 px-[2px] text-white rounded-2xl font-bold text-center"
      >
        Log out
      </button>
      {user?.photoURL ? (
        <Link to={`/rest-profile/${user.uid}`}>
          <img
            className="rounded-full w-14 ring-4 hover:scale-95 hover:ring-orange-400 duration-300 ring-white"
            width={1080}
            height={720}
            src={user?.photoURL}
            alt=""
          />
        </Link>
      ) : (
        <Link to={`/rest-profile/${user.uid}`}>
          <img
            src={profile}
            className="rounded-full w-14 ring-4 hover:scale-95 hover:ring-orange-400 duration-300 ring-white"
            width={1080}
            height={720}
            alt="demo"
          />
        </Link>
      )}
    </div>
  );
};
