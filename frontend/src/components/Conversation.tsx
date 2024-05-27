import { FunctionComponent, useEffect, useState } from "react";
import "./Conversation.css"
interface UserConversationRelation {
  senderId: number;
  conversationId: number;
  recipientId: number;
}
interface UserData {
  id: number;
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  rates?: number;
  creationDate: Date;
  strikesNbr: number;
  status: string;
  nickname?: string;
  profilePicture?: string;
  role: string;
  resetToken?: string;
  tokenExpiration?: Date;
}
interface FrameComponentProps {
  conversation:UserConversationRelation
  userId:string
}
const Conversation: FunctionComponent<FrameComponentProps> = ({conversation,userId}) => {
  const [userFriend, setUserFriend] = useState<UserData>();
  
  // Appeler la fonction fetchProjects une fois que le composant est monté
  useEffect(() => {
    let friendId: number;

    if (conversation.senderId==Number(userId)) {
      console.log(conversation.senderId);
      console.log("yyyyyyyyyyyyyyyyyy")
      friendId = conversation.recipientId;
    } else {
      friendId = conversation.senderId;
    }
   const fetchuserFriend = async () => {
    try {


      if (!friendId) {
        console.error('User ID is missing in the URL');
        return;
      }
      const response = await fetch(`http://localhost:3001/api/user/${friendId}`);
      if (!response.ok) {
        console.error('Failed to fetch user');
      }
      const UserData = await response.json();
      console.log(UserData)
      setUserFriend(UserData )
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  fetchuserFriend();
  }, [userId,conversation])
  return (
    <div className="conversation">
  <img className="conversationImg"  src={`http://localhost:3001/uploads/imagee.png`} alt=""/>
    <span className="conversationName">{userFriend?.first_name+" "+userFriend?.last_name}</span>
    </div>
  );
};

export default Conversation;
