import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase/firebase.config";


const updatedRoleFirebase = async(userId, newRole) => {
    try {
      console.log('here working');
        const userDocRef = doc(db, "users", userId);
        await updateDoc(userDocRef, { role: newRole });
        console.log("User role updated in Firestore");
      } catch (error) {
        console.error("Error updating user role in Firestore:", error);
      }
};

export default updatedRoleFirebase;