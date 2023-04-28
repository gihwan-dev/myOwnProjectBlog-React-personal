import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import "./App.css";
import AdminMainPage from "./pages/Admin/AdminMainPage";
import AddProjectPage from "./pages/Admin/AddProjectPage";

const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  {
    path: "/admin",
    element: <AdminMainPage />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
