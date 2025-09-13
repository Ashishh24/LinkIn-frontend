import ReactDOM from "react-dom/client";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import Error from "./components/Error";
import FindPeople from "./components/FindPeople";
import appStore from "./utils/appStore";
import User from "./components/User";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Entry from "./components/Entry";
import RequestsSent from "./components/RequestsSent";
import Chat from "./components/Chat";
import Home from "./components/Home";
import HelpChatbot from "./components/HelpChatbot";

const App = () => {
  const user = useSelector((store) => store.user);
  return (
    <div>
      <User />
      <Outlet />
      {user && <HelpChatbot />}
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Entry />,
        errorElement: <Error />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/add",
        element: <FindPeople />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/edit",
        element: <EditProfile />,
      },
      {
        path: "/connections",
        element: <Connections />,
      },
      {
        path: "/requests",
        element: <Requests />,
      },
      {
        path: "/requests/sent",
        element: <RequestsSent />,
      },
      {
        path: "/chat",
        element: <Chat />,
      },
      {
        path: "/chat/:targetUserId",
        element: <Chat />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={appStore}>
    <Toaster
      position="top-center"
      reverseOrder={false}
      toastOptions={{
        style: {
          fontSize: "14px",
          padding: "12px 20px",
        },
        success: {
          style: {
            background: "#d1fae5",
            color: "#065f46",
          },
        },
        error: {
          style: {
            background: "#fee2e2",
            color: "#991b1b",
          },
        },
      }}
    />
    <RouterProvider router={appRouter} />
  </Provider>
);
