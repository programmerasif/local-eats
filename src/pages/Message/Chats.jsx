import { doc, onSnapshot, collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../Firebase/firebase.config";
import avater from '../../assets/person.png'
import { fetchRestaurants } from "../../hooks/api";
import { UserContext } from "../../providers/UserContextProvider";
import getUserRole from "../../hooks/getUserRole";

const Chats = ({ handelUid, combinedId}) => {
  const [allUsers, setAllUsers] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const { currentUser} = useContext(UserContext);
  const [role, setRole] = useState('');

  useEffect(() => {

    const  getRole = async() => {
     
      const rol = await getUserRole(currentUser)
      setRole(rol);
    }
    getRole()
  },[currentUser])

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const filteredUsers = usersData.filter(user => user?.uid !== currentUser?.uid);
        setAllUsers(filteredUsers);

        const restaurants = await fetchRestaurants();
        setRestaurants(restaurants);
      } catch (error) {
        console.error("Error fetching all users:", error);
      }
    };

    fetchAllUsers();
  }, [currentUser?.uid]);

  useEffect(() => {
    const conversationRef = doc(db, 'conversations', combinedId);
    const unsubscribe = onSnapshot(conversationRef, (snapshot) => {
      const data = snapshot.data();
      if (data) {
        // handle messages update
      }
    });

    return () => unsubscribe();
  }, [combinedId]);

  const replaceDisplayName = (email) => {
    const user = allUsers.find(user => user.email === email);
    const restaurant = restaurants.find(restaurant => restaurant.ownerEmail === email);
    return restaurant ? restaurant.restaurant_name : user ? user.displayName : '';
  };

  const replaceDisplayImg = (email) => {
    const restaurant = restaurants.find(restaurant => restaurant.ownerEmail === email);
    return restaurant ? restaurant.restaurant_img : '';
  };

  // Sort users based on the timestamp of the last message
  // const sortedUsers = allUsers.slice().sort((a, b) => {
  //   const timestampA = a.lastMessage ? (a.lastMessage.timestamp ? a.lastMessage.timestamp.seconds : 0) : 0;
  //   const timestampB = b.lastMessage ? (b.lastMessage.timestamp ? b.lastMessage.timestamp.seconds : 0) : 0;
  //   const result = timestampB - timestampA
  //   return result ;
  // });
  const users =allUsers.filter((user) => user.role == 'user');
  const owner =allUsers.filter((user) => user.role == 'owner');

  // console.log(users);
  // console.log(owner);

 
  return (
    <div className="">
      {role === 'user' ? (
        owner.map((u) => (
          <div className='flex flex-col cursor-pointer border transition-colors duration-300 ease-in-out hover:bg-gray-200 ' key={u.id} onClick={() => handelUid(u)}>
          <div className='flex justify-start items-center gap-3 p-5 drop-shadow-md'>
            <div className='flex justify-center items-center gap-3'>
              <img src={replaceDisplayImg(u.email) ? replaceDisplayImg(u.email) : u.photoURL ? u.photoURL : avater} alt="" className="rounded-full w-12 h-12 ring-2 " />
              <div className="">
                <h4 className=' font-bold text-blue-600 mt-2 mb-2'>{replaceDisplayName(u.email)}</h4>
                <p className='text-sm text-black font-semibold'>Conected...</p>
              </div>
            </div>
          </div>
        </div>
        ))
      ) : (
        users.map((u) => (
          <div className='flex flex-col cursor-pointer border transition-colors duration-300 ease-in-out hover:bg-gray-200 ' key={u.id} onClick={() => handelUid(u)}>
          <div className='flex justify-start items-center gap-3 p-5 drop-shadow-md'>
            <div className='flex justify-center items-center gap-3'>
              <img src={replaceDisplayImg(u.email) ? replaceDisplayImg(u.email) : u.photoURL ? u.photoURL : avater} alt="" className="rounded-full w-12 h-12 ring-2 " />
              <div className="">
                <h4 className=' font-bold text-blue-600 mt-2 mb-2'>{replaceDisplayName(u.email)}</h4>
                <p className='text-sm text-black font-semibold'>Cnnected...</p>
              </div>
            </div>
          </div>
        </div>
        ))
      )}
    </div>
  );

};

export default Chats;
