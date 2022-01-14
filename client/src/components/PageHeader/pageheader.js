import React from "react";
import "./PageHeader.scss";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/Icons/logo.svg";
import User from "../../assets/images/Icons/user.jpg";

const PageHeader = () => {
  return (
    <div className="header">
      <div className="header__banner">
        <Link to={"/"}>
          <img className="header__logo" src={Logo} alt="logo" />
        </Link>
        <img className="header__user" src={User} alt="user" />
      </div>
    </div>
  );
};

export default PageHeader;
