import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import style from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={style.appContainer}>
      <Header />
      <main className={style.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
