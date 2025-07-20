import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import { Toaster } from "react-hot-toast";
import style from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={style.appContainer}>
      <Header />
      <main className={style.mainContent}>
        <Outlet />
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#ffc531",
            color: "#fff",
          },
        }}
      />
    </div>
  );
};

export default Layout;
