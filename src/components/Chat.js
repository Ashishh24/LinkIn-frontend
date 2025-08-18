import { useEffect, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

const Chat = (props) => {
    const targetUserId= useParams();
    const user = props.data;
    // const user = useSelector((store) => store.user);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const socket = createSocketConnection();
        socket.emit("joinChat",  { firstName: user.firstName, userId: user._id, targetUserId });

        return () => {
            socket.disconnect();
        }
    }, []);

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {name: `${user.firstName} ${user.lastName}`, userId: user._id, targetUserId, text: newMessage});
        socket.on("receivedMessage", (name, text) => {
            console.log(name + " " + text);
        })
    }

    return (
        <div className="w-300 mx-auto my-10 border border-[#ccc] h-[70vh]">
            <h1 className="font-bold text-2xl flex justify-center border-b-1 border-[#ccc] p-3">{`${user.firstName} ${user.lastName}`}</h1>
            <div className="h-[53vh] overflow-y-scroll p-3">
                {/* all chat */}
                <div className="flex flex-col gap-2 p-2">
                    {/* Sent message (right side) */}
                    <div className="self-end max-w-[70%] border border-gray-400 rounded-lg p-2 bg-green-200">
                        Hello 👋
                    </div>

                    {/* Received message (left side) */}
                    <div className="self-start max-w-[70%] border border-gray-400 rounded-lg p-2 bg-white">
                        Hi! How are you?
                    </div>
                </div>
            </div>
            <div className="border-t-1 border-[#ccc] p-3 flex justify-between gap-5">
                <input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="border border-[#ccc] w-full border-solid p-2"/>
                <button onClick={sendMessage} className="border border-solid px-4 py-2 cursor-pointer rounded-lg bg-green-500 text-white hover:bg-green-700">Send</button>
            </div>
        </div>
    )
};

export default Chat;