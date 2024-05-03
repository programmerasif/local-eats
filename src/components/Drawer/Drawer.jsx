import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { AuthContext } from "../../providers/AuthProviders/AuthProviders";
import { TbPinnedFilled } from "react-icons/tb";
import getUserRole from "../../hooks/getUserRole";

const Drawer = () => {
  const [isOpen, setOpen] = useState(false);
  const { logOut, user } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);
  const [role, setRole] = useState('');

  const openMenu = () => {
    setOpen(!isOpen);
  };
  
  const navigate = useNavigate();

  const userLogOut = () => {
    logOut();
    navigate("/");
  };



useEffect(() => {

  const  getRole = async() => {
    const rol = await getUserRole(user)
    setRole(rol);
  }
  getRole()
},[user])

  const hasDataPosted = localStorage.getItem("hasDataPosted") === "true";
  const demoUser = role;

  console.log(role);

  return (
    <>
      <div className="bg-white w-96 hidden md:block ">
        <div className="text-xl tracking-tighter font-semibold flex justify-center items-center p-7 bg-slate-300 uppercase">Welcome To <span className="text-[#fb923c] mx-1">{role}</span><span className="ms-1"> Dashboard</span> </div>
        <hr />
        <div className="flex flex-col font-semibold text-xl w-64 mx-auto pt-10 h-96">
          {demoUser == "owner" ? (
            <Link to="/view-menus" className="pb-4">
              View Menu
            </Link>
          ) : (
            <></>
          )}
          {demoUser == "owner" ? (
            <Link to="AddItems" className="border-t py-4 border-slate-300">
              Add Menu
            </Link>
          ) : (
            <></>
          )}
          <Link
            to="message"
            className={`${
              demoUser == "owner" ? "border-t" : "border-none"
            } py-4 border-slate-300`}
          >
            Messages
          </Link>
          {/* For Normal User */}
          {demoUser == "user" ? (
            <Link to="edit-profile" className="border-t py-4 border-slate-300">
              Edit Profile
            </Link>
          ) : (
            <></>
          )}
          {/* For Restaurant Owner */}
          {demoUser == "owner" ? (
            <Link
              to="owner-profile"
              className="border-t flex justify-between items-center py-4 border-slate-300"
            >
              <h1>Edit Profile</h1>
              {!hasDataPosted ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div className="text-red-500 hover:scale-95 rounded-full w-6">
                    <TbPinnedFilled size={25} />
                  </div>
                  {isHovered && (
                    <div className="absolute -top-10 duration-200 left-0 text-sm bg-slate-200 w-52 text-black p-2 rounded">
                      Set up your restaurant Profile
                    </div>
                  )}
                </div>
              ) : (
                <></>
              )}
            </Link>
          ) : (
            <></>
          )}

          {role == "admin" ? (
            <Link to="permission" className="border-t py-4 border-slate-300">
              Rest permission
            </Link>
          ) : (
            <></>
          )}
          <button
            onClick={userLogOut}
            className="border-t flex py-4 border-slate-300"
          >
            Logout
          </button>
        </div>
      </div>

      {isOpen ? (
        <>
          <div
            className={`flex w-60 ml-1 md:hidden h-96 bg-slate-50 rounded-lg absolute top-0 ${
              isOpen
                ? "transition-transform translate-x-0 duration-300"
                : "transition-transform -translate-x-96 duration-300"
            } `}
          >
            <div className="flex flex-col font-semibold text-xl mx-auto justify-center">
              <Link to="/view-menus" className="pb-4">
                View Menu
              </Link>
              <Link to="AddItems" className="border-t py-4 border-slate-300">
                Add Menu
              </Link>
              <Link to="message" className="border-t py-4 border-slate-300">
                Messages
              </Link>
              <Link
                to="edit-profile"
                className="border-t py-4 border-slate-300"
              >
                Edit Profile
              </Link>
              <button
                onClick={userLogOut}
                className="border-t flex py-4 border-slate-300"
              >
                Logout
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
      <button
        onClick={openMenu}
        className={`font-bold absolute md:hidden top-2 left-1 ${
          !isOpen ? "bg-orange-400" : "bg-slate-50"
        } p-1 rounded-lg`}
      >
        {!isOpen ? <GiHamburgerMenu size={30} /> : <IoMdClose size={30} />}
      </button>
    </>
  );
};

export default Drawer;
