import { collection, limit, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../Firebase/firebase.config";


const Conversation = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
      // Query to get the latest 50 messages ordered by timestamp
      const q = query(
        collection(db, 'messages'),
        orderBy('timestamp'),
        limit(50)
      );
  
      // Subscribe to the query snapshot to listen for updates
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const messageData = snapshot.docs.map(doc => doc.data());
        setMessages(messageData);
      });
  
      // Unsubscribe from the query snapshot when component unmounts
      return () => unsubscribe();
    }, []);
  
    return (
      <div className="overflow-y-auto h-80"> 
        {messages?.map((message, index) => (
          <div key={index} className="flex flex-col mb-2">
            <p className="text-gray-600">{message.text}</p> 
            <p className="text-sm text-gray-400"></p> 
          </div>
        ))}
      </div>
    );
};

export default Conversation;