import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import "./App.css";
import AdminMainPage from "./pages/Admin/AdminMainPage";
import UserMain from "./pages/User/UserMain/UserMain";
import UserRootLayout from "./pages/User/UserMain/UserRootLayout";
import UserCalender from "./pages/User/UserCalender/UserCalender";
import UserReferencesRootLayout from "./pages/User/UserReferences/UserReferencesRootLayout";

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
      { path: "ref", element: <UserReferencesRootLayout /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
