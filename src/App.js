import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Error from "./components/Error";
import People from "./components/People";
import AddConenction from "./components/AddConnection";

const App = () => {
  return (
    <div>
      <AddConenction/>
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
  {
    path:"/add",
    element: <AddConenction />,
  },
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
// root.render(<App />);