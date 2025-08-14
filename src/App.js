import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router";
import Error from "./components/Error";
import FindPeople from "./components/FindPeople";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import User from "./components/User";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import { Toaster } from "react-hot-toast";
import Entry from "./components/Entry";
import ViewProfile from "./components/ViewProfile";
import RequestsSent from "./components/RequestsSent";

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
        element:<Entry />,
        errorElement:<Error />
      },
      {
        path:"/home",
        element:<Header />,
      },
      {
        path:"/add",
        element: <FindPeople />,
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
      {
        path:"/requests/sent",
        element: <RequestsSent />,
      },
      {
        path:"/profile/:_id",
        element: <ViewProfile />,
      },
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);