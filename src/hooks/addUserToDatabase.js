import { db } from "../Firebase/firebase.config";
import { doc, getDoc, setDoc } from "firebase/firestore";



const addUserToDatabase = async (user, userData) => {
  try {
    // Add user data to the database
    const userDocRef = doc(db, "users", user?.uid);

    // Retrieve the user document snapshot
    const userDocSnapshot = await getDoc(userDocRef);
    // Initialize messages as an empty array
    const initialMessages = [];
    // Check if the user document exists and if it has a lastMessage field
    const lastMessageExists = userDocSnapshot.exists() && userDocSnapshot.data().lastMessage;
   // Check if the user document exists and if it has a role field
   const roleExists = userDocSnapshot.exists() && userDocSnapshot.data().role;

   // Check if the role is already set to "owner"
   const roleIsOwner = roleExists && userDocSnapshot.data().role === 'owner';

   // Check if the role is already set to "user" 
   const roleIsUser = roleExists && userDocSnapshot.data().role === 'user';

    // Initialize lastMessage as an empty object only if it doesn't exist
    const userDataForFirestore = {
      uid: user?.uid,
      displayName: userData?.displayName,
      email: userData?.email,
      photoURL: userData?.photoURL,
      role: roleIsOwner ? 'owner' : (roleIsUser ? 'user' : 'user'),
      lastMessage: lastMessageExists ? userDocSnapshot.data().lastMessage : {},
      lastText: '',
      messages: initialMessages
    };

    // Set the user data document
    await setDoc(userDocRef, userDataForFirestore);
    setupUserChatDocument
    console.log("User data added to Firestore");
  } catch (error) {
    console.error("Error adding user to Firestore:", error);
  }
};

const setupUserChatDocument = async (userId) => {
  try {
    // Create a chat document for the user
    const userChatRef = doc(db, "chats", userId);
    await setDoc(userChatRef, {}); // Assuming messages field is needed
    console.log("User chat document created:", userId);
  } catch (error) {
    console.error("Error setting up user chat document:", error);
  }
};

export default addUserToDatabase;