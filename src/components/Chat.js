import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/url";

let socket;

const Chat = () => {
    const {targetUserId}= useParams();
    
    const user = useSelector((store) => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState(null);

    const [targetUser, setTargetUser] = useState(null);

    const fetchTargetUser = async () => {
        try {
            console.log(`${BASE_URL}/profile/view/${targetUserId}`);
            const res = await axios(`${BASE_URL}/profile/view/${targetUserId}`);
            setTargetUser(res.data.data);
            console.log(res?.data?.data);
            
        } catch (err) {
            console.error("Failed to fetch target user", err);
        }
    };

    console.log(targetUser);

    useEffect(() => {

        fetchTargetUser();
        const socketInstance = createSocketConnection();
        setSocket(socketInstance);

        socketInstance.emit("joinChat", { 
            firstName: user?.firstName, 
            userId: user?._id, 
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
            userId: user._id, 
            targetUserId, 
            text: newMessage
        };

        socket.emit("sendMessage", msg);        
        setNewMessage("");
    }

    return (
        <div className=" mx-auto my-10 border border-[#ccc] h-[70vh]">
            {/* <h1 className="font-bold text-2xl flex justify-center border-b-1 border-[#ccc] p-3">{`${targetUser?.firstName} ${targetUser?.lastName}`}</h1> */}
            <h1 className="font-bold text-2xl flex justify-center border-b-1 border-[#ccc] p-3">Chat</h1>
            {/* all chat */}
            <div className="flex-1 overflow-y-scroll p-3">
                <div className="flex flex-col gap-2">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`max-w-[70%] border border-gray-400 rounded-lg p-2 ${
                                msg.userId === user._id ? "self-end bg-green-200" : "self-start bg-white"
                            }`}
                        >
                            <span className="block text-sm font-semibold">{msg.name}</span>
                            <span>{msg.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* {console.log(messages)} */}
            <div className="border-t-1 border-[#ccc] p-3 flex justify-between gap-5">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder="Type a message..." className="border border-[#ccc] flex-1 p-2 rounded" />
                <button onClick={sendMessage} className="border border-solid px-4 py-2 cursor-pointer rounded-lg bg-green-500 text-white hover:bg-green-700">Send</button>
            </div>
        </div>
    )
};

export default Chat;