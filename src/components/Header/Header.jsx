import { NavLink } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import Logo from "../../assets/Logo/Logo.svg";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header className={style.header}>
      <div className={`container ${style.container}`}>
        <NavLink to="/">
          <img src={Logo} alt="Logo" />
        </NavLink>
        <Navigation />
      </div>
    </header>
  );
};

export default Header;
