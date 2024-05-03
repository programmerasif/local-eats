import { db } from "../../Firebase/firebase.config";
import { useContext, useState } from "react";
import { UserContext } from "../../providers/UserContextProvider";
import { doc, setDoc, arrayUnion, updateDoc, serverTimestamp } from "firebase/firestore";

const Input = ({ user, setCheck}) => {
  const { currentUser } = useContext(UserContext);
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    if (message.trim() !== '') {
      const conversationId = generateConversationId(currentUser, user);
      const conversationRef = doc(db, 'conversations', conversationId);
      
      try {
        const timestamp = Date.now();
        await setDoc(conversationRef, {
          messages: arrayUnion({
            senderId: currentUser.uid,
            receiverId: user.uid,
            message: message,
            timestamp: timestamp
          })
        }, { merge: true });

       
        // Update last message time only if message is sent
        await updateLastMessage(currentUser.uid, user.uid,message);
        await updateLastMessage(user.uid, currentUser.uid,message);
        await updateUserLastMessage(user.uid, currentUser.uid,message);

        setCheck(true)
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const updateLastMessage = async (senderId, recipientId,message) => {
    try {
      await updateDoc(doc(db, "users", senderId), {
        lastMessage: {
          senderId: senderId,
          recipientId: recipientId,
          timestamp: serverTimestamp(),
          lastText: message,
        }
      });


    } catch (error) {
      console.error('Error updating last message:', error);
    }
  };



  const updateUserLastMessage = async (senderId, recipientId,message) => {
    try {
     
      const timestamp = Date.now();
    // Store message for the sender
    const senderMessageRef = doc(db, 'users', currentUser.uid);
    await setDoc(senderMessageRef, {
      messages: arrayUnion({
        senderId: currentUser.uid,
        receiverId: user.uid,
        message: message,
        timestamp: timestamp
      })
    }, { merge: true });

    // Store message for the receiver
    const receiverMessageRef = doc(db, 'users', user.uid);
    await setDoc(receiverMessageRef, {
      messages: arrayUnion({
        senderId: currentUser.uid,
        receiverId: user.uid,
        message: message,
        timestamp: timestamp
      })
    }, { merge: true });

    } catch (error) {
      console.error('Error updating updateUserLastMessage:', error);
    }
  };
  const generateConversationId = (currentUser, user) => {
    const combinedId =
      currentUser?.uid > user?.uid
        ? currentUser?.uid + user?.uid
        : user?.uid + currentUser?.uid;

    return combinedId
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="bg-blue-100 focus:outline-none focus:bg-white border border-blue-300 rounded-lg py-2 px-4 mr-2 w-full"
      />
      <button onClick={sendMessage} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
    </div>
  );
};

export default Input;