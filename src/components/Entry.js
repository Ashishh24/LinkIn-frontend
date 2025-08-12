import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

const Entry = () => {
    const [showAbout, setShowAbout] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setShowSignup] = useState(false);

    return (
        <div className="flex h-[100vh] items-center justify-center">
            <div className="text-center mx-auto p-7 w-[100%] md:w-[40%] ">
                <h1 className="text-4xl pb-6">Welcome to LinkIn!</h1>
                <div className="flex flex-col m-10">
                    <button onClick={() => setShowAbout(true)} style={{ margin: "10px" }} className="border px-5 py-2 bg-red-700 rounded-xl text-white cursor-pointer hover:bg-red-600">
                        About
                    </button>
                    <button onClick={() => setShowLogin(true)} style={{ margin: "10px" }} className="border px-5 py-2 bg-blue-700 rounded-xl text-white cursor-pointer hover:bg-blue-600">
                        Login
                    </button>
                    <button onClick={() => setShowSignup(true)} style={{ margin: "10px" }} className="border px-5 py-2 bg-green-700 rounded-xl text-white cursor-pointer hover:bg-green-600">
                        Sign Up
                    </button>
                </div>
                
                {/* About Modal */}
                {showAbout && (
                    <div className="modal-overlay" onClick={() => setShowAbout(false)}>
                    <div className="modal-contentAbout" onClick={(e) => e.stopPropagation()}>
                        <h2 className="text-left md:text-xl">This is a personal project I built to enhance my skills in technology stack, e.g., React and Node.js. It helped me practice full-stack development and learn practical implementation of key features, e.g., user authentication, API integration, responsive design.</h2>
                    </div>
                    </div>
                )}

                {/* Login Modal */}
                {showLogin && (
                    <div className="modal-overlay" onClick={() => setShowLogin(false)}>
                    <div className="modal-contentLogin" onClick={(e) => e.stopPropagation()}>
                        <Login 
                            onClose={() => setShowLogin(false)} 
                            onSwitchToSignup={() => {
                                setShowLogin(false);
                                setShowSignup(true);
                            }} 
                        />
                    </div>
                    </div>
                )}

                {/* Signup Modal */}
                {showSignup && (
                    <div className="modal-overlay" onClick={() => setShowSignup(false)}>
                    <div className="modal-contentSignup" onClick={(e) => e.stopPropagation()}>
                        {/* <Signup /> */}
                        <Signup 
                            onClose={() => setShowSignup(false)} 
                            onSwitchToLogin={() => {
                                setShowSignup(false);
                                setShowLogin(true);
                            }} 
                        />
                    </div>
                    </div>
                )}

                <style>{`
                    .modal-overlay {
                        position: fixed;
                        top: 0; left: 0;
                        width: 100%; height: 100%;
                        background: rgba(0,0,0,0.5);
                        display: flex; 
                        justify-content: center; 
                        align-items: center;
                    }
                    .modal-contentAbout {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        width: 500px;
                        text-align: left;
                    }
                    .modal-contentLogin {
                        background: white;
                        padding: 20px;
                        border-radius: 10px;
                        width: 300px;
                        text-align: left;
                    }
                    .modal-contentSignup {
                        background: white;
                        // padding: 20px;
                        border-radius: 10px;
                        width: 450px;
                        text-align: left;
                    }
                    input {
                        display: block;
                        // margin: 10px auto;
                        padding: 8px;
                        width: 90%;
                    }
                `}</style>
            </div>
        </div>
    )
};

export default Entry;