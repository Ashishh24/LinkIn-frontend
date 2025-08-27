import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/url";
import Header from "./Header";
import toast from "react-hot-toast";
import { addConnection } from "../utils/connectionSlice.js";

const Chat = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const { targetUserId } = useParams();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [targetUser, setTargetUser] = useState(null);
  const messagesEndRef = useRef(null);

  const connectionsData = async () => {
    if (connections) return;
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchTargetUser = async () => {
    try {
      const res = await axios(`${BASE_URL}/profile/view/${targetUserId}`);
      setTargetUser(res.data);
    } catch (err) {
      console.error("Failed to fetch target user", err);
      toast.error("Something went wrong");
    }
  };

  const fetchMessages = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/message/${user._id}/${targetUserId}`,
        { withCredentials: true }
      );
      setMessages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    connectionsData();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!targetUserId) return;

    fetchMessages();
    fetchTargetUser();
    const socketInstance = createSocketConnection();
    setSocket(socketInstance);

    socketInstance.emit("joinChat", {
      firstName: user?.firstName,
      senderId: user?._id,
      targetUserId,
    });

    socketInstance.on("receivedMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socketInstance.disconnect();
    };
  }, [user?._id, targetUserId]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const msg = {
      name: `${user.firstName} ${user.lastName}`,
      senderId: user._id,
      targetUserId,
      message: newMessage,
    };

    socket.emit("sendMessage", msg);
    setNewMessage("");
  };

  const openChat = async (c) => {
    setMessages([]);
    setTargetUser(c);
    navigate(`/chat/${c._id}`);
    try {
      await axios.patch(
        `${BASE_URL}/message/mark-read`,
        { senderId: c._id },
        { withCredentials: true }
      );
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      console.error("Failed to mark messages as read", err);
    }
  };

  if (connections === null) {
    return (
      <div>
        <Header />
        <h1 className="font-bold text-2xl flex justify-center my-5">
          You have no connections!!
        </h1>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex p-2 min-h-[90vh]">
        {/* hidden md:block will use for mobile view */}
        <div className="w-1/4 border-r p-2 overflow-y-auto">
          <h2 className="font-semibold text-2xl my-3">Connections</h2>
          {connections.map((c) => (
            <div
              key={c._id}
              className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${
                targetUser?._id === c._id ? "bg-gray-200" : ""
              }`}
              onClick={() => {
                openChat(c);
              }}>
              {c.firstName} {c.lastName}
              {c.unreadCount > 0 && (
                <span className="ml-2 text-xs bg-red-500 text-white rounded-full px-2">
                  {c.unreadCount}
                </span>
              )}
            </div>
          ))}
        </div>
        {targetUser && (
          <div className="w-full flex items-center ">
            <div className="md:w-[70%] h-[85vh] mx-auto border border-[#ccc] flex flex-col">
              <h1 className="font-bold text-2xl flex justify-center items-center border-b-1 h-[10vh] border-[#ccc] p-3">
                {`${targetUser?.firstName} ${targetUser?.lastName}`}
              </h1>
              {/* all chat */}
              <div className="flex-1 h-[60vh] overflow-y-auto p-3">
                <div className="flex flex-col gap-2">
                  {Array.isArray(messages) &&
                    messages?.map((msg, index) => (
                      <div
                        key={index}
                        className={`max-w-[70%] border border-gray-400 rounded-lg p-2 ${
                          msg.senderId === user._id
                            ? "self-end bg-green-200"
                            : "self-start bg-white"
                        }`}>
                        {/* <span className="block text-sm font-semibold">{msg.name}</span> */}
                        <span>{msg.message}</span>
                      </div>
                    ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              {/* {console.log(messages)} */}
              <div className="h-[10vh] border-t-1 border-[#ccc] p-3 flex justify-between gap-5">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="border border-[#ccc] flex-1 p-2 rounded"
                />
                <button
                  onClick={sendMessage}
                  className="border border-solid px-4 py-2 cursor-pointer rounded-lg bg-green-500 text-white hover:bg-green-700">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
