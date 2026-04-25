import { createBrowserRouter, RouterProvider } from "react-router";
import RoomPage from "./RoomPage";
import ChatPage from "./ChatPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoomPage />,
  },
  {
    path: "/room",
    element: <RoomPage />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
