import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Error from "./components/Error";

const App = () => {
  return (
    <div>
      <Login/>
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path:"/",
    element:<Header />,
    errorElement:<Error />
  },
  {
    path:"/login",
    element: <Login />,
  },
  {
    path:"/signup",
    element: <Signup />,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
// root.render(<App />);