import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={style.nav}>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive ? `${style.navLink} ${style.active}` : style.navLink
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/catalog"
        className={({ isActive }) =>
          isActive ? `${style.navLink} ${style.active}` : style.navLink
        }
      >
        Catalog
      </NavLink>
    </nav>
  );
};

export default Navigation;
