import { NavLink } from "react-router-dom";
import logo from "assets/images/logo.png";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import IOSSwitch from "style/Darkmode/IOSSwitch";
import "./Navigation.scss";

const Navigation = ({switchTheme}: any) => {
  const theme = useContext(ThemeContext);

  return (
    <div className="Navigation">
        <NavLink to="/">
            <img src={logo} alt="Navbar brand logo" style={{ height: "150px" }} />
        </NavLink>

        <NavLink
            to="/adventure"
            className="navlink"
            style={{color: theme.text}}
        >
            Aventure
        </NavLink>

        <NavLink
            to="/aboutus"
            className="navlink"
            style={{color: theme.text}}
        >
            À propos
        </NavLink>

        <IOSSwitch onClick={switchTheme} />
    </div>
  );
};

export default Navigation;
