import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import "./App.css";
import AdminMainPage from "./pages/Admin/AdminMainPage";
import AddProjectPage from "./pages/Admin/AddProjectPage";
import UserMain from "./pages/User/UserMain/UserMain";
import UserRootLayout from "./pages/User/UserMain/UserRootLayout";
import UserCalender from "./pages/User/UserCalender/UserCalender";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  {
    path: "/admin",
    element: <AdminMainPage />,
  },
  {
    path: "/user",
    element: <UserRootLayout />,
    children: [
      { index: true, element: <UserMain /> },
      { path: "calender", element: <UserCalender /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
