import { useContext, useEffect, useState } from "react";
// import { AuthContext } from '../../providers/AuthProviders/AuthProviders';
import SearchUser from "./SearchUser";
import { UserContext } from "../../providers/UserContextProvider";
import BodyText from "./BodyText";
import avater from "../../assets/person.png";
import { IoVideocam, IoCall } from "react-icons/io5";
import { MdInfo } from "react-icons/md";
import { MdStars } from "react-icons/md";
import Input from "./Input";
import Chats from "./Chats";
import { fetchRestaurants } from "../../hooks/api";

const Message = () => {
  const { currentUser } = useContext(UserContext);
  const [user, setUser] = useState([]);
  const [restaName, setRestName] = useState([]);
  const [restaImg, setRestImg] = useState('');
  const [check, setCheck] = useState(false);
  
  const handelUid = (uid) => {
    setUser(uid);
  };

  // CombineId
  const combinedId =
    currentUser?.uid > user?.uid
      ? currentUser?.uid + user?.uid
      : user?.uid + currentUser?.uid;

     
useEffect(() => {
  const replaceDisplayName = async(email) => {
    const restaurants = await fetchRestaurants();
    const restaurant = restaurants.find(restaurant => restaurant.ownerEmail === email);
    setRestName(restaurant? restaurant.restaurant_name : '')
    
  };


  const replaceDisplayImg = async (email) => {
    const restaurants = await fetchRestaurants();
    const restaurant = restaurants.find(restaurant => restaurant.ownerEmail === email);
    setRestImg(restaurant? restaurant.restaurant_img : '')
    
  };

  replaceDisplayImg(user.email)
  replaceDisplayName(user.email)
  
},[user.email])

     
     
  return (
    <div className="lg:w-[80%] w-full">
      <div className="px-5">
        {/* top section */}
        <div className="flex flex-col items-start justify-start gap-1 w-full">
          <div className="grid grid-cols-2 gap-1 justify-center items-center w-full bg-gray-50 p-4 drop-shadow">
            <div className="flex justify-start items-start">
              <div className="flex justify-center items-start gap-2 ">
                <img
                  src={currentUser?.photoURL}
                  alt=""
                  className="rounded-full w-12"
                />
                <h5 className="text-2xl font-bold">
                  {currentUser?.displayName}
                </h5>
              </div>
            </div>

            <div className="flex  justify-end items-center gap-3">
              <div>
                <span className="text-xl font-bold">{restaName? restaName : user?.displayName} </span>
                {user?.displayName && (
                  <div className="text-sm flex justify-center items-center gap-2">
                    <span>{restaName? 'Owner' : 'User' }</span>
                    <span className="text-sm text-blue-500">
                      <MdStars />
                    </span>
                  </div>
                )}
              </div>
              <img
                src={restaImg? restaImg : user?.photoURL ? user?.photoURL : avater}
                alt=""
                className="w-12 rounded-full ring-2 hover:ring-4 duration-100"
              />
              <div className="flex justify-center items-center gap-2 text-2xl text-blue-500">
                <div>
                  <IoCall />
                </div>
                <div>
                  <IoVideocam />
                </div>
                <div>
                  <MdInfo />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* lower section */}
        <div className="flex ">
          <div className="w-[30%] bg-white flex flex-col max-h-[50vh] overflow-y-scroll">
            <SearchUser  user={user}  handelUid={handelUid}/>

            <div className="bg-white drop-shadow-sm p-3 border-spacing-1 mb-2 font-bold ">
              All Message
            </div>

            <Chats handelUid={handelUid} combinedId={combinedId} user={user}/>
          </div>
          <div className="flex flex-col justify-end items-end w-8/12 xl:w-full">
            <div className="h-[90%] w-full">
              <BodyText user={user} check={check}/>
            </div>
            <div className="h-[10%] w-full">
              <Input user={user} setCheck={setCheck}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
