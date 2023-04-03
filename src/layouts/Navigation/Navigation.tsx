import { NavLink } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import logo from "assets/images/logo.png";
import { useContext } from "react";
import { ThemeContext } from "styled-components";
import IOSSwitch from "style/Darkmode/IOSSwitch";
import "./Navigation.scss";

const Navigation = ({switchTheme}: any) => {
  const theme = useContext(ThemeContext);

  return (
    <Navbar className="Navigation" expand="lg">
        <Navbar.Brand>
            <NavLink to="/">
            <img src={logo} alt="Navbar brand logo" style={{ height: "150px" }} />
            </NavLink>
        </Navbar.Brand>

        <div className="navigation-links">
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
        </div>

        <IOSSwitch onClick={switchTheme} />
    </Navbar>
  );
};

export default Navigation;
