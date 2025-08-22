import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/url";
import Header from "./Header";
import toast from "react-hot-toast";

let socket;

const Chat = () => {
    const {targetUserId}= useParams();
    
    const user = useSelector((store) => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);
    const [targetUser, setTargetUser] = useState(null);
    const messagesEndRef = useRef(null);

    const fetchTargetUser = async () => {
        try {
            const res = await axios(`${BASE_URL}/profile/view/${targetUserId}`);
            setTargetUser(res.data);            
        } catch (err) {
            console.error("Failed to fetch target user", err);
            toast.error("Something went wrong")
        }
    };

    const fetchMessages = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/message/${user._id}/${targetUserId}`,{withCredentials: true});
            setMessages(res.data);
        }
        catch(err) {
            console.log(err);
        }
    };

    useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

    useEffect(() => {
        fetchMessages();
        fetchTargetUser();
        const socketInstance = createSocketConnection();
        setSocket(socketInstance);

        socketInstance.emit("joinChat", { 
            firstName: user?.firstName, 
            senderId: user?._id, 
            targetUserId 
        });

        socketInstance.on("receivedMessage", (msg) => {
            setMessages((prev) => [...prev, msg]);
        });
        return () => {
            socketInstance.disconnect();
        }
    }, [user?._id, targetUserId]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;
        
        const msg = {
            name: `${user.firstName} ${user.lastName}`, 
            senderId: user._id, 
            targetUserId, 
            message: newMessage
        };

        socket.emit("sendMessage", msg);        
        setNewMessage("");
    }

    return (
        <div>
            <Header />
            <div className="h-[90vh] flex items-center ">
                <div className="md:w-[70%] h-[85vh] mx-auto border border-[#ccc] flex flex-col">
                    <h1 className="font-bold text-2xl flex justify-center items-center border-b-1 h-[10vh] border-[#ccc] p-3">
                        {`${targetUser?.firstName} ${targetUser?.lastName}`}
                    </h1>
                    {/* all chat */}
                    <div className="flex-1 h-[60vh] overflow-y-auto p-3">
                        <div className="flex flex-col gap-2">
                            {Array.isArray(messages) && messages?.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[70%] border border-gray-400 rounded-lg p-2 ${
                                        msg.senderId === user._id ? "self-end bg-green-200" : "self-start bg-white"
                                    }`}
                                >
                                    {/* <span className="block text-sm font-semibold">{msg.name}</span> */}
                                    <span>{msg.message}</span>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    {/* {console.log(messages)} */}
                    <div className="h-[10vh] border-t-1 border-[#ccc] p-3 flex justify-between gap-5">
                        <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="border border-[#ccc] flex-1 p-2 rounded" />
                        <button onClick={sendMessage} className="border border-solid px-4 py-2 cursor-pointer rounded-lg bg-green-500 text-white hover:bg-green-700">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Chat;