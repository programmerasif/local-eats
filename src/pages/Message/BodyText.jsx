import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import { db } from "../../Firebase/firebase.config";
import { UserContext } from "../../providers/UserContextProvider";

const BodyText = ({ user,check}) => {
  const [messages, setMessages] = useState([]);
  const { currentUser } = useContext(UserContext);
  

  const messagesEndRef = useRef(null); 

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]); //
  const combinedId =
    currentUser?.uid > user?.uid
      ? currentUser?.uid + user?.uid
      : user?.uid + currentUser?.uid;

  useEffect(() => {
    const conversationRef = doc(db, 'conversations', combinedId);
    const unsubscribe = onSnapshot(conversationRef, (snapshot) => {
      const data = snapshot.data();
    
      // if (data) {
      //   setMessages(data.messages);
      // }
      // setMessages([])
      if (data && data.messages && data.messages.length > 0) { 
        // Check if messages array exists and is not empty
        setMessages(data.messages);
      }
      
    });

    return () => unsubscribe();
  }, [combinedId,check]);

  return (
    <div className="overflow-x-auto h-[40vh] mb-1">
      {messages.map((message, index) => (
        <div key={index} className={message.senderId === currentUser.uid ? 'flex justify-end items-end' : 'flex justify-start items-start'}>
          <p className={message.senderId === currentUser.uid ? 'bg-blue-500 w-fit px-5 py-3 rounded-full text-white font-semibold mt-3' : 'bg-gray-100 font-semibold w-fit px-5 py-3 mt-3 rounded-full'}>{message.message}</p>
        </div>
      ))}
      <div ref={messagesEndRef}></div> 
    </div>
  );
};

export default BodyText;