import { createContext, useContext, useReducer } from 'react';
import { UserContext } from './UserContextProvider';


export const ChatContext = createContext();

const ChatContextProvider = ({ children }) => {
    const { currentUser} = useContext(UserContext);
 
    const INNITIAL_STATE = {
        chatId : 'null',
        users :{}
     }
     const chatReducer = (state, action) => {
        console.log(action.type);
        switch (action.type) {
          case "CHANGE_USER":
            return {
              user: action.payload,
              chatId:
                currentUser?.uid > action.payload.uid
                  ? currentUser?.uid + action.payload.uid
                  : action.payload.uid + currentUser?.uid,
            };
    
          default:
            return state;
        }
      };
      const [state, dispatch] = useReducer(chatReducer, INNITIAL_STATE);
    return (
        <ChatContext.Provider value={{ data:state, dispatch }}>
            {children}
        </ChatContext.Provider>
    );
}
export default ChatContextProvider