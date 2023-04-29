import { Outlet } from "react-router-dom";
import UserMainNavigation from "./UserMainNavigation";

const UserRootLayout = () => {
  return (
    <>
      <UserMainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default UserRootLayout;
