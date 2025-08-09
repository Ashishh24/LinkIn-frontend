import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Error from "./components/Error";
import People from "./components/People";
import AddConenction from "./components/AddConnection";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import User from "./components/User";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import { Toaster } from "react-hot-toast";

const App = () => {
  
  return (
    <Provider store={appStore}>
      <Toaster position="top-center" reverseOrder={false} />
      <div>
        <User />
        <Outlet />
      </div>
    </Provider>
  )
}

const appRouter = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:
    [
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
      {
        path:"/profile",
        element: <Profile />,
      },
      {
        path:"/edit",
        element: <EditProfile />,
      },
      {
        path:"/connections",
        element: <Connections />,
      },
      {
        path:"/requests",
        element: <Requests />,
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
// root.render(<App />);