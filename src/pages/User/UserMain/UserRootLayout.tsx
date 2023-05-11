import { Outlet } from "react-router-dom";
import UserMainNavigation from "./UserMainNavigation";
import { useAppDispatch } from "../../app/hook";

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
