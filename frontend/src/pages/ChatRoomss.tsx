import { useState, useEffect, FunctionComponent, useRef } from "react";

import { io } from "socket.io-client";
import "./Discussion.css";
import "tailwindcss/tailwind.css"; // Chemin d'importation dépendant de votre configuration
import Conversation from "../components/Conversation";
import Message from "../components/Message";

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
  role: string;
  resetToken?: string;
  tokenExpiration?: Date;
}
interface UserConversationRelation {
  senderId: number;
  conversationId: number;
  recipientId: number;
}
interface MessageAttributes {
  id: number;
  creationDate: Date;
  message: string;
  senderId: number;
  conversationId: number;
}

interface User {
  userId: number;
  socketId: string;
}

const Discussion: FunctionComponent = () => {
  const [user, setUser] = useState<UserData>();

  const [discussions, setDiscussions] = useState<UserConversationRelation[]>(
    []
  );
  const [currentChat, setCurrentChat] = useState<UserConversationRelation>();

  const [messages, setMessages] = useState<MessageAttributes[]>([]);
  const [arrivalMessage, setArrivalMessage] = useState<MessageAttributes>();
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const Socket = useRef<any>(null);
  const [count, setCount] = useState<number>(100);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    Socket.current = io("ws://localhost:8900");
    Socket.current.on(
      "getMessage",
      (data: { senderId: number; message: string }) => {
        const fetchuserConversationss = async () => {
          try {
            if (!id) {
              console.error("User ID is missing in the URL");
              return;
            }
            const response = await fetch(
              `http://localhost:3001/api/userConversation/all`
            );
            if (!response.ok) {
              console.error("Failed to fetch user");
            }
            const UserData = await response.json();
            console.log(UserData, "hayabrasomek");
            setCount(UserData);
          } catch (error) {
            console.error("Error fetching user:", error);
          }
        };
        fetchuserConversationss();
        console.log(data.message, data.senderId, "ddddddddddouuuraaaaaaaaaaaa");
        console.log(currentChat?.conversationId);
        console.log("Arrival message set:", {
          id: 0,
          creationDate: new Date(),
          message: data.message,
          senderId: data.senderId,
          conversationId: count,
        });
        console.log(count, "ana fadit");
        setArrivalMessage({
          id: 0,
          creationDate: new Date(),
          message: data.message,
          senderId: data.senderId,
          conversationId: count,
        });
      }
    );

    console.log(arrivalMessage, "yaraby");
    console.log(count);
  }, [Socket.current, currentChat]);

  useEffect(() => {
    if (arrivalMessage && currentChat) {
      if (
        currentChat.senderId == arrivalMessage.senderId ||
        currentChat.recipientId == arrivalMessage.senderId
      ) {
        setMessages((prev) => [...prev, arrivalMessage]);
      }
    }
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    Socket.current.emit("addUser", id);
    Socket.current.on("getUsers", (users: User[]) => {
      console.log("gggggggggggg");
      console.log(users);
    });
  }, [user]);

  const fetchuser = async () => {
    try {
      if (!id) {
        console.error("User ID is missing in the URL");
        return;
      }
      const response = await fetch(`http://localhost:3001/api/user/${id}`);
      if (!response.ok) {
        console.error("Failed to fetch user");
      }
      const UserData = await response.json();

      setUser(UserData);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Appeler la fonction fetchProjects une fois que le composant est monté
  useEffect(() => {
    fetchuser();
  }, [id]);

  const fetchuserConversations = async () => {
    try {
      if (!id) {
        console.error("User ID is missing in the URL");
        return;
      }
      const response = await fetch(
        `http://localhost:3001/api/userConversation/all`
      );
      if (!response.ok) {
        console.error("Failed to fetch user");
      }
      const UserData = await response.json();
      console.log(UserData, "fyfyfyfyfyfyfyfyf");
      setDiscussions(UserData);
      console.log(user);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchuserConversations();
    console.log(discussions, "jhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    console.log(discussions);
  }, [id]);

  // Appeler la fonction fetchProjects une fois que le composant est monté
  useEffect(() => {
    const fetchMessagesByConversation = async () => {
      try {
        if (!id) {
          console.error("User ID is missing in the URL");
          return;
        }
        const response = await fetch(
          `http://localhost:3001/api/messages/messages/${currentChat?.conversationId}`
        );
        if (!response.ok) {
          console.error("Failed to fetch user");
        }
        const UserData = await response.json();
        setMessages(UserData);
        console.log(user);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchMessagesByConversation();
  }, [currentChat]);

  const handleSubmit = async () => {
    let friendId: number | undefined;

    if (currentChat) {
      if (currentChat.senderId == Number(id)) {
        friendId = currentChat.recipientId;
      } else {
        friendId = currentChat.senderId;
      }
    }
    console.log(friendId);
    console.log("lifrienddddddddddddddd");
    Socket?.current.emit("sendMessage", {
      senderId: id,
      receiverId: friendId,
      message: newMessage,
    });
    console.log(id, friendId, newMessage, "hhhhhhhhhhh");
    try {
      // Vérifiez si la conversation est sélectionnée
      if (!currentChat) {
        console.error("No conversation selected");
        return;
      }

      // Vérifiez si le message est valide
      if (!newMessage.trim()) {
        console.error("Message cannot be empty");
        return;
      }

      // Créez un nouvel objet message avec les données nécessaires

      // Envoyez la demande de création du message au backend
      const response = await fetch(
        `http://localhost:3001/api/messages/messages`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: newMessage,
            senderId: id,
            conversationId: currentChat.conversationId,
          }),
        }
      );

      // Vérifiez si la demande a réussi
      if (!response.ok) {
        console.error("Failed to add message");
        return;
      }

      // Si la demande a réussi, mettez à jour la liste des messages localement
      const newMessageResponse = await response.json();
      setMessages([...messages, newMessageResponse]);
      setNewMessage(""); // Effacez le champ de saisie du message
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const handleReport = async () => {
    setShowReportModal(true);
  };

  const handleReportt = async () => {
    const from =
      currentChat?.senderId == id
        ? currentChat?.senderId
        : currentChat?.recipientId;
    const to =
      currentChat?.senderId == id
        ? currentChat?.recipientId
        : currentChat?.senderId;
    const reportData = {
      type: selectedOption,
      reportDate: new Date(),
      reason: textInput,
      isHandled: false,
      from: from,
      to: to,
    };
    try {
      const response = await fetch("http://localhost:3001/api/signalement/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (!response.ok) {
        throw new Error("Failed to add report");
      }

      const responseData = await response.json();
      console.log("Report added successfully:", responseData);
    } catch (error) {
      console.error("Error adding report:", error);
    }
  };
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  console.log(currentChat);
  return (
    <div className="kol ">
      <div className="messenger">
        <div className="nathem">
          <div className="tahtism">
            <div className="chatMenu">
              <div className="chatMenuWrapper">
                {discussions.map((c, index) => (
                  <div key={index} onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} userId={id || ""} />
                  </div>
                ))}
              </div>
            </div>
            <div className="chatBox">
              <div className="chatBoxWrapper">
                {currentChat ? (
                  <>
                    <div className="chatBoxTop" ref={scrollRef}>
                      {messages.map((m, index) => (
                        <div key={index}>
                          <Message message={m} own={m.senderId == Number(id)} />
                        </div>
                      ))}
                    </div>
                    <br></br>
                    <div className="chatBoxBottom">
                      <textarea
                        className="chatMessageInput"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                      ></textarea>
                      <button
                        className="chatSubmitButton bleu"
                        onClick={handleSubmit}
                      >
                        Send
                      </button>
                      <button
                        className="chatSubmitButton rouge"
                        onClick={handleReport}
                      >
                        report
                      </button>
                    </div>
                  </>
                ) : (
                  <span className="noConversationText">
                    open a conversation to start a chat ...
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showReportModal && (
        <div className="reportModal" onClick={() => setShowReportModal(false)}>
          <div className="reportContent" onClick={(e) => e.stopPropagation()}>
            <h2 className="ktiba">
              <p className="lowel"> Report User</p>
            </h2>
            <form>
              <div>
                <select
                  aria-required
                  id="dropdown"
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  <option className="dropdown" value="Progress Report">
                    Progress Report
                  </option>
                  <option className="dropdown" value=" Insatisfaction Report">
                    Insatisfaction Report
                  </option>
                  <option
                    className="dropdown"
                    value=" Contract Violation Report"
                  >
                    Contract Violation Report
                  </option>
                  <option
                    className="dropdown"
                    value=" Quality Assurance Report"
                  >
                    Quality Assurance Report
                  </option>
                </select>
              </div>
              <div>
                <input
                  placeholder="reason"
                  type="text"
                  id="textInput"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                />
              </div>
            </form>
            <div className="row flex gap-4 ">
              <button className="send-wrapper" onClick={handleReportt}>
                <div className="wwrapper">
                  <div className="send2">Send</div>
                </div>
              </button>
              <button
                className="frame-wrapper33"
                onClick={() => setShowReportModal(false)}
              >
                <div className="cancel-wrapper">
                  <div className="cancel">Cancel</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;
