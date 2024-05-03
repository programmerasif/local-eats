import { useContext, useState } from "react";
import {collection,query,where,getDocs} from "firebase/firestore";
import { db } from "../../Firebase/firebase.config";

import { UserContext } from "../../providers/UserContextProvider";
import { fetchRestaurants } from "../../hooks/api";

const SearchUser = (handelUid) => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);
    const { currentUser } = useContext(UserContext);
    const [cngName, setCngNme] = useState("");
    const [restImg, setRestIMG] = useState("");
   
    const handleSearch = async () => {

      const restaurants = await fetchRestaurants();
    const restaurant = restaurants.find(restaurant => restaurant.restaurant_name == username);
    setRestIMG(restaurant? restaurant.restaurant_img : '')
    setCngNme(restaurant? restaurant.name : '')
      
        const q = query(
          collection(db, "users"),
          where("displayName", "==", cngName)
        );
    
        try {
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            setUser(doc.data());
          });
        } catch (err) {
          setErr(true);
        }
      };
    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
      };


      const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        handelUid(user)
    
        setUser(null);
        setUsername("")
      };


    return (
        <div className="py-3 px-2">
            <div className="w-full flex justify-start items-start gap-3">
                <input
                    type="text"
                    className="border-gray-300 border-2 w-full px-3 py-2 rounded-md"
                    placeholder="Find User"
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>

            {user && (
          
                <div className="flex justify-start items-start gap-3 p-5 drop-shadow-md bg-gray-100 mt-4" onClick={handleSelect}>
                    <div>
                        <img src={restImg? restImg : '' } alt="" className="w-20" />
                    </div>
                    <div>
                        <h4 className="text-2xl font-semibold">{username}</h4>
                       
                    </div>
                </div>
             )}
        </div>
    );
};

export default SearchUser;