import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/firebase.config";
import { onAuthStateChanged } from "firebase/auth";
import addUserToDatabase from "../hooks/addUserToDatabase";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            setLoading(false);
            const userData = { displayName: user?.displayName, email: user?.email, photoURL: user?.photoURL };
            await addUserToDatabase(user, userData);
        });

        return unsubscribe; 
    };

    const unsubscribe = fetchData(); 

    return () => {
        unsubscribe();
    };
}, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {!loading && children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
