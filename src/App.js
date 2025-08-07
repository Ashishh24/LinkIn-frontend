import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Error from "./components/Error";
import People from "./components/People";
import AddConenction from "./components/AddConnection";
import { Provider, useDispatch } from "react-redux";
import appStore from "./utils/appStore";
import User from "./components/User";

const App = () => {
  
  return (
    <Provider store={appStore}>
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
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
// root.render(<App />);